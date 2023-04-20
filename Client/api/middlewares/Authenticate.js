const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log({token},"asd")
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  function verifyToken(token) {
    return jwt.verify(token, process.env.JSON_SECRET);
  }
module.exports = authenticate