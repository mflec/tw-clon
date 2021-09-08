const { User } = require('../db');

const postlogin = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        const user = await User.findOne({ where: { username: username } });
        if (user && password == user.password) {
            req.session.userId = user.id;
            userInLine = username
            return res.redirect('/home');
        }
    }

    res.render('login', { incorrect: true })
}

const getlogin = (req, res) => {
    res.render('login', { incorrect: false })
}

module.exports = { postlogin , getlogin}