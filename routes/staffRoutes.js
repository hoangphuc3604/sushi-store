const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware, staffController.loadMainPage);
router.get("/add-dish", authMiddleware, staffController.addDish);
router.post("/add-dish", authMiddleware, staffController.postAddDish);
router.get("/update-dish/:id", authMiddleware, staffController.renderUpdateDishWithId);
router.post("/update-dish/:id", authMiddleware, staffController.updateDishWithId);
router.get("/update-dish", authMiddleware, staffController.updateDish);
router.post("/search/:page", authMiddleware, staffController.search);
router.get("/booking", authMiddleware, staffController.renderBooking);
router.post("/booking", authMiddleware, staffController.booking);
router.get("/statistics/revenue", authMiddleware, staffController.renderRevenueStatistics);
router.post("/statistics/revenue", authMiddleware, staffController.getRevenueStatistics);

module.exports = router;
