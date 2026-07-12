const Maintenance = require("../models/Maintenance");
const Asset = require("../models/Asset");
const Notification = require("../models/Notification");
const logActivity = require("../utils/activityLogger");

const createMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.create({ ...req.body, requestedBy: req.user._id });
    await logActivity(req, "Raised maintenance request", "Maintenance", `Maintenance request ${maintenance._id}`);
    res.status(201).json({ success: true, message: "Maintenance request created", data: maintenance });
  } catch (error) {
    next(error);
  }
};

const getMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.find().populate("asset", "assetTag name").populate("requestedBy", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: maintenance });
  } catch (error) {
    next(error);
  }
};

const updateMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!maintenance) return res.status(404).json({ success: false, message: "Maintenance request not found" });

    if (req.body.status === "Approved") {
      await Asset.findByIdAndUpdate(maintenance.asset, { status: "Under Maintenance" });
      await Notification.create({ user: maintenance.requestedBy, title: "Maintenance Approved", message: "Your maintenance request was approved", type: "MaintenanceApproved" });
    }

    if (req.body.status === "Resolved") {
      await Asset.findByIdAndUpdate(maintenance.asset, { status: "Available" });
    }

    await logActivity(req, "Updated maintenance", "Maintenance", `Updated maintenance ${maintenance._id}`);
    res.status(200).json({ success: true, message: "Maintenance request updated", data: maintenance });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMaintenance, getMaintenance, updateMaintenance };
