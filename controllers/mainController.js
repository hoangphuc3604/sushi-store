const MonAn = require("../models/monAnModel");
const KhachHang = require("../models/khachHangModel");

class mainController {
    async loadMainPage (req, res) {
        const {email, role} = req;
        if (role === "staff") {
            res.redirect("/staff");
            return;
        }
        const user = await KhachHang.getKhachHangByEmail(email);
        const allMonAn = await MonAn.getAll();
        res.render("index", { user, role, allMonAn, title: "Trang Chủ" });
    }

    async search(req, res) {
        const {email, role} = req;
        const {query} = req.body;
        
        const searchResult = await MonAn.searchMonAn(query);
        const user = await KhachHang.getKhachHangByEmail(email);

        res.render("search/search", {query, searchResult, user, title: "Kết quả tìm kiếm"});
    }
}

module.exports = new mainController();