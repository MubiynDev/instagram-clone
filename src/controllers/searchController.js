const users = require("../models/users")

module.exports = async (req, res, next) => {
    try {
        const {q} = req.query;

        const results = await users.find({
            username: {
                $regex: '.*' + q + '.*'  // `/^${q}/i`
            }
        })
        
        
        res.status(200).json({
            results
        })
    } catch(e) {
        res.status(500).json({
            ok: false,
            message: e + ""
        })
    }
}