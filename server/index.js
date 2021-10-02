const express = require("express");
const mongoose = require("mongoose");
// const corsMiddleware = require('./cors/index.js')

const cors = require("cors");

// const corsOptions = {
//     origin: ['https://m-berdnikov.github.io/'],
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

require("dotenv").config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/comics", require("./routes/comics.routes"));

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
