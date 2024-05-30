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