const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  alt: { type: String, required: true },
  src: { type: String, required: true },
});


module.exports = mongoose.model("Blog", blogSchema);