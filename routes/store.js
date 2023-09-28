import express from "express";

import storeController from "../controllers/store.js";

const router = express.Router();

router.get("/", storeController.getHomePage);

router.get("/books", storeController.getBooks);

router.get("/books/:bookId", storeController.getBookById);

export default router;
