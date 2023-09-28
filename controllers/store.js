function getHomePage(req, res, next) {
	res.render("home", {
		path: "/",
	});
}

function getBooks(req, res, next) {}

function getBookById(req, res, next) {}

export default {
	getHomePage,
	getBooks,
	getBookById,
};
