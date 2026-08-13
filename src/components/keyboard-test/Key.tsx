import type { CSSProperties } from "react";
import type { KeyDef } from "@/lib/keyboardLayouts";

interface KeyProps {
  def: KeyDef;
  style: CSSProperties;
  pressed: boolean;
  verified: boolean;
}

export function Key({ def, style, pressed, verified }: KeyProps) {
  if (def.spacer) {
    return <div style={style} aria-hidden="true" />;
  }

  return (
    <div style={style} className="p-[2px]">
      <div
        data-code={def.code}
        className={`flex h-full w-full flex-col items-start justify-end rounded-[3px] border px-1.5 py-1 font-data text-[11px] leading-none transition-colors duration-75 ${
          pressed
            ? "border-signal bg-signal text-base"
            : verified
            ? "border-signal/50 bg-panel-raised text-signal"
            : "border-border bg-panel-raised text-fg-muted shadow-bezel"
        }`}
      >
        <span className="truncate">{def.label}</span>
      </div>
    </div>
  );
}
