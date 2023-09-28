function getAddBook(req, res, next) {
	res.render("add-book", {
		path: "/user/add-book",
	});
}

function postAddBook(req, res, next) {
	const { title, author, image } = req.body;
	console.log({ title, author, image });

	res.redirect("/");
}

export default {
	getAddBook,
	postAddBook,
};
