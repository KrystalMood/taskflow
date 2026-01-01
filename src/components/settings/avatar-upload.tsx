"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { FILE_CONFIG } from "@/lib/validations/file";
import { removeAvatar, uploadAvatar } from "@/actions/upload";
import { Button, Input } from "@/components/ui";

interface AvatarUploadProps {
  currentAvatar: string | null;
  userName: string;
}

export function AvatarUpload({ currentAvatar, userName }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setPreview(null);
      return;
    }

    const config = FILE_CONFIG.avatar;
    if (file.size > config.maxSize) {
      setError(`File must be less than ${config.maxSize / 1024 / 1024}MB`);
      return;
    }

    if (!config.allowedTypes.includes(file.type as never)) {
      setError(`Only ${config.allowedExtensions.join(", ")} files allowed`);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleUpload = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadAvatar(formData);

      if (result.message) {
        setError(result.message);
      } else {
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeAvatar();
      if (result.message) {
        setError(result.message);
      }
    });
  };

  const displayImage = preview || currentAvatar;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-brand-200 relative h-20 w-20 overflow-hidden rounded-full">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={userName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-brand-600 flex h-full w-full items-center justify-center text-xl font-medium">
              {initials}
            </div>
          )}
        </div>

        {/* Upload Control */}
        <div className="space-y-2">
          <Input
            ref={inputRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-input"
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
            >
              Choose File
            </Button>

            {preview && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleUpload}
                disabled={isPending}
              >
                {isPending ? "Uploading..." : "Upload"}
              </Button>
            )}

            {currentAvatar && !preview && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRemove}
                disabled={isPending}
              >
                Remove
              </Button>
            )}
          </div>

          <p className="text-brand-500 text-sm">JPG, PNG, WebP. Max 2MB.</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
