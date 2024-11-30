const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const KhachHang = require("../models/khachHangModel");
const { createToken } = require("../utils/tokenCreator");

class authControllers {
  async getUserLogin(req, res) {
    const error = req.cookies.error;
    res.clearCookie("error");
    res.render("auth/login", { title: "Login", error });
  }

  async postUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      res.cookie("error", "Email không tồn tại");
      return res.redirect("/auth/login");
    }

    const compare = await bcrypt.compare(password, user.password.trim());
    if (!compare) {
      res.cookie("error", "Mật khẩu không đúng");
      return res.redirect("/auth/login");
    }

    const token = createToken({
      email: user.email,
      role: user.role,
    });

    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    
    if (user.role === "staff") {
      return res.redirect("/staff");
    } else if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/");
    }
  }

  async logout(req, res) {
    res.clearCookie("accessToken");
    res.redirect("/");
  }

  async register(req, res) {
    const error = req.cookies.error;
    res.clearCookie("error");
    res.render("auth/register", { title: "Register", error });
  }

  async postRegister(req, res) {
    const { email, password, name, image, cccd, phone, gender} = req.body;
    const checkUser = await User.getUserByEmail(email);
    if (checkUser) {
      res.cookie("error", "Email đã tồn tại");
      return res.redirect("/auth/register");
    }

    await User.createUser({ email, password, image });
    await KhachHang.createKhachHang({email, soDienThoai: phone, tenKhachHang: name, CCCD: cccd, gender});
    res.redirect("/auth/login");
  }
}

module.exports = new authControllers();
