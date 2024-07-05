import cloudinary from "cloudinary";

import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, getDataUri, sendToken } from "../utils/features.js";
import { User } from "../models/user.js";
import { sendEmail } from "../utils/features.js";

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

export const signUp = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  let avatar = undefined;

  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
    avatar,
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
  const { name, email, address, city, country, pinCode } = req.body;

  const user = await User.findById(req.user._id);

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

export const updatePic = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = getDataUri(req.file);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(file.content);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar update successfully",
  });
});

export const forgetPassword = asyncError(async (req, res, next) => {
  console.log("Forget password");

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Incorrect email", 404));
  }

  // max, min 2000, 10000
  // math.random() * (max - min) + min

  const randomNumber = Math.random() * (999999 - 100000) + 10000;
  const otp = Math.floor(randomNumber);
  const otpExpire = 15 * 60 * 1000;

  user.otp = otp;
  user.otpExpire = new Date(Date.now() + otpExpire);

  await user.save();

  const message = `Your OTP reseting password is ${otp}. \n Please ignore if you haven't requested this.`;

  try {
    await sendEmail("OTP for reseting password", user.email, message);
  } catch (error) {
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return next(error);
  }

  res.status(200).json({
    success: true,
    message: `Email sent to your email ${user.email}`,
  });
});

export const resetPassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});
