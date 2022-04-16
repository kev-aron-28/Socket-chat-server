const User = require('../models/user');

const emailExist = async (email = '') => {
    const findEmail = await User.findOne({ email });
    if(findEmail) {
        throw new Error('There is an existing user with this email ');
    }
}

const userByIdExists = async (id) => {
    const user = User.findById(id);
    if(!user) {
        throw new Error('The user does not exist');
    }
}

module.exports = {
    emailExist,
    userByIdExists
}