// seed/seed.js
import prismadb from "../../utils/prismadb.js";

async function seed() {
	try {
		// Seed data
		const usersToSeed = [
			{
				email: "alice@example.com",
				name: "Alice",
				password: "alice123",
			},
			{
				email: "bob@example.com",
				name: "Bob",
				password: "bob456",
			},
			// Add more users as needed
		];

		// Insert data using Prisma Client
		for (const userData of usersToSeed) {
			await prismadb.user.create({
				data: userData,
			});
		}

		console.log("Seed data inserted successfully.");
	} catch (error) {
		console.error("Error seeding data:", error);
	}
}
seed();
