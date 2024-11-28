const KhachHang = require("../models/khachHangModel");
const KhuVuc = require("../models/khuVucModel");
const MonAn = require("../models/monAnModel");
const PER_PAGE = 8;

class staffController {
    async loadMainPage(req, res) {
        let {email, role} = req;
        const user = {MAKHACHHANG: 1};

        if (role === "staff") {
            res.render("staff/staffDashboard", { title: "Staff Dashboard", user, role });
        } else {
            res.clearCookie("accessToken");
            res.redirect("/auth/login");
        }
    }

    async addDish(req, res) {
        let {email, role} = req;
        const user = {MAKHACHHANG: 1};

        const allKhuVuc = await KhuVuc.getAll(); 
        const phanMuc = {};
        for (const cur of allKhuVuc) {
            const phanMucs = await KhuVuc.getAllPhanMucByMaKhuVuc(cur.MAKHUVUC);
            phanMuc[cur.MAKHUVUC] = phanMucs;
        }

        if (role === "staff") {
            res.render("staff/addDish", { title: "Add Dish", user, phanMuc, allKhuVuc, role });
        } else {
            res.clearCookie("accessToken");
            res.redirect("/auth/login");
        }
    }

    async postAddDish(req, res) {
        
    }

    async updateDish(req, res) {
        let {email, role} = req;
        const user = {};
        const allMonAn = [
            {
                MAMON: 1,
                TENMON: "Sushi cá hồi",
                TRANGTHAI: 1,
                GIA: 100000,
            },
            {
                MAMON: 2,
                TENMON: "Sushi cá thu",
                TRANGTHAI: 1,
                GIA: 200000,
            },
            {
                MAMON: 3,
                TENMON: "Sushi cá trích",
                TRANGTHAI: 1,
                GIA: 200000,
            },
            {
                MAMON: 4,
                TENMON: "Sushi cá basa",
                TRANGTHAI: 0, 
                GIA: 200000,
            },
        ]
        res.render("staff/dishUpdate", { title: "Update Dish", user, role, allMonAn });
    }

    async renderUpdateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const monAn = {
            MAMON: 1,
            TENMON: "Sushi cá hồi",
            TRANGTHAIPHUCVU: 1,
            GIA: 100000,
            MAPHANMUC: 1,
        }
        res.render("staff/updateDishByID", { title: "Update Dish", user, role, monAn });
    }

    async updateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const {TENMON, GIA, MAPHANMUC, TRANGTHAIPHUCVU} = req.body;



        res.redirect("/staff/update-dish");
    }

    async search(req, res) {
        let {email, role} = req;
        const user = {};
        const {query} = req.body;
        
        const currentPage = parseInt(req.params.page) || 1;
        const allMonAn = await MonAn.searchMonAnByIndex(query, (currentPage - 1) * PER_PAGE);
        const length = await MonAn.getSearchLength(query);
        const totalPages = Math.ceil(length / PER_PAGE);

        res.render("staff/search", { title: "Search", user, role, allMonAn, currentPage, totalPages });
    }

    async renderBooking(req, res) {
        let {email, role} = req;
        const user = {};
        const allMonAn = [
            {
                MAMON: 1,
                TENMON: "Sushi cá hồi",
                GIA: 100000,
            },
            {
                MAMON: 2,
                TENMON: "Sushi cá thu",
                GIA: 200000,
            },
            {
                MAMON: 3,
                TENMON: "Sushi cá trích",
                GIA: 200000,
            },
            {
                MAMON: 4,
                TENMON: "Sushi cá basa",
                GIA: 200000,
            },
        ]
        res.render("staff/dishBooking", { title: "Booking", user, role, allMonAn });
    }

    async booking(req, res) {
        let {email, role} = req;
        const user = {};
        console.log(req.body);
    }

    async renderRevenueStatistics(req, res) {
        let {email, role} = req;
        const user = {};
        let type, startDate, endDate;
        type = "day";
        startDate = new Date().toISOString().split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        let revenueStats = [{
            time: new Date().toISOString().split("T")[0],
            totalRevenue: 1000000,
            orderCount: 10,
            note: "-",
        }]
        res.render("staff/statistics/revenue", { title: "Revenue Statistics", startDate, endDate, type, revenueStats, user, role });
    }

    async getRevenueStatistics(req, res) {
        let {email, role} = req;
        const user = {};
        const {type, startDate, endDate} = req.body;
        let revenueStats = [
            {
                time: new Date().toISOString().split("T")[0],
                totalRevenue: 1000000,
                orderCount: 10,
                note: "-",
            },
            {
                time: new Date().toISOString().split("T")[0],
                totalRevenue: 1000000,
                orderCount: 10,
                note: "-",
            },
            {
                time: new Date().toISOString().split("T")[0],
                totalRevenue: 1000000,
                orderCount: 10,
                note: "-",
            },
            {
                time: new Date().toISOString().split("T")[0],
                totalRevenue: 1000000,
                orderCount: 10,
                note: "-",
            },
        ]
        res.render("staff/statistics/revenue", { title: "Revenue Statistics", startDate, endDate, type, revenueStats, user, role });
    }
}

 module.exports = new staffController();