const { Schema, default: mongoose } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Brand required"],
      unique: [true, "Brand must by unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"]
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

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
