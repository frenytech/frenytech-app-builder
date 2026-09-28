import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 rounded-lg"
      aria-label="FrenyTech home"
    >
      <img
        src="/icon-192.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
        decoding="async"
      />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">FrenyTech</span>
        {!compact && (
          <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Developer Tools
          </span>
        )}
      </span>
    </Link>
  );
}
