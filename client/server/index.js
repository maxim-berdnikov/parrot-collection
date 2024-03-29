const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const allowedOrigins = [`${process.env.ALLOW_REQUEST_URL}`];
var corsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/comics", require("./routes/comics.routes"));

const PORT = process.env.SERVER_PORT || 5500;

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
};

start();
