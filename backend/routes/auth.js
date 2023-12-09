const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// password 
const JWT_SECRET = "Laiba@BadGirl"

router.get("/", (req, res) => {
  res.send("Hello My INotebook app");
});
// create a User using: POST /api/auth/createuser, No login require!
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
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
            id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

    //   res.json(user);
      res.json({authtoken})

      // other wise we do logger and SQS at this time we do console.error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
module.exports = router;
