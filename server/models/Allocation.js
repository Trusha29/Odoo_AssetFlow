const mongoose = require("mongoose");

const AllocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    allocatedDate: {
      type: Date,
      default: Date.now,
    },

    expectedReturnDate: Date,

    returnedDate: Date,

    conditionOnReturn: String,

    status: {
      type: String,
      enum: [
        "Allocated",
        "Returned",
        "TransferRequested",
        "Transferred",
        "Overdue",
      ],
      default: "Allocated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Allocation", AllocationSchema);