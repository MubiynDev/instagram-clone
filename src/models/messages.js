const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("messages", messageSchema)
