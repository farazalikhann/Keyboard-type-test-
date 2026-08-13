interface AdSlotProps {
  label: string;
  height: number;
  className?: string;
}

/**
 * Fixed-height reserved space so ad load never shifts layout (CLS).
 * Swap the inner placeholder for a real ad network tag when one is wired up.
 */
export function AdSlot({ label, height, className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-sm border border-dashed border-border bg-panel/40 font-data text-[11px] uppercase tracking-wide text-fg-muted ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      Ad space · {label}
    </div>
  );
}
