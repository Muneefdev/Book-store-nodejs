import express from "express";

import userController from "../controllers/user.js";

const router = express.Router();

router.get("/add-book", userController.getAddBook);

router.post("/add-book", userController.postAddBook);

router.post("/edit-book/:bookId", () => {});

router.post("/delete-book", () => {});

export default router;
