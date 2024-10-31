// authModel.js
import pool from "../config/connectDB";

let findUser = async (username, password) => {
    let [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    return rows.length > 0 ? rows[0] : null;
};

export default findUser;
