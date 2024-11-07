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
  uploadProfilePic
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
import fileUpload from "express-fileupload";
const router = express.Router();
router.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, adjust as needed
}));

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
router.route("/uploadProfilePic/:id").post(uploadProfilePic);

export default router;
