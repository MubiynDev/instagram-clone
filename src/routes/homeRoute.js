const router = require("express").Router();
const homeGetController = require("../controllers/homeGetController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/",authMiddleware, homeGetController)

module.exports = {
    path: "/",
    router: router
}