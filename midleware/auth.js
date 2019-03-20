const {verify} = require('../utils/jwt');
const User = require('../models/user');

async function auth(token) {
    // console.log({token})
    var email = await verify(token);
    // console.log(email)
    var user = await User.findOne({email: email.email})
    return user._id;
}

module.exports = {
    auth,
}