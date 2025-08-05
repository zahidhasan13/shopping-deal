import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true
  },
  rating:{
    type: Number,
    min: 1,
    max: 5
  },
  images: {
    type:[String],
  }
},{timestamps: true});

const Review = mongoose.models.Review || mongoose.model("Review",reviewSchema);
export default Review;
