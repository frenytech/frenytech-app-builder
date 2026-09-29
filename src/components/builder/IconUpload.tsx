import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/ft-button";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface IconUploadProps {
  file: File | null;
  error?: string | undefined;
  onChange: (file: File | null, error?: string) => void;
}

export function IconUpload({ file, error, onChange }: IconUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const chooseFile = () => inputRef.current?.click();

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      onChange(null, "Choose a PNG, JPG, JPEG, or WEBP image.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      onChange(null, "Icon must be 5 MB or smaller.");
      return;
    }
    onChange(selected);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">App Icon</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        aria-label="Choose app icon"
        onChange={handleFile}
      />

      {file && previewUrl ? (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center">
          <img
            src={previewUrl}
            alt="Selected app icon preview"
            width={72}
            height={72}
            className="h-18 w-18 shrink-0 rounded-2xl border border-border object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(0)} KB · Ready to use
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={chooseFile}>
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                Change Icon
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
                <Trash2 aria-hidden="true" className="h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={chooseFile}
          className="flex min-h-32 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-input bg-background px-4 py-6 text-center transition-colors hover:border-primary hover:bg-secondary/50"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
            <ImagePlus aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">Upload Icon</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              PNG, JPG, JPEG, or WEBP · 5 MB maximum
            </span>
          </span>
        </button>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}