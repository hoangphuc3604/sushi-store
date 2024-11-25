const { sql, poolPromise } = require("../utils/db");

class NhanVien {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM NHANVIEN");
    return result.recordset;
  }

  static async getNhanVienByMaNhanVien(maNhanVien) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .query("SELECT * FROM NHANVIEN WHERE MANHANVIEN = @maNhanVien");

    return result.recordset[0];
  }

  static async createNhanVien(nhanVien) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("maNhanVien", sql.VarChar, nhanVien.maNhanVien)
      .input("hoTen", sql.NVarChar, nhanVien.hoTen)
      .input("ngaySinh", sql.Date, nhanVien.ngaySinh)
      .input("gioiTinh", sql.VarChar, nhanVien.gioiTinh)
      .input("diaChi", sql.NVarChar, nhanVien.diaChi)
      .input("soDienThoai", sql.VarChar, nhanVien.soDienThoai);
    input("ngayVaoLam", sql.Date, nhanVien.ngayVaoLam)
      .input("ngayNghiViec", sql.Date, nhanVien.ngayNghiViec)
      .input("luong", sql.Decimal, nhanVien.luong)
      .input("maBoPhan", sql.VarChar, nhanVien.maBoPhan)
      .input("maChiNhanh", sql.VarChar, nhanVien.maChiNhanh)
      .query(
        "INSERT INTO NHANVIEN (MANHANVIEN, HOTEN, NGAYSINH, GIOITINH, DIACHI, SODIENTHOAI, NGAYVAOLAM, NGAYNGHIVIEC, LUONG, MABOPHAN, MACHINHANH) VALUES (@maNhanVien, @hoTen, @ngaySinh, @gioiTinh, @diaChi, @soDienThoai, @ngayVaoLam, @ngayNghiViec, @luong, @maBoPhan, @maChiNhanh)"
      );

    return await this.getNhanVienByMaNhanVien(nhanVien.maNhanVien);
  }

  static async updateNhanVien(maNhanVien, nhanVien) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .input("hoTen", sql.NVarChar, nhanVien.hoTen)
      .input("ngaySinh", sql.Date, nhanVien.ngaySinh)
      .input("gioiTinh", sql.VarChar, nhanVien.gioiTinh)
      .input("diaChi", sql.NVarChar, nhanVien.diaChi)
      .input("soDienThoai", sql.VarChar, nhanVien.soDienThoai);
    input("ngayVaoLam", sql.Date, nhanVien.ngayVaoLam)
      .input("ngayNghiViec", sql.Date, nhanVien.ngayNghiViec)
      .input("luong", sql.Decimal, nhanVien.luong)
      .input("maBoPhan", sql.VarChar, nhanVien.maBoPhan)
      .input("maChiNhanh", sql.VarChar, nhanVien.maChiNhanh)
      .query(
        "UPDATE NHANVIEN SET HOTEN = @hoTen, NGAYSINH = @ngaySinh, GIOITINH = @gioiTinh, DIACHI = @diaChi, SODIENTHOAI = @soDienThoai, NGAYVAOLAM = @ngayVaoLam, NGAYNGHIVIEC = @ngayNghiViec, LUONG = @luong, MABOPHAN = @maBoPhan, MACHINHANH = @maChiNhanh WHERE MANHANVIEN = @maNhanVien"
      );

    return await this.getNhanVienByMaNhanVien(maNhanVien);
  }

  static async deleteNhanVien(maNhanVien) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maNhanVien", sql.VarChar, maNhanVien)
      .query("DELETE FROM NHANVIEN WHERE MANHANVIEN = @maNhanVien");
  }
}

module.exports = NhanVien;
