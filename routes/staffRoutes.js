const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware, staffController.loadMainPage);
router.get("/add-dish", authMiddleware, staffController.addDish);
router.post("/add-dish", authMiddleware, staffController.postAddDish);
router.get("/update-dish", authMiddleware, staffController.updateDish);
router.post("/search/:page", authMiddleware, staffController.search);

module.exports = router;
