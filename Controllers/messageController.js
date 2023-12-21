const messageModel = require("../models/messageModel")

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })

        if (data) {
            return res.json({
                msg: `message ${message} added successfully`
            })
        } else {
            return res.json({
                msg: `failed to add ${message}`
            })

        }
    } catch (error) {
        res.json({ error: "failed to send message", error })
    }
}
const getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log("from:", from);
        console.log("to:", to);

        const allMessages = await messageModel.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });

        const projectedMessages = allMessages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message && msg.message.text
            };
        });

        console.log("projectedMessages:", projectedMessages);

        if (projectedMessages.length > 0) {
            res.json(projectedMessages);
        } else {
            res.json([])
        }
    } catch (error) {
        console.error("Error in getting messages:", error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

module.exports = { addMessage, getMessage }
