const e = require("express")
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

//get
router.get("/sign-up", authController.signup_get)

//post
router.post("/sign-up", authController.signup_post)

module.exports = router