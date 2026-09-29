import { useEffect, useRef, useState } from "react";

import { BuildProgress } from "@/components/builder/BuildProgress";
import { Field } from "@/components/builder/Field";
import { IconUpload } from "@/components/builder/IconUpload";
import { SuccessCard } from "@/components/builder/SuccessCard";
import { Button } from "@/components/ui/ft-button";
import { requestBuild } from "@/lib/build-client";
import { hasErrors, suggestPackageName, validateBuildConfig, type BuildErrors } from "@/lib/validation";
import type { BuildFormConfig, BuildStage, BuildSuccess } from "@/types/build";

const EMPTY: BuildFormConfig = {
  websiteUrl: "",
  appName: "",
  packageName: "",
  versionName: "1.0.0",
  versionCode: "1",
  iconFile: null,
};

export function BuilderPanel() {
  const [config, setConfig] = useState<BuildFormConfig>(EMPTY);
  const [errors, setErrors] = useState<BuildErrors>({});
  const [stage, setStage] = useState<BuildStage>("idle");
  const [result, setResult] = useState<BuildSuccess | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const packageTouched = useRef(false);

  const building = stage !== "idle" && stage !== "complete" && stage !== "failed";

  useEffect(() => {
    if (!building) return;
    const timer = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(timer);
  }, [building]);

  const update = (key: Exclude<keyof BuildFormConfig, "iconFile">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (key === "packageName") packageTouched.current = true;
    setConfig((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "appName" && !packageTouched.current) {
        next.packageName = suggestPackageName(value);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const reset = () => {
    setResult(null);
    setFailure(null);
    setStage("idle");
    setElapsed(0);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateBuildConfig(config);
    setErrors(found);
    if (hasErrors(found)) {
      setFailure("Please fix the highlighted fields before building.");
      return;
    }

    setFailure(null);
    setResult(null);
    setElapsed(0);
    setStage("preparing");

    await new Promise((resolve) => setTimeout(resolve, 250));
    setStage("sending");

    const pending = requestBuild({
      websiteUrl: config.websiteUrl.trim(),
      appName: config.appName.trim(),
      packageName: config.packageName.trim(),
      versionName: config.versionName.trim(),
      versionCode: config.versionCode.trim(),
      iconFile: config.iconFile,
    });

    setStage("building");
    const response = await pending;

    if (!response.success) {
      setStage("failed");
      setFailure(response.message);
      return;
    }

    setStage("finalizing");
    setResult(response);
    setStage("complete");
  };

  if (result && stage === "complete") {
    return (
      <div id="builder" className="scroll-mt-24">
        <SuccessCard
          result={result}
          onReset={() => {
            reset();
            packageTouched.current = false;
          }}
        />
      </div>
    );
  }

  if (building) {
    return (
      <div id="builder" className="scroll-mt-24">
        <BuildProgress stage={stage} elapsedSeconds={elapsed} />
      </div>
    );
  }

  return (
    <section id="builder" className="surface-panel scroll-mt-24 p-5 sm:p-7">
      <header>
        <h2 className="text-lg font-semibold sm:text-xl">Configure your Android build</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Every build is generated live by the Web2APK service. Nothing here is simulated.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <Field
          id="websiteUrl"
          label="Website URL"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://yourwebsite.com"
          hint="The site your Android app will load."
          value={config.websiteUrl}
          onChange={update("websiteUrl")}
          error={errors.websiteUrl}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="appName"
            label="App Name"
            placeholder="Stream Account"
            hint="Shown on the device home screen."
            value={config.appName}
            onChange={update("appName")}
            error={errors.appName}
          />
          <Field
            id="packageName"
            label="Package Name"
            placeholder="com.frenytech.myapp"
            hint="Android format, e.g. com.company.app"
            autoCapitalize="none"
            spellCheck={false}
            value={config.packageName}
            onChange={update("packageName")}
            error={errors.packageName}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="versionName"
            label="Version Name"
            placeholder="1.0.0"
            value={config.versionName}
            onChange={update("versionName")}
            error={errors.versionName}
          />
          <Field
            id="versionCode"
            label="Version Code"
            inputMode="numeric"
            placeholder="1"
            hint="Whole number, increase on each release."
            value={config.versionCode}
            onChange={update("versionCode")}
            error={errors.versionCode}
          />
        </div>

        <IconUpload
          file={config.iconFile}
          error={errors.iconFile}
          onChange={(file, error) => {
            setConfig((prev) => ({ ...prev, iconFile: file }));
            setErrors((prev) => ({ ...prev, iconFile: error }));
          }}
        />

        {failure && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground"
          >
            <p className="font-medium">Build not completed</p>
            <p className="mt-1 text-muted-foreground">{failure}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-44">
            Build APK
          </Button>
          <p className="text-xs text-muted-foreground">
            Builds typically take 1–3 minutes. Please keep this tab open.
          </p>
        </div>
      </form>
    </section>
  );
}
