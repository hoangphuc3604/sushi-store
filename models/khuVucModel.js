const { sql, poolPromise } = require("../utils/db");

class KhuVuc {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM KHUVUC");
    return result.recordset;
  }

  static async getKhuVucByMaKhuVuc(maKhuVuc) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maKhuVuc", sql.VarChar, maKhuVuc)
      .query("SELECT * FROM KHUVUC WHERE MAKHUVUC = @maKhuVuc");
    return result.recordset[0];
  }

  static async createKhuVuc(khuVuc) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("maKhuVuc", sql.VarChar, khuVuc.maKhuVuc)
      .input("tenKhuVuc", sql.NVarChar, khuVuc.tenKhuVuc)
      .query(
        "INSERT INTO KHUVUC (MAKHUVUC, TENKHUVUC) VALUES (@maKhuVuc, @tenKhuVuc)"
      );

    return await this.getKhuVucByMaKhuVuc(khuVuc.maKhuVuc);
  }

  static async updateKhuVuc(maKhuVuc, khuVuc) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maKhuVuc", sql.VarChar, maKhuVuc)
      .input("tenKhuVuc", sql.NVarChar, khuVuc.tenKhuVuc)
      .query(
        "UPDATE KHUVUC SET TENKHUVUC = @tenKhuVuc WHERE MAKHUVUC = @maKhuVuc"
      );

    return await this.getKhuVucByMaKhuVuc(maKhuVuc);
  }

  static async deleteKhuVuc(maKhuVuc) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maKhuVuc", sql.VarChar, maKhuVuc)
      .query("DELETE FROM KHUVUC WHERE MAKHUVUC = @maKhuVuc");
  }

  static async getChiNhanhByMaKhuVuc(maKhuVuc) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maKhuVuc", sql.Int, maKhuVuc)
      .query("SELECT * FROM CHINHANH WHERE MAKHUVUC = @maKhuVuc");
    return result.recordset;
  }

  static async getAllPhanMucByMaKhuVuc(maKhuVuc) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maKhuVuc", sql.Int, maKhuVuc)
      .query("SELECT P.MAPHANMUC, P.TENPHANMUC FROM PHANMUC P, THUCDON T, KHUVUC K WHERE K.MAKHUVUC = @maKhuVuc AND K.MAKHUVUC = T.MAKHUVUC AND P.MATHUCDON = T.MATHUCDON");
    return result.recordset;
  }
}

module.exports = KhuVuc;
