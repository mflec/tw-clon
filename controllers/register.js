const { User } = require('../db');

const postregister = async (req, res) => {
    const { username, name, password } = req.body;
    try {
        const exists = await User.findOne({ where: { username: username } })
        console.log('pasa2')
        if (!exists) {
            const user = {
                id: username,
                username,
                name,
                password
            }
            console.log('pasa3')
            await User.create(user)
            console.log('pasa4')
            return res.redirect('/');
        }
        return res.render('register', { exist: true })
    } catch (err) { 
        console.log(err) 
    }
}

const getregister = (req, res) => {
    res.render('register', { exist: false })
}

module.exports = { postregister, getregister }