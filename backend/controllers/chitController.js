import { Chit } from "../models/chitSchema.js";
import { User } from "../models/userSchema.js";
import { uploadFileToCloudinary } from "../config/uploadFile.js";

// export const createChit = async (req, res) => {
//   try {
//     const { description, id } = req.body;
//     if (!description || !id) {
//       return res.status(401).json({
//         msg: "Please enter all fields",
//         success: false,
//       });
//     }
//     console.log("Request Body:", req.body);
//     console.log("ID= ", id);

//     const user = await User.findById(id).select("-password");
//     await Chit.create({
//       description,
//       userId: id,
//       userDetails: user,
//     });

//     return res.status(201).json({
//       msg: "Chit created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createChit = async (req, res) => {
  try {
    const { description, id } = req.body;
    const { file } = req;

    if (!description || !id) {
      return res.status(400).json({
        msg: "Please enter all fields",
        success: false,
      });
    }

    const user = await User.findById(id).select("-password");

    // Upload image to Cloudinary if provided
    let imageUrl = "";
    if (file) {
      const result = await uploadFileToCloudinary(file.buffer, "chits", file.originalname);
      imageUrl = result.secure_url;
    }

    // Create the Chit with text and image URL
    const newChit = await Chit.create({
      description,
      userId: id,
      userDetails: user,
      imageUrl,
    });

    return res.status(201).json({
      msg: "Chit created successfully",
      success: true,
      chit: newChit,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
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

export const getAllChits = async (req, res) => {
  //loggedInUser chits + followingUser chits
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserChits = await Chit.find({ userId: id });
    const followingUserChits = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Chit.find({ userId: otherUserId });
      })
    );
    return res.status(200).json({
      chits: loggedInUserChits.concat(...followingUserChits),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingChits = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserChits = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Chit.find({ userId: otherUserId });
      })
    );
    return res.status(200).json({
      chits: [].concat(...followingUserChits),
    });
  } catch (error) {
    console.log(error);
  }
};
