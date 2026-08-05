const { Schema, default: mongoose } = require("mongoose");

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Subcategory required"],
      unique: [true, "Subcategory must by unique"],
      minlength: [2, "Too short subcategory name"],
      maxlength: [32, "Too long subcategory name"]
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"]
    }
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
