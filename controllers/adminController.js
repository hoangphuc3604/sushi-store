const KhuVuc = require("../models/khuVucModel");
const ChiNhanh = require("../models/chiNhanhModel");
const NhanVien = require("../models/nhanVienModel");
class adminController {
  // [GET] /admin
  index(req, res) {
    const { email, role } = req;
    res.render("admin/adminDashboard", { role, title: "Trang quản trị" });
  }

  // [GET] /admin/revenue
  async revenue(req, res) {
    const { email, role } = req;

    const startDate = new Date().toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    res.render("admin/revenue", {
      role,
      title: "Doanh thu",
      areas,
      branches,
      startDate,
      endDate,
      revenueStats: [],
      selectedArea: null,
      selectedBranch: null,
      selectedType: null,
    });
  }

  // [POST] /admin/revenue
  async getRevenueStats(req, res) {
    const { email, role } = req;
    const { startDate, endDate, branchId, statType, area } = req.body;

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    const revenueStats = await ChiNhanh.revenueStats(
      branchId,
      startDate,
      endDate,
      statType
    );

    res.render("admin/revenue", {
      role,
      title: "Doanh thu",
      areas,
      branches,
      startDate,
      endDate,
      revenueStats,
      selectedArea: area,
      selectedBranch: await ChiNhanh.one(branchId),
      selectedType: statType,
    });
  }

  // [GET] /admin/menu-stats
  async menuStats(req, res) {
    const { email, role } = req;

    const startDate = new Date().toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    const revenueStats = [];
    let highestDishes = [],
      lowestDishes = [];

    res.render("admin/menuStats", {
      role,
      title: "Thống kê menu",
      areas,
      branches,
      startDate,
      endDate,
      revenueStats,
      areas,
      highestDishes,
      lowestDishes,
      selectedArea: null,
      selectedBranch: null,
    });
  }

  // [POST] /admin/menu-stats
  async getMenuStats(req, res) {
    const { email, role } = req;
    const { startDate, endDate, branchId, area } = req.body;

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    console.log(branchId, startDate, endDate);

    const revenueStats = await ChiNhanh.menuStats(
      branchId ? branchId : null,
      startDate,
      endDate
    );
    const highestDishes = await ChiNhanh.highestDishes(
      branchId ? branchId : null,
      startDate,
      endDate
    );
    const lowestDishes = await ChiNhanh.lowestDishes(
      branchId ? branchId : null,
      startDate,
      endDate
    );

    res.render("admin/menuStats", {
      role,
      title: "Thống kê menu",
      areas,
      branches,
      startDate,
      endDate,
      revenueStats,
      areas,
      highestDishes,
      lowestDishes,
      selectedArea: area,
      selectedBranch: await ChiNhanh.one(branchId),
      startDate,
      endDate,
    });
  }

  // [GET] /admin/staff
  async staff(req, res) {
    const { email, role } = req;

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    const employees = [];

    res.render("admin/transferStaff", {
      role,
      title: "Nhân viên",
      areas,
      branches,
      employees,
    });
  }

  // [POST] /admin/staff-search
  async staffSearch(req, res) {
    const { email, role } = req;
    const { branch, area } = req.body;

    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    const employees = await ChiNhanh.employees(branch);

    res.render("admin/transferStaff", {
      role,
      title: "Nhân viên",
      areas,
      branches,
      employees,
    });
  }

  // [POST] /admin/staff
  async transStaff(req, res) {
    const { email, role } = req;
    const { MaBoPhan, id, Luong } = req.body;
    const nv = await NhanVien.one(id);
    if (!(await NhanVien.transfer(id, nv.HoTen, MaBoPhan, Luong))) {
      const toast = {
        message: "Không thể chuyển nhân viên này",
        type: "danger",
      };
      return res.render("admin/adminDashboard", {
        role,
        title: "Trang quản trị",
        toast,
      });
    } else {
      const toast = {
        message: "Chuyển nhân viên thành công",
        type: "success",
      };
      return res.render("admin/adminDashboard", {
        role,
        title: "Trang quản trị",
        toast,
      });
    }
  }

  // [GET] /admin/salary
  async info(req, res) {
    const { email, role } = req;
    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    res.render("admin/info", {
      role,
      title: "Thông tin",
      areas,
      branches,
      employees: [],
    });
  }

  // [POST] /admin/info
  async getInfoList(req, res) {
    const { email, role } = req;

    const { branch, area } = req.body;
    const areas = await KhuVuc.all();
    const branches = {};
    for (const cur of areas) {
      const chiNhanhs = await KhuVuc.chiNhanhs(cur.MaKhuVuc);
      branches[cur.MaKhuVuc] = chiNhanhs.map((cn) => cn);
    }

    let employees = [];
    if (!branch) {
      employees = (await NhanVien.all()).map((nv) => {
        return {
          ...nv,
          NgaySinh: new Date(nv.NgaySinh).toISOString().split("T")[0],
          NgayVaoLam: new Date(nv.NgayVaoLam).toISOString().split("T")[0],
          NgayNghiViec: nv.NgayNghiViec
            ? new Date(nv.NgayNghiViec).toISOString().split("T")[0]
            : null,
        };
      });
    } else {
      employees = (await ChiNhanh.employees(branch)).map((nv) => {
        return {
          ...nv,
          NgaySinh: new Date(nv.NgaySinh).toISOString().split("T")[0],
          NgayVaoLam: new Date(nv.NgayVaoLam).toISOString().split("T")[0],
          NgayNghiViec: nv.NgayNghiViec
            ? new Date(nv.NgayNghiViec).toISOString().split("T")[0]
            : null,
        };
      });
    }

    res.render("admin/info", {
      role,
      title: "Thông tin",
      areas,
      branches,
      employees,
    });
  }

  // [GET] /admin/info/:id
  async getInfoDetail(req, res) {
    const { email, role } = req;
    const { id } = req.params;
    const employee = await NhanVien.one(id);
    employee.NgaySinh = new Date(employee.NgaySinh).toISOString().split("T")[0];
    employee.NgayVaoLam = new Date(employee.NgayVaoLam)
      .toISOString()
      .split("T")[0];
    employee.NgayNghiViec = employee.NgayNghiViec
      ? new Date(employee.NgayNghiViec).toISOString().split("T")[0]
      : null;

    res.render("admin/updateEmployee", {
      role,
      title: "Chi tiết thông tin",
      employee,
    });
  }

  // [POST] /admin/info/:id
  async updateInfo(req, res) {
    const { email, role } = req;
    const { id } = req.params;
    const nv = await NhanVien.one(id);
    req.body.MaBoPhan = nv.MaBoPhan;

    await NhanVien.update(id, req.body);
    res.redirect("/admin/info");
  }

  async deleteInfo(req, res) {
    const { id } = req.params;
    const { role } = req;

    if (!(await NhanVien.delete(id))) {
      const toast = {
        message: "Không thể xóa nhân viên này",
        type: "danger",
      };
      return res.render("admin/adminDashboard", {
        role,
        title: "Trang quản trị",
        toast,
      });
    }
    res.redirect("/admin/info");
  }
}

module.exports = new adminController();
