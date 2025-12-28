import { prisma } from "@/lib";

export async function getDashboardStats(userId: string) {
  const [projectCount, taskStats, recentTasks] = await Promise.all([
    prisma.project.count({
      where: { userId },
    }),

    prisma.task.groupBy({
      by: ["status"],
      where: { userId },
      _count: true,
    }),

    prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        project: {
          select: {
            name: true,
            color: true,
          },
        },
      },
    }),
  ]);

  const tasksByStatus = {
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0,
    CANCELLED: 0,
  };

  taskStats.forEach((stat) => {
    tasksByStatus[stat.status] = stat._count;
  });

  const totalTasks = Object.values(tasksByStatus).reduce((a, b) => a + b, 0);

  return {
    projectCount,
    tasksByStatus,
    totalTasks,
    recentTasks,
  };
}
