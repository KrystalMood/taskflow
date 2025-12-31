import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters long")
    .max(200, "Title must be at most 200 characters long"),
  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters long")
    .optional()
    .or(z.literal("")),
  projectId: z.string().cuid("Invalid project"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.coerce.date().optional().or(z.literal("")),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]).optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
