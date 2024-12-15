const { sql, poolPromise } = require("../utils/db");

class ChiNhanh {
  static async all() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM CHINHANH");
    return result.recordset;
  }
}

module.exports = ChiNhanh;
