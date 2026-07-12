const Notification = require("../models/Notification");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
};

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({ user: req.user._id, isRead: false });
    res.status(200).json({ success: true, data: { count } });
  } catch (error) {
    next(error);
  }
};

const markRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { isRead: true });
    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications, getUnreadCount, markRead };
