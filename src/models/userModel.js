import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    division: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: { type: String },
    providerAccountId: { type: String },
    image: { type: String },
    addresses: {
      type: [addressSchema],
      default: [],
      validate: {
        validator: function (addresses) {
          // Ensure only one primary address exists
          const primaryCount = addresses.filter(
            (addr) => addr.isPrimary
          ).length;
          return primaryCount <= 1;
        },
        message: "There can be only one primary address",
      },
    },
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
   }
);

userSchema.virtual('primaryAddress').get(function() {
  return this.addresses.find(addr => addr.isPrimary) || null;
});

userSchema.pre('save', function(next) {
  if (this.addresses.length > 0 && !this.addresses.some(addr => addr.isPrimary)) {
    this.addresses[0].isPrimary = true;
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
