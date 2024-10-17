import express from "express";
import homeController from "../controllers/HomeController";
import aboutController from "../controllers/AboutController";
import contactController from "../controllers/ContactController";
import userController from "../controllers/UserController";
const router = express.Router();

const initRoutes = (app) => {
    router.get("/", homeController);
    router.get("/about", aboutController);
    router.get("/contact", contactController);

    // User
    router.get("/list-user", userController.controllerGetAllUser);
    router.get("/create-user", (req, res) => {
        res.render("createUser", {
            title: "Tạo người dùng",
            errorMessage: null,
        });
    });
    // router.get("/edit-user/:id", userController.controllerEditUserById);

    router.post("/create-new-user", userController.controllerCreateNewUser);
    // router.post("/delete-user", userController.controllerDeleteUserById);
    // router.post("/update-user", userController.controllerUpdateUserById);

    app.use("/", router);
};

export default initRoutes;
