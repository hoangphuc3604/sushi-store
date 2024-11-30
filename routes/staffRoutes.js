const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const staffController = require("../controllers/staffController");

router.get("/", authMiddleware(["staff"]), staffController.loadMainPage);

// add dish
router.get("/add-dish", authMiddleware(["staff"]), staffController.addDish);
router.post("/add-dish", authMiddleware(["staff"]), staffController.postAddDish);

// update dish
router.get("/update-dish/:id", authMiddleware(["staff"]), staffController.renderUpdateDishWithId);
router.post("/update-dish/:id", authMiddleware(["staff"]), staffController.updateDishWithId);
router.get("/update-dish", authMiddleware(["staff"]), staffController.updateDish);

// search dish
router.post("/dish-search/:page", authMiddleware(["staff"]), staffController.dishSearch);

// dish booking
router.get("/booking", authMiddleware(["staff"]), staffController.renderBooking);
router.post("/booking", authMiddleware(["staff"]), staffController.booking);

// statistics
router.get("/statistics/revenue", authMiddleware(["staff"]), staffController.renderRevenueStatistics);
router.post("/statistics/revenue", authMiddleware(["staff"]), staffController.getRevenueStatistics);
router.get("/statistics/service", authMiddleware(["staff"]), staffController.renderServiceStatistics)
router.post("/statistics/service", authMiddleware(["staff"]), staffController.getServiceStatistics)
router.get("/statistics/employee", authMiddleware(["staff"]), staffController.renderEmployeeStatistics)
router.post("/search", authMiddleware(["staff"]), staffController.searhStaff)

// invoices
router.get("/invoices/:page", authMiddleware(["staff"]), staffController.renderInvoices)
router.post("/invoices/search", authMiddleware(["staff"]), staffController.searchInvoices)

// orders
router.get("/orders/:page", authMiddleware(["staff"]), staffController.renderOrders)
router.post("/orders/search", authMiddleware(["staff"]), staffController.searchOrders)

// orders details actions
router.get("/orders/edit/:id", authMiddleware(["staff"]), staffController.renderEditOrder)
router.post("/orders/edit/:id", authMiddleware(["staff"]), staffController.editOrder)
router.get("/orders/delete/:id", authMiddleware(["staff"]), staffController.deleteOrder)
router.post("/orders/add", authMiddleware(["staff"]), staffController.addOrder)

// customer card
router.get("/customer-card/add", authMiddleware(["staff"]), staffController.renderAddCustomerCard)
router.post("/customer-card/search", authMiddleware(["staff"]), staffController.searchCustomerCard)
router.get("/customer-card/:page", authMiddleware(["staff"]), staffController.renderCustomerCard)
router.post("/customer-card/add", authMiddleware(["staff"]), staffController.addCustomerCard)
// router.get("/customer-card/edit/:id", authMiddleware(["staff"]), staffController.renderEditCustomerCard)
// router.post("/customer-card/edit/:id", authMiddleware(["staff"]), staffController.editCustomerCard)
// router.get("/customer-card/delete/:id", authMiddleware(["staff"]), staffController.deleteCustomerCard)


module.exports = router;
