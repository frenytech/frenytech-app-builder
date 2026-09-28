import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/layout/PageShell";

const TITLE = "Privacy — FrenyTech Web2APK Builder";
const DESCRIPTION =
  "How the FrenyTech Web2APK Builder handles the build configuration you submit and what is not collected.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <ContentPage
      title="Privacy"
      intro="The Web2APK Builder is designed to hold as little information as possible."
    >
      <section>
        <h2 className="text-lg font-semibold text-foreground">What we process</h2>
        <p className="mt-2">
          The build configuration you submit — website URL, app name, package name, version and icon
          URL — is forwarded to the Web2APK build service to produce your APK. It is used for that
          build and nothing else.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">What we do not do</h2>
        <p className="mt-2">
          There are no user accounts, no advertising trackers and no sale of data. Build
          configurations are not published, and download links belong to the person who ran the
          build.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Third-party build service</h2>
        <p className="mt-2">
          APK compilation is performed by an external build service. Only the fields listed above
          are shared with it, and the download links it issues are hosted on its own infrastructure.
        </p>
      </section>
    </ContentPage>
  );
}
