const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category required"],
      unique: [true, "Category must by unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"]
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    image: String
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
