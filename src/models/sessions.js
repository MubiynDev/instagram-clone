const {Schema, model} = require("mongoose");

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = model("sessions", sessionSchema)