const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    assetTag: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    serialNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    location: String,

    condition: {
      type: String,
      enum: [
        "Excellent",
        "Good",
        "Fair",
        "Poor",
        "Damaged",
      ],
      default: "Excellent",
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Allocated",
        "Reserved",
        "Under Maintenance",
        "Lost",
        "Retired",
        "Disposed",
      ],
      default: "Available",
    },

    acquisitionDate: Date,

    acquisitionCost: Number,

    bookable: {
      type: Boolean,
      default: false,
    },

    documents: [String],

    image: String,

    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", AssetSchema);