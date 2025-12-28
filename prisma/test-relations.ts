import { prisma } from "@/lib";

async function main() {
  console.log("Showing user with projects...");
  const userWithProjects = await prisma.user.findFirst({
    where: { email: "demo@taskflow.com" },
    include: { projects: true },
  });

  console.log(JSON.stringify(userWithProjects, null, 2));

  console.log("Showing user with projects and tasks...");
  const userWithAll = await prisma.user.findFirst({
    where: { email: "demo@taskflow.com" },
    include: {
      projects: {
        include: {
          tasks: true,
        },
      },
    },
  });
  console.log(JSON.stringify(userWithAll, null, 2));

  console.log("Showing user with select...");
  const userSelected = await prisma.user.findFirst({
    where: { email: "demo@taskflow.com" },
    select: {
      name: true,
      email: true,
      projects: {
        select: {
          name: true,
          _count: {
            select: { tasks: true },
          },
        },
      },
    },
  });
  console.log(JSON.stringify(userSelected, null, 2));
}

async function testNestedCreate() {
  console.log("Nested Create: Project with Tasks");

  const user = await prisma.user.findFirst({
    where: { email: "demo@taskflow.com" },
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  const newProject = await prisma.project.create({
    data: {
      name: "Nested Create Project",
      description: "Created with nested tasks",
      color: "#10b981",
      user: { connect: { id: user.id } },
      tasks: {
        create: [
          {
            title: "Nested Task 1",
            description: "First task created with project",
            priority: "HIGH",
            userId: user.id,
          },
          {
            title: "Nested Task 2",
            description: "Second task created with project",
            priority: "MEDIUM",
            userId: user.id,
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });

  console.log(JSON.stringify(newProject, null, 2));
}

async function testNestedUpdate() {
  console.log("Nested Update");

  const project = await prisma.project.findFirst({
    where: { name: "Nested Create Project" },
    include: { tasks: true },
  });

  if (!project) {
    console.log("Project not found!");
    return;
  }

  const updated = await prisma.project.update({
    where: { id: project.id },
    data: {
      name: "Updated Project Name",
      tasks: {
        updateMany: {
          where: { status: "TODO" },
          data: { status: "DONE" },
        },
      },
    },
    include: { tasks: true },
  });

  console.log(JSON.stringify(updated, null, 2));
}

async function testCount() {
  console.log("Counting relations..");

  const usersWithCounts = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      _count: {
        select: {
          projects: true,
          tasks: true,
        },
      },
    },
  });

  console.log(JSON.stringify(usersWithCounts, null, 2));
}

async function testFilteredRelations() {
  console.log("Filtering relations...");

  const user = await prisma.user.findFirst({
    where: { email: "demo@taskflow.com" },
    include: {
      projects: {
        where: { status: "ACTIVE" },
        include: {
          tasks: {
            where: { status: "TODO" },
            orderBy: { priority: "desc" },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(user, null, 2));
}

async function cleanup() {
  console.log("Cleanup");

  const deleted = await prisma.project.deleteMany({
    where: { name: "Update Project Name" },
  });

  console.log("Deleted projects:", deleted.count);
}

main()
  .then(() => testNestedCreate())
  .then(() => testNestedUpdate())
  .then(() => testCount())
  .then(() => testFilteredRelations())
  .then(() => cleanup())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
