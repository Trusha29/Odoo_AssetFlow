const express = require("express");
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", protect, getCategories);
router.post("/", protect, authorize("Admin"), createCategory);
router.put("/:id", protect, authorize("Admin"), updateCategory);
router.delete("/:id", protect, authorize("Admin"), deleteCategory);

module.exports = router;
