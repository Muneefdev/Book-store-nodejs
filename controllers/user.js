import Book from "../models/book.js";
import { s3upload } from "../utils/s3Service.js";

function getAddBook(req, res, next) {
	res.render("add-book", {
		path: "/user/add-book",
	});
}

async function postAddBook(req, res, next) {
	try {
		const { title, author, category, description } = req.body;
		const user = req.session.user;

		const file = req.file;
		const imageUrl = await s3upload(file);

		await Book.createBook(
			title,
			author,
			category,
			description,
			imageUrl,
			user.id
		);

		res.redirect("/books");
	} catch (error) {
		next(error);
	}
}

export default {
	getAddBook,
	postAddBook,
};
