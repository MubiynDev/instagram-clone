const users = require("../models/users")
const posts = require("../models/posts")

module.exports = async (req, res) => {
    try {
        const {username} = req.params;

        const user = await users.findOne({
            username: username.toLowerCase()
        });

        if(!user) throw new Error("user not found")

        const userPosts = await posts.find({
            userId: user._id
        })
        
        res.render("profile", {
            user,
            posts: userPosts,
            isProfileOwn: req.user._id.toString() === user._id.toString(),
            isFollowed: req.user.followings.find(el => el.userId.toString() === user._id.toString()) ? true : false
        })
    } catch (e) {
        req.user.followings.forEach(el => console.log(el))
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}