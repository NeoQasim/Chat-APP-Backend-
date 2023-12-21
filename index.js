const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config');
const UserRoutes = require('./Routes/UserRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const socket = require('socket.io');


const app = express()
require('dotenv').config();


app.use(cors())
app.use(express.json())

app.use("/api", UserRoutes)
app.use("/api/messages", messageRoutes)


connectDB()
const server = app.listen(process.env.PORT, () => {
    console.log(`app successfully running on ${process.env.PORT}`)
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});
const onlineUsers = new Map();

io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendmessage", (data) => {
        const recipientSocketId = onlineUsers.get(data.to);

        if (recipientSocketId) {
            // Emit the messagerecieved event to the recipient
            io.to(recipientSocketId).emit("messagerecieved", data.message);
        } else {
            console.log(`User ${data.to} is not online.`);
        }
    });

    socket.on("disconnect", () => {
        const userId = Array.from(onlineUsers.entries()).find(([key, value]) => value === socket.id)?.[0];
        if (userId) {
            onlineUsers.delete(userId);
        }
    });
});
