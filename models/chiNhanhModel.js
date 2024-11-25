const { sql, poolPromise } = require("../utils/db");

class ChiNhanh {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM CHINHANH");
    return result.recordset;
  }

  static async getChiNhanhByMaChiNhanh(maChiNhanh) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("maChiNhanh", sql.VarChar, maChiNhanh)
      .query("SELECT * FROM CHINHANH WHERE MACHINHANH = @maChiNhanh");

    return result.recordset[0];
  }

  static async createChiNhanh(chiNhanh) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("maChiNhanh", sql.VarChar, chiNhanh.maChiNhanh)
      .input("tenChiNhanh", sql.NVarChar, chiNhanh.tenChiNhanh)
      .input("TGMo", sql.Time, chiNhanh.thoiGianMoCua)
      .input("TGDong", sql.Time, chiNhanh.thoiGianDongCua)
      .input("SDT", sql.VarChar, chiNhanh.SDT)
      .input("diaChi", sql.NVarChar, chiNhanh.diaChi)
      .input("baiDoXeHoi", sql.Bit, chiNhanh.baiDoXeHoi)
      .input("baiDoXeMay", sql.Bit, chiNhanh.baiDoXeMay)
      .input("maKhuvuc", sql.VarChar, chiNhanh.maKhuVuc)
      .input("quanLiChiNhanh", sql.VarChar, chiNhanh.quanLiChiNhanh)
      .query(
        "INSERT INTO CHINHANH (MACHINHANH, TENCHINHANH, THOIGIANMO, THOIGIANDONG, SDT, DIACHI, BAIDOXEHOI, BAIDOXEMAY, MAKHUVUC, QUANLICHINHANH) VALUES (@maChiNhanh, @tenChiNhanh, @TGMo, @TGDong, @SDT, @diaChi, @baiDoXeHoi, @baiDoXeMay, @maKhuvuc, @quanLiChiNhanh)"
      );

    return await this.getChiNhanhByMaChiNhanh(chiNhanh.maChiNhanh);
  }

  static async updateChiNhanh(maChiNhanh, chiNhanh) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maChiNhanh", sql.VarChar, maChiNhanh)
      .input("tenChiNhanh", sql.NVarChar, chiNhanh.tenChiNhanh)
      .input("TGMo", sql.Time, chiNhanh.thoiGianMoCua)
      .input("TGDong", sql.Time, chiNhanh.thoiGianDongCua)
      .input("SDT", sql.VarChar, chiNhanh.SDT)
      .input("diaChi", sql.NVarChar, chiNhanh.diaChi)
      .input("baiDoXeHoi", sql.Bit, chiNhanh.baiDoXeHoi)
      .input("baiDoXeMay", sql.Bit, chiNhanh.baiDoXeMay)
      .input("maKhuvuc", sql.VarChar, chiNhanh.maKhuVuc)
      .input("quanLiChiNhanh", sql.VarChar, chiNhanh.quanLiChiNhanh)
      .query(
        "UPDATE CHINHANH SET TENCHINHANH = @tenChiNhanh, THOIGIANMO = @TGMo, THOIGIANDONG = @TGDong, SDT = @SDT, DIACHI = @diaChi, BAIDOXEHOI = @baiDoXeHoi, BAIDOXEMAY = @baiDoXeMay, MAKHUVUC = @maKhuvuc, QUANLICHINHANH = @quanLiChiNhanh WHERE MACHINHANH = @maChiNhanh"
      );

    return await this.getChiNhanhByMaChiNhanh(maChiNhanh);
  }

  static async deleteChiNhanh(maChiNhanh) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("maChiNhanh", sql.VarChar, maChiNhanh)
      .query("DELETE FROM CHINHANH WHERE MACHINHANH = @maChiNhanh");
  }
}

module.exports = ChiNhanh;
