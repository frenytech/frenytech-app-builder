import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { AnchorButton } from "@/components/ui/ft-button";

const NAV = [
  { label: "Web2APK Builder", to: "/" as const },
  { label: "How It Works", to: "/how-it-works" as const },
  { label: "Documentation", to: "/documentation" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <AnchorButton href="/#builder" variant="primary" size="sm">
            Build APK
          </AnchorButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        >
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-0.5 w-4 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-4 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-surface px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <AnchorButton
            href="/#builder"
            variant="primary"
            size="md"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            Build APK
          </AnchorButton>
        </nav>
      )}
    </header>
  );
}
