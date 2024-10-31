function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
}

function checkUser(req, res, next) {
    if (
        req.session.user &&
        (req.session.user.role === "user" || req.session.user.role === "admin")
    ) {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
}

export { checkAuth, checkAdmin, checkUser };
