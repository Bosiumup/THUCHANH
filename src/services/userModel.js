import pool from "../config/connectDB";
import bcrypt from "bcryptjs";
import User from "../models/User";

let authUser = async (username, password) => {
    let user = await getUsername(username);
    if (!user) {
        return { success: false, errMessage: "Tài khoản không tồn tại." };
    }
    let match = await bcrypt.compare(password, user.password);
    if (match) {
        delete user.password;
        return { success: true, user: user };
    } else {
        return { success: false, errMessage: "Mật khẩu không đúng." };
    }
};

let modelGetAllUser = async () => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM users WHERE role = 'user'"
    );
    return rows;
};

// let getUsername = async (username) => {
//     let [rows, fields] = await pool.query(
//         "SELECT * FROM users WHERE username = ?",
//         [username]
//     );
//     return rows.length > 0 ? rows[0] : null;
// };

// sequelize get username
let getUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

let modelHashPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
};

let modelCreateNewUser = async (username, password) => {
    let checkUsername = await getUsername(username);
    if (checkUsername) {
        return false;
    }
    let hashPassword = await modelHashPassword(password);

    // return await pool.query(
    //     "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    //     [username, hashPassword, "user"]
    // );

    // sequelize create
    return await User.create({
        username: username,
        password: hashPassword,
        fullname: "",
        address: "",
        email: "",
        role: "user",
    });
};

// let modelDeleteUserById = async (id) => {
//     return await pool.query("DELETE FROM users WHERE id = ?", [id]);
// };

// sequelize delete
let modelDeleteUserById = async (id) => {
    return await User.destroy({
        where: {
            id: id,
        },
    });
};

let modelGetUserById = async (id) => {
    let [rows, fields] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
    ]);
    return rows[0];
};

let modelUpdateUserById = async (id, fullname, address, email) => {
    return await pool.query(
        "UPDATE users SET fullname = ?, address = ?, email = ? WHERE id = ?",
        [fullname, address, email, id]
    );
};

export default {
    modelGetAllUser,
    modelCreateNewUser,
    modelDeleteUserById,
    modelGetUserById,
    modelUpdateUserById,
    getUsername,
    authUser,
};
