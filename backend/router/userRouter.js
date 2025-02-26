const express = require("express");

const rateLimit = require("express-rate-limit");
require("../config/connected");
const userCtrl = require("../controller/userController");
const { isAuthenticated } = require("../middeleware/authanticated");

const router = express.Router();


// Rate Limiter for Login Endpoint
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 5 login requests per windowMs
//   message: "Too many login attempts from this IP, please try again later.",
// });
router.post("/signup", userCtrl.register);
router.post("/login",  userCtrl.loginUser);
router.post("/logout", userCtrl.logoutUser);
router.get(
  "/profile",
  isAuthenticated,
  userCtrl.getUserProfile
);


module.exports = router;
