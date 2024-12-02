const KhuVuc = require("../models/khuVucModel");
class adminController {
    // [GET] /admin
    index(req, res) {
        const { email, role } = req;
        res.render('admin/adminDashboard', { role, title: "Trang quản trị" });
    }

    // [GET] /admin/revenue
    async revenue(req, res) {
        const { email, role } = req;

        const startDate = new Date().toISOString().split("T")[0];
        const endDate = new Date().toISOString().split("T")[0];

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        res.render('admin/revenue', { role, title: "Doanh thu", areas, branches, startDate, endDate, revenueStats: [] });
    }

    // [POST] /admin/revenue
    async getRevenueStats(req, res) {
        const { email, role } = req;
        const { startDate, endDate, branchId } = req.body;

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const revenueStats = [
            {
                NGAY: "2021-01-01",
                TONGDOANHTHU: 1000000,
            },
            {
                NGAY: "2021-01-02",
                TONGDOANHTHU: 2000000,
            },
            {
                NGAY: "2021-01-03",
                TONGDOANHTHU: 3000000,
            },
        ];

        res.render('admin/revenue', { role, title: "Doanh thu", areas, branches, startDate, endDate, revenueStats });
    }

    // [GET] /admin/menu-stats
     async menuStats(req, res) {
        const { email, role } = req;

        const startDate = new Date().toISOString().split("T")[0];
        const endDate = new Date().toISOString().split("T")[0];

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const revenueStats = [
            {
                dishName: "Mì xào",
                totalRevenue: 1000000,
                quantitySold: 10,
            },
            {
                dishName: "Phở",
                totalRevenue: 2000000,
                quantitySold: 20,
            },
            {
                dishName: "Cơm rang",
                totalRevenue: 3000000,
                quantitySold: 30,
            },
        ]

        let highest, lowest;
        revenueStats.forEach((item) => {
            if (!highest || item.totalRevenue > highest) {
                highest = item.totalRevenue;
            }
            if (!lowest || item.totalRevenue < lowest) {
                lowest = item.totalRevenue;
            }
        });

        let highestDishes = [], lowestDishes = [];
        revenueStats.forEach((item) => {
            if (item.totalRevenue === highest) {
                highestDishes.push(item);
            }
            if (item.totalRevenue === lowest) {
                lowestDishes.push(item);
            }
        });

        res.render('admin/menuStats', { role, title: "Thống kê menu", areas, branches, startDate, endDate, revenueStats, areas, highestDishes, lowestDishes });
    }

    // [POST] /admin/menu-stats
    async getMenuStats(req, res) {
        const { email, role } = req;
        const { startDate, endDate, branch, area } = req.body;

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const revenueStats = [
            {
                dishName: "Mì xào",
                totalRevenue: 1000000,
                quantitySold: 10,
            },
            {
                dishName: "Phở",
                totalRevenue: 2000000,
                quantitySold: 20,
            },
            {
                dishName: "Cơm rang",
                totalRevenue: 3000000,
                quantitySold: 30,
            },
        ]

        let highest, lowest;
        revenueStats.forEach((item) => {
            if (!highest || item.totalRevenue > highest) {
                highest = item.totalRevenue;
            }
            if (!lowest || item.totalRevenue < lowest) {
                lowest = item.totalRevenue;
            }
        });

        let highestDishes = [], lowestDishes = [];
        revenueStats.forEach((item) => {
            if (item.totalRevenue === highest) {
                highestDishes.push(item);
            }
            if (item.totalRevenue === lowest) {
                lowestDishes.push(item);
            }
        });

        res.render('admin/menuStats', { role, title: "Thống kê menu", areas, branches, startDate, endDate, revenueStats, areas, highestDishes, lowestDishes });
    }

    // [GET] /admin/staff
    async staff(req, res) {
        const { email, role } = req;

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const employees = [];


        res.render('admin/transferStaff', { role, title: "Nhân viên", areas, branches, employees });
    }

    // [POST] /admin/staff-search
    async staffSearch(req, res) {
        const { email, role } = req;
        const { branch, area } = req.body;

        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const employees = [
            {
                id: 1,
                name: "Nguyễn Văn A",
                position: "Nhân viên phục vụ",
            },
            {
                id: 2,
                name: "Trần Thị B",
                position: "Nhân viên phục vụ",
            },
            {
                id: 3,
                name: "Lê Văn C",
                position: "Nhân viên phục vụ",
            },
        ];

        res.render('admin/transferStaff', { role, title: "Nhân viên", areas, branches, employees });
    }

    // [POST] /admin/staff
    transStaff(req, res) {
        const { email, role } = req;
        const { id, branch } = req.body;
        console.log(id, branch);
        res.redirect('/admin/staff');
    }

    // [GET] /admin/salary
    async info(req, res) {
        const { email, role } = req;
        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        res.render('admin/info', { role, title: "Thông tin", areas, branches, employees: [] });
    }

    // [POST] /admin/info
    async getInfoList(req, res) {
        const { email, role } = req;
        
        const {branch, area} = req.body;
        const areas = await KhuVuc.getAll();
        const branches = {};
        for (const cur of areas) {
            const chiNhanhs = await KhuVuc.getChiNhanhByMaKhuVuc(cur.MAKHUVUC);
            branches[cur.MAKHUVUC] = chiNhanhs.map(cn => cn.TENCHINHANH);
        }

        const employees = [
            {   
                MANHANVIEN: 1,
                HOTEN: "Nguyễn Văn A",
                NGAYSINH: "1999-01-01",
                GIOITINH: "Nam",
                SODIENTHOAI: "0123456789",
                NGAYVAOLAM: "2021-01-01",
                LUONG: 10000000,
                DIACHI: "Hà Nội",
                MABOPHAN: "BP001",
            },
            {
                MANHANVIEN: 2,
                HOTEN: "Trần Thị B",
                NGAYSINH: "1999-01-01",
                GIOITINH: "Nữ",
                SODIENTHOAI: "0123456789",
                NGAYVAOLAM: "2021-01-01",
                LUONG: 10000000,
                DIACHI: "Hà Nội",
                MABOPHAN: "BP001",
            },
            {
                MANHANVIEN: 3,
                HOTEN: "Lê Văn C",
                NGAYSINH: "1999-01-01",
                GIOITINH: "Nam",
                SODIENTHOAI: "0123456789",
                NGAYVAOLAM: "2021-01-01",
                LUONG: 10000000,
                DIACHI: "Hà Nội",
                MABOPHAN: "BP001",
            },
        ];

        res.render('admin/info', { role, title: "Thông tin", areas, branches, employees });
    }

    // [GET] /admin/info/:id
    async getInfoDetail(req, res) {
        const { email, role } = req;
        const { id } = req.params;

        const employee = {
            MANHANVIEN: 1,
            HOTEN: "Nguyễn Văn A",
            NGAYSINH: "1999-01-01",
            GIOITINH: "Nam",
            SODIENTHOAI: "0123456789",
            NGAYVAOLAM: "2021-01-01",
            LUONG: 10000000,
            DIACHI: "Hà Nội",
            MABOPHAN: "BP001",
        };

        res.render('admin/updateEmployee', { role, title: "Chi tiết thông tin", employee });
    }

    // [POST] /admin/info/:id
    async updateInfo(req, res) {
        const { email, role } = req;
        const { id } = req.params;
        const { HOTEN, NGAYSINH, GIOITINH, SODIENTHOAI, NGAYVAOLAM, LUONG, DIACHI, MABOPHAN } = req.body;

        console.log(id, HOTEN, NGAYSINH, GIOITINH, SODIENTHOAI, NGAYVAOLAM, LUONG, DIACHI, MABOPHAN);

        res.redirect('/admin/info');
    }
}

module.exports = new adminController();