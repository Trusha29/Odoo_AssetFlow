const express = require("express");
const router = express.Router();
const { createMaintenance, getMaintenance, updateMaintenance } = require("../controllers/maintenanceController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", protect, getMaintenance);
router.post("/", protect, createMaintenance);
router.put("/:id", protect, authorize("Admin", "AssetManager"), updateMaintenance);

module.exports = router;
