const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const course = require("../models/course");
const bcryptSalt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;
const Course = require("../models/course");

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne().or([{ username }, { email }]);

    existingUser
      ? res
          .status(400)
          .send(
            existingUser.username === username && existingUser.email === email
              ? "Username and email already exist"
              : existingUser.username === username
              ? "Username already exists"
              : "Email already exists"
          )
      : null;

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    await newUser.save();

    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "welcome to ApnaCourse User Club", token });
  } catch (error) {
    console.error(error);
  }
};

module.exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne().or([
      { username: emailOrUsername },
      { email: emailOrUsername },
    ]);

    if (user) {
      const passwordChecks = bcrypt.compareSync(password, user.password);

      if (passwordChecks) {
        jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) throw err;
            res.json({ message: "logged in sucessfully", token });
          }
        );
      } else {
        res.status(422).json("invalid password");
      }
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

module.exports.courses = async (req, res) => {
  console.log(req.user.email);
  const courses = await Course.find({ published: true });
  res.json({ courses });
};

module.exports.getCourses = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "course purchased successfully" });
    } else {
      res.status(403).json({ message: "user not found" });
    }
  } else {
    res.status(404).json({ message: "course not found" });
  }
};

module.exports.purchasedCourses = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate(
    "purchasedCourses"
  );

  if (user) res.json({ purchasedCourses: user.purchasedCourses || [] });
  else res.status(403).json({ message: "user not found" });
};
