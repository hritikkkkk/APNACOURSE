const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");
const { authenticateJwt } = require("../middleware");

router.route("/courses")
    .post(authenticateJwt, courseController.new)
    .get(authenticateJwt,courseController.courses)


module.exports = router;