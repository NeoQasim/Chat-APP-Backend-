// messageRoutes.js
const express = require("express");
const router = express.Router();
// import { get } from "mongoose";
const { addMessage, getMessage } = require( "../Controllers/messageController")

router.post("/addmessage/", addMessage)
router.post("/getmessage/", getMessage)



module.exports = router;
