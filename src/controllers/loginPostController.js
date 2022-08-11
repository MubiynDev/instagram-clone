const loginValidation = require("../validations/loginValidation")
const users = require("../models/users");
const sessions = require("../models/sessions");
const {compareHash} = require("../modules/bcrypt");
const {generateJWT} = require("../modules/jwt");

module.exports = async (req, res) => {
    try {
        const { username, password } = await loginValidation.validateAsync(req.body);

        let user = await users.findOne({
            username: username.toLowerCase()
        });

        if(!user) throw new Error("User Not Found");

        const isPasswordTrue = await compareHash(password, user.password)

        if(!isPasswordTrue) throw new Error("Username or Password incorrect")

        // auth session
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const session = await sessions.create({
            userId: user._id,
            userAgent,
            ipAddress
        });

        const token = generateJWT({
            sessionId: session._id
        });

        res.cookie("token", token).redirect(`/users/${username}`)
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}