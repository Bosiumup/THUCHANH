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

export default { checkAdmin, checkUser, checkAdminOrUser, checkNotLoggedIn };
