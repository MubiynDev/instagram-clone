const users = require("../models/users")
const messages = require("../models/messages")

module.exports = async (req, res) => {
    try {
        const username = req.params.username;
        const chats = await users.aggregate([
            {
                $match: {
                    _id: {
                        $ne: req.user._id
                    }
                }
            },
            {
                $project: {
                    avatar: 1,
                    fullName: 1,
                    _id: 1,
                    username: 1
                }
            }
        ])

        const user = await users.findOne({
            username: username?.toLowerCase()
        });

        if(!user && username) res.redirect("/not-found")

        const messageList = await messages.aggregate([
            {
                $match: {
                    $or: [
                        {
                            senderId: req.user._id,
                            receiverId: user?._id
                        },
                        {
                            senderId: user?._id,
                            receiverId: req.user._id
                        }
                    ]
                }
            },
        ])
        res.render("chat", {
            chats,
            isChatSelected: Boolean(username),
            messages: messageList,
            user,
            profileOwner: req.user
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}