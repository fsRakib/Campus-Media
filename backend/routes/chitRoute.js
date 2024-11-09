import express from "express";
import {
  createChit,
  deleteChit,
  getAllChits,
  getFollowingChits,
  likeOrDislike,
} from "../controllers/chitController.js";
import { chatHandler } from "../controllers/chatController.js";
import isAuthenticated from "../config/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer(); 

// router.route("/create").post(isAuthenticated, createChit);
router.route("/create").post(isAuthenticated, upload.single("image"), createChit);
router.route("/delete/:id").delete(isAuthenticated, deleteChit);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/allchits/:id").get(isAuthenticated, getAllChits);
router.route("/followingchits/:id").get(isAuthenticated, getFollowingChits);
router.post('/chat', chatHandler);

export default router;
