const { sql, poolPromise } = require("../utils/db");
const bcrypt = require("bcrypt");

class User {
  static async one(email) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM USER_APP WHERE Email = @email");
    return result.recordset[0];
  }

  static async add(user) {
    const pool = await poolPromise;
    const hash = await bcrypt.hash(user.password, 10);

    await pool
      .request()
      .input("email", sql.VarChar, user.email)
      .input("password", sql.VarChar, hash)
      .query(
        "INSERT INTO [USER_APP] (email, password) VALUES (@email, @password)"
      );

    return await this.getUserByEmail(user.email);
  }
}

module.exports = User;
