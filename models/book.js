import prismadb from "../utils/prismadb.js";

const Book = {
	getAllBooks() {
		return prismadb.book.findMany();
	},

	getBookById(id) {
		return prismadb.book.findFirst({
			where: {
				id: id,
			},
		});
	},

	createBook(title, author, category, description, imageUrl, userId) {
		return prismadb.book.create({
			data: {
				userId,
				title,
				author,
				category,
				description,
				imageUrl,
			},
		});
	},
};

export default Book;
