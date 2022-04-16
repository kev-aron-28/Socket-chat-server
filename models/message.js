const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
    content: { type: String, require: true },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatIds: [ Schema.Types.ObjectId ],

    date: Date
});

module.exports = model('Message', MessageSchema);