import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/layout/PageShell";
import { GITHUB_URL, WHATSAPP_URL } from "@/lib/site";

const TITLE = "Documentation & Help — FrenyTech Web2APK Builder";
const DESCRIPTION =
  "Field reference, requirements and troubleshooting for the FrenyTech Web2APK Builder, plus support contacts from FrenyTech.";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/documentation" },
    ],
    links: [{ rel: "canonical", href: "/documentation" }],
  }),
  component: Documentation,
});

const FIELDS = [
  ["Website URL", "The full https URL your app will load, e.g. https://yourwebsite.com"],
  ["App Name", "2–50 characters. Appears under the icon on the device."],
  ["Package Name", "Reverse-domain Android identifier, e.g. com.frenytech.myapp. Lowercase, at least two segments, no reserved keywords."],
  ["Version Name", "Human-readable release version such as 1.0.0"],
  ["Version Code", "Whole number starting at 1. Increase it for every new release."],
  ["Icon URL", "Direct link to a square PNG. 512×512 gives the best result on modern devices."],
];

const ISSUES = [
  ["The build failed immediately", "Usually an unreachable website URL or an icon URL that is not a direct image link. Open both URLs in a new tab to confirm."],
  ["The build timed out", "Large sites take longer. Wait a few minutes and run the build again — no partial APK is created."],
  ["No download link was returned", "The build service completed without issuing a link. Re-run the build; nothing is cached."],
  ["The APK will not install", "Enable installation from unknown sources on the device, and make sure the version code is higher than any previously installed build with the same package name."],
];

function Documentation() {
  return (
    <ContentPage
      title="Documentation & help"
      intro="Everything you need to configure a successful Android build, plus fixes for the most common issues."
    >
      <section>
        <h2 className="text-lg font-semibold text-foreground">Field reference</h2>
        <dl className="mt-4 divide-y divide-border">
          {FIELDS.map(([name, body]) => (
            <div key={name} className="py-3">
              <dt className="text-sm font-medium text-foreground">{name}</dt>
              <dd className="mt-1">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Troubleshooting</h2>
        <dl className="mt-4 divide-y divide-border">
          {ISSUES.map(([name, body]) => (
            <div key={name} className="py-3">
              <dt className="text-sm font-medium text-foreground">{name}</dt>
              <dd className="mt-1">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Support</h2>
        <p className="mt-2">
          Need help with a build? Reach FrenyTech on{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>{" "}
          or browse more developer tools by FrenyTech on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </ContentPage>
  );
}
