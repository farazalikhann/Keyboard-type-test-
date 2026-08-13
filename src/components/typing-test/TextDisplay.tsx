"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import type { CharStatus, CompletedWord } from "./useTypingEngine";

interface TextDisplayProps {
  words: string[];
  wordIndex: number;
  draft: string;
  draftStatuses: CharStatus[];
  completed: CompletedWord[];
}

const VISIBLE_LINES = 3;

export function TextDisplay({ words, wordIndex, draft, draftStatuses, completed }: TextDisplayProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const caret = caretRef.current;
    if (!inner || !caret) return;
    const lineHeight = parseFloat(getComputedStyle(inner).lineHeight) || 40;
    const caretTop = caret.offsetTop;
    const line = Math.round(caretTop / lineHeight);
    const offsetLine = Math.max(0, line - 1);
    setTranslateY(offsetLine * lineHeight);
  }, [wordIndex, draft]);

  return (
    <div
      className="relative overflow-hidden font-data text-2xl leading-[2.5rem] sm:text-[1.75rem] sm:leading-[2.75rem]"
      style={{ height: `calc(2.5rem * ${VISIBLE_LINES})` }}
    >
      <div
        ref={innerRef}
        className="transition-transform duration-150 ease-out"
        style={{ transform: `translateY(-${translateY}px)` }}
      >
        {words.map((word, wi) => {
          const isPast = wi < wordIndex;
          const isCurrent = wi === wordIndex;
          const result = isPast ? completed[wi] : null;

          const overflowChars = isCurrent && draft.length > word.length ? draft.slice(word.length).split("") : [];
          const units = word.split("").length;

          return (
            <span key={wi} className="mr-[0.5em] inline-block whitespace-nowrap">
              {word.split("").map((ch, ci) => {
                let status: CharStatus = "pending";
                if (isPast && result) status = result.charStatuses[ci] ?? "pending";
                if (isCurrent) status = draftStatuses[ci] ?? "pending";
                return (
                  <span key={ci} className="relative">
                    {isCurrent && ci === draft.length && <Caret ref={caretRef} />}
                    <CharGlyph status={status}>{ch}</CharGlyph>
                  </span>
                );
              })}
              {overflowChars.map((ch, i) => (
                <span key={`ovf-${i}`} className="relative">
                  {units + i === draft.length && <Caret ref={caretRef} />}
                  <span className="text-warning underline decoration-warning decoration-1 underline-offset-4">{ch}</span>
                </span>
              ))}
              {isCurrent && draft.length === units && overflowChars.length === 0 && <Caret ref={caretRef} />}
            </span>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-panel to-transparent" />
    </div>
  );
}

function CharGlyph({ status, children }: { status: CharStatus; children: React.ReactNode }) {
  const cls =
    status === "correct" ? "text-fg" : status === "incorrect" ? "text-warning" : "text-fg-muted";
  return <span className={cls}>{children}</span>;
}

const Caret = forwardRef<HTMLSpanElement>(function Caret(_props, ref) {
  return (
    <span
      ref={ref}
      className="absolute -left-[1px] top-0 inline-block h-[1em] w-[2px] animate-caret-blink bg-signal align-text-top"
      aria-hidden="true"
    />
  );
});
