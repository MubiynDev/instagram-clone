const posts = require("../models/posts");
const users = require("../models/users");

module.exports = async (req, res) => {
    try {
        const postList = await posts.aggregate([
            {
                $lookup: {
                    localField: "userId",
                    foreignField: "_id",
                    from: "users",
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: "$user"
                }
            },
          
        ]);

        const userList = await users.aggregate([
            {
                $match: {
                    username: { $ne: req.user.username }
                }
            }
        ])

        res.render("index", {
            posts: postList,
            users: userList,
            user: req.user
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}