const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too login product title"]
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      minlength: [20, "Too short product description"]
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"]
    },
    sold: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [20, "Too long product price"]
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
      max: [20, "Too long product price"]
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"]
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"]
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory"
      }
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand"
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be less or equal 5.0"]
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
