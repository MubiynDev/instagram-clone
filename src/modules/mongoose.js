const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config") 

module.exports = () => {
    mongoose.connect(MONGO_URL, (err) => {
        if(err) console.log("Mongo connection error:", err)
        else console.log("MongoDB connected succesfully")
    })
}