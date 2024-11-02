let aboutController = (req, res) => {
    return res.render("about", { session: req.session.user });
};

export default aboutController;
