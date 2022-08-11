const users = require("../models/users")

module.exports = async (req, res, next) => {
    try {
        const {code} = req.body;

        if(code != req.session.code) {
            throw new Error("Incorrect code")
        };

        await users.findByIdAndUpdate(req.user._id, {
            isConfirmed: true
        })

        res.status(200).json({
            ok: true
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}