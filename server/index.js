const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors())

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ extended: true }));

var corsOptions = {
  // origin: 'http://localhost:3000/',
  origin: 'https://m-berdnikov.github.io/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/comics", cors(corsOptions), require("./routes/comics.routes"));

const PORT = process.env.PORT || 5000;

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
