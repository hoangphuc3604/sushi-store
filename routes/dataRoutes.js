const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const mainController = require("../controllers/mainController");

router.get("/", authMiddleware, mainController.loadMainPage);
router.post("/search", authMiddleware, mainController.search);

module.exports = router;
