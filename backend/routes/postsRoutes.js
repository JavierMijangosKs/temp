import express from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, picUrl, title, description } = req.body;

    if (!userId || !picUrl || !title || !description) {
      return res.status(400).send({
        message: "Send all required fields: picUrl, title, description, userId",
      });
    }

    const newPost = {
      userId,
      picUrl,
      title,
      description,
    };

    const post = await Post.create(newPost);

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { picUrl, title, description } = req.body;
    if (!picUrl || !title || !description) {
      return res.status(400).send({
        message: "Send all required fields: picUrl, title, description",
      });
    }

    const { id } = req.params;
    const result = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).send({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
