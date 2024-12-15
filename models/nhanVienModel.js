const { sql, poolPromise } = require("../utils/db");
const { id_creator } = require("../utils/idCreator");

class NhanVien {
  static async all() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM NHAN_VIEN");
    return result.recordset;
  }

  static async one(maNhanVien) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .query("SELECT * FROM NHAN_VIEN WHERE MaNhanVien = @maNhanVien");

    return result.recordset[0];
  }

  static async add(nhanVien) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("maNhanVien", sql.VarChar, id_creator("NV"))
      .input("tenNhanVien", sql.NVarChar, nhanVien.hoTen)
      .input("maBoPhan", sql.VarChar, nhanVien.maBoPhan)
      .execute("sp_ThemNhanVien");

    return await this.one(nhanVien.maNhanVien);
  }

  static async update(maNhanVien, nhanVien) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .input("tenNhanVien", sql.NVarChar, nhanVien.hoTen)
      .input("maBoPhan", sql.VarChar, nhanVien.maBoPhan)
      .execute("sp_SuaNhanVien");

    return await this.one(maNhanVien);
  }

  static async delete(maNhanVien) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .execute("sp_XoaNhanVien");
  }

  static async addOrder(maNhanVien, maKhachHang, maMon, soLuong) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maPhieu", sql.VarChar, id_creator("PMH"))
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .input("ngayLap", sql.DateTime, new Date())
      .input("maKhachHang", sql.VarChar, maKhachHang)
      .input("maMon", sql.VarChar, maMon)
      .input("soLuong", sql.Int, soLuong)
      .execute("sp_ThemPhieuDatMon");
    
    return await this.one(maNhanVien);
  }

  static async search(maChiNhanh, query) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("query", sql.NVarChar, query)
      .input("maChiNhanh", sql.VarChar, maChiNhanh)
      .execute("sp_TimKiemNhanVien");

    return result.recordset;
  }
}

module.exports = NhanVien;
