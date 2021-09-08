const { Tweet, User } = require('../db');

const gettweets = async (req, res) => {
    const {username} = req.query
    const user = await User.findByPk( username.toUpperCase() , { include: [Tweet] });
    const tweets = user.tweets
    return res.render('user', { data: tweets, username: username })
}

module.exports = { gettweets }