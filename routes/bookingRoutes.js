const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/table", authMiddleware, bookingController.getTableBooking);
router.get("/food/:page", authMiddleware, bookingController.getFoodBooking);
router.post("/cart/add", authMiddleware, bookingController.cartAdding);
router.post("/cart/update", authMiddleware, bookingController.cartUpdate);
router.post("/cart/remove", authMiddleware, bookingController.cartRemove);
router.get("/cart/:id", authMiddleware, bookingController.getCart);

module.exports = router;
