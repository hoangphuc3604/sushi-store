const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.redirect("/auth/login");
  } else {
    try {
      const decodeToken = jwt.verify(accessToken, process.env.SECRET);
      req.email = decodeToken.email;
      req.role = decodeToken.role;
      next();
    } catch (error) {
      return res.redirect("/auth/login");
    }
  }
};