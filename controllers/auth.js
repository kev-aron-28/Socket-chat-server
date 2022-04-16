const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/user') 

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                msg: `User with email ${email} does not exist`
            })
        }

        if(!user.status){
            return res.status(400).json({
                msg: 'The account does not exist'
            });
        }

        const validPassword = bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Password is incorrect'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong');
    }
}

const renovateJWT = async (req, res) => {
    const { user } = req;
    const token = await generateJWT(user.id)

    res.json({
        user,
        token
    })
}

module.exports = {
    login,
    renovateJWT
}