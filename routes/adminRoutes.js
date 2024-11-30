const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/", authMiddleware(["admin"]), adminController.index);

module.exports = router;