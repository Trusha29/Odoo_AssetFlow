const ActivityLog = require("../models/ActivityLog");

const logActivity = async (req, action, moduleName, description, userId = null) => {
  try {
    await ActivityLog.create({
      user: userId || req.user?._id || null,
      action,
      module: moduleName,
      description,
      ipAddress: req.ip || req.socket?.remoteAddress || "unknown",
    });
  } catch (error) {
    console.error("Activity log failed", error.message);
  }
};

module.exports = logActivity;
