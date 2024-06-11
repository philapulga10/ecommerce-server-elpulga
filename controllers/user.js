import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { User } from "../models/user.js";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Incorrect email or password", 400));
  }

  if (!password) {
    return next(new ErrorHandler("Please enter password", 400));
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect email or password", 400));
  }

  sendToken(user, res, `Welcome back, ${user.name}`, 200);
});

export const signUp = asyncError(async (req, res) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  sendToken(user, res, "Registered successfully", 200);
});

export const logOut = asyncError(async (_, res) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { name, email, address, city, country, pinCode } = req.body;

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (address) {
    user.address = address;
  }
  if (city) {
    user.city = city;
  }
  if (country) {
    user.country = country;
  }
  if (pinCode) {
    user.pinCode = pinCode;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new ErrorHandler("Please enter old password & new password", 400)
    );
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect old password"));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
