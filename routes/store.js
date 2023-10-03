import express from "express";

import storeController from "../controllers/store.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", storeController.getHomePage);

router.get("/books", storeController.getBooks);

router.get("/books/:bookId", storeController.getBookDetail);

router.get("/cart", isAuth, storeController.getCart);

export default router;
