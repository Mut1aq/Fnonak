const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  views: {
    type: Number,
    min: 0,
    default: 0,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdDate: {
    type: Date,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

ProductSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Product", ProductSchema);
