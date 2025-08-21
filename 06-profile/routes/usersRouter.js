// routes/usersRouter.js
const { Router } = require("express");               // 1
const usersController = require("../controllers/usersController"); // 2
const usersRouter = Router();                        // 3

// list all users (GET /)
usersRouter.get("/", usersController.usersListGet);  // 4

// create user (GET shows form, POST submits form)
usersRouter.get("/create", usersController.usersCreateGet); // 5
usersRouter.post("/create", usersController.usersCreatePost); // 6

// update user (GET shows form, POST saves changes)
usersRouter.get("/:id/update", usersController.usersUpdateGet); // 7
usersRouter.post("/:id/update", usersController.usersUpdatePost); // 8

// delete user (POST route)
usersRouter.post("/:id/delete", usersController.usersDeletePost); // 9

module.exports = usersRouter;                        // 10
