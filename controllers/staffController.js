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
        res.render("staff/updateDish", { title: "Update Dish", user, role });
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
}

module.exports = new staffController();