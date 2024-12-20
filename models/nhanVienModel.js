const { sql, poolPromise } = require("../utils/db");

class NhanVien {
  static async all() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM NHAN_VIEN");
    return result.recordset;
  }

  static async getMaNhanVienByEmail(Email) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .query("SELECT MaNhanVien FROM STAFF_APP WHERE Email = @Email");

    return result.recordset[0].MaNhanVien;
  }

  static async one(maNhanVien) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .query("SELECT NV.*, CN.MaChiNhanh FROM NHAN_VIEN NV JOIN BO_PHAN BP ON NV.MaBoPhan = BP.MaBoPhan JOIN CHI_NHANH CN ON BP.MaChiNhanh = CN.MaChiNhanh WHERE NV.MaNhanVien = @maNhanVien");
    return result.recordset[0];
  }

  static async add(nhanVien) {
    const pool = await poolPromise;

    await pool
      .request()
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
      .input("tenNhanVien", sql.NVarChar, nhanVien.HoTen)
      .input("maBoPhan", sql.VarChar, nhanVien.MaBoPhan)
      .input("Luong", sql.Int, nhanVien.Luong)
      .execute("sp_SuaNhanVien");

    return await this.one(maNhanVien);
  }

  static async delete(maNhanVien) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("maNhanVien", sql.VarChar, maNhanVien)
        .execute("sp_XoaNhanVien");
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  static async addOrder(maNhanVien, maKhachHang) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .input("ngayLap", sql.DateTime, new Date())
      .input("maKhachHang", sql.VarChar, maKhachHang)
      .execute("sp_ThemPhieuDatMon");
    
    const result = await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .input("maKhachHang", sql.VarChar, maKhachHang)
      .input("ngayDat", sql.DateTime, new Date())
      .execute("sp_TimPhieuDat");

    return result.recordset[0];
  }

  static async addOrderDetail(maPhieuDatMon, maMonAn, soLuong) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maPhieuDatMon", sql.VarChar, maPhieuDatMon)
      .input("maMonAn", sql.VarChar, maMonAn)
      .input("soLuong", sql.Int, soLuong)
      .execute("sp_ThemChiTietPhieuDatMon");
    
    return await this.one(maPhieuDatMon);
  }

  static async search(maChiNhanh, query) {
    maChiNhanh = maChiNhanh || "all";
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("query", sql.NVarChar, query)
      .input("maChiNhanh", sql.VarChar, maChiNhanh)
      .execute("sp_TimKiemNhanVien");
    return result.recordset;
  }

  static async transfer(maNhanVien, hoTen, maBoPhan, Luong) {
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input("maNhanVien", sql.VarChar, maNhanVien)
        .input("tenNhanVien", sql.NVarChar, hoTen)
        .input("maBoPhan", sql.VarChar, maBoPhan)
        .input("Luong", sql.Int, Luong)
        .execute("sp_ChuyenNhanVien");

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = NhanVien;
