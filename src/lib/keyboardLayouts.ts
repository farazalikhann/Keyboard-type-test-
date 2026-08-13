// Physical keyboard layout data, keyed by W3C UI Events `code` values (physical position),
// not `key` values, so layout selection (QWERTY/AZERTY/etc.) never affects what we test.

export type LayoutVariant = "ansi" | "iso" | "tkl";

export interface KeyDef {
  code: string;
  label: string;
  sublabel?: string;
  width: number; // in "u" units, 1u = one standard keycap
  tall?: boolean; // spans this row and the row below (ISO Enter, numpad + / Enter)
  spacer?: boolean; // invisible placeholder, occupies space but is not a real key
}

export interface KeyRow {
  keys: KeyDef[];
}

export interface KeyboardBlock {
  name: string;
  unitWidth: number;
  rows: KeyRow[];
}

export interface KeyboardLayoutData {
  variant: LayoutVariant;
  functionRow: KeyDef[];
  mainBlock: { row2: KeyDef[]; row3: KeyDef[] }; // combined grid for tall-Enter support
  numberRow: KeyDef[];
  shiftRow: KeyDef[];
  bottomRow: KeyDef[];
  navCluster: KeyRow[];
  numpad: { row2: KeyDef[]; row3: KeyDef[]; row4: KeyDef[]; row5: KeyDef[]; topRow: KeyDef[] } | null;
}

const k = (code: string, label: string, width = 1, extra: Partial<KeyDef> = {}): KeyDef => ({
  code,
  label,
  width,
  ...extra,
});

function functionRow(): KeyDef[] {
  return [
    k("Escape", "esc"),
    k("__gap1", "", 0.75, { spacer: true }),
    k("F1", "F1"),
    k("F2", "F2"),
    k("F3", "F3"),
    k("F4", "F4"),
    k("__gap2", "", 0.5, { spacer: true }),
    k("F5", "F5"),
    k("F6", "F6"),
    k("F7", "F7"),
    k("F8", "F8"),
    k("__gap3", "", 0.5, { spacer: true }),
    k("F9", "F9"),
    k("F10", "F10"),
    k("F11", "F11"),
    k("F12", "F12"),
    k("__gap4", "", 1, { spacer: true }),
    k("PrintScreen", "prt sc"),
    k("ScrollLock", "scr lk"),
    k("Pause", "pause"),
  ];
}

function numberRow(): KeyDef[] {
  return [
    k("Backquote", "`"),
    k("Digit1", "1"),
    k("Digit2", "2"),
    k("Digit3", "3"),
    k("Digit4", "4"),
    k("Digit5", "5"),
    k("Digit6", "6"),
    k("Digit7", "7"),
    k("Digit8", "8"),
    k("Digit9", "9"),
    k("Digit0", "0"),
    k("Minus", "-"),
    k("Equal", "="),
    k("Backspace", "backspace", 2),
  ];
}

function mainBlock(variant: LayoutVariant): { row2: KeyDef[]; row3: KeyDef[] } {
  const row2: KeyDef[] = [
    k("Tab", "tab", 1.5),
    k("KeyQ", "Q"),
    k("KeyW", "W"),
    k("KeyE", "E"),
    k("KeyR", "R"),
    k("KeyT", "T"),
    k("KeyY", "Y"),
    k("KeyU", "U"),
    k("KeyI", "I"),
    k("KeyO", "O"),
    k("KeyP", "P"),
    k("BracketLeft", "["),
    k("BracketRight", "]"),
  ];
  const row3: KeyDef[] = [
    k("CapsLock", "caps lock", 1.75),
    k("KeyA", "A"),
    k("KeyS", "S"),
    k("KeyD", "D"),
    k("KeyF", "F"),
    k("KeyG", "G"),
    k("KeyH", "H"),
    k("KeyJ", "J"),
    k("KeyK", "K"),
    k("KeyL", "L"),
    k("Semicolon", ";"),
    k("Quote", "'"),
  ];

  if (variant === "iso") {
    row2.push(k("__spacer_row2", "", 0.25, { spacer: true }));
    row3.push(k("Backslash", "\\"));
    row3.push(k("Enter", "enter", 1.25, { tall: true }));
  } else {
    row2.push(k("Backslash", "\\", 1.5));
    row3.push(k("Enter", "enter", 2.25));
  }

  return { row2, row3 };
}

function shiftRow(variant: LayoutVariant): KeyDef[] {
  const base: KeyDef[] = [];
  if (variant === "iso") {
    base.push(k("ShiftLeft", "shift", 1.25));
    base.push(k("IntlBackslash", "\\"));
  } else {
    base.push(k("ShiftLeft", "shift", 2.25));
  }
  base.push(
    k("KeyZ", "Z"),
    k("KeyX", "X"),
    k("KeyC", "C"),
    k("KeyV", "V"),
    k("KeyB", "B"),
    k("KeyN", "N"),
    k("KeyM", "M"),
    k("Comma", ","),
    k("Period", "."),
    k("Slash", "/"),
    k("ShiftRight", "shift", 2.75)
  );
  return base;
}

function bottomRow(): KeyDef[] {
  return [
    k("ControlLeft", "ctrl", 1.25),
    k("MetaLeft", "win", 1.25),
    k("AltLeft", "alt", 1.25),
    k("Space", "", 6.25),
    k("AltRight", "alt", 1.25),
    k("MetaRight", "win", 1.25),
    k("ContextMenu", "menu", 1.25),
    k("ControlRight", "ctrl", 1.25),
  ];
}

function navCluster(): KeyRow[] {
  return [
    { keys: [k("Insert", "ins"), k("Home", "home"), k("PageUp", "pg up")] },
    { keys: [k("Delete", "del"), k("End", "end"), k("PageDown", "pg dn")] },
    { keys: [k("__blank1", "", 1, { spacer: true }), k("__blank2", "", 1, { spacer: true }), k("__blank3", "", 1, { spacer: true }) ] },
    { keys: [k("__blank4", "", 1, { spacer: true }), k("ArrowUp", "↑"), k("__blank5", "", 1, { spacer: true })] },
    { keys: [k("ArrowLeft", "←"), k("ArrowDown", "↓"), k("ArrowRight", "→")] },
  ];
}

function numpad() {
  return {
    topRow: [k("NumLock", "num lk"), k("NumpadDivide", "/"), k("NumpadMultiply", "*"), k("NumpadSubtract", "-")],
    row2: [k("Numpad7", "7"), k("Numpad8", "8"), k("Numpad9", "9"), k("NumpadAdd", "+", 1, { tall: true })],
    row3: [k("Numpad4", "4"), k("Numpad5", "5"), k("Numpad6", "6")],
    row4: [k("Numpad1", "1"), k("Numpad2", "2"), k("Numpad3", "3"), k("NumpadEnter", "enter", 1, { tall: true })],
    row5: [k("Numpad0", "0", 2), k("NumpadDecimal", ".")],
  };
}

export function buildLayout(variant: LayoutVariant): KeyboardLayoutData {
  return {
    variant,
    functionRow: functionRow(),
    mainBlock: mainBlock(variant),
    numberRow: numberRow(),
    shiftRow: shiftRow(variant),
    bottomRow: bottomRow(),
    navCluster: navCluster(),
    numpad: variant === "tkl" ? null : numpad(),
  };
}

export function allKeyCodes(variant: LayoutVariant): string[] {
  const layout = buildLayout(variant);
  const codes: string[] = [];
  const collect = (keys: KeyDef[]) => {
    for (const key of keys) {
      if (!key.spacer) codes.push(key.code);
    }
  };
  collect(layout.functionRow);
  collect(layout.mainBlock.row2);
  collect(layout.mainBlock.row3);
  collect(layout.numberRow);
  collect(layout.shiftRow);
  collect(layout.bottomRow);
  layout.navCluster.forEach((row) => collect(row.keys));
  if (layout.numpad) {
    collect(layout.numpad.topRow);
    collect(layout.numpad.row2);
    collect(layout.numpad.row3);
    collect(layout.numpad.row4);
    collect(layout.numpad.row5);
  }
  return codes;
}

export function keyLabel(code: string, variant: LayoutVariant): string {
  const layout = buildLayout(variant);
  const all: KeyDef[] = [
    ...layout.functionRow,
    ...layout.mainBlock.row2,
    ...layout.mainBlock.row3,
    ...layout.numberRow,
    ...layout.shiftRow,
    ...layout.bottomRow,
    ...layout.navCluster.flatMap((r) => r.keys),
    ...(layout.numpad
      ? [...layout.numpad.topRow, ...layout.numpad.row2, ...layout.numpad.row3, ...layout.numpad.row4, ...layout.numpad.row5]
      : []),
  ];
  const found = all.find((key) => key.code === code);
  return found ? found.label || code : code;
}
