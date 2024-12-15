const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const KhachHang = require("../models/khachHangModel");
const { createToken } = require("../utils/tokenCreator");

class authControllers {
  // [GET] /auth/login
  async getUserLogin(req, res) {
    res.render("auth/login", { title: "Login" });
  }

  // [POST] /auth/login
  async postUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.one(email);
    if (!user) {
      const toast = {
        message: "Email không tồn tại",
        type: "danger",
      };
      return res.render("auth/login", { title: "Login", toast });
    }

    const compare = await bcrypt.compare(password, user.MatKhau.trim());
    if (!compare) {
      const toast = {
        message: "Mật khẩu không chính xác",
        type: "danger",
      };
      return res.render("auth/login", { title: "Login", toast });
    }

    const token = createToken({
      email: user.Email,
      role: user.VaiTro,
    });

    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    if (user.VaiTro === "staff") {
      return res.redirect("/staff");
    } else if (user.VaiTro === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/");
    }
  }

  // [GET] /auth/logout
  async logout(req, res) {
    res.clearCookie("accessToken");
    res.redirect("/");
  }

  // [GET] /auth/register
  async register(req, res) {
    res.render("auth/register", { title: "Register", error });
  }

  // [POST] /auth/register
  async postRegister(req, res) {
    const { email, password, name, image, cccd, phone, gender } = req.body;
    const checkUser = await User.one(email);
    if (checkUser) {
      const toast = {
        message: "Email đã tồn tại",
        type: "danger",
      };
      return res.render("auth/register", { title: "Register", toast });
    }

    await User.add({ email, password, image });
    await KhachHang.add({
      email,
      soDienThoai: phone,
      tenKhachHang: name,
      CCCD: cccd,
      gender,
    });
    res.redirect("/auth/login");
  }
}

module.exports = new authControllers();
