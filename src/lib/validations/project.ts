import z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters long")
    .optional()
    .or(z.literal("")),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color")
    .default("#6366f1"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial().extend({
  status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED"]).optional(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
