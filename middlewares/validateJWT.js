const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "You must provide an acces token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_JWT);
    const user = await User.findById(uid);
    if(!user) {
        return res.status(401).json({
            msg: 'User does not exist in db'
        })
    }
    req.user = user;
    if(!user.status) {
        return res.status(401).json({
            msg: 'Invalid token or user'
        })
    }
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
