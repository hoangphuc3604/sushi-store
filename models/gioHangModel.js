const { sql, poolPromise } = require("../utils/db");
const KhachHang = require("./khachHangModel");

class GioHang {
    static async getGioHang(email, food) {
        const pool = await poolPromise;
        const khachHang = await KhachHang.getKhachHangByEmail(email);

        const result = await pool
            .request()
            .input("maKhachHang", sql.Int, khachHang.MAKHACHHANG)
            .input("maMon", sql.Int, food)
            .query(
                "SELECT * FROM GIOHANG WHERE MAKHACHHANG = @maKhachHang AND MAMON = @maMon"
            );

        return result.recordset;
    }

    static async createGioHang(email, food, staff) {
        const pool = await poolPromise;

        const check = await this.getGioHang(email, food);
        if (check.length > 0) {
            await pool
                .request()
                .input("maKhachHang", sql.Int, check[0].MAKHACHHANG)
                .input("maMon", sql.Int, food)
                .input("soLuong", sql.Int, check[0].SOLUONG + 1)
                .query(
                    "UPDATE GIOHANG SET SOLUONG = @soLuong WHERE MAKHACHHANG = @maKhachHang AND MAMON = @maMon"
                );
            return;
        }

        const khachHang = await KhachHang.getKhachHangByEmail(email);
        await pool
            .request()
            .input("maKhachHang", sql.Int, khachHang.MAKHACHHANG)
            .input("maMon", sql.Int, food)
            .input("soLuong", sql.Int, 1)
            .query(
                "INSERT INTO GIOHANG (MAKHACHHANG, MAMON, SOLUONG) VALUES (@maKhachHang, @maMon, @soLuong)"
            );
    }

    static async getGioHangByMaKhachHang(maKhachHang) {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("maKhachHang", sql.Int, maKhachHang)
            .query(
                "SELECT GH.ID ID, GH.MAKHACHHANG MAKHACHHANG, M.TENMON TENMON, M.MAMON MAMON, GH.SOLUONG SOLUONG, GH.NGAYTHEM NGAYTHEM, M.GIA GIA FROM GIOHANG GH, MONAN M WHERE GH.MAKHACHHANG = @maKhachHang AND GH.MAMON = M.MAMON"
            );

        return result.recordset;
    }

    static async updateGioHang(maMon, maKhachHang, soLuong) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maKhachHang", sql.Int, maKhachHang)
            .input("maMon", sql.Int, maMon)
            .input("soLuong", sql.Int, soLuong)
            .query(
                "UPDATE GIOHANG SET SOLUONG = @soLuong WHERE MAKHACHHANG = @maKhachHang AND MAMON = @maMon"
            );
    }

    static async removeGioHang(maMon, maKhachHang) {
        const pool = await poolPromise;

        await pool
            .request()
            .input("maKhachHang", sql.Int, maKhachHang)
            .input("maMon", sql.Int, maMon)
            .query(
                "DELETE FROM GIOHANG WHERE MAKHACHHANG = @maKhachHang AND MAMON = @maMon"
            );
    }
}

module.exports = GioHang;
