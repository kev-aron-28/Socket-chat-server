const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { request, response } = require('express');
const { generateJWT } = require('../helpers/generateJWT');


const getUserById = async (req = request, res = response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        return res.json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


const createUser = async (req = request, res = response) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user._id);
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, password } = req.body;
    const user = { name };
    if(password){
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user);
        res.json({
            user:updatedUser
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong',
            error
        })
    }
}

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(id, {
            status: false
        })    
        res.json({
            msg: 'User deleted'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong',
        })
    }
    
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
}