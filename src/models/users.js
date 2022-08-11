const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        min: 13,
        max: 13,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "/public/images/avatar.png"
    },
    bio: {
        type: String,
        max: 100
    },
    followers: {
        type: [
            {
                userId: Schema.Types.ObjectId,
            }
        ]
    },
    followings: {
        type: [
            {
                userId: Schema.Types.ObjectId,
            }
        ]
    },
    isConfirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    code: String,
    socketId: String,
}, {
    timestamps: true
});

module.exports = model("users", userSchema)
