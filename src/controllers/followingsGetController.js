const { connect } = require("mongoose");
const { ObjectId } = require("mongoose").Types
const users = require("../models/users");

module.exports = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await users.findOne({username: username})
        if(!user) throw new Error("user not found")

        const followings = await users.aggregate([
          {
            '$match': {
              '_id': new ObjectId(user._id)
            }
          }, {
            '$lookup': {
              'from': 'users', 
              'localField': 'followings.userId', 
              'foreignField': '_id', 
              'as': 'followings'
            }
          }
        ])
          console.log( followings[0])
        res.render("followings",{
            user,
            followings
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
        
    }
}
