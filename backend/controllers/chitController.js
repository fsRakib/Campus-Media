import {Chit} from "../models/chitSchema.js"

export const createChit = async (req, res) => {
    try {
      const { description, id } = req.body;
      if (!description || !id) {
        return res.status(401).json({
          msg: "Please enter all fields",
          success: false,
        });
      }
      await Chit.create({
        description,
        userId: id,
      });
      return res.status(201).json({
        msg: "Chit created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteChit = async (req, res) => {
    try {
      const { id } = req.params;
      await Chit.findByIdAndDelete(id);
      return res.status(200).json({
        msg: "Chit deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const likeOrDislike = async (req, res) => {
    try {
      const loggedInUserId = req.body.id;
      const chitId = req.params.id;
      const chit = await Chit.findById(chitId);
      if (chit.like.includes(loggedInUserId)) {
        //dislike
        await Chit.findByIdAndUpdate(chitId, { $pull: { like: loggedInUserId } });
        return res.status(200).json({
          msg: "User disliked your chit",
          success: true,
        });
      } else {
        //like
        await Chit.findByIdAndUpdate(chitId, { $push: { like: loggedInUserId } });
        return res.status(200).json({
          msg: "User liked your chit",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };