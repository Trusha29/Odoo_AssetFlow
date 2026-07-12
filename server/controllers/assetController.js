const Asset = require("../models/Asset");
const Allocation = require("../models/Allocation");
const Maintenance = require("../models/Maintenance");
const logActivity = require("../utils/activityLogger");

const generateAssetTag = async () => {
  const lastAsset = await Asset.findOne({}, { assetTag: 1 }).sort({ createdAt: -1 });
  if (!lastAsset?.assetTag) return "AF-0001";
  const match = lastAsset.assetTag.match(/(\d+)$/);
  const nextNumber = match ? parseInt(match[1], 10) + 1 : 1;
  return `AF-${String(nextNumber).padStart(4, "0")}`;
};

const createAsset = async (req, res, next) => {
  try {
    const assetTag = await generateAssetTag();
    const asset = await Asset.create({ ...req.body, assetTag });
    await logActivity(req, "Created asset", "Asset", `Created ${asset.assetTag}`);
    res.status(201).json({ success: true, message: "Asset created", data: asset });
  } catch (error) {
    next(error);
  }
};

const getAssets = async (req, res, next) => {
  try {
    const { search, status, category, department, location } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { assetTag: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (department) filter.department = department;
    if (location) filter.location = { $regex: location, $options: "i" };

    const assets = await Asset.find(filter)
      .populate("category", "name")
      .populate("department", "name")
      .populate("allocatedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: assets });
  } catch (error) {
    next(error);
  }
};

const getAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id)
      .populate("category", "name")
      .populate("department", "name")
      .populate("allocatedTo", "name email");
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });

    const allocations = await Allocation.find({ asset: asset._id }).populate("employee", "name").sort({ createdAt: -1 });
    const maintenance = await Maintenance.find({ asset: asset._id }).populate("requestedBy", "name").sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: { ...asset.toObject(), allocationHistory: allocations, maintenanceHistory: maintenance } });
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });
    await logActivity(req, "Updated asset", "Asset", `Updated ${asset.assetTag}`);
    res.status(200).json({ success: true, message: "Asset updated", data: asset });
  } catch (error) {
    next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ success: false, message: "Asset not found" });
    await logActivity(req, "Deleted asset", "Asset", `Deleted ${asset.assetTag}`);
    res.status(200).json({ success: true, message: "Asset deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAsset, getAssets, getAsset, updateAsset, deleteAsset };
