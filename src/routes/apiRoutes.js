import express from "express";
import apiUserController from "../controllers/apiUserController";
import apiProductController from "../controllers/apiProductController";

const router = express.Router();

const initApiRoutes = (app) => {
    // -------------- API routes

    // API người dùng

    // Đăng nhập
    router.post("/api/loginPost", apiUserController.apiLoginPost);
    // Đăng xuất
    router.get("/api/logoutPost", apiUserController.apiLogoutPost);
    // Trả về danh sách tài khoản
    router.get("/api/list-user", apiUserController.apiGetAllUser);
    // Trả về thông tin tài khoản cụ thể
    router.get("/api/detail-user/:id", apiUserController.apiDetailUserGet);
    // Tạo tài khoản
    router.post("/api/create-user", apiUserController.apiCreateNewUser);
    // Xóa tài khoản
    router.post("/api/delete-user", apiUserController.apiDeleteUserById);
    // Sửa tài khoản
    router.post("/api/update-user", apiUserController.apiUpdateUserById);

    // API sản phẩm

    // Hiển thị nhóm
    router.get("/api/groupProduct", apiProductController.apiGetGroupProduct);
    // Hiển thị danh sách các sản phẩm
    router.get("/api/listProduct", apiProductController.apiGetAllProduct);
    // Hiển thị chi tiết sản phẩm cụ thể
    router.get(
        "/api/detailProduct/:masp",
        apiProductController.apiGetDetailProduct
    );

    app.use("/", router);
};

export default initApiRoutes;
