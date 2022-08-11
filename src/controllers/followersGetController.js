const { connect } = require("mongoose");
const users = require("../models/users");

module.exports = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await users.findOne({username: username})
        if(!user) throw new Error("user not found")

        const followers = await users.aggregate([
            {
              '$match': {
                '_id': {
                  '$eq': user._id
                }
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'followers.userId', 
                'foreignField': '_id', 
                'as': 'followers'
              }
            }
          ])
          console.log( followers)
        res.render("followers",{
            user,
            followers
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
        
    }
}
