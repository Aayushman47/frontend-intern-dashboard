const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const router = express.Router();

// IMPORTANT: validator comes BEFORE controller
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

module.exports = router;
