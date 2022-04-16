const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);