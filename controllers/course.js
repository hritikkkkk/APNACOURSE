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

module.exports.update = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: "course updated to latest information" });
  } else {
    res.json({ message: "course not found" });
  }
}