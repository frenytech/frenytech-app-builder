import type { BuildStage } from "@/types/build";

const STAGES: { key: BuildStage; label: string; note: string }[] = [
  { key: "preparing", label: "Preparing build", note: "Validating your configuration" },
  { key: "sending", label: "Sending configuration", note: "Handing off to the build server" },
  {
    key: "building",
    label: "Building Android application",
    note: "Waiting for the build server to finish — this can take several minutes",
  },
  { key: "finalizing", label: "Finalizing APK", note: "Verifying the returned package" },
  { key: "complete", label: "Build complete", note: "Your APK is ready to download" },
];

const ORDER: BuildStage[] = ["idle", "preparing", "sending", "building", "finalizing", "complete"];

export function BuildProgress({ stage, elapsedSeconds }: { stage: BuildStage; elapsedSeconds: number }) {
  const current = ORDER.indexOf(stage);

  return (
    <section
      aria-live="polite"
      aria-label="Build progress"
      className="surface-panel p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Build in progress</h2>
        <span className="font-mono text-xs text-muted-foreground">
          {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")} elapsed
        </span>
      </div>

      <ol className="mt-5 space-y-4">
        {STAGES.map((item) => {
          const index = ORDER.indexOf(item.key);
          const done = current > index;
          const active = current === index;
          return (
            <li key={item.key} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={[
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                  done
                    ? "border-transparent bg-primary text-primary-foreground"
                    : active
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                ].join(" ")}
              >
                {done ? "✓" : active ? "•" : ""}
              </span>
              <div className="min-w-0">
                <p
                  className={
                    done || active ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground"
                  }
                >
                  {item.label}
                  {active && item.key !== "complete" && (
                    <span className="ml-2 text-xs font-normal text-primary">in progress</span>
                  )}
                </p>
                {active && <p className="mt-0.5 text-xs text-muted-foreground">{item.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 rounded-xl bg-secondary px-4 py-3 text-xs text-muted-foreground">
        No progress is estimated or simulated — the builder is waiting on the actual build server
        response. Keep this tab open until the build finishes.
      </p>
    </section>
  );
}
