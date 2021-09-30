const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send('hello world');
});

app.use("/api/comics", require("./routes/comics.routes"));

const PORT = config.get("port") || 5000;

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));

const start = async () => {
  try {
    await mongoose.connect(config.get("db"));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
};

start();
