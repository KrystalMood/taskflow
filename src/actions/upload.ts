"use server";

import { prisma, requireAuth } from "@/lib";
import { BUCKETS, deleteFile, uploadFile } from "@/lib/storage";
import { validateFile } from "@/lib/validations/file";
import { revalidatePath } from "next/cache";

interface UploadResult {
  success?: boolean;
  url?: string;
  message?: string;
}

export async function uploadAvatar(formData: FormData): Promise<UploadResult> {
  const session = await requireAuth();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { message: "No file provided" };
  }

  const validation = validateFile(file, "avatar");
  if (!validation.success) {
    return {
      message: validation.message,
    };
  }

  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${session.user.id}/${Date.now()}.${extension}`;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      image: true,
    },
  });

  const result = await uploadFile(BUCKETS.AVATARS, filename, file);
  if ("message" in result) {
    return {
      message: result.message,
    };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: result.url },
  });

  if (user?.image?.includes(BUCKETS.AVATARS)) {
    try {
      const oldPath = user.image.split(`${BUCKETS.AVATARS}/`)[1];
      if (oldPath) {
        await deleteFile(BUCKETS.AVATARS, oldPath);
      }
    } catch {}
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");

  return {
    success: true,
    url: result.url,
  };
}

export async function removeAvatar(): Promise<UploadResult> {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      image: true,
    },
  });

  if (user?.image?.includes(BUCKETS.AVATARS)) {
    const path = user.image.split(`${BUCKETS.AVATARS}/`)[1];
    if (path) {
      await deleteFile(BUCKETS.AVATARS, path);
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: null },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}
