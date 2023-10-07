const express = require("express");
const messagesRouter = express.Router();
const messagesModel = require("../Models/MessageModel");
const { v4: uuidv4 } = require("uuid");

messagesRouter.get("/messages", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    if (query.name) {
      const singleMessage = await messagesModel.find({
        name: { $regex: query.name, $options: "i" },
      });
      return res.status(200).send({ data: singleMessage });
    }
    const allMessage = await messagesModel.find(query);
    res.status(200).send({ data: allMessage });
  } catch (err) {
    return res.status(403).send({ message: "404 error Url is not working" });
  }
});

messagesRouter.post("/message", async (req, res) => {
  const { content, email, name } = req.body;
  try {
    const existingMessage = await messagesModel.findOne({ email });
    console.log("existingMessage", existingMessage);
    if (existingMessage) {
      existingMessage.content.push({ id: uuidv4(), content });
      await existingMessage.save();
      return res
        .status(200)
        .send({ message: "Your message has been sent successfully" });
    } else {
      const message = new messagesModel({
        email,
        name,
        content: [{ id: uuidv4(), content }],
      });
      await message.save();
    }
    res
      .status(200)
      .send({ message: "Your message has been saved successfully" });
  } catch (err) {
    return res.status(403).send({ message: "404 error Url is not working" });
  }
});

module.exports = messagesRouter;
