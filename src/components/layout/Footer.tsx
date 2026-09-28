import { Link } from "@tanstack/react-router";

import { GITHUB_URL, WHATSAPP_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/icon-192.png" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="text-base font-semibold">FrenyTech</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Developer tools built by FrenyTech. Web2APK Builder turns production websites into
            installable Android applications.
          </p>
        </div>

        <nav aria-label="Product">
          <h2 className="text-sm font-semibold">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <a href="/#builder" className="hover:text-foreground">
                Web2APK Builder
              </a>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-foreground">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/documentation" className="hover:text-foreground">
                Documentation
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold">Connect</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer me"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                WhatsApp support
              </a>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} FrenyTech. All rights reserved.</p>
          <p>Built with ❤️ by FrenyTech</p>
        </div>
      </div>
    </footer>
  );
}
