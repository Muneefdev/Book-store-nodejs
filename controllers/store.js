import Book from "../models/book.js";
import Cart from "../models/cart.js";

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

async function getCart(req, res, next) {
	const userId = req.session.user.id;
	const books = await Cart.getCartItems(userId);

	res.render("cart", {
		path: "/cart",
		books,
	});
}

async function postAddToCart(req, res, next) {
	try {
		const bookId = req.params.bookId;
		const userId = req.session.user.id;

		// const book = await Book.getBookById(bookId);
		await Cart.addItemToCart(userId, bookId);

		const books = await Cart.getCartItems(userId);

		res.render("cart", {
			path: "/cart",
			books,
		});
	} catch (error) {
		next(error);
	}
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

async function getClearCart(req, res, next) {
	try {
		const userId = req.session.user.id;
		await Cart.clearCart(userId);

		res.redirect("/cart");
	} catch (error) {
		next(error);
	}
}

export default {
	getHomePage,
	getBooks,
	getBookDetail,
	getCart,
	postAddToCart,
	getClearCart,
};
