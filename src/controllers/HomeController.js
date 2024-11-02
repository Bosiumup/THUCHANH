let homeController = (req, res) => {
    console.log("Session data user:", req.session.user);
    return res.render("home", { session: req.session.user });
};

export default homeController;
