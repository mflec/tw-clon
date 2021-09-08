const { Tweet, User } = require('../db');
const { v4: uuidv4 } = require('uuid');

const posthome = async (req, res) => {
    const { content } = req.body;
    const username = req.session.userId
    try {
        const tweet = await Tweet.create({id: uuidv4(), content, username: req.session.userId })
        const user = await User.findOne({ where: { username: username } })
        await user.addTweets(tweet)
        return res.redirect('/home')
    } catch (error) {
        console.log(error)
        res.status(500).send('Upss 😥')
    }
}

const gethome = (req, res) => {
    Tweet.findAll()
        .then(tweets => { return res.render('home', { data: tweets }) })
}

module.exports = { posthome, gethome }