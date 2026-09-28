import { useState } from "react";

import { AnchorButton, Button } from "@/components/ui/Button";
import { formatBuildTime } from "@/lib/validation";
import type { BuildSuccess } from "@/types/build";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-2.5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="break-all font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function SuccessCard({ result, onReset }: { result: BuildSuccess; onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-live="polite" className="surface-panel overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4 sm:px-6">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-primary-foreground"
        >
          ✓
        </span>
        <h2 className="text-base font-semibold sm:text-lg">APK Built Successfully</h2>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <dl>
          <Row label="App name" value={result.appName} />
          <Row label="Package name" value={result.packageName} />
          <Row
            label="Version"
            value={`${result.versionName} (code ${result.versionCode})`}
          />
          <Row label="Build time" value={formatBuildTime(result.buildTimeMs)} />
        </dl>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <AnchorButton
            href={result.downloadUrl}
            external
            variant="primary"
            size="lg"
            className="w-full sm:w-auto sm:flex-1"
          >
            Download APK
          </AnchorButton>
          <Button variant="outline" size="lg" onClick={copy} className="w-full sm:w-auto">
            {copied ? "Link copied ✓" : "Copy Download URL"}
          </Button>
          <Button variant="ghost" size="lg" onClick={onReset} className="w-full sm:w-auto">
            Build Another
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          This download link was issued for this build only. Save the APK before closing the page.
        </p>
      </div>
    </section>
  );
}
