// authController.js
import authModel from "../services/authModel";
let loginGet = (req, res) => {
    res.render("login");
};

let loginPost = async (req, res) => {
    let { username, password } = req.body;
    let user = await authModel.findUser(username, password);
    consosle.log("check user:", user);
    // if (user.role === "admin") {
    //     req.session.user = user;
    //     res.redirect("/dashboard");
    // } else {
    //     req.session.user = user;
    //     res.redirect("/");
    // }
};

let logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

export default { loginGet, loginPost, logout };
