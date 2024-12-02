const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/", authMiddleware(["admin"]), adminController.index);
router.get("/revenue", authMiddleware(["admin"]), adminController.revenue);
router.post("/revenue", authMiddleware(["admin"]), adminController.getRevenueStats);
router.get("/menu-stats", authMiddleware(["admin"]), adminController.menuStats);
router.post("/menu-stats", authMiddleware(["admin"]), adminController.getMenuStats);
router.get("/staff", authMiddleware(["admin"]), adminController.staff);
router.post("/staff", authMiddleware(["admin"]), adminController.transStaff);
router.post("/staff-search", authMiddleware(["admin"]), adminController.staffSearch);
router.get("/info", authMiddleware(["admin"]), adminController.info);
router.post("/info", authMiddleware(["admin"]), adminController.getInfoList);
router.get("/info/:id", authMiddleware(["admin"]), adminController.getInfoDetail);
router.post("/info/:id", authMiddleware(["admin"]), adminController.updateInfo);

module.exports = router;