const KhachHang = require("../models/khachHangModel");
const KhuVuc = require("../models/khuVucModel");
const MonAn = require("../models/monAnModel");
const NhanVien = require("../models/nhanVienModel");
const PhanMuc = require("../models/phanMucModel");
const PhieuDat = require("../models/phieuDatModel");
const PER_PAGE = 8;

class staffController {
    // [GET] /staff ok
    async loadMainPage(req, res) {
        let {email, role} = req;
        const id = email.split("@")[0];
        const user = NhanVien.one(id);
        res.render("staff/staffDashboard", { title: "Dashboard", user, role });
    }

    // [GET] /staff/add-dish ok
    async addDish(req, res) {
        let {email, role} = req;
        const id = email.split("@")[0];
        const user = NhanVien.one(id);

        const allKhuVuc = await KhuVuc.all(); 
        const phanMuc = {};
        for (const cur of allKhuVuc) {
            const phanMucs = await KhuVuc.phanMucs(cur.MaKhuVuc);
            phanMuc[cur.MaKhuVuc] = phanMucs;
        }

        res.render("staff/addDish", { title: "Add Dish", user, role, allKhuVuc, phanMuc });
    }

    // [POST] /staff/add-dish ok
    async postAddDish(req, res) {
        const {email, role} = req;
        const id = email.split("@")[0];
        const user = NhanVien.one(id);     

        const {category, name, price, status} = req.body;
        const dish = {
            tenMonAn: name,
            gia: price,
            maPhanMuc: category,
            trangThaiPhucVu: status,
        }
        await MonAn.add(dish);
        res.redirect("/staff/add-dish");
    }

    // [GET] /staff/update-dish x
    async updateDish(req, res) {
        let {email, role} = req;
        const id = email.split("@")[0];
        const user = NhanVien.one(id);

        const allMonAn = [
            {
                MaMon: 1,
                TenMonAn: "Sushi cá hồi",
                Gia: 100000,
            },
            {
                MaMon: 2,
                TenMonAn: "Sushi cá thu",
                Gia: 200000,
            },
            {
                MaMon: 3,
                TenMonAn: "Sushi cá trích",
                Gia: 200000,
            },
            {
                MaMon: 4,
                TenMonAn: "Sushi cá basa",
                Gia: 200000,
            },
        ]
        res.render("staff/dishUpdate", { title: "Update Dish", user, role, allMonAn });
    }

    // [GET] /staff/update-dish/:id
    async renderUpdateDishWithId(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const monAn = await MonAn.one(id);
        const maKhuVuc = await PhanMuc.khuVuc(monAn.MaPhanMuc).MaKhuVuc; // Lay ma khu vuc cua mon an
        const phanMuc = await KhuVuc.phanMucs(maKhuVuc);
        res.render("staff/updateDishByID", { title: "Update Dish", user, role, monAn, phanMuc });
    }
    
    // [POST] /staff/update-dish/:id ok
    async updateDishWithId(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const {TENMON, GIA, MAPHANMUC, TRANGTHAIPHUCVU} = req.body;

        await MonAn.update(id, {tenMonAn: TENMON, gia: GIA, maPhanMuc: MAPHANMUC, trangThaiPhucVu: TRANGTHAIPHUCVU});

        res.redirect("/staff/update-dish");
    }
    
    // [POST] /staff/dish-search/:page ok
    async dishSearch(req, res) {
        let {email, role} = req;
        const id = email.split("@")[0];
        const user = NhanVien.one(id);

        const {query} = req.body;
        
        const currentPage = parseInt(req.params.page) || 1;
        const allMonAn = await MonAn.searchMonAnByIndex(query, (currentPage - 1) * PER_PAGE);
        const length = allMonAn.length;
        const totalPages = Math.ceil(length / PER_PAGE);

        res.render("staff/dishSearch", { title: "Dish Searching", user, role, allMonAn, currentPage, totalPages });
    }
    
    // [GET] /staff/booking x
    async renderBooking(req, res) {
        let {email, role} = req;
        const id = email.split("@")[0]; 
        const user = NhanVien.one(id);

        const allMonAn = [ // Lay mon an theo chi nhanh
            {
                MaMon: 1,
                TenMonAn: "Sushi cá hồi",
                Gia: 100000,
            },
            {
                MaMon: 2,
                TenMonAn: "Sushi cá thu",
                Gia: 200000,
            },
            {
                MaMon: 3,
                TenMonAn: "Sushi cá trích",
                Gia: 200000,
            },
            {
                MaMon: 4,
                TenMonAn: "Sushi cá basa",
                Gia: 200000,
            },
        ]
        // const allMonAn = MonAn.getMonAnByChiNhanh(user.MACHINHANH);
        res.render("staff/dishBooking", { title: "Booking", user, role, allMonAn });
    }

    // [POST] /staff/booking xxx
    async booking(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0]; // Chỉnh sửa khi xuất hóa đơn thì qua trang khác để giảm giá
        const user = NhanVien.one(staffId);

        const {table, name, cccd, gender, phone, memberCard, total, dishes} = req.body;
        const cusEmail = req.body.email;
        console.log(dishes);

        if (memberCard) {
            // Lay thong tin khach hang
        } else {
            await KhachHang.add({tenKhachHang: name, soDienThoai: phone, gioiTinh: gender, CCCD: cccd, email: cusEmail});
            const maKhachHang = await KhachHang.one(cusEmail).MaKhachHang;
            dishes.forEach(async dish => {
                await NhanVien.addOrder({maNhanVien: staffId, maKhachHang: maKhachHang, maMon: dish.id, soLuong: dish.quantity});
            });
        }
    }

    // [GET] /staff/statistics/revenue xxx sửa lại dữ liệu revenueStats là trong ngày hôm nay
    async renderRevenueStatistics(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

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

    // [POST] /staff/statistics/revenue xxx sửa lại dữ liệu revenueStats cho đúng
    async getRevenueStatistics(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

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

    // [GET] /staff/statistics/service xxx sửa lại dữ liệu employeeStats cho đúng
    async renderServiceStatistics(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

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
    
    // [POST] /staff/statistics/service xxx sửa lại dữ liệu employeeStats cho đúng
    async getServiceStatistics(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

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

    // [GET] /staff/statistics/employee ok
    async renderEmployeeStatistics(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const allKhuVuc = await KhuVuc.all();
        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
            chiNhanh[cur.MaKhuVuc] = chiNhanhs.map(cn => cn);
        }
        const employees = [];

        res.render("staff/statistics/employee", { title: "Employee Statistics", allKhuVuc, chiNhanh, employees, user, role });
    }

    // [POST] /staff/statistics/employee ok
    async searhStaff(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {query, branch} = req.body;
        console.log(query, branch);

        const allKhuVuc = await KhuVuc.all();
        const chiNhanh = {};
        for (const cur of allKhuVuc) {
            const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
            chiNhanh[cur.MaKhuVuc] = chiNhanhs.map(cn => cn);
        }

        const employees = await NhanVien.search(branch, query);
        let toast = {};
        if (employees.length === 0) {
            toast = {
                type: "warning",
                message: "Không tìm thấy nhân viên nào",
            }
        }
        res.render("staff/statistics/employee", { title: "Employee Statistics", allKhuVuc, chiNhanh, employees, user, role, toast });
    }

    // [GET] /staff/statistics/invoice ok
    async renderInvoices(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const totalPages = 1;
        const currentPage = parseInt(req.params.page) || 1;

        const invoices = [];
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, totalPages, currentPage, user, role });
    }

    // [POST] /staff/statistics/invoice 
    async searchInvoices(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {maKhachHang, ngayLap} = req.body;
        const totalPages = 1; // sửa lại 1
        const currentPage = parseInt(req.params.page) || 1;

        const invoices = await KhachHang.bill(maKhachHang, ngayLap);
        let toast = {};
        if (invoices.length === 0) {
            toast = {
                type: "warning",
                message: "Không tìm thấy hóa đơn nào",
            }
        }
        res.render("staff/statistics/invoice", { title: "Invoices", invoices, totalPages, currentPage, user, role, toast });
    }

    // [GET] /staff/statistics/order ok
    async renderOrders(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        let {NgayLap, MaNhanVien, MaKhachHang} = req.params.query;

        const currentPage = parseInt(req.params.page) || 1;
        const orders = PhieuDat.search(MaKhachHang, NgayLap, MaNhanVien, (currentPage - 1) * PER_PAGE);
        const totalPages = orders.length / PER_PAGE;

        res.render("staff/statistics/order", { title: "Orders", orders, NgayLap, MaNhanVien, MaKhachHang, totalPages, currentPage, user, role });
    }

    // [POST] /staff/statistics/order
    async searchOrders(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {maKhachHang, ngayLap, maNhanVien} = req.body;
        const currentPage = parseInt(req.params.page) || 1;

        const orders = await PhieuDat.search(maKhachHang, ngayLap, maNhanVien, (currentPage - 1) * PER_PAGE);
        const totalPages = orders.length / PER_PAGE;
        res.render("staff/statistics/order", { title: "Orders", orders, ngayLap, maKhachHang, maNhanVien, totalPages, currentPage, user, role });
    }

    // [GET] /staff/statistics/edit-order/:id
    async renderEditOrder(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const order = PhieuDat.one(id);
        res.render("staff/statistics/editOrder", { title: "Edit Order", order, user, role });
    }

    // [POST] /staff/statistics/edit-order/:id xxx sửa form edit order
    async editOrder(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const {ngayLap, maNhanVien, maKhachHang} = req.body;


        res.redirect("/staff/orders/1");
    }

    async deleteOrder(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        await PhieuDat.delete(id);
        res.redirect("/staff/orders/1");
    }

    // async addOrder(req, res) {
    //     let {email, role} = req;
    //     const staffId = email.split("@")[0];
    //     const user = NhanVien.one(staffId);

    //     const {ngayLap, maNhanVien, maKhachHang} = req.body;
    //     console.log(ngayLap, maNhanVien, maKhachHang);
    //     res.redirect("/staff/orders/1");
    // }

    // [GET] /staff/customer-card/:page ok
    async renderCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const currentPage = parseInt(req.params.page) || 1;
        const query = "";
        
        const cards = await KhachHang.allTheKhachHang();
        const totalPages = Math.ceil(cards.length / PER_PAGE);
        res.render("staff/statistics/customerCard", { title: "Customer Card", cards, query, totalPages, currentPage, user, role });
    }

    // [POST] /staff/customer-card/search xxx sửa hàm searchTheKhachHang với sp
    async searchCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {query} = req.body;
        const totalPages = 3;
        const currentPage = parseInt(req.params.page) || 1;

        const cards = KhachHang.searchTheKhachHang(query);
        res.render("staff/statistics/customerCard", { title: "Customer Card", cards, query, totalPages, currentPage, user, role });
    }

    // [GET] /staff/customer-card/add ok
    async renderAddCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        res.render("staff/statistics/addCustomerCard", { title: "Add Customer Card", user, role });
    }

    // [POST] /staff/customer-card/add ok
    async addCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {NGAYLAP, NGAYHETHAN, DIEMTICHLUY, TRANGTHAI, NGAYDATHANG, LOAITHE, MAKHACHHANG} = req.body;
        await KhachHang.addTheKhachHang(MAKHACHHANG);
        res.redirect("/staff/customer-card/1");
    }

    async renderEditCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const customerCard = await KhachHang.oneTheKhachHang(id);
        console.log(customerCard);
        res.render("staff/statistics/editCustomerCard", { title: "Edit Customer Card", customerCard, user, role });
    }

    async editCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        const {NGAYLAP, NGAYHETHAN, DIEMTICHLUY, TRANGTHAI, LOAITHE, MAKHACHHANG} = req.body;
        await KhachHang.updateTheKhachHang(id, NGAYLAP, NGAYHETHAN, DIEMTICHLUY, TRANGTHAI, LOAITHE, MAKHACHHANG);
        res.redirect("/staff/customer-card/1");
    }

    async deleteCustomerCard(req, res) {
        let {email, role} = req;
        const staffId = email.split("@")[0];
        const user = NhanVien.one(staffId);

        const {id} = req.params;
        await KhachHang.deleteTheKhachHang(id);
        res.redirect("/staff/customer-card/1");
    }

}

 module.exports = new staffController();