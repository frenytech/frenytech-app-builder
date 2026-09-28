import { useEffect, useState } from "react";

import { isHttpUrl } from "@/lib/validation";

export function IconPreview({ url, appName }: { url: string; appName: string }) {
  const [status, setStatus] = useState<"empty" | "loading" | "ok" | "error">("empty");
  const trimmed = url.trim();
  const valid = isHttpUrl(trimmed);

  useEffect(() => {
    setStatus(valid ? "loading" : "empty");
  }, [trimmed, valid]);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary">
        {valid && status !== "error" ? (
          <img
            src={trimmed}
            alt="App icon preview"
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 object-cover"
            onLoad={() => setStatus("ok")}
            onError={() => setStatus("error")}
          />
        ) : (
          <span aria-hidden="true" className="text-lg text-muted-foreground">
            ▢
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{appName.trim() || "Your app name"}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {!valid
            ? "Add an icon URL to see a preview"
            : status === "error"
              ? "Icon could not be loaded from that URL"
              : status === "loading"
                ? "Loading icon preview…"
                : "Icon loaded — this is how it will look"}
        </p>
      </div>
    </div>
  );
}
