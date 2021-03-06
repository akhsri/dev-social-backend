var express = require("express");
var router = express.Router();
const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", [
    check("firstName", "firstName should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "Password should be atleast 3 characters").isLength({ min: 1 })

], signup);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 3 })

], signin)

router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
})

module.exports = router