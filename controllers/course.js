const Course = require("../models/course");

module.exports.new = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "course created succesfully" ,courseId:course.id});
};

module.exports.courses = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
}
