const e = require("express")
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

//get
router.get("/signup", authController.signup_get)

//post
router.post("/signup", authController.signup_post)

module.exports = router