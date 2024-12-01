const KhachHang = require("../models/khachHangModel");
const KhuVuc = require("../models/khuVucModel");
const MonAn = require("../models/monAnModel");
const NhanVien = require("../models/nhanVienModel");
const ChiNhanh = require("../models/chiNhanhModel");
const PER_PAGE = 8;

class staffController {
    // [GET] /staff
    async loadMainPage(req, res) {
        let {email, role} = req;
        const user = {MAKHACHHANG: 1};
        res.render("staff/staffDashboard", { title: "Dashboard", user, role });
    }

    // [GET] /staff/add-dish
    async addDish(req, res) {
        let {email, role} = req;
        const user = {MAKHACHHANG: 1};

        const allKhuVuc = await KhuVuc.getAll(); 
        const phanMuc = {};
        for (const cur of allKhuVuc) {
            const phanMucs = await KhuVuc.getAllPhanMucByMaKhuVuc(cur.MAKHUVUC);
            phanMuc[cur.MAKHUVUC] = phanMucs;
        }

        res.render("staff/addDish", { title: "Add Dish", user, role, allKhuVuc, phanMuc });
    }

    // [POST] /staff/add-dish
    async postAddDish(req, res) {
        
    }

    // [GET] /staff/update-dish
    async updateDish(req, res) {
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
        res.render("staff/dishUpdate", { title: "Update Dish", user, role, allMonAn });
    }

    async renderUpdateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const monAn = await MonAn.getMonAnByMaMonAn(id);
        const phanMuc = await KhuVuc.getAllPhanMucByMaKhuVuc(monAn.MAKHUVUC);
        res.render("staff/updateDishByID", { title: "Update Dish", user, role, monAn, phanMuc });
    }

    async updateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const {TENMON, GIA, MAPHANMUC, TRANGTHAIPHUCVU} = req.body;

        await MonAn.updateMonAn(id, {tenMonAn: TENMON, gia: GIA, maPhanMuc: MAPHANMUC, trangThaiPhucVu: TRANGTHAIPHUCVU});

        res.redirect("/staff/update-dish");
    }

    async dishSearch(req, res) {
        let {email, role} = req;
        const user = {};
        const {query} = req.body;
        
        const currentPage = parseInt(req.params.page) || 1;
        const allMonAn = await MonAn.searchMonAnByIndex(query, (currentPage - 1) * PER_PAGE);
        const length = await MonAn.getSearchLength(query);
        const totalPages = Math.ceil(length / PER_PAGE);

        res.render("staff/dishSearch", { title: "Dish Searching", user, role, allMonAn, currentPage, totalPages });
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
        // const allMonAn = MonAn.getMonAnByChiNhanh(user.MACHINHANH);
        res.render("staff/dishBooking", { title: "Booking", user, role, allMonAn });
    }

    async booking(req, res) {
        let {email, role} = req;
        const user = {};
        const {table, name, cccd, gender, phone, memberCard, total, dishes} = req.body;
        const cusEmail = req.body.email;

        //
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

    async renderServiceStatistics(req, res) {
        let {email, role} = req;
        const user = {};
        let type, startDate, endDate;
        type = "day";
        startDate = new Date().toISOString().split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        let employeeStats = [{
            id: 1,
            name: "Nguyễn Văn A",
            servicePoint: 10,
            billCount: 10,
            note: "-",
        }]

        res.render("staff/statistics/service", { title: "Employee Statistics", type, startDate, endDate, employeeStats, user, role });
    }

    async getServiceStatistics(req, res) {
        let {email, role} = req;
        const user = {};
        const {type, startDate, endDate} = req.body;
        let employeeStats = [
            {
                id: 1,
                name: "Nguyễn Văn A",
                servicePoint: 10,
                billCount: 10,
                note: "-",
            },
            {
                id: 2,
                name: "Nguyễn Văn B",
                servicePoint: 10,
                billCount: 10,
                note: "-",
            },
            {
                id: 3,
                name: "Nguyễn Văn C",
                servicePoint: 10,
                billCount: 10,
                note: "-",
            },
            {
                id: 4,
                name: "Nguyễn Văn D",
                servicePoint: 10,
                billCount: 10,
                note: "-",
            },
        ]

        res.render("staff/statistics/service", { title: "Employee Statistics", type, startDate, endDate, employeeStats, user, role });
    }

    async renderEmployeeStatistics(req, res) {
        let {email, role} = req;
        const user = {};
        const allKhuVuc = await KhuVuc.getAll();
        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            chiNhanh[cur.MAKHUVUC] = chiNhanhs.map(cn => cn);
        }
        const employees = [];

        res.render("staff/statistics/employee", { title: "Employee Statistics", allKhuVuc, chiNhanh, employees, user, role });
    }

    async searhStaff(req, res) {
        let {email, role} = req;
        const user = {};
        const {query, branch} = req.body;
        console.log(query, branch);

        const allKhuVuc = await KhuVuc.getAll();
        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            chiNhanh[cur.MAKHUVUC] = chiNhanhs.map(cn => cn);
        }

        const employees = [
            {
                id: 1,
                name: "Nguyễn Văn A",
                branchName: "Chi nhánh 1",
                gender: "Nam",
                phone: "0123456789",
                address: "Hà Nội",
                startDate: "2021-01-01",
                salary: 10000000,
            },
        ]
        res.render("staff/statistics/employee", { title: "Employee Statistics", allKhuVuc, chiNhanh, employees, user, role });
    }

    async renderInvoices(req, res) {
        let {email, role} = req;
        const user = {};
        const totalPages = 1;
        const currentPage = parseInt(req.params.page) || 1;

        const invoices = [];
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, totalPages, currentPage, user, role });
    }

    async searchInvoices(req, res) {
        let {email, role} = req;
        const user = {};
        const {maKhachHang, ngayLap} = req.body;
        const totalPages = 1; // sửa lại 1
        const currentPage = parseInt(req.params.page) || 1;

        const invoices = [
            {
                maHoaDon: 1,
                tongTien: 1000000,
                soTienGiam: 0,
                thanhTien: 1000000,
                maPhieu: 1,
                maChuongTrinh: 1,
            },
            {
                maHoaDon: 2,
                tongTien: 2000000,
                soTienGiam: 0,
                thanhTien: 2000000,
                maPhieu: 2,
                maChuongTrinh: 2,
            },
            {
                maHoaDon: 3,
                tongTien: 3000000,
                soTienGiam: 0,
                thanhTien: 3000000,
                maPhieu: 3,
                maChuongTrinh: 3,
            }
        ]
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, totalPages, currentPage, user, role });
    }

    async renderOrders(req, res) {
        let {email, role} = req;
        const user = {};
        let ngayLap, maNhanVien, maKhachHang;

        const totalPages = 1; // sửa lại 1
        const currentPage = parseInt(req.params.page) || 1;
        const orders = [];
        res.render("staff/statistics/order", { title: "Orders", orders, ngayLap, maNhanVien, maKhachHang, totalPages, currentPage, user, role });
    }

    async searchOrders(req, res) {
        let {email, role} = req;
        const user = {};
        const {maKhachHang, ngayLap, maNhanVien} = req.body;

        const totalPages = 2; // sửa lại 1
        const currentPage = parseInt(req.params.page) || 1;

        const orders = [
            {
                maPhieu: 1,
                ngayLap: "2021-01-01",
                maNhanVien: 1,
                maKhachHang: 1,
            },
            {
                maPhieu: 2,
                ngayLap: "2021-01-02",
                maNhanVien: 2,
                maKhachHang: 2,
            },
            {
                maPhieu: 3,
                ngayLap: "2021-01-03",
                maNhanVien: 3,
                maKhachHang: 3,
            },
            {
                maPhieu: 4,
                ngayLap: "2021-01-04",
                maNhanVien: 4,
                maKhachHang: 4,
            },
        ]
        res.render("staff/statistics/order", { title: "Orders", orders, ngayLap, maKhachHang, maNhanVien, totalPages, currentPage, user, role });
    }

    async renderEditOrder(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const order = {
            maPhieu: 1,
            ngayLap: "2021-01-01",
            maNhanVien: 1,
            maKhachHang: 1,
        }
        res.render("staff/statistics/editOrder", { title: "Edit Order", order, user, role });
    }

    async editOrder(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const {ngayLap, maNhanVien, maKhachHang} = req.body;
        res.redirect("/staff/orders/1");
    }

    async deleteOrder(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        console.log(id);
        res.redirect("/staff/orders/1");
    }

    async addOrder(req, res) {
        let {email, role} = req;
        const user = {};
        const {ngayLap, maNhanVien, maKhachHang} = req.body;
        console.log(ngayLap, maNhanVien, maKhachHang);
        res.redirect("/staff/orders/1");
    }

    async renderCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const totalPages = 3;
        const currentPage = parseInt(req.params.page) || 1;
        const query = "";

        // [MATHE],[NGAYLAP],[NGAYHETHAN],[DIEMTICHLUY],[TRANGTHAI],[LOAITHE],[NGAYDATHANG],[MAKHACHHANG]
        const cards = [
            {
                MATHE: 1,
                NGAYLAP: "2021-01-01",
                NGAYHETHAN: "2022-01-01",
                DIEMTICHLUY: 100,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-01",
                MAKHACHHANG: 1,
            },
            {
                MATHE: 2,
                NGAYLAP: "2021-01-02",
                NGAYHETHAN: "2022-01-02",
                DIEMTICHLUY: 200,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-02",
                MAKHACHHANG: 2,
            },
            {
                MATHE: 3,
                NGAYLAP: "2021-01-03",
                NGAYHETHAN: "2022-01-03",
                DIEMTICHLUY: 300,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-03",
                MAKHACHHANG: 3,
            },
            {
                MATHE: 4,
                NGAYLAP: "2021-01-04",
                NGAYHETHAN: "2022-01-04",
                DIEMTICHLUY: 400,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-04",
                MAKHACHHANG: 4,
            },
        ]
        res.render("staff/statistics/customerCard", { title: "Customer Card", cards, query, totalPages, currentPage, user, role });
    }

    async searchCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const {query} = req.body;
        const totalPages = 3;
        const currentPage = parseInt(req.params.page) || 1;

        const cards = [
            {
                MATHE: 1,
                NGAYLAP: "2021-01-01",
                NGAYHETHAN: "2022-01-01",
                DIEMTICHLUY: 100,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-01",
                MAKHACHHANG: 1,
            },
            {
                MATHE: 2,
                NGAYLAP: "2021-01-02",
                NGAYHETHAN: "2022-01-02",
                DIEMTICHLUY: 200,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-02",
                MAKHACHHANG: 2,
            },
            {
                MATHE: 3,
                NGAYLAP: "2021-01-03",
                NGAYHETHAN: "2022-01-03",
                DIEMTICHLUY: 300,
                TRANGTHAI: 1,
                LOAITHE: "Thẻ thường",
                NGAYDATHANG: "2021-01-03",
                MAKHACHHANG: 3,
            },
        ]
        res.render("staff/statistics/customerCard", { title: "Customer Card", cards, query, totalPages, currentPage, user, role });
    }

    async renderAddCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        res.render("staff/statistics/addCustomerCard", { title: "Add Customer Card", user, role });
    }

    async addCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const {NGAYLAP, NGAYHETHAN, DIEMTICHLUY, TRANGTHAI, NGAYDATHANG, LOAITHE, MAKHACHHANG} = req.body;
        console.log(NGAYLAP, NGAYHETHAN, DIEMTICHLUY, LOAITHE, MAKHACHHANG, TRANGTHAI, NGAYDATHANG);
        res.redirect("/staff/customer-card/1");
    }

    async renderEditCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const card = {
            MATHE: 1,
            NGAYLAP: "2021-01-01",
            NGAYHETHAN: "2022-01-01",
            DIEMTICHLUY: 100,
            TRANGTHAI: 1,
            LOAITHE: "Thẻ thường",
            NGAYDATHANG: "2021-01-01",
            MAKHACHHANG: 1,
        }
        res.render("staff/statistics/editCustomerCard", { title: "Edit Customer Card", card, user, role });
    }

    async editCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const {NGAYLAP, NGAYHETHAN, DIEMTICHLUY, TRANGTHAI, NGAYDATHANG, LOAITHE, MAKHACHHANG} = req.body;
        console.log(NGAYLAP, NGAYHETHAN, DIEMTICHLUY, LOAITHE, MAKHACHHANG, TRANGTHAI, NGAYDATHANG);
        res.redirect("/staff/customer-card/1");
    }

    async deleteCustomerCard(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        console.log(id);
        res.redirect("/staff/customer-card/1");
    }

}

 module.exports = new staffController();