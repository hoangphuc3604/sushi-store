const { sql, poolPromise } = require("../utils/db");
const PER_PAGE = 8;

class MonAn {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT MONAN.MAMON, MONAN.TENMON TENMON, MONAN.GIA GIA, PHANMUC.TENPHANMUC PHANMUC, KHUVUC.TENKHUVUC KHUVUC, KHUVUC.MAKHUVUC MAKHUVUC FROM MONAN, PHANMUC, THUCDON, KHUVUC WHERE MONAN.MAPHANMUC = PHANMUC.MAPHANMUC AND PHANMUC.MATHUCDON = THUCDON.MATHUCDON AND THUCDON.MAKHUVUC = KHUVUC.MAKHUVUC"); 
    return result.recordset;
  }

  static async getMonAnByMaMonAn(maMonAn) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maMonAn", sql.VarChar, maMonAn)
      .query("SELECT * FROM MONAN WHERE MAMON = @maMonAn");
    return result.recordset[0];
  }

  static async createMonAn(monAn) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("maMonAn", sql.VarChar, monAn.maMon)
      .input("tenMonAn", sql.NVarChar, monAn.tenMonAn)
      .input("gia", sql.Decimal, monAn.gia)
      .input("trangThaiPhucVu", sql.Bit, monAn.trangThaiPhucVu)
      .input("maPhanMuc", sql.VarChar, monAn.maPhanMuc)
      .query(
        "INSERT INTO MONAN (MAMON, TENMON, TRANGTHAIPHUCVU, MAPHANMUC) VALUES (@maMonAn, @tenMonAn, @gia, @trangThaiPhucVu, @maPhanMuc)"
      );

    return await this.getMonAnByMaMonAn(monAn.maMonAn);
  }

  static async updateMonAn(maMonAn, monAn) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maMonAn", sql.VarChar, maMonAn)
      .input("tenMonAn", sql.NVarChar, monAn.tenMonAn)
      .input("gia", sql.Decimal, monAn.gia)
      .input("trangThaiPhucVu", sql.Bit, monAn.trangThaiPhucVu)
      .input("maPhanMuc", sql.VarChar, monAn.maPhanMuc)
      .query(
        "UPDATE MONAN SET TENMON = @tenMonAn, GIA = @gia, TRANGTHAIPHUCVU = @trangThaiPhucVu, MAPHANMUC = @maPhanMuc WHERE MAMON = @maMonAn"
      );
    return await this.getMonAnByMaMonAn(maMonAn);
  }

  static async deleteMonAn(maMonAn) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maMonAn", sql.VarChar, maMonAn)
      .query("DELETE FROM MONAN WHERE MAMONAN = @maMonAn");
  }

  static async searchMonAn(query) {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("query", sql.VarChar, `%${query.toLowerCase()}%`)
        .query(`
            SELECT * 
            FROM MONAN 
            WHERE LOWER(TENMON) LIKE @query
        `);
    return result.recordset;
  }

  static async getTableLength() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT COUNT(*) AS total FROM MONAN");
    return result.recordset[0].total;
  }

  static async getMonAnByIndex(index) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("index", sql.Int, index)
      .query("SELECT MONAN.MAMON, MONAN.TENMON TENMON, MONAN.GIA GIA, PHANMUC.TENPHANMUC PHANMUC, KHUVUC.TENKHUVUC KHUVUC, KHUVUC.MAKHUVUC MAKHUVUC FROM MONAN, PHANMUC, THUCDON, KHUVUC WHERE MONAN.MAPHANMUC = PHANMUC.MAPHANMUC AND PHANMUC.MATHUCDON = THUCDON.MATHUCDON AND THUCDON.MAKHUVUC = KHUVUC.MAKHUVUC ORDER BY MONAN.MAMON OFFSET @index ROWS FETCH NEXT 8 ROWS ONLY");
    return result.recordset;
  }
}

module.exports = MonAn;
