const { connect } = require("mongoose");
const posts = require("../models/posts");
const users = require("../models/users");

module.exports = async (req, res, next) => {
    try {
        const {postId} = req.params;

        const post = await posts.findById(postId)
        
        if(!post) throw new Error("Post Not Found");

        const postEl = await posts.aggregate([
            {
                $match: {
                    _id: post._id
                }
            },
            {
                $lookup: {
                    from: "users",
                    as: "users",
                    localField: "comments.userId",
                    foreignField: "_id"
                }
            }
        ]);

        const comments = postEl[0].comments?.map(el => {
            const user = postEl[0].users.find(user => user._id.toString() === el.userId.toString())
            const comment = {
                text: el.text,
                _id: el._id,
                date: el.date,
                user
            }
            return comment
        })
        console.log(comments) 
    
          
        res.render("comments",{
            comments
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
        
    }
}
