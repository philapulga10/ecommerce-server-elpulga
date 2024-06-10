import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";

export const login = async (_, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ success: false, message: "Incorrect email" });
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect password", 400));
  }

  res
    .status(200)
    .json({ success: true, message: `Welcome back, ${user.name}` });
};

export const signUp = async (req, res) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  // ADD CLOUDINARY HERE

  await User.create({ name, email, password, address, city, country, pinCode });

  res.status(201).json({ success: true, message: "Registered successfully" });
};
