import prismadb from "../utils/prismadb.js";

const Cart = {
	async createCartForUser(userId) {
		const newCart = await prismadb.cart.create({
			data: {
				userId,
			},
		});

		await prismadb.user.update({
			where: {
				id: userId,
			},
			data: {
				cart: {
					connect: {
						id: newCart.id,
					},
				},
			},
		});
	},

	addItemToCart(userId, bookId) {
		return prismadb.cart.update({
			where: {
				userId,
			},
			data: {
				items: {
					connect: {
						id: bookId,
					},
				},
			},
		});
	},

	async getCartItems(userId) {
		const cart = await prismadb.cart.findUnique({
			where: {
				userId,
			},
			include: {
				items: true,
			},
		});

		return cart.items;
	},

	async clearCart(userId) {
		const cart = await prismadb.cart.findUnique({
			where: {
				userId,
			},
			include: {
				items: true,
			},
		});

		const itemIds = cart.items.map((item) => ({ id: item.id }));

		await prismadb.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				items: {
					disconnect: itemIds,
				},
			},
		});
	},
};

export default Cart;
