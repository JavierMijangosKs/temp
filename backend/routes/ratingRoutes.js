import express from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

router.post("/:postId", async (req, res) => {
  try {
    const { userId, value } = req.body;

    if (!userId || !value) {
      return res.status(400).send({
        message: "Send all required fields:  userId, value",
      });
    }

    const { postId } = req.params;
    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    const newRating = {
      userId,
      value,
    };

    postFound.ratings.push(newRating);

    const postUpdated = await postFound.save();

    return res.status(201).json(postUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:postId/:id", async (req, res) => {
  try {
    const { userId, value } = req.body;
    if (!userId || !value) {
      return res.status(400).send({
        message: "Send all required fields: userId, value",
      });
    }

    const { id, postId } = req.params;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      return res.status(404).send({ message: "Post not found" });
    }

    const foundRating = postFound.ratings.id(id);
    if (!foundRating) {
      return res.status(404).send({ message: "Rating not found" });
    }
    if (foundRating.userId != userId) {
      return res
        .status(403)
        .send({ message: "Not allowed to edit this rating" });
    }

    foundRating.set({ value });
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

    const foundRating = postFound.ratings.id(id);
    if (!foundRating) {
      return res.status(404).send({ message: "Rating not found" });
    }

    foundRating.deleteOne();
    await postFound.save();
    return res.status(200).send({
      message: "Rating deleted successfully",
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

    return res.status(200).json(postFound.ratings);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
