const {Schema, model} = require("mongoose");

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String, // image video
        required: true
    },
    src: {
        type: String,
        required: true
    },
    description: String,
    likes: {
        type: [
            {
                userId: Schema.Types.ObjectId
            }
        ]
    },
    comments: {
        type: [
            {
                userId: Schema.Types.ObjectId,
                text: String,
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    
}, {
    timestamps: true
});

module.exports = model("posts", postSchema)