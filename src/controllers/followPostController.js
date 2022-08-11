const users = require("../models/users")

module.exports = async (req, res, next) => {
    try {
        const {username} = req.params;

        const user = await users.findOne({
            username: username.toLowerCase(),
        });

        if(!user) throw new Error("User Not Found");

        const following = {
            userId: user._id
        }

        const follower = {
            userId: req.user._id
        }
        await users.findByIdAndUpdate(req.user._id, {
            $push: { followings: following }
        });

        await users.findByIdAndUpdate(user._id, {
            $push: { followers: follower }
        });

        res.redirect(`/users/${username}`)
    } catch (e) {
        console.log(e)
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}