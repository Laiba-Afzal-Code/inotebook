const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("januuu");
})
// create a User using: POST /api/auth/, Doesn't require Auth!
router.post('/register', (req, res)=>{
    console.log(req.body);
    const user = User(req.body)
    user.save()
    res.send(req.body);
});
module.exports = router