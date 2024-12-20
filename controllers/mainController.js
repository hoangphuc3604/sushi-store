const MonAn = require("../models/monAnModel");
const KhachHang = require("../models/khachHangModel");

class mainController {
    async loadMainPage (req, res) {

        const {email, role} = req;
        if (role === "staff") {
            res.redirect("/staff");
            return;
        }
        if (role === "admin") {
            res.redirect("/admin");
            return;
        }

        const user = await KhachHang.one(email);
        const allMonAn = await MonAn.all();
        res.render("index", { user, role, allMonAn, title: "Trang Chủ" });
    }

    async search(req, res) {
        const {email, role} = req;
        const {query} = req.body;
        
        const searchResult = await MonAn.search(query, 0);
        const user = await KhachHang.one(email);
        const totalPages = Math.ceil(await MonAn.getSearchLength(query) / 8);
        const pages = Array.from({length: totalPages}, (_, i) => i + 1);
        const currentPage = 1;

        res.render("search/search", {query, searchResult, user, title: "Kết quả tìm kiếm", role, pages, currentPage, totalPages, prevPage: currentPage - 1, nextPage: currentPage + 1});
    }
    
    async searchResult(req, res) {
        const {query, page} = req.query;
        const currentPage = parseInt(page) || 1;
        const searchResult = await MonAn.search(query, (currentPage - 1));

        res.json(searchResult);      
    }
}

module.exports = new mainController();