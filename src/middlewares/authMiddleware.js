const {verifyJWT} = require("../modules/jwt");
const users = require("../models/users");
const sessions = require("../models/sessions");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        const payload = verifyJWT(token);

        if(!payload) {
            throw new Error("You are not logged");
            // res.redirect("/users/login")
        } 

        const session = await sessions.findById(payload.sessionId);

        if(!session) throw new Error("Session Not Found");

        const user = await users.findById(session.userId);

        req.user = user;
        req.session = session;

        next()
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}