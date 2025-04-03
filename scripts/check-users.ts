const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    console.log("Users in database:");
    console.table(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
