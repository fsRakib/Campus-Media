import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    //basic validation
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        msg: "Please fill in all fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        msg: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        msg: "Please fill in all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: "User does not exist",
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Incorrect email or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        msg: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    msg: "Usert logged out successfully",
    success: true,
  });
};

export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const chitId = req.params.id;
    const user = await User.findById(loggedInUserId);
    if (user.bookmarks.includes(chitId)) {
      //remove
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: chitId },
      });
      return res.status(200).json({
        msg: "Removed from bookmarks",
        success: true,
      });
    } else {
      //add
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: chitId },
      });
      return res.status(200).json({
        msg: "Add to bookmarks",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params; //changed body to params
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers) {
      return res.status(401).json({
        msg: "No users found",
        success: false,
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const otherUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const otherUser = await User.findById(otherUserId);

    if (!otherUser.followers.includes(loggedInUserId)) {
      await otherUser.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: otherUserId } });
    } else {
      return res.status(401).json({
        msg: `User already following to ${otherUser.name}`,
      });
    }
    return res.status(200).json({
      msg: `${loggedInUser.name} just follow to ${otherUser.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const otherUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const otherUser = await User.findById(otherUserId);

    if (loggedInUser.following.includes(otherUserId)) {
      await otherUser.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $pull: { following: otherUserId } });
    } else {
      return res.status(400).json({
        msg: "User has not followd yet",
      });
    }
    return res.status(200).json({
      msg: `${loggedInUser.name} unfollow to ${otherUser.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
