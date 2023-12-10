const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./middleware/fetchuser");

// password
const JWT_SECRET = "Laiba@BadGirl";
//  ROUTE: 0 = get request for just will never show error on the browser!!
router.get("/", (req, res) => {
  res.send("Hello My INotebook app");
});
// ROUTE: 1 = Create a User using: POST /api/auth/createuser, No login require!
router.post(
  "/createuser",
  // for get vaild uesr data with using express-validator
  [
    body("name", "Enter a Vaild name").isLength({ min: 4 }),
    body("email", " Enter a curect email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 6 }),
  ],
  // if there are err returne bad request and with the error
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether user with the email that exeist already!
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry This Gmail Already exsits in the site" });
      }
      // set password vaildration with salt and hash to create
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, // set function to set salt and hash
      });
      // find user with their id because that are uniqe for all user
      const data = {
        user: {
          id: user.id,
        },
      };
      // to create uesr authtoken by using password and data
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });

      // other wise we do logger and SQS at this time we do console.error if we have any error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE: 2 = Authenticate a User using: POST /api/auth/login, No login required!
router.post(
  "/login",
  // for login user on our site endpoint by password and email
  [
    body("email", "Enter a correct & vaild email").isEmail(),
    body("password", "Password cannot be blanck").exists(),
  ],
  async (req, res) => {
    // if there are err some are not vaild so return bad request and with the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // to out email and password from req.body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with Correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  // ROUTE: 3 = Get logedin User detailes by using: POST /api/auth/getuser, Login required!
router.post("/getuser", fetchuser, async (req, res) => {

try {
  userId= req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
  }
);
module.exports = router;
