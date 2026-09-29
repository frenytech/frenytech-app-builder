import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/layout/PageShell";

const TITLE = "How It Works — FrenyTech Web2APK Builder";
const DESCRIPTION =
  "How the FrenyTech Web2APK Builder converts a website into an Android APK: configuration, server-side build request, and a download link generated for each build.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <ContentPage
      title="How the Web2APK Builder works"
      intro="A transparent look at what happens between submitting the form and downloading your Android package."
    >
      <section>
        <h2 className="text-lg font-semibold text-foreground">1. You describe the app</h2>
        <p className="mt-2">
          The builder collects the website URL, app name, Android package name, version name,
          version code and an icon selected from your device. Each field is validated in the browser and again on the
          server, so an invalid package name or version code never reaches the build service.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">2. A FrenyTech server route builds</h2>
        <p className="mt-2">
          Your browser posts to a FrenyTech server endpoint. That server — not your browser —
          contacts the Web2APK build service. The upstream response is validated and reduced to
          only the fields the interface needs, so raw upstream data and implementation details
          stay on the server.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">3. The build actually runs</h2>
        <p className="mt-2">
          Progress states reflect real request stages. Nothing is estimated and no percentage is
          invented: while the build runs, the interface is genuinely waiting for the build server
          to respond. Builds commonly take one to three minutes.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">4. You get a fresh download link</h2>
        <p className="mt-2">
          Every successful build returns its own download link. The Download APK button always
          uses the link issued for the build you just ran — nothing is stored or reused from a
          previous build.
        </p>
      </section>
    </ContentPage>
  );
}
