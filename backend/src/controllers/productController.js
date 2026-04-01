const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart = require("../models/Cart");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const normalizeImages = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [value].filter(Boolean);
};

// Product Add
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, product_images, image } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        status: false,
        message: "Name, description, price and category are required",
      });
    }

    if (!isValidObjectId(category)) {
      return res.status(400).json({ status: false, message: "Invalid category ID" });
    }

    const parsedPrice = Number(price);

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ status: false, message: "Invalid price" });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    const trimmedName = name.trim();
    const existingProduct = await Product.findOne({
      name: trimmedName,
      category,
    });

    if (existingProduct) {
      return res.status(400).json({
        status: false,
        message: "Product already exists in this category",
      });
    }

    const product = await Product.create({
      name: trimmedName,
      description,
      price: parsedPrice,
      category,
      product_images: normalizeImages(product_images || image),
    });

    const populatedProduct = await Product.findById(product._id).populate("category");

    return res.status(201).json({
      status: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Product already exists in this category",
      });
    }

    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Product Edit
exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const { name, category, price, description, product_images, image } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid product ID" });
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    const updateData = {};
    const nextCategory = category || existingProduct.category.toString();
    const nextName = name ? name.trim() : existingProduct.name;

    if (category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({ status: false, message: "Invalid category ID" });
      }

      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({ status: false, message: "Category not found" });
      }

      updateData.category = category;
    }

    if (name) {
      updateData.name = nextName;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (price !== undefined) {
      const parsedPrice = Number(price);

      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ status: false, message: "Invalid price" });
      }

      updateData.price = parsedPrice;
    }

    const normalizedImages = normalizeImages(product_images);

    if (normalizedImages.length) {
      updateData.product_images = normalizedImages;
    } else if (image) {
      updateData.product_images = normalizeImages(image);
    }

    const duplicateProduct = await Product.findOne({
      _id: { $ne: id },
      name: nextName,
      category: nextCategory,
    });

    if (duplicateProduct) {
      return res.status(400).json({
        status: false,
        message: "Product already exists in this category",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category");

    return res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Product already exists in this category",
      });
    }

    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Get Product List
exports.productList = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Product list",
      productList: products,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Product Delete
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // Check if product is in any cart
    const cartCount = await Cart.countDocuments({ product: id });

    if (cartCount > 0) {
      return res.status(400).json({
        status: false,
        message: "Product cannot be deleted because it is in user's carts",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
