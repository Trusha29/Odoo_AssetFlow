const express = require("express");
const router = express.Router();
const { createAsset, getAssets, getAsset, updateAsset, deleteAsset } = require("../controllers/assetController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", protect, getAssets);
router.get("/:id", protect, getAsset);
router.post("/", protect, authorize("Admin", "AssetManager"), createAsset);
router.put("/:id", protect, authorize("Admin", "AssetManager"), updateAsset);
router.delete("/:id", protect, authorize("Admin"), deleteAsset);

module.exports = router;
