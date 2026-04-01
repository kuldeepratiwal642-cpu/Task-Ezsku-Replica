const mongoose = require("mongoose");

// Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    category_image : {
        type:String
    },
}, {
    timestamps: true // optional: createdAt & updatedAt add karta hai
});

categorySchema.index({ name: 1 }, { unique: true });

// Model banaya
const Category = mongoose.model("Category", categorySchema);

module.exports = Category; 
