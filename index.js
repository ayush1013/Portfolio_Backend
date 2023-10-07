const { connection } = require("./Config/config");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const messagesRouter = require("./Routes/messagesRoute")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey, You are on the server");
});

app.use("/api", messagesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Successfully connected to the database");
  } catch (err) {
    console.log("Error while connecting to the Database");
    console.log(err);
  }
  console.log(`This server is running at port ${process.env.port}`);
});
