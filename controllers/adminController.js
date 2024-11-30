class adminController {
    // [GET] /admin
    index(req, res) {
        const { email, role } = req;
        res.render('admin/adminDashboard', { role, title: "Trang quản trị" });
    }
}

module.exports = new adminController();