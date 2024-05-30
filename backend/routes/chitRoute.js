import express from "express";
import { createChit, deleteChit, likeOrDislike } from "../controllers/chitController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createChit);
router.route("/delete/:id").delete(isAuthenticated, deleteChit);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);

export default router;