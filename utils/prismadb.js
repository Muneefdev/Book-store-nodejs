// prisma.js
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prismadb = new PrismaClient();

// Don't forget to close the Prisma Client when your app shuts down
process.on("beforeExit", () => {
	prismadb.$disconnect();
});

export default prismadb; // Export the Prisma Client instance
