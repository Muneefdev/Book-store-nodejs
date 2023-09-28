import express from "express";

import authController from "../controllers/auth.js";

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/logout", authController.getLogout);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

export default router;
