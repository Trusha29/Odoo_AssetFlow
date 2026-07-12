const express = require("express");
const router = express.Router();
const { getUsers, updateUser, getProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/me", protect, getProfile);
router.get("/", protect, authorize("Admin", "AssetManager", "DepartmentHead"), getUsers);
router.put("/:id", protect, authorize("Admin"), updateUser);

module.exports = router;
