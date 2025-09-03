const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { use } = require("react")

router.get("/", userController.getUsernames)

router.get("/new", userController.createUsernameGet)

router.post("/new", userController.createUsernamePost)

module.exports = router