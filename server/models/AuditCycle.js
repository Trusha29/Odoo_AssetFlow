const mongoose = require("mongoose");

const AuditCycleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    location: String,

    startDate: Date,

    endDate: Date,

    auditors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: [
        "Planned",
        "Active",
        "Completed",
        "Closed",
      ],
      default: "Planned",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditCycle", AuditCycleSchema);