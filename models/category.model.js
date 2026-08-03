const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
  name: String,
});
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
