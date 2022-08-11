const router = require("express").Router();
const signupGetController = require("../controllers/signupGetController");
const loginGetController = require("../controllers/loginGetController");
const signupPostController = require("../controllers/signupPostController");
const loginPostController = require("../controllers/loginPostController");
const profileGetController = require("../controllers/profileGetController");
const avatarPostController = require("../controllers/avatarPostController");
const checkCodeController = require("../controllers/checkCodeController");
const sendCodeController = require("../controllers/sendCodeController");
const editProfilePostController = require("../controllers/editProfilePostController");
const searchController = require("../controllers/searchController");
const followPostController = require("../controllers/followPostController");
const unfollowPostController = require("../controllers/unfollowPostController");

const authMiddleware = require("../middlewares/authMiddleware");
const followersGetController = require("../controllers/followersGetController");
const followingsGetController = require("../controllers/followingsGetController");

router.get("/search", authMiddleware ,searchController)

router.get("/login", loginGetController)
router.get("/signup", signupGetController)

router.post("/signup", signupPostController)
router.post("/confirm", authMiddleware, checkCodeController);
router.post("/send-code", authMiddleware, sendCodeController);
router.post("/login", loginPostController)

router.get("/:username", authMiddleware, profileGetController)
router.get("/:username/follow", authMiddleware, followPostController)
router.post("/:id/edit-profile", authMiddleware, editProfilePostController)
router.get("/:username/unfollow", authMiddleware, unfollowPostController)
router.get("/:username/followers", authMiddleware, followersGetController)
router.get("/:username/followings", authMiddleware, followingsGetController)



router.post("/avatar", authMiddleware, avatarPostController)
module.exports = {
    path: "/users",
    router: router
}