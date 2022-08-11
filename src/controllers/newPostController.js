const posts = require("../models/posts");
const path = require("path");

module.exports = async (req, res) => {
    try {
        const post = req.files.post;

        const { description } = req.body;
        const type = post.mimetype.split("/")[0];
        const ext = post.mimetype.split('/')[1];
        const fileName = post.md5;
        const filePath = path.join(__dirname, "..", "public", "posts", `${fileName}.${ext}`)
        if(type !== "image" && type !== "video") throw new Error("Post File must be either video or image");

        await post.mv(filePath);

        const newPost = await posts.create({
            description,
            src: `/public/posts/${fileName}.${ext}`,
            type,
            userId: req.user._id
        });

        res.status(201).json({
            ok: true
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}