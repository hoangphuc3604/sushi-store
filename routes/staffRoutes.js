const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware, staffController.loadMainPage);
router.get("/add-dish", authMiddleware, staffController.addDish);
router.post("/add-dish", authMiddleware, staffController.postAddDish);
router.get("/update-dish/:id", authMiddleware, staffController.renderUpdateDishWithId);
router.post("/update-dish/:id", authMiddleware, staffController.updateDishWithId);
router.get("/update-dish", authMiddleware, staffController.updateDish);
router.post("/search/:page", authMiddleware, staffController.search);  // search dish
router.get("/booking", authMiddleware, staffController.renderBooking);
router.post("/booking", authMiddleware, staffController.booking);
router.get("/statistics/revenue", authMiddleware, staffController.renderRevenueStatistics);
router.post("/statistics/revenue", authMiddleware, staffController.getRevenueStatistics);
router.get("/statistics/service", authMiddleware, staffController.renderServiceStatistics)
router.post("/statistics/service", authMiddleware, staffController.getServiceStatistics)
router.get("/statistics/employee", authMiddleware, staffController.renderEmployeeStatistics)

module.exports = router;
