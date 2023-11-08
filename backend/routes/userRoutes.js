import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send({
        message: "Send all required fields: name, password",
      });
    }

    const newUser = {
      name,
      password,
    };

    const user = await User.create(newUser);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).send({
        message: "Send all required fields: name, password",
      });
    }

    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
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
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send({
        message: "Send all required fields: name, password",
      });
    }

    const user = await User.findOne({ $and: [{ name }, { password }] });
    if (!user) {
      return res.status(403).send({
        message: "Invalid name and/or password",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
