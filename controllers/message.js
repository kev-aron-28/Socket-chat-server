const Message = require('../models/message');

const getMessages = async (req = request, res = response) => {
    try {
        const { from, to } = req.query
        const messages = await Message.find({ chatIds : { $all : [from, to] }})
        if(!messages) { 
            return res.json({
                messages: []
            })
        }
        return res.json({ messages })
    } catch (error) {
        return res.status(500).json({ 
            error
        })
    }
}

module.exports = {
    getMessages
}