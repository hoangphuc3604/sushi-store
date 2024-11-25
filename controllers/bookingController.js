const KhuVuc = require("../models/khuVucModel");
const MonAn = require("../models/monAnModel");
const GioHang = require("../models/gioHangModel");
const KhachHang = require("../models/khachHangModel");
const PER_PAGE = 8;

class bookingController {
    async getTableBooking(req, res) {
        const {email, role} = req;
        const allKhuVuc = await KhuVuc.getAll();
        const khachHang = await KhachHang.getKhachHangByEmail(email);

        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            chiNhanh[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        res.render("booking/tableBooking", { role, khachHang, chiNhanh, allKhuVuc, title: "Đặt Bàn" });
    }

    async tableBooking(req, res) {

    }

    async getFoodBooking(req, res) {
        const {email, role} = req;
        const currentPage = parseInt(req.params.page) || 1;
        const allMonAn = await MonAn.getMonAnByIndex((currentPage - 1) * PER_PAGE);
        const length = await MonAn.getTableLength();
        const allKhuVuc = await KhuVuc.getAll();
        const khachHang = await KhachHang.getKhachHangByEmail(email);
        const totalPages = Math.ceil(length / PER_PAGE);
        res.render("booking/foodBooking", { khachHang, allMonAn, allKhuVuc, currentPage, totalPages, title: "Đặt Món" });
    }

    async cartAdding(req, res) {
        const {email, food} = req.body;
        GioHang.createGioHang(email, food);
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }

    async getCart(req, res) {
        const {email, role} = req;
        const {id} = req.params;
        const khachHang = await KhachHang.getKhachHangByEmail(email);
        const gioHang = await GioHang.getGioHangByMaKhachHang(parseInt(id));
        const soLuong = gioHang.length;
        const tongTien = gioHang.reduce((acc, cur) => acc + cur.GIA * cur.SOLUONG, 0);
        res.render("booking/cart", { gioHang, soLuong, tongTien, khachHang, title: "Giỏ Hàng" });
    }

    async cartUpdate(req, res) {
        const {MAMON, MAKHACHHANG, SOLUONG} = req.body;
        await GioHang.updateGioHang(MAMON, MAKHACHHANG, SOLUONG);
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }

    async cartRemove(req, res) {
        const {MAMON, MAKHACHHANG} = req.body;
        console.log(MAMON, MAKHACHHANG);
        await GioHang.removeGioHang(MAMON, MAKHACHHANG);
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }
}

module.exports = new bookingController();