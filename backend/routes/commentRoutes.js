import express from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

router.post("/:postId", async (req, res) => {
  try {
    const { userId, message, userName } = req.body;

    if (!userId || !message || !userName) {
      return res.status(400).send({
        message: "Send all required fields:  userId, message, userName",
      });
    }

    const { postId } = req.params;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    const newComment = {
      userName,
      userId,
      message,
    };

    postFound.comments.push(newComment);

    const postUpdated = await postFound.save();

    return res.status(201).json(postUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:postId/:id", async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).send({
        message: "Send all required fields: userId, message",
      });
    }

    const { id, postId } = req.params;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    const foundComment = postFound.comments.id(id);
    if (!foundComment) {
      return res.status(404).send({ message: "Comment not found" });
    }
    if (foundComment.userId != userId) {
      return res
        .status(403)
        .send({ message: "Not allowed to edit this comment" });
    }

    foundComment.set({ message });
    const postUpdated = await postFound.save();

    return res.status(200).json(postUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:postId/:id", async (req, res) => {
  try {
    const { id, postId } = req.params;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    const foundComment = postFound.comments.id(id);
    if (!foundComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    foundComment.deleteOne();
    await postFound.save();
    return res.status(200).send({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.status(200).json(postFound.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
