const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcryptSalt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne().or([{ username }, { email }]);

    existingAdmin
      ? res
          .status(400)
          .send(
            existingAdmin.username === username && existingAdmin.email === email
              ? "Username and email already exist"
              : existingAdmin.username === username
              ? "Username already exists"
              : "Email already exists"
          )
      : null;

    const newAdmin = new Admin({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "welcome to ApnaCourse Admin Club", token });
  } catch (error) {
    console.error(error);
  }
};

module.exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const admin = await Admin.findOne().or([
      { username: emailOrUsername },
      { email: emailOrUsername },
    ]);

    if (admin) {
      const passwordChecks = bcrypt.compareSync(password, admin.password);
      
      if (passwordChecks) {
        jwt.sign(
          {
            email: admin.email,
            id: admin._id,
          },
          JWT_SECRET,
          {expiresIn:'1h'},
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


