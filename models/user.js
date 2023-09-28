import prismadb from "../utils/prismadb.js";

const User = {
	createUser(user) {
		return prismadb.user.create({
			data: {
				email: user.email,
				password: user.password,
				name: user.name,
			},
		});
	},

	getUserByEmail(email) {
		return prismadb.user.findUnique({
			where: {
				email,
			},
		});
	},

	getUserByEmailAndPassword(email, password) {
		return prismadb.user.findUnique({
			where: {
				email,
				password,
			},
		});
	},
};

export default User;
