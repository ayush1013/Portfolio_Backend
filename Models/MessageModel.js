const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  }
});

const messagesModel = mongoose.model("messages", messagesSchema);

module.exports = messagesModel;
