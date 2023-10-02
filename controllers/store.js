import Book from "../models/book.js";

function getHomePage(req, res, next) {
	try {
		res.render("home", {
			path: "/",
			imageUrl: null,
		});
	} catch (error) {
		next(error);
	}
}

async function getBooks(req, res, next) {
	try {
		const books = await Book.getAllBooks();

		res.render("books", {
			path: "/books",
			books: books,
		});
	} catch (error) {
		next(error);
	}
}

function getCart(req, res, next) {
	res.render("cart", {
		path: "/cart",
		books: [],
	});
}

async function getBookById(req, res, next) {
	const bookId = req.params.bookId;
	const existingBook = await Book.getBookById(bookId);

	console.log(existingBook);

	res.render("book-detail", {
		path: "/books",
		book: existingBook,
	});
}

export default {
	getHomePage,
	getBooks,
	getBookById,
	getCart,
};
