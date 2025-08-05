import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  img: {
    type: String,
    required: [true, "Image URL is required"], 
    validate: {
      validator: (url) => {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
      },
      message: "Invalid image URL format",
    },
  },
  public_id: { 
    type: String,
    required: false, 
  },
  isActive: { 
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});


const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema);
export default Slider;