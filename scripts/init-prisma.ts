import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

async function main() {
  try {
    // Generate Prisma Client
    console.log("Generating Prisma Client...");
    execSync("bunx prisma generate", { stdio: "inherit" });

    // Push schema to database
    console.log("Pushing schema to database...");
    execSync("bunx prisma db push", { stdio: "inherit" });

    // Initialize Prisma Client
    const prisma = new PrismaClient();

    // Test connection
    await prisma.$connect();
    console.log("Successfully connected to database");

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error initializing Prisma:", error);
    process.exit(1);
  }
}

main();
