import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  console.log("REGISTER API HIT");

  const { name, email, password,role } = req.body;
  const roleLower = role ? role.toLowerCase():"user";

  if (!name || !email || !password ||!role) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedpassword = await bcrypt.hash(password,10);
  const user = await User.create({ name, email, password:hashedpassword,role:roleLower });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    message: "User registered successfully",
  });
  
};
export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN API HIT");

    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password (plain text notice)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
        {id:user._id,
          role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

    // success
    res.status(200).json({
      message: "Login successful",
      token:token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


