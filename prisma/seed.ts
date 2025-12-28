import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not found in environment variables");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleaned existing data!");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@taskflow.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@taskflow.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Created admin user: ${admin.email}`);

  const demoPassword = await bcrypt.hash("demo123", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@taskflow.com" },
    update: {},
    create: {
      name: "Demo",
      email: "demo@taskflow.com",
      password: demoPassword,
      role: "USER",
    },
  });

  console.log(`Created demo user: ${demoUser.email}`);

  const project = await prisma.project.create({
    data: {
      name: "My First Project",
      description: "Sample project to get started with TaskFlow",
      color: "#6366f1",
      userId: demoUser.id,
    },
  });

  console.log(`Created project: ${project.name}`);

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Welcome to TaskFlow!",
        description: "This is your first task.",
        status: "TODO",
        priority: "LOW",
        projectId: project.id,
        userId: demoUser.id,
      },
      {
        title: "Create your first project",
        description: "Click the + button to create a new project.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        projectId: project.id,
        userId: demoUser.id,
      },
      {
        title: "Explore the dashboard",
        description: "Check out the analytics.",
        status: "DONE",
        priority: "HIGH",
        projectId: project.id,
        userId: demoUser.id,
      },
    ],
  });
  console.log(`✅ Created ${tasks.count} sample tasks`);
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding Failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
