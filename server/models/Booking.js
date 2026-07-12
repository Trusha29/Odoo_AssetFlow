const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },

    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startTime: Date,

    endTime: Date,

    purpose: String,

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
      ],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);