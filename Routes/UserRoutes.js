// UserRoutes.js
const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../Controllers/UserController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/allusers/:id", getAllUsers)

module.exports = router;
