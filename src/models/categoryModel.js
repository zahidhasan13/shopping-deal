import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual to get all products in this category
categorySchema.virtual("products", {
  ref: "Product", // Reference the Product model
  localField: "_id", // Field in Category
  foreignField: "category", // Field in Product that matches localField
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;