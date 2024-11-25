const MonAn = require("../models/monAnModel");
const KhachHang = require("../models/khachHangModel");

class mainController {
    async loadMainPage (req, res) {
        const {email, role} = req;
        const khachHang = await KhachHang.getKhachHangByEmail(email);
        const allMonAn = await MonAn.getAll();
        res.render("index", { khachHang, role, allMonAn, title: "Trang Chủ" });
    }

    async search(req, res) {
        const {email, role} = req;
        const {query} = req.body;
        
        const searchResult = await MonAn.searchMonAn(query);
        const khachHang = await KhachHang.getKhachHangByEmail(email);

        res.render("search/search", {query, searchResult, khachHang, title: "Kết quả tìm kiếm"});
    }
}

module.exports = new mainController();