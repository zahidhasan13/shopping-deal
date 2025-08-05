import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  sold:{
    type: Number,
    default: 0
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  },
  totalRating:{
    type: Number,
    default: 0
  },
  averageRating:{
    type: Number,
    default: 0
  },
},{timestamps: true});

const Product = mongoose.models.Product || mongoose.model("Product",productSchema);
export default Product;
