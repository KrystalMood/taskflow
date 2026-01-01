export const FILE_CONFIG = {
  avatar: {
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  },
} as const;

export type FileType = keyof typeof FILE_CONFIG;

export interface FileValidationResult {
  success: boolean;
  message?: string;
}

export function validateFile(file: File, type: FileType): FileValidationResult {
  const config = FILE_CONFIG[type];

  if (file.size > config.maxSize) {
    const maxMB = config.maxSize / 1024 / 1024;
    return {
      success: false,
      message: `File size must be less than ${maxMB} MB`,
    };
  }

  if (!config.allowedTypes.includes(file.type as never)) {
    return {
      success: false,
      message: `File type must be one of ${config.allowedTypes.join(", ")}`,
    };
  }

  return { success: true };
}
