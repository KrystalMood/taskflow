import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const BUCKETS = {
  AVATARS: "avatars",
} as const;

type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS];

export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File
): Promise<{ url: string } | { message: string }> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    return { message: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return { url: publicUrl };
}

export async function deleteFile(
  bucket: BucketName,
  path: string
): Promise<{ success: boolean } | { message: string }> {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("Delete error:", error);
    return { message: error.message };
  }

  return { success: true };
}
