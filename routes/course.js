const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");
const { authenticateJwt } = require("../middleware");

router.route("/courses")
    .post(authenticateJwt, courseController.new)
    .get(authenticateJwt,courseController.courses)


router.put("/courses/:courseId", authenticateJwt, courseController.update);  

module.exports = router;