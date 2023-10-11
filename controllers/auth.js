import User from "../models/user.js";
import Cart from "../models/cart.js";

import bcryptjs from "bcryptjs";

function getLogin(req, res) {
	res.render("login", {
		path: "/auth/login",
	});
}

async function getLogout(req, res, next) {
	try {
		await req.session.destroy();

		res.redirect("/auth/login");
	} catch (error) {
		next(error);
	}
}

function getSignup(req, res) {
	res.render("signup", {
		path: "/auth/signup",
	});
}

async function postLogin(req, res, next) {
	const { email, password } = req.body;

	try {
		const existingUser = await User.getUserByEmail(email);

		if (!existingUser) {
			return res.redirect("/auth/login");
		}

		const isMatch = await bcryptjs.compare(password, existingUser.password);

		if (!isMatch) {
			return res.redirect("/auth/login");
		}

		req.session.isLoggedIn = true;
		req.session.user = existingUser;
		await req.session.save();

		res.redirect("/");
	} catch (error) {
		console.log(error);
		next(error);
	}
}

async function postSignup(req, res, next) {
	try {
		const { email, password, name } = req.body;

		const existUser = await User.getUserByEmail(email);

		if (existUser) {
			return res.redirect("/auth/signup");
		}

		//hash password
		const hashedPassword = await bcryptjs.hash(password, 12);

		const newUser = {
			email,
			password: hashedPassword,
			name,
		};

		const createdUser = await User.createUser(newUser); // create user
		Cart.createCartForUser(createdUser.id); // create cart for the user

		res.redirect("/auth/login");
	} catch (error) {
		next(error);
	}
}

export default {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getLogout,
};
