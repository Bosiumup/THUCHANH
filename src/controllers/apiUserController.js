import userModel from "../services/userModel";

let apiDetailUserGet = async (req, res) => {
    let id = req.params.id;
    try {
        let dataUser = await userModel.modelGetUserById(id);
        if (dataUser) {
            return res.json({
                success: true,
                errCode: 1,
                user: dataUser,
            });
        } else {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: "Không tìm thấy người dùng.",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi truy vấn dữ liệu người dùng.",
        });
    }
};

let apiLoginPost = async (req, res) => {
    let { username, password } = req.body;
    try {
        let result = await userModel.authUser(username, password);
        if (result.success) {
            let user = result.user;
            req.session.user = user;
            return res.json({
                success: true,
                errCode: 1,
                message:
                    user.role === "admin"
                        ? "Đăng nhập thành công với quyền admin."
                        : "Đăng nhập thành công với quyền user.",
                user,
            });
        } else {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: result.errMessage,
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi đăng nhập.",
        });
    }
};

let apiLogoutPost = (req, res) => {
    req.session.destroy();
    return res.json({
        success: true,
        errCode: 1,
        message: "Đã đăng xuất thành công.",
    });
};

let apiGetAllUser = async (req, res) => {
    try {
        let users = await userModel.modelGetAllUser();
        return res.json({
            success: true,
            errCode: 1,
            users: users,
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi lấy danh sách người dùng.",
        });
    }
};

let apiCreateNewUser = async (req, res) => {
    let { username, password } = req.body;
    try {
        let created = await userModel.modelCreateNewUser(username, password);
        if (!created) {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: "Tài khoản đã có sẵn.",
            });
        } else {
            return res.json({
                success: true,
                errCode: 1,
                message: "Tạo người dùng thành công.",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi tạo tài khoản.",
        });
    }
};

let apiDeleteUserById = async (req, res) => {
    let { userId } = req.body;
    try {
        await userModel.modelDeleteUserById(userId);
        return res.json({
            success: true,
            errCode: 1,
            message: "Xóa người dùng thành công.",
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi xóa người dùng.",
        });
    }
};

let apiUpdateUserById = async (req, res) => {
    let { id, fullname, address, email } = req.body;
    try {
        await userModel.modelUpdateUserById(id, fullname, address, email);
        return res.json({
            success: true,
            errCode: 1,
            message: "Cập nhật người dùng thành công.",
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi cập nhật người dùng.",
        });
    }
};

export default {
    apiDetailUserGet,
    apiLoginPost,
    apiLogoutPost,
    apiGetAllUser,
    apiCreateNewUser,
    apiDeleteUserById,
    apiUpdateUserById,
};
