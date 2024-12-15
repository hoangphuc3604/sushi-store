const { sql, poolPromise } = require("../utils/db");
const { createId } = require("../utils/idCreator");

class KhachHang {
    static async add(khachHang) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maKhach", sql.VarChar, createId("KH"))
            .input("tenKhach", sql.NVarChar, khachHang.tenKhachHang)
            .input("email", sql.VarChar, khachHang.email)
            .input("soDienThoai", sql.VarChar, khachHang.soDienThoai)
            .input("cccd", sql.NChar, khachHang.CCCD)
            .input("gioiTinh", sql.NChar, khachHang.gioiTinh)
            .execute("sp_TaoKhachHang");
    }

    static async one(email) {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .execute("sp_LayThongTinKhachHangBangEmail");

        return result.recordset[0];
    }

    static async bill(maKhachHang, ngayLap) {
        const pool = await poolPromise;

        maKhachHang = maKhachHang || null;

        const result = await pool
            .request()
            .input("maKhachHang", sql.VarChar, maKhachHang)
            .input("ngay", sql.DateTime, ngayLap)
            .execute("sp_TimHoaDon");

        return result.recordset;
    }

    static async allTheKhachHang() {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .query("SELECT * FROM THE_KHACH_HANG");

        return result.recordset;
    }

    static async oneTheKhachHang(maThe) {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("maThe", sql.VarChar, maThe)
            .query("SELECT * FROM THE_KHACH_HANG WHERE MaThe = @maThe");

        return result.recordset[0];
    }

    static async searchTheKhachHang(query) {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("query", sql.NVarChar, query)
            .execute("sp_TimKiemTheKhachHang");

        return result.recordset;
    }

    static async addTheKhachHang(maKhachHang) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maKhachHang", sql.VarChar, maKhachHang)
            .execute("sp_TaoTheKhachHang");
    }

    static async updateTheKhachHang(maThe, ngayLap, ngayHetHan, diemTichLuy, trangThai, maKhachHang) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maThe", sql.VarChar, maThe)
            .input("ngayLap", sql.DateTime, ngayLap)
            .input("ngayHetHan", sql.DateTime, ngayHetHan)
            .input("diemTichLuy", sql.Int, diemTichLuy)
            .input("trangThai", sql.Bit, trangThai)
            .input("maKhachHang", sql.VarChar, maKhachHang)
            .execute("sp_CapNhatTheKhachHang");
    }

    static async deleteTheKhachHang(maThe) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maThe", sql.VarChar, maThe)
            .execute("sp_XoaTheKhachHang");
    }


}

module.exports = KhachHang;
