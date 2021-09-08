const getindex = (req, res) => {
    const { userId } = req.session;
    if (userId) return res.redirect('/home');
    res.render('index');
}

module.exports = {
    getindex
}