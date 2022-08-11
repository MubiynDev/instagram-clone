const { sign, verify } = require("jsonwebtoken")
const { SECRET_WORD } = require("../../config")

module.exports.generateJWT =  (payload) =>  sign(payload, SECRET_WORD, {expiresIn: "7d"})

module.exports.verifyJWT =  (token) => {
    try {
        return  verify(token, SECRET_WORD)
    }
    catch(err) {
        return false
    }
}