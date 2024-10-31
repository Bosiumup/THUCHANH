// authRoutes.js
import express from "express";
import authController from "../controllers/authController";

const router = express.Router();
const authRoutes = (app) => {
    router.get("/login", authController.loginGet);
    router.get("/logout", authController.logout);

    router.post("/loginPost", authController.loginPost);

    app.use(router);
};
export default authRoutes;
