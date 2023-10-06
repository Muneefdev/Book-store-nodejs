import express from "express";

import storeController from "../controllers/store.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", storeController.getHomePage);

router.get("/books", storeController.getBooks);

router.get("/books/:bookId", isAuth, storeController.getBookDetail);

router.get("/cart", isAuth, storeController.getCart);

router.get("/add-to-cart/:bookId", isAuth, storeController.postAddToCart);

router.get("/clear-cart", isAuth, storeController.getClearCart);

router.get("/checkout", isAuth, storeController.getCheckout);

export default router;
