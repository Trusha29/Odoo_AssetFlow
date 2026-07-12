const mongoose = require("mongoose");

const AuditItemSchema = new mongoose.Schema(
  {
    auditCycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuditCycle",
      required: true,
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verificationStatus: {
      type: String,
      enum: [
        "Verified",
        "Missing",
        "Damaged",
      ],
      default: "Verified",
    },

    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditItem", AuditItemSchema);