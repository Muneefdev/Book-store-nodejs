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

router.get("/add-book", userController.getAddBook);

router.post("/add-book", upload.single("image"), userController.postAddBook);

router.get("/edit-book", userController.getEditBook);

router.post("/edit-book/:bookId", userController.postEditBook);

router.post("/delete-book", () => {});

export default router;
