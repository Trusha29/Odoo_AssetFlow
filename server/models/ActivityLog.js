const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      enum: [
        "Asset",
        "Booking",
        "Maintenance",
        "Audit",
        "Department",
        "User",
        "Category",
      ],
    },

    description: String,

    ipAddress: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);