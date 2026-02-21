const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1day" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while logging in user", error: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json(req.user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering error", error: err.message });
  }
};
