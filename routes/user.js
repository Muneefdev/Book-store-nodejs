import express from "express";

import multer from "multer";

import userController from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

/**
 * Multer config for image upload
 */

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

/**
 * Store routes
 */

router.get("/add-book", isAuth, userController.getAddBook);

router.post("/add-book", isAuth, upload.single("image"), userController.postAddBook);

router.get("/edit-book", isAuth, userController.getEditBook);

router.post("/edit-book/:bookId", isAuth, userController.postEditBook);

router.get("/delete-book/:bookId", isAuth, userController.getDeleteBook);

export default router;
