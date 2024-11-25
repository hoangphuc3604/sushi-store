const { sql, poolPromise } = require("../utils/db");
const bcrypt = require("bcrypt");

class User {
  static async getUserByEmail(email) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM [USER] WHERE email = @email");
    return result.recordset[0];
  }

  static async createUser(user) {
    const pool = await poolPromise;
    const hash = await bcrypt.hash(user.password, 10);

    await pool
      .request()
      .input("email", sql.VarChar, user.email)
      .input("password", sql.VarChar, hash)
      .input(
        "image",
        sql.VarChar,
        user.image ? user.image : process.env.DEFAULT_IMAGE
      )
      .query(
        "INSERT INTO [USER] (email, password, image) VALUES (@email, @password, @image)"
      );

    return await this.getUserByEmail(user.email);
  }
}

module.exports = User;
