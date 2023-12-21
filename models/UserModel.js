const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String, required: true, min: 3, max: 5, unique: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    password: {
        type: String, required: true, min: 3, max: 50, unique: true,
    },
    isimageAvatarSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
        // default: ""
    }

})
const userModel = userSchema
module.exports = mongoose.model("Users", userModel)