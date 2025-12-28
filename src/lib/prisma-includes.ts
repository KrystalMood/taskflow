export const taskBasicSelect = {
  id: true,
  title: true,
  description: true,
  priority: true,
  dueDate: true,
} as const;

export const projectWithTaskCount = {
  _count: {
    select: { tasks: true },
  },
} as const;

export const projectWithTasks = {
  tasks: {
    select: taskBasicSelect,
    orderBy: { createdAt: "desc" as const },
    take: 10,
  },
} as const;

export const userWithProjects = {
  projects: {
    where: { status: "ACTIVE" as const },
    include: projectWithTaskCount,
    orderBy: { createdAt: "desc" as const },
    take: 10,
  },
} as const;
