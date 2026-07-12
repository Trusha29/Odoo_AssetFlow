const express = require("express");
const router = express.Router();
const { getNotifications, getUnreadCount, markRead } = require("../controllers/notificationController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/mark-read", protect, markRead);

module.exports = router;
