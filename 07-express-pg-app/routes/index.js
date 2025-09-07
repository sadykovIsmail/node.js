const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getUsernames);
router.get("/new", controller.createUsernameGet);
router.post("/new", controller.createUsernamePost);

module.exports = router;
