import pool from "../config/connectDB";

let modelGetGroupProduct = async () => {
    let [rows, fields] = await pool.query("SELECT * FROM nhom");
    return rows;
};
let modelGetAllProductByGroup = async (idnhom) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM sanpham WHERE idnhom = ?",
        [idnhom]
    );
    return rows;
};

let modelGetProductById = async (masp) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM sanpham WHERE masp = ?",
        [masp]
    );
    return rows[0];
};

export default {
    modelGetGroupProduct,
    modelGetAllProductByGroup,
    modelGetProductById,
};
