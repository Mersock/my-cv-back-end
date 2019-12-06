const User = require('../models/users')


exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
}