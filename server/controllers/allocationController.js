const Allocation = require("../models/Allocation");
const Asset = require("../models/Asset");
const Notification = require("../models/Notification");
const logActivity = require("../utils/activityLogger");

const createAllocation = async (req, res, next) => {
  try {
    const existing = await Allocation.findOne({ asset: req.body.asset, status: { $in: ["Allocated", "TransferRequested", "Transferred"] } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Asset already allocated" });
    }

    const allocation = await Allocation.create(req.body);
    await Asset.findByIdAndUpdate(req.body.asset, { status: "Allocated", allocatedTo: req.body.employee });
    await Notification.create({
      user: req.body.employee,
      title: "Asset Assigned",
      message: `Asset ${req.body.asset} was allocated to you`,
      type: "AssetAssigned",
    });
    await logActivity(req, "Allocated asset", "Asset", `Allocated asset ${req.body.asset}`);
    res.status(201).json({ success: true, message: "Asset allocated", data: allocation });
  } catch (error) {
    next(error);
  }
};

const getAllocations = async (req, res, next) => {
  try {
    const allocations = await Allocation.find().populate("asset").populate("employee", "name email").populate("department", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allocations });
  } catch (error) {
    next(error);
  }
};

const returnAllocation = async (req, res, next) => {
  try {
    const allocation = await Allocation.findByIdAndUpdate(req.params.id, { status: "Returned", returnedDate: new Date() }, { new: true });
    if (!allocation) return res.status(404).json({ success: false, message: "Allocation not found" });
    await Asset.findByIdAndUpdate(allocation.asset, { status: "Available", allocatedTo: null });
    await logActivity(req, "Returned asset", "Asset", `Returned allocation ${allocation._id}`);
    res.status(200).json({ success: true, message: "Asset returned", data: allocation });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAllocation, getAllocations, returnAllocation };
