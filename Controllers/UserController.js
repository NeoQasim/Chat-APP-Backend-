const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const checkName = await userModel.findOne({ name })
        if (checkName) {
            return res.json({ error: " user name already exists", status: false })
        }
        const checkEmail = await userModel.findOne({ email })
        if (checkEmail) {
            return res.json({ error: " user name already exists", status: false })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const authenticatedUser = await userModel.create({
            name, email, password: hashedPassword
        })
        delete authenticatedUser.password
        return res.json({ status: true, authenticatedUser })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.json({ error: 'please enter all the fields' })
        }

        const authenticatedUser = await userModel.findOne({ email });
        if (!authenticatedUser) {
            res.json({ error: "no user found" })
        }
        const compare = await bcrypt.compare(password, authenticatedUser.password)
        if (!compare) {
            res.json({ error: "chaeck password again" })
        }
        delete authenticatedUser.password
        return res.json({ status: true, authenticatedUser })



    } catch (error) {

        next(error)
    }
}



const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userModel.find({ _id: { $ne: req.params.id } }).select([
            "name",
            "email",
            "avatarImage",
            "_id"
        ])
        return res.json(allUsers);

    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, getAllUsers }