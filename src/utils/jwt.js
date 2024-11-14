import jwt from "jsonwebtoken";

let generateToken = (payload) => {
    let secretKey = "mySecretKey"; // Thay thế bằng khóa bí mật của bạn
    let token = jwt.sign(payload, secretKey);
    return token;
};

export default generateToken;
