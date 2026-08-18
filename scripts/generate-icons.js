// Generates the static brand PNG assets (favicon-style icon, apple touch icon, OG card) directly
// as raw PNG bytes, with no image library dependency. Re-run with `node scripts/generate-icons.js`
// if the brand mark or palette changes. This exists because next/og's ImageResponse (which would
// normally generate these at build time) fails on this machine specifically: its bundled font
// loader breaks when the project path contains a space, which this repo's path does.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const COLORS = {
  base: [17, 20, 26],
  panel: [26, 31, 39],
  border: [49, 58, 70],
  fg: [228, 231, 236],
  signal: [77, 232, 201],
};

function makeCanvas(width, height, fill) {
  const px = new Uint8Array(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    px[i * 4] = fill[0];
    px[i * 4 + 1] = fill[1];
    px[i * 4 + 2] = fill[2];
    px[i * 4 + 3] = 255;
  }
  return { width, height, px };
}

function setPixel(canvas, x, y, color) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  const i = (y * canvas.width + x) * 4;
  canvas.px[i] = color[0];
  canvas.px[i + 1] = color[1];
  canvas.px[i + 2] = color[2];
  canvas.px[i + 3] = color.length > 3 ? color[3] : 255;
}

function fillRect(canvas, x, y, w, h, color) {
  for (let yy = Math.round(y); yy < Math.round(y + h); yy++) {
    for (let xx = Math.round(x); xx < Math.round(x + w); xx++) {
      setPixel(canvas, xx, yy, color);
    }
  }
}

function strokeRect(canvas, x, y, w, h, thickness, color) {
  fillRect(canvas, x, y, w, thickness, color);
  fillRect(canvas, x, y + h - thickness, w, thickness, color);
  fillRect(canvas, x, y, thickness, h, color);
  fillRect(canvas, x + w - thickness, y, thickness, h, color);
}

function drawKeyboardGlyph(canvas, cx, cy, size, strokeColor, keyColor) {
  const unit = size / 20;
  const boardW = size;
  const boardH = unit * 12;
  const boardX = cx - boardW / 2;
  const boardY = cy - boardH / 2;
  strokeRect(canvas, boardX, boardY, boardW, boardH, Math.max(2, unit * 1.3), strokeColor);
  const keyY = boardY + unit * 3;
  [3, 7, 11, 15].forEach((kx) => {
    fillRect(canvas, boardX + kx * unit, keyY, unit * 2, unit * 2, keyColor);
  });
  fillRect(canvas, boardX + unit * 3, boardY + unit * 7, unit * 14, unit * 2, strokeColor);
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(canvas) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(canvas.width, 0);
  ihdrData.writeUInt32BE(canvas.height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = chunk("IHDR", ihdrData);

  const raw = Buffer.alloc(canvas.height * (1 + canvas.width * 4));
  for (let y = 0; y < canvas.height; y++) {
    const rowStart = y * (1 + canvas.width * 4);
    raw[rowStart] = 0; // no filter
    const pxRow = canvas.px.subarray(y * canvas.width * 4, (y + 1) * canvas.width * 4);
    Buffer.from(pxRow).copy(raw, rowStart + 1);
  }
  const idat = chunk("IDAT", zlib.deflateSync(raw, { level: 9 }));
  const iend = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function gridBackground(canvas) {
  for (let y = 0; y < canvas.height; y += 48) {
    for (let x = 0; x < canvas.width; x++) setPixel(canvas, x, y, COLORS.border);
  }
  for (let x = 0; x < canvas.width; x += 48) {
    for (let y = 0; y < canvas.height; y++) setPixel(canvas, x, y, COLORS.border);
  }
}

const outDir = path.join(__dirname, "..", "public");

// Apple touch icon: 180x180, rounded dark square with the glyph
const apple = makeCanvas(180, 180, COLORS.base);
drawKeyboardGlyph(apple, 90, 92, 116, COLORS.fg, COLORS.signal);
fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), encodePNG(apple));

// Favicon-style PNG icons
for (const s of [16, 32, 192, 512]) {
  const c = makeCanvas(s, s, COLORS.base);
  drawKeyboardGlyph(c, s / 2, s / 2 + s * 0.02, s * 0.72, COLORS.fg, COLORS.signal);
  fs.writeFileSync(path.join(outDir, `icon-${s}.png`), encodePNG(c));
}

// Shared Open Graph card (graphic only — no text, since rasterizing type without a font
// library is out of scope here; see SEO-CHECKLIST.md for the per-page text OG image follow-up)
const og = makeCanvas(1200, 630, COLORS.base);
gridBackground(og);
drawKeyboardGlyph(og, 600, 300, 380, COLORS.fg, COLORS.signal);
fillRect(og, 460, 470, 280, 10, COLORS.signal);
fs.writeFileSync(path.join(outDir, "og-image.png"), encodePNG(og));

console.log("Generated icons and OG image in public/");
