import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ratingSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    picUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [commentSchema],
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
