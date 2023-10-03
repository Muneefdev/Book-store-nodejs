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

async function getBookDetail(req, res, next) {
	const bookId = req.params.bookId;
	const existingBook = await Book.getBookById(bookId);

	res.render("book-detail", {
		path: "/books",
		book: existingBook,
		userId: req.session.user ? req.session.user.id : null,
	});
}

export default {
	getHomePage,
	getBooks,
	getBookDetail,
	getCart,
};
