// import { Schema, model, Types } from "mongoose";
const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: { type: String },
  authors: { type: String },
  description: { type: String },
  characters: { type: String },
  genres: { type: String },
  edition: { type: String },
  includes: { type: String },
  volume: { type: String },
  year: { type: String },
  publisher: { type: String },
  cover: { type: String },
  original: { type: String },
  original_publisher: { type: String },
  // itemId: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model("Comics", schema);
