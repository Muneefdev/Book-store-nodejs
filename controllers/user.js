import Book from "../models/book.js";
import { s3upload } from "../utils/s3Service.js";

function getAddBook(req, res, next) {
	res.render("add-book", {
		path: "/user/add-book",
		editMode: false,
	});
}

async function postAddBook(req, res, next) {
	try {
		const { title, author, category, description, price } = req.body;
		const user = req.session.user;

		const file = req.file;
		const imageUrl = await s3upload(file);

		await Book.createBook(
			title,
			author,
			category,
			price,
			description,
			imageUrl,
			user.id
		);

		res.redirect("/books");
	} catch (error) {
		next(error);
	}
}

async function getEditBook(req, res, next) {
	try {
		const bookId = req.query.bookId;
		const existingBook = await Book.getBookById(bookId);

		res.render("edit-book", {
			book: existingBook,
			path: "/user/edit-book",
		});
	} catch (error) {
		next(error);
	}
}

async function postEditBook(req, res, next) {
	try {
		const { title, author, category, price, description } = req.body;
		const bookId = req.params.bookId;
		console.log({
			title,
			author,
			category,
			price,
			description,
			bookId,
		});
		await Book.updateBook(
			title,
			author,
			category,
			price,
			description,
			bookId
		);

		res.redirect("/books");
	} catch (error) {
		next(error);
	}
}

export default {
	getAddBook,
	postAddBook,
	postEditBook,
	getEditBook,
};
