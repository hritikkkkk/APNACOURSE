const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authenticateJwt } = require("../middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/courses", authenticateJwt, userController.courses);
router.post("/courses/:courseId", authenticateJwt, userController.getCourses);
router.get(
  "/purchasedCourses",
  authenticateJwt,
  userController.purchasedCourses
);

module.exports = router;
