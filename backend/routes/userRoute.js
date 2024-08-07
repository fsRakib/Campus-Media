import express from "express";
import {
  Login,
  Register,
  bookmark,
  follow,
  getMyProfile,
  getOtherUsers,
  logout,
  unfollow,
  updateProfile,
  updateUserBio,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);
router.route("/updateProfile/:id").put(isAuthenticated, updateProfile);
router.route("/updateBio").put(isAuthenticated, updateUserBio);

export default router;
