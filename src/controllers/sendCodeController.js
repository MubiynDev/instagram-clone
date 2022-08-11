const sessions = require("../models/sessions")
const sendSms = require("../helpers/sms")
module.exports = async (req, res, next) => {
    try {
        const code = Math.round(Math.random() * 1000000)
        await sendSms(`${req.user.phone - 0}`, code)
        await sessions.findByIdAndUpdate(req.session._id, {
            code
        })
        console.log(code)
        res.status(200).json({
            ok: true
        });
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}