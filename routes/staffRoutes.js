const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware, staffController.loadMainPage);

// add dish
router.get("/add-dish", authMiddleware, staffController.addDish);
router.post("/add-dish", authMiddleware, staffController.postAddDish);

// update dish
router.get("/update-dish/:id", authMiddleware, staffController.renderUpdateDishWithId);
router.post("/update-dish/:id", authMiddleware, staffController.updateDishWithId);
router.get("/update-dish", authMiddleware, staffController.updateDish);

// search dish
router.post("/dish-search/:page", authMiddleware, staffController.dishSearch);

// dish booking
router.get("/booking", authMiddleware, staffController.renderBooking);
router.post("/booking", authMiddleware, staffController.booking);

// statistics
router.get("/statistics/revenue", authMiddleware, staffController.renderRevenueStatistics);
router.post("/statistics/revenue", authMiddleware, staffController.getRevenueStatistics);
router.get("/statistics/service", authMiddleware, staffController.renderServiceStatistics)
router.post("/statistics/service", authMiddleware, staffController.getServiceStatistics)
router.get("/statistics/employee", authMiddleware, staffController.renderEmployeeStatistics)
router.post("/search", authMiddleware, staffController.searhStaff)

// invoices
router.get("/invoices", authMiddleware, staffController.renderInvoices)
router.post("/invoices/search", authMiddleware, staffController.searchInvoices)

// orders
router.get("/orders", authMiddleware, staffController.renderOrders)
router.post("/orders/search", authMiddleware, staffController.searchOrders)

// orders details actions
router.get("/orders/edit/:id", authMiddleware, staffController.renderEditOrder)
router.post("/orders/edit/:id", authMiddleware, staffController.editOrder)
router.get("/orders/delete/:id", authMiddleware, staffController.deleteOrder)
router.get("/orders/add", authMiddleware, staffController.renderAddOrder)

module.exports = router;
