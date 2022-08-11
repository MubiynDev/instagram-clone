const Router = require("express").Router;
const authMiddleware = require("../middlewares/authMiddleware");
const chatGetController = require("../controllers/chatGetController")
const router = Router();

router.get("/", authMiddleware, chatGetController)
router.get("/:username", authMiddleware, chatGetController)

module.exports = {
    path: "/direct",
    router
}