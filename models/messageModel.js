const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    message: {
        text: {
            type: String, 
            required: true,
        }
    },
    users: {
        type: Array,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },


}, {
    timestamps: true
})
const messageModel = messageSchema
module.exports = mongoose.model("Messages", messageModel)