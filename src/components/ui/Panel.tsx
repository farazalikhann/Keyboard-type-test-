interface PanelProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  corner?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Panel({ children, className = "", label, corner, style }: PanelProps) {
  return (
    <div style={style} className={`relative rounded-sm border border-border bg-panel shadow-bezel ${className}`}>
      {(label || corner) && (
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          {label && (
            <p className="font-data text-[10px] uppercase tracking-[0.15em] text-fg-muted">{label}</p>
          )}
          {corner}
        </div>
      )}
      {children}
    </div>
  );
}
