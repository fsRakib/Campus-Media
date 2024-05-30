import express from "express";
import {
  createChit,
  deleteChit,
  getAllChits,
  getFollowingChits,
  likeOrDislike,
} from "../controllers/chitController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createChit);
router.route("/delete/:id").delete(isAuthenticated, deleteChit);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/allchits/:id").get(isAuthenticated, getAllChits);
router.route("/followingchits/:id").get(isAuthenticated, getFollowingChits);

export default router;
