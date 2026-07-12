const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Anyone logged in can view departments
router.get("/", protect, getDepartments);
router.get("/:id", protect, getDepartment);

// Admin only
router.post("/", protect, authorize("Admin"), createDepartment);
router.put("/:id", protect, authorize("Admin"), updateDepartment);
router.delete("/:id", protect, authorize("Admin"), deleteDepartment);

module.exports = router;