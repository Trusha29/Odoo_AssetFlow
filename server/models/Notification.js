const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: String,

    message: String,

    type: {
      type: String,
      enum: [
        "AssetAssigned",
        "MaintenanceApproved",
        "MaintenanceRejected",
        "BookingReminder",
        "BookingConfirmed",
        "TransferApproved",
        "OverdueReturn",
        "AuditFlag",
      ],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);