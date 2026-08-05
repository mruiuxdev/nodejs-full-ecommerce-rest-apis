const { Schema, default: mongoose } = require("mongoose");

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory required"],
      unique: [true, "Subcategory must by unique"],
      minlength: [3, "Too short subcategory name"],
      maxlength: [32, "Too long subcategory name"]
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      unique: true
    }
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
