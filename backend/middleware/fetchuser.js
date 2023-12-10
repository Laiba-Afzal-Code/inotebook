const jwt = require("jsonwebtoken");
const JWT_SECRET = "Laiba@BadGirl";
const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id for req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate a using vaild token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
  } catch (error) {
    res.status(401).send({ error: "Please authenticate a using vaild token" });
  }
  next();
};

module.exports = fetchuser;
