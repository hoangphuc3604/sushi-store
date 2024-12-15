const { sql, poolPromise } = require("../utils/db");

class PhieuDat {

    static async search(maKhachHang, ngayLap, maNhanVien, index) {

    }

    static async one(maPhieuDat) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('maPhieuDat', sql.Int, maPhieuDat)
                .query(`SELECT * FROM PHIEU_MUA_HANG WHERE MaPhieu = @maPhieuDat`);
            return result.recordset;
        } catch (err) {
            console.log(err);
        }
    }

    static async update() {
        const pool = await poolPromise;
        
    }

    static async delete(maPhieu) {
        const pool = await poolPromise;
        try {
            const result = await pool.request()
                .input('maPhieu', sql.VarChar, maPhieu)
                .execute('sp_ThemPhieuDatMon');
            return result;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = PhieuDat;  