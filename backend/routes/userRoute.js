import express from "express";
import {
  Login,
  Register,
  bookmark,
  getMyProfile,
  getOtherUsers,
  logout,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);

export default router;
