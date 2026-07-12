const Category = require("../models/Category");
const logActivity = require("../utils/activityLogger");

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    await logActivity(req, "Created category", "Category", `Created ${category.name}`);
    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    await logActivity(req, "Updated category", "Category", `Updated ${category.name}`);
    res.status(200).json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    await logActivity(req, "Deleted category", "Category", `Deleted ${category.name}`);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
