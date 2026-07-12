const express = require("express");
const router = express.Router();
const { createAllocation, getAllocations, returnAllocation } = require("../controllers/allocationController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", protect, getAllocations);
router.post("/", protect, authorize("Admin", "AssetManager"), createAllocation);
router.put("/:id/return", protect, authorize("Admin", "AssetManager", "DepartmentHead"), returnAllocation);

module.exports = router;
