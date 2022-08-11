require("dotenv").config();
const { env } = process;


module.exports = {
   PORT: env.PORT || 6060,
   MONGO_URL: env.MONGO_URL,
   SECRET_WORD: env.SECRET_WORD

}