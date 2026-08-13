"use client";

import type { CSSProperties } from "react";
import { buildLayout, type KeyDef, type LayoutVariant } from "@/lib/keyboardLayouts";
import { Key } from "./Key";

interface KeyboardLayoutProps {
  variant: LayoutVariant;
  pressed: Set<string>;
  verified: Set<string>;
}

interface Track {
  start: number;
  span: number;
}

function computeTracks(keys: KeyDef[]): Track[] {
  let cursor = 1;
  return keys.map((key) => {
    const span = Math.round(key.width * 4);
    const start = cursor;
    cursor += span;
    return { start, span };
  });
}

function rowUnits(keys: KeyDef[]): number {
  return keys.reduce((sum, key) => sum + key.width, 0);
}

export function KeyboardLayout({ variant, pressed, verified }: KeyboardLayoutProps) {
  const layout = buildLayout(variant);

  const rowStyle = (units: number): CSSProperties => ({
    display: "flex",
    width: `calc(var(--ku) * ${units})`,
    height: "calc(var(--ku) * 0.95)",
  });

  const keyFlexStyle = (width: number): CSSProperties => ({
    width: `calc(var(--ku) * ${width})`,
    height: "100%",
    flexShrink: 0,
  });

  return (
    <div
      className="inline-flex flex-col gap-1"
      style={{ "--ku": "clamp(26px, 2.4vw, 40px)" } as CSSProperties}
    >
      {/* function row */}
      <div style={rowStyle(rowUnits(layout.functionRow))}>
        {layout.functionRow.map((key, i) => (
          <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
        ))}
      </div>

      <div className="flex gap-[calc(var(--ku)*0.5)]">
        <div className="flex flex-col gap-1">
          {/* number row */}
          <div style={rowStyle(rowUnits(layout.numberRow))}>
            {layout.numberRow.map((key, i) => (
              <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
            ))}
          </div>

          {/* tab row + caps row, combined for tall ISO enter */}
          <TwoRowBlock topRow={layout.mainBlock.row2} bottomRow={layout.mainBlock.row3} pressed={pressed} verified={verified} />

          {/* shift row */}
          <div style={rowStyle(rowUnits(layout.shiftRow))}>
            {layout.shiftRow.map((key, i) => (
              <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
            ))}
          </div>

          {/* bottom row */}
          <div style={rowStyle(rowUnits(layout.bottomRow))}>
            {layout.bottomRow.map((key, i) => (
              <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
            ))}
          </div>
        </div>

        {/* nav cluster */}
        <div className="flex flex-col gap-1">
          {layout.navCluster.map((row, ri) => (
            <div key={ri} style={rowStyle(3)}>
              {row.keys.map((key, i) => (
                <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
              ))}
            </div>
          ))}
        </div>

        {/* numpad */}
        {layout.numpad && (
          <div className="flex flex-col gap-1">
            <div style={rowStyle(rowUnits(layout.numpad.topRow))}>
              {layout.numpad.topRow.map((key, i) => (
                <Key key={key.code + i} def={key} style={keyFlexStyle(key.width)} pressed={pressed.has(key.code)} verified={verified.has(key.code)} />
              ))}
            </div>
            <TwoRowBlock topRow={layout.numpad.row2} bottomRow={layout.numpad.row3} pressed={pressed} verified={verified} />
            <TwoRowBlock topRow={layout.numpad.row4} bottomRow={layout.numpad.row5} pressed={pressed} verified={verified} />
          </div>
        )}
      </div>
    </div>
  );
}

function TwoRowBlock({
  topRow,
  bottomRow,
  pressed,
  verified,
}: {
  topRow: KeyDef[];
  bottomRow: KeyDef[];
  pressed: Set<string>;
  verified: Set<string>;
}) {
  const topTracks = computeTracks(topRow);
  const bottomTracks = computeTracks(bottomRow);
  const totalUnits = Math.max(
    topTracks.length ? topTracks[topTracks.length - 1].start + topTracks[topTracks.length - 1].span - 1 : 0,
    bottomTracks.length ? bottomTracks[bottomTracks.length - 1].start + bottomTracks[bottomTracks.length - 1].span - 1 : 0
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${totalUnits}, calc(var(--ku) / 4))`,
        gridTemplateRows: "repeat(2, calc(var(--ku) * 0.95))",
      }}
    >
      {topRow.map((key, i) => (
        <Key
          key={key.code + i}
          def={key}
          pressed={pressed.has(key.code)}
          verified={verified.has(key.code)}
          style={{ gridColumn: `${topTracks[i].start} / span ${topTracks[i].span}`, gridRow: "1" }}
        />
      ))}
      {bottomRow.map((key, i) => (
        <Key
          key={key.code + i}
          def={key}
          pressed={pressed.has(key.code)}
          verified={verified.has(key.code)}
          style={{
            gridColumn: `${bottomTracks[i].start} / span ${bottomTracks[i].span}`,
            gridRow: key.tall ? "1 / span 2" : "2",
          }}
        />
      ))}
    </div>
  );
}
