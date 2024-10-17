import userModel from "../services/userModel";

let controllerGetAllUser = async (req, res) => {
    let users = await userModel.modelGetAllUser();
    let message = req.query.message || null; // Lấy thông báo từ query string
    res.render("listUser", {
        data: {
            title: "Danh sách người dùng",
            users: users,
            successMessage: message, // Truyền thông báo vào template
        },
    });
};

let controllerCreateNewUser = async (req, res) => {
    let { username, password, fullname, address } = req.body;
    let created = await userModel.modelCreateNewUser(
        username,
        password,
        fullname,
        address
    );
    if (!created) {
        return res.render("createUser", {
            errorMessage: "Tài khoản đã có sẵn.",
            title: "Tạo người dùng",
        });
    }
    // Chuyển hướng với thông báo thành công
    return res.redirect("/list-user?message=Tạo người dùng thành công.");
};

// let controllerDeleteUserById = async (req, res) => {
//     let { userId } = req.body;
//     await userModel.modelDeleteUserById(userId);
//     // Chuyển hướng với thông báo thành công
//     return res.redirect("/list-user?message=Xóa người dùng thành công.");
// };

// let controllerEditUserById = async (req, res) => {
//     let { id } = req.params;
//     let dataUser = await userModel.modelGetUserById(id);
//     res.render("editUser", {
//         data: { title: "Cập nhật người dùng", user: dataUser },
//     });
// };

// let controllerUpdateUserById = async (req, res) => {
//     let { id, fullname, address } = req.body;
//     await userModel.modelUpdateUserById(id, fullname, address);
//     // Chuyển hướng với thông báo thành công
//     return res.redirect("/list-user?message=Cập nhật người dùng thành công.");
// };

export default {
    controllerGetAllUser,
    controllerCreateNewUser,
    // controllerDeleteUserById,
    // controllerEditUserById,
    // controllerUpdateUserById,
};
