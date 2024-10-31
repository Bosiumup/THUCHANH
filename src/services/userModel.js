import pool from "../config/connectDB";
import bcrypt from "bcryptjs";

let modelGetAllUser = async () => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM users WHERE role = 'user'"
    );
    // trả về kết quả
    return rows;
};

let modelCreateNewUser = async (username, password, fullname, address) => {
    let checkUsername = await getUsername(username);
    if (checkUsername.length > 0) {
        return false;
    }
    let hashPassword = await modelHashPassword(password);
    return await pool.query(
        "INSERT INTO users (username, password, fullname, address) VALUES (?, ?, ?, ?)",
        [username, hashPassword, fullname, address]
    );
};

let getUsername = async (username) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows;
};

let salt = bcrypt.genSaltSync(10);
let modelHashPassword = async (password) => {
    return await bcrypt.hashSync(password, salt);
};

let modelDeleteUserById = async (id) => {
    return await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

let modelGetUserById = async (id) => {
    let [rows, fields] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
    ]);
    return rows[0];
};

let modelUpdateUserById = async (id, fullname, address) => {
    return await pool.query(
        "UPDATE users SET fullname = ?, address = ? WHERE id = ?",
        [fullname, address, id]
    );
};

export default {
    modelGetAllUser,
    modelCreateNewUser,
    modelDeleteUserById,
    modelGetUserById,
    modelUpdateUserById,
};
