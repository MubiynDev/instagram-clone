const signupValidation = require("../validations/signupValidation")
const users = require("../models/users")
const sessions = require("../models/sessions")
const { generateHash } = require("../modules/bcrypt")
const { generateJWT } = require("../modules/jwt")


module.exports = async (req, res) => {
   try {
        const { fullName, username, password, phone} = await signupValidation.validateAsync(req.body)
        let user = await users.findOne({
            phone: `+${phone}`
        })
        if(user) throw new Error("this number is already used")

        user = await users.findOne({
            username: username.toLowerCase()
        })
        if(user) throw new Error("this username is already exists")

        const hash = await generateHash(password)
        user = await users.create({
            fullName,
            username: username.toLowerCase(),
            phone: `+${phone}`,
            password: hash

        })

        //token generating
        const userAgent = req.headers["user-agent"]
        const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress
        const session = await sessions.create({
            userId: user._id,
            userAgent,
            ipAddress
        })
        const token = generateJWT({
            sessionId: session._id
        })

        res.cookie("token", token).redirect(`/users/${username}`)

   }

   catch(e) {
    console.log(e)
    res.status(400).json({
        ok: false,
        message: e + ""
    })
   }




}