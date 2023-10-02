import path from "path";

import express from "express";
import session from "express-session";

import storeRoutes from "./routes/store.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
const publicDirectory = path.join(process.cwd(), "public");
app.use(express.static(publicDirectory)); // to serve static files

app.use(
	session({
		secret: "bb022a137b88f528aefa4804311ee61c",
		resave: false,
		saveUninitialized: false,
	})
);

/**
 * middleware to pass isAuthenticated and errorMessage to all views
 */
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	next();
});

app.use(storeRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// 404 page
app.use((req, res, next) => {
	res.render("404", {
		path: "/404",
	});
});

app.use((error, req, res, next) => {
	const message = error.message;
	// console.log(error);
	console.log(message);

	res.render("500", {
		path: "/500",
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
