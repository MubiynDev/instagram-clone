const router = require("express").Router();
const likePostController = require("../controllers/likePostController");
const commentPostController = require("../controllers/commentPostController");
const commentsGetController = require("../controllers/commentGetController");
const newPostController = require("../controllers/newPostController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, newPostController)
router.get("/:id/like", authMiddleware, likePostController)
router.post("/:postId/comment", authMiddleware, commentPostController) 
router.get("/:postId/comments", authMiddleware, commentsGetController)

module.exports = {
    path: "/posts",
    router: router
}