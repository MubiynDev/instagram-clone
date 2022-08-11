const path = require("path");
const users = require("../models/users")

module.exports = async (req, res) => {
    try {
        const avatar = req.files.avatar
    if(!avatar) throw new Error("Avatar not found")
    if(avatar.mimetype.split("/")[0] !== "image") throw new Error("unallowed type of file")

    const filePath = path.join(__dirname, "..", "public", "images", `${avatar.md5}.${avatar.mimetype.split("/")[1]}`)
    await avatar.mv(filePath)

    await users.findByIdAndUpdate(req.user._id, {
        avatar: `/public/images/${avatar.md5}.${avatar.mimetype.split("/")[1]}`
    });

    res.status(200).json({
        ok: true,
    })
    }
    
    catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}