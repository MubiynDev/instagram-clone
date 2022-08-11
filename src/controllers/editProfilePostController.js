const editProfilePostValidation = require("../validations/editProfilePostValidation")
const users = require("../models/users");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const { fullName, bio, username } = await editProfilePostValidation.validateAsync(req.body);

        const user = await users.findById(id);

        if(!user) throw new Error("User Not Found")

        const u = await users.findOne({
            username: username.toLowerCase(),
        });

        if(u._id.toString() !== id) throw new Error("Username already exists")

        await users.findByIdAndUpdate(id, {
            fullName,
            username: username.toLowerCase(),
            bio
        });

        res.redirect(`/users/${user.username}`)
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}