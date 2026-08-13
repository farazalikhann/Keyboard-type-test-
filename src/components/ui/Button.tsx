import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", className = "", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 font-data text-xs uppercase tracking-wide transition-colors disabled:opacity-40 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary: "bg-signal text-base font-semibold hover:brightness-110",
    secondary: "border border-border bg-panel-raised text-fg shadow-bezel hover:border-signal/60",
    ghost: "text-fg-muted hover:text-fg",
  };

  return <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />;
});
