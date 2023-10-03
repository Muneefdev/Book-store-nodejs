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

	createBook(title, author, category, price, description, imageUrl, userId) {
		return prismadb.book.create({
			data: {
				userId,
				title,
				author,
				price,
				category,
				description,
				imageUrl,
			},
		});
	},

	updateBook(title, author, category, price, description, bookId) {
		return prismadb.book.update({
			where: {
				id: bookId,
			},
			data: {
				title,
				author,
				category,
				price,
				description,
			},
		});
	},

	deleteBook(bookId) {
		return prismadb.book.delete({
			where: {
				id: bookId,
			},
		});
	},
};

export default Book;
