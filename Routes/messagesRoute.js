const express = require("express");
const messagesRouter = express.Router();
const messagesModel = require("../Models/MessageModel");

messagesRouter.post("/message", async (req, res) => {
  const { content, email, name } = req.body;
  try {
    const message = new messagesModel({ email, name, content });
    await message.save();
    res
      .status(200)
      .send({ message: "Your message has been saved successfully" });
  } catch (err) {
    return res.status(403).send({ message: "404 error Url is not working" });
  }
});
