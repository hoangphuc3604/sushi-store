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
        const allMonAn = [
            {
                MAMON: 1,
                TENMON: "Sushi cá hồi",
                TRANGTHAI: 1,
                GIA: 100000,
            },
            {
                MAMON: 2,
                TENMON: "Sushi cá thu",
                TRANGTHAI: 1,
                GIA: 200000,
            },
            {
                MAMON: 3,
                TENMON: "Sushi cá trích",
                TRANGTHAI: 1,
                GIA: 200000,
            },
            {
                MAMON: 4,
                TENMON: "Sushi cá basa",
                TRANGTHAI: 0, 
                GIA: 200000,
            },
        ]
        res.render("staff/dishUpdate", { title: "Update Dish", user, role, allMonAn });
    }

    async renderUpdateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const monAn = {
            MAMON: 1,
            TENMON: "Sushi cá hồi",
            TRANGTHAIPHUCVU: 1,
            GIA: 100000,
            MAPHANMUC: 1,
        }
        res.render("staff/updateDishByID", { title: "Update Dish", user, role, monAn });
    }

    async updateDishWithId(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        const {TENMON, GIA, MAPHANMUC, TRANGTHAIPHUCVU} = req.body;



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
        res.render("staff/dishBooking", { title: "Booking", user, role, allMonAn });
    }

    async booking(req, res) {
        let {email, role} = req;
        const user = {};
        console.log(req.body);
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
        const branches =[
            {
                id: 1,
                name: "Chi nhánh 1",
            },
            {
                id: 2,
                name: "Chi nhánh 2",
            },
            {
                id: 3,
                name: "Chi nhánh 3",
            },
            {
                id: 4,
                name: "Chi nhánh 4",
            },
        ]
        const employees = [];

        res.render("staff/statistics/employee", { title: "Employee Statistics", branches, employees, user, role });
    }

    async searhStaff(req, res) {
        let {email, role} = req;
        const user = {};
        const {query, branch} = req.body;
        console.log(query, branch);
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
        const branches =[
            {
                id: 1,
                name: "Chi nhánh 1",
            },
            {
                id: 2,
                name: "Chi nhánh 2",
            },
            {
                id: 3,
                name: "Chi nhánh 3",
            },
            {
                id: 4,
                name: "Chi nhánh 4",
            },
        ]
        res.render("staff/statistics/employee", { title: "Employee Statistics", branches, employees, user, role });
    }

    async renderInvoices(req, res) {
        let {email, role} = req;
        const user = {};

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
            },
            {
                maHoaDon: 4,
                tongTien: 4000000,
                soTienGiam: 0,
                thanhTien: 4000000,
                maPhieu: 4,
                maChuongTrinh: 4,
            }
        ]
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, user, role });
    }

    async searchInvoices(req, res) {
        let {email, role} = req;
        const user = {};
        const {maKhachHang, ngayLap} = req.body;
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
            },
            {
                maHoaDon: 4,
                tongTien: 4000000,
                soTienGiam: 0,
                thanhTien: 4000000,
                maPhieu: 4,
                maChuongTrinh: 4,
            }
        ]
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, user, role });
    }

    async renderOrders(req, res) {
        let {email, role} = req;
        const user = {};
        let ngayLap, maNhanVien, maKhachHang;
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
        res.render("staff/statistics/order", { title: "Orders", orders, ngayLap, maNhanVien, maKhachHang, user, role });
    }

    async searchOrders(req, res) {
        let {email, role} = req;
        const user = {};
        const {maKhachHang, ngayLap, maNhanVien} = req.body;
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
        res.render("staff/statistics/order", { title: "Orders", orders, ngayLap, maKhachHang, maNhanVien, user, role });
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
        console.log(id);
    }

    async deleteOrder(req, res) {
        let {email, role} = req;
        const user = {};
        const {id} = req.params;
        console.log(id);
        res.redirect("/staff/orders");
    }
}

 module.exports = new staffController();