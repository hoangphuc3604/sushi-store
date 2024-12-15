const KhuVuc = require("../models/khuVucModel");
const MonAn = require("../models/monAnModel");
const GioHang = require("../models/gioHangModel");
const KhachHang = require("../models/khachHangModel");
const PER_PAGE = 8;

class bookingController {
    async getTableBooking(req, res) {
        const {email, role} = req;
        const allKhuVuc = await KhuVuc.all();
        const user = await KhachHang.one(email);

        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
            chiNhanh[cur.MaKhuVuc] = chiNhanhs.map(cn => cn.TenChiNhanh);
        }

        res.render("booking/tableBooking", { role, user, chiNhanh, allKhuVuc, title: "Đặt Bàn" });
    }

    async tableBooking(req, res) {

    }

    async getFoodBooking(req, res) {
        const {email, role} = req;
        const currentPage = parseInt(req.params.page) || 1;
        const allMonAn = await MonAn.getMonAnByIndex((currentPage - 1) * PER_PAGE);
        const length = await MonAn.getTableLength();
        const allKhuVuc = await KhuVuc.all();
        const user = await KhachHang.one(email);
        const totalPages = Math.ceil(length / PER_PAGE);
        res.render("booking/foodBooking", { user, allMonAn, allKhuVuc, currentPage, totalPages, role, title: "Đặt Món" });
    }

    async cartAdding(req, res) {
        const {email, food, staff} = req.body;
        GioHang.createGioHang(email, food, staff);
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }

    async getCart(req, res) {
        const {email, role} = req;
        const {id} = req.params;
        const user = await KhachHang.one(email);
        let gioHang = await GioHang.getGioHangByMaKhachHang(id);
        gioHang = await Promise.all(gioHang.map(async cur => {
            const monAn = await MonAn.one(cur.MaMon);
            return {...cur, ...monAn};
        }));
        const soLuong = gioHang.length;
        const tongTien = gioHang.reduce((acc, cur) => acc + cur.Gia * cur.SoLuong, 0);
        res.render("booking/cart", { gioHang, soLuong, tongTien, user, role, title: "Giỏ Hàng" });
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