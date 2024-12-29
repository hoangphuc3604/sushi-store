const MonAn = require("../models/monAnModel");
const KhachHang = require("../models/khachHangModel");

class mainController {
  async loadMainPage(req, res) {
    const { email, role } = req;
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
    const { email, role } = req;
    const { query } = req.body;

    const searchResult = await MonAn.search(query);
    const user = await KhachHang.one(email);

    res.render("search/search", {
      query,
      searchResult,
      user,
      title: "Kết quả tìm kiếm",
      role,
    });
  }

  async searchResult(req, res) {
    const { query } = req.query;
    const searchResult = await MonAn.search(query);

    res.json(searchResult);
  }

  async loadProfile(req, res) {
    const { email, role } = req;
    const { id } = req.params;
    const user = await KhachHang.one(email);

    const profile = await KhachHang.oneById(id);
    res.render("profile", {
      user,
      role,
      profile,
      title: "Thông tin cá nhân",
    });
  }
}

module.exports = new mainController();
