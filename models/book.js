import prismadb from "../utils/prismadb";

const Book = {
	getAllBooks() {
		return prismadb.book.findMany();
	},

	getBookById(id) {
		return prismadb.book.findUnique({
			where: {
				id: parseInt(id),
			},
		});
	},
};

export default Book;
