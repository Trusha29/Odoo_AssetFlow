const User = require("../models/User");
const Department = require("../models/Department");
const logActivity = require("../utils/activityLogger");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("department", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await logActivity(req, "Updated user", "User", `Updated ${user.name}`);
    res.status(200).json({ success: true, message: "User updated", data: user });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("department", "name");
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, updateUser, getProfile };
