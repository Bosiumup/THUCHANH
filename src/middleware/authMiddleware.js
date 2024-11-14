import jwt from "jsonwebtoken";

let jwtAuthMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            res.status(401).json({ message: "Token không hợp lệ" });
        }
    } else {
        res.status(401).json({ message: "Không tìm thấy token" });
    }
};

let verifyToken = (token) => {
    let secretKey = "mySecretKey"; // Thay thế bằng khóa bí mật của bạn
    try {
        let decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

let checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        return res.redirect("/login");
    }
};

let checkUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === "user") {
        next();
    } else {
        return res.redirect("/login");
    }
};

let checkAdminOrUser = (req, res, next) => {
    if (
        req.session.user &&
        (req.session.user.role === "admin" || req.session.user.role === "user")
    ) {
        next();
    } else {
        return res.redirect("/login");
    }
};

let checkNotLoggedIn = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        return res.redirect("/dashboard");
    }
    if (req.session.user && req.session.user.role === "user") {
        return res.redirect("/");
    }
    next();
};

export default {
    jwtAuthMiddleware,
    checkAdmin,
    checkUser,
    checkAdminOrUser,
    checkNotLoggedIn,
};
