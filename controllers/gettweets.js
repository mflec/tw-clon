const { Tweet } = require('../db');

const gettweets = (req, res) => {
    Tweet.findAll().then(tweets => req.json(tweets))
}

module.exports = { gettweets }