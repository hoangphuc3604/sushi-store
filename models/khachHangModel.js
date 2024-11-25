const { sql, poolPromise } = require("../utils/db");

class KhachHang {
    static async createKhachHang(khachHang) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("tenKhachHang", sql.NVarChar, khachHang.tenKhachHang)
            .input("email", sql.VarChar, khachHang.email)
            .input("soDienThoai", sql.VarChar, khachHang.soDienThoai)
            .input("CCCD", sql.NChar, khachHang.CCCD)
            .input("gioiTinh", sql.NChar, khachHang.gioiTinh)
            .query(
                "INSERT INTO KHACHHANG (HOTEN, EMAIL, SODIENTHOAI, CCCD, GIOITINH) VALUES (@tenKhachHang, @email, @soDienThoai, @CCCD, @gioiTinh)"
            );
    }

    static async getKhachHangByEmail(email) {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM KHACHHANG WHERE EMAIL = @email");

        return result.recordset[0];
    }
}

module.exports = KhachHang;
