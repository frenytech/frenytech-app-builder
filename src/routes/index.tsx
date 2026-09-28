import { createFileRoute, Link } from "@tanstack/react-router";

import { BuilderPanel } from "@/components/builder/BuilderPanel";
import { PageShell } from "@/components/layout/PageShell";
import { AnchorButton } from "@/components/ui/ft-button";
import { SITE_URL } from "@/lib/site";

const TITLE = "FrenyTech Web2APK Builder — Convert Websites to Android Apps";
const DESCRIPTION =
  "FrenyTech Web2APK Builder is a developer-focused tool for converting websites into Android applications through a streamlined APK build workflow.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FrenyTech Web2APK Builder",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web, Android",
          url: SITE_URL,
          description: DESCRIPTION,
          publisher: { "@type": "Organization", name: "FrenyTech", url: SITE_URL },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    title: "Describe your app",
    body: "Point the builder at your live website and set the app name, package name, version and icon.",
  },
  {
    title: "We call the build service",
    body: "Your configuration is sent from a FrenyTech server route to the Web2APK build service — never from your browser.",
  },
  {
    title: "Download the signed output",
    body: "When the build completes, the download link returned for that specific build is shown to you.",
  },
];

function Index() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FrenyTech Developer Tools
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Turn Your Website Into an <span className="text-brand-gradient">Android App</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Create Android APK builds from your website with the FrenyTech Web2APK Builder.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AnchorButton href="#builder" variant="primary" size="lg" className="w-full sm:w-auto">
                Build Your APK
              </AnchorButton>
              <Link
                to="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-6 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                How It Works
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Output</dt>
                <dd className="mt-1 text-sm font-medium">Installable .apk file</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Typical build</dt>
                <dd className="mt-1 text-sm font-medium">1–3 minutes</dd>
              </div>
            </dl>
          </div>

          <div aria-hidden="true" className="relative">
            <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-border bg-card p-3 shadow-panel">
              <div className="rounded-[1.6rem] border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/icon-192.png"
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl"
                  />
                  <div>
                    <p className="text-sm font-semibold">Your App</p>
                    <p className="text-xs text-muted-foreground">com.frenytech.yourapp</p>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-2 w-full rounded-full bg-secondary" />
                  <div className="h-2 w-4/5 rounded-full bg-secondary" />
                  <div className="h-2 w-2/3 rounded-full bg-secondary" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-secondary" />
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-brand-gradient px-4 py-2.5">
                  <span className="text-xs font-semibold text-primary-foreground">version 1.0.0</span>
                  <span className="text-xs font-semibold text-primary-foreground">APK ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <BuilderPanel />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">From URL to APK in three steps</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="surface-panel p-5">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
