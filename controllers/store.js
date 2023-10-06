import Book from "../models/book.js";
import Cart from "../models/cart.js";
import stripe from "../utils/stripe.js";

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

async function getCheckout(req, res, next) {
	try {
		const userId = req.session.user.id;
		const books = await Cart.getCartItems(userId);

		let total = 0;
		books.forEach((book) => {
			total += parseInt(book.price);
		});

		let session = stripe.checkout.sessions.create({
			line_items: books.map((book) => {
				return {
					price_data: {
						currency: "usd",
						unit_amount: book.price * 100,
						product_data: {
							name: book.title,
							description: book.description,
						},
					},
					quantity: 1,
				};
			}),
			mode: "payment",
			success_url:
				req.protocol + "://" + req.get("host") + "/checkout/success",
			cancel_url:
				req.protocol + "://" + req.get("host") + "/checkout/cancel",
		});

		res.render("checkout", {
			path: "/checkout",
			total,
			sessionId: session.id,
		});
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
	getCheckout,
};
