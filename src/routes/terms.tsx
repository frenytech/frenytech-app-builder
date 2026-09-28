import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/layout/PageShell";

const TITLE = "Terms — FrenyTech Web2APK Builder";
const DESCRIPTION =
  "Terms of use for the FrenyTech Web2APK Builder, including acceptable use and build availability.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <ContentPage
      title="Terms of use"
      intro="Plain-language terms for using the FrenyTech Web2APK Builder."
    >
      <section>
        <h2 className="text-lg font-semibold text-foreground">Acceptable use</h2>
        <p className="mt-2">
          Only build applications for websites you own or are authorised to distribute. Do not use
          the builder for malware, phishing, copyright infringement or any unlawful purpose.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Availability</h2>
        <p className="mt-2">
          Builds depend on an external build service, so availability and build times are not
          guaranteed. A failed build does not consume anything and can be retried.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Your responsibility</h2>
        <p className="mt-2">
          You are responsible for the content of your website, your app metadata, and for meeting
          the publishing requirements of any store you distribute the APK through.
        </p>
      </section>
    </ContentPage>
  );
}
