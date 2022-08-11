const users = require("../models/users")

module.exports = async (req, res) => {
    try {
        const {username} = req.params;

        const user = await users.findOne({
            username: username.toLowerCase()
        });

        if(!user) throw new Error("User Not Found");

        const follower = await user.followers.find(el => el.userId.toString() === req.user._id.toString())

        if(!follower) {
            throw new Error("You did not followed yet")
        }

        // delete follower
        await users.findByIdAndUpdate(req.user._id, {
            $pull: { followings: { userId: user._id } }
        })

        await users.findByIdAndUpdate(user._id, {
            $pull: { followers: { userId: req.user._id } }
        })

        res.redirect(`/users/${username}`)
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}