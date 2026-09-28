import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
  outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const buttonClasses = (variant: Variant = "primary", size: Size = "md", extra?: string) =>
  cn(base, variants[variant], sizes[size], extra);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

interface LinkButtonProps {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  hash?: string;
}

export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
  hash,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      hash={hash}
      className={buttonClasses(variant, size, className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({} as any)}
    >
      {children}
    </Link>
  );
}

export function ExternalButton({
  href,
  variant = "outline",
  size = "md",
  className,
  children,
  download,
  label,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  download?: boolean;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...(download ? { download: "" } : {})}
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </a>
  );
}
