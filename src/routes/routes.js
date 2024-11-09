import express from "express";
import homeController from "../controllers/HomeController";
import aboutController from "../controllers/AboutController";
import contactController from "../controllers/ContactController";
import userController from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

const initRoutes = (app) => {
    // -------------- Website routes
    router.get("/about", aboutController);
    router.get("/contact", contactController);

    // trang chủ
    router.get("/", homeController);
    // trang dashboard
    router.get(
        "/dashboard",
        authMiddleware.checkAdmin,
        userController.dashboardGet
    );
    // trang đăng nhập
    router.get(
        "/login",
        authMiddleware.checkNotLoggedIn,
        userController.loginGet
    );
    // trang đăng ký và tạo người dùng
    router.get(
        "/create-user",
        authMiddleware.checkAdminOrUser,
        userController.createUserGet
    );
    // trang sửa thông tin người dùng và cập nhật thông tin người dùng
    router.get(
        "/edit-user/:id",
        authMiddleware.checkAdminOrUser,
        userController.controllerEditUserById
    );
    // trả về danh sách tài khoản
    router.get("/list-user", userController.controllerGetAllUser);
    // trả về thông tin tài khoản cụ thể
    router.get(
        "/detail-user",
        authMiddleware.checkUser,
        userController.detailUserGet
    );
    // tạo tài khoản
    router.post("/create-new-user", userController.controllerCreateNewUser);
    // xóa tài khoản
    router.post(
        "/delete-user",
        authMiddleware.checkAdminOrUser,
        userController.controllerDeleteUserById
    );
    // sửa tài khoản
    router.post(
        "/update-user",
        authMiddleware.checkAdminOrUser,
        userController.controllerUpdateUserById
    );
    // đăng nhập
    router.post("/loginPost", userController.loginPost);
    // đăng xuất
    router.get(
        "/logout",
        authMiddleware.checkAdminOrUser,
        userController.logout
    );

    app.use("/", router);
};

export default initRoutes;
