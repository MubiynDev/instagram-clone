const posts = require("../models/posts")

module.exports = async (req, res, next) => {
    try {
        const {postId} = req.params;
        const {text} = req.body;
       

        const post = await posts.findById(postId)

        if(!post) throw new Error("Post Not Found");
        
        if(!text) throw new Error("Comment text is required")

        const comment = {
            userId: req.user._id,
            text: text,
            
        }

        await posts.findByIdAndUpdate(post._id, {
            $push: { comments: comment }
        });

        res.status(201).json({
            ok: true,
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
        
    }
}