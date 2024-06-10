import { User } from "../models/user.js";

export const login = async (_, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ success: false, message: "Incorrect email" });
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect password" });
  }

  res
    .status(200)
    .json({ success: true, message: `Welcome back, ${user.name}` });
};

export const signUp = async (_, res) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  // add cloudinary here

  await User.create({ name, email, password, address, city, country, pinCode });

  res.status(201).json({ success: true, message: "Registered successfully" });
};
