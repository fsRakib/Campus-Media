import mongoose from "mongoose";

const chitSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    like: {
      type: Array,
      default: [],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDetails: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export const Chit = mongoose.model("Chit", chitSchema);
