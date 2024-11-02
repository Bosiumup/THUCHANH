let contactController = (req, res) => {
    return res.render("contact", { session: req.session.user });
};

export default contactController;
