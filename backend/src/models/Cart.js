const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    qty: {
      type: Number,
      default: 1,
      min: 1,
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
    },
    is_save_later: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

cartSchema.index({ user_id: 1, product_id: 1 }, { unique: true });
cartSchema.index({ user: 1, product: 1 }, { unique: true, sparse: true });

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
