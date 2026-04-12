import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  ecoScore: Number,
  sellerId: Number,
  inStock: Boolean,
  rating: Number,
  reviews: Number,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);