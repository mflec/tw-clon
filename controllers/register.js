const { User } = require('../db');

const postregister = async (req, res) => {
    const { username, name, password } = req.body;
    const exists = await User.findOne({ where: { username: username } })
    if (!exists) {
        const user = {
            id: username,
            username,
            name,
            password
        }
        await User.create(user)
        return res.redirect('/');
    }
    return res.render('register', { exist: true })
}

const getregister = (req, res) => {
    res.render('register', { exist: false })
}

module.exports = { postregister , getregister}