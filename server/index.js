const express = require("express");
// import express from "express";
const config = require("config");
// import config from "config";
const mongoose = require("mongoose");
// import mongoose from "mongoose";
// import Comics from './routes/comics.routes' 

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/comics', require('./routes/comics.routes'))

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
