const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const mainController = require("../controllers/mainController");

router.get(
  "/",
  authMiddleware(["customer", "staff", "admin"]),
  mainController.loadMainPage
);
router.post("/search", authMiddleware(["customer"]), mainController.search);
router.get(
  "/search-result",
  authMiddleware(["customer"]),
  mainController.searchResult
);
router.get(
  "/profile/:id",
  authMiddleware(["customer"]),
  mainController.loadProfile
);

module.exports = router;
