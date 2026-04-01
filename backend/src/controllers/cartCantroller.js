const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const getUserId = (req) => req?.user?.user_id || req?.user?.id;

// Add To Cart
exports.addToCart = async (req, res) => {
  try {
    console.log("\n📦 ADD TO CART REQUEST");
    const { product_id, qty, amount } = req.body;
    const userId = getUserId(req);

    console.log("✓ User ID:", userId);
    console.log("✓ Product ID:", product_id);
    console.log("✓ Quantity:", qty);
    console.log("✓ Amount:", amount);

    if (!userId) {
      console.error("✗ No userId found");
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!isValidObjectId(product_id)) {
      console.error("✗ Invalid product_id format");
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    console.log("✓ Finding product...");
    const product = await Product.findById(product_id);

    if (!product) {
      console.error("✗ Product not found");
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("✓ Product found:", product.name);
    console.log("✓ Checking for existing cart...");

    const existingCart = await Cart.findOne({
      $or: [
        { user_id: userId, product_id },
        { user: userId, product: product_id },
      ],
    });

    if (existingCart) {
      console.error("✗ Product already in cart");
      return res.status(409).json({
        success: false,
        message: "This product is already in your cart",
      });
    }

    const quantity = Number(qty) || 1;

    if (quantity < 1) {
      console.error("✗ Invalid quantity");
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    console.log("✓ Creating cart entry...");
    const cart = await Cart.create({
      user_id: userId,
      product_id,
      user: userId,
      product: product_id,
      qty: quantity,
      value: amount !== undefined ? Number(amount) : product.price * quantity,
    });

    console.log("✓ Cart created successfully:", cart._id);
    return res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.error("\n❌ =========================");
    console.error("❌ ADD TO CART ERROR");
    console.error("❌ =========================");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Full Error:", error);
    console.error("Stack:", error.stack);
    console.error("❌ =========================\n");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Cart
exports.updateToCart = async (req, res) => {
  try {
    const { product_id, qty, cart_id } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!isValidObjectId(cart_id) || !isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    const quantity = Number(qty);

    if (Number.isNaN(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const existingCart = await Cart.findOne({
      _id: cart_id,
      user_id: userId,
      product_id,
    });

    if (!existingCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = await Product.findById(product_id);
    existingCart.qty = quantity;
    existingCart.value = product ? product.price * quantity : existingCart.value;
    await existingCart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: existingCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const cartList = await Cart.find({ user_id: userId })
      .populate({
        path: "product_id",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: cartList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Remove from Cart
exports.removeCart = async (req, res) => {
  try {
    const { cart_id, product_id } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!isValidObjectId(cart_id) || !isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    const exists = await Cart.findOne({
      _id: cart_id,
      product_id,
      user_id: userId,
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    await Cart.deleteOne({
      _id: cart_id,
      product_id,
      user_id: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Move to Cart
exports.moveToCart = async (req, res) => {
  try {
    const { cart_id, product_id } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!isValidObjectId(cart_id) || !isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    const exists = await Cart.findOne({
      _id: cart_id,
      product_id,
      user_id: userId,
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    exists.is_save_later = false;
    await exists.save();

    return res.status(200).json({
      success: true,
      message: "Moved to cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Save for Later
exports.saveToLater = async (req, res) => {
  try {
    const { cart_id, product_id } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!isValidObjectId(cart_id) || !isValidObjectId(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    const exists = await Cart.findOne({
      _id: cart_id,
      product_id,
      user_id: userId,
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Invalid cart ID or product ID",
      });
    }

    exists.is_save_later = true;
    await exists.save();

    return res.status(200).json({
      success: true,
      message: "Saved for later",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
