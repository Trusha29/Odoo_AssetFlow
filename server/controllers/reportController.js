const Asset = require("../models/Asset");
const Allocation = require("../models/Allocation");
const Maintenance = require("../models/Maintenance");
const Booking = require("../models/Booking");

const getOverview = async (req, res, next) => {
  try {
    const [assets, allocations, maintenance, bookings] = await Promise.all([
      Asset.countDocuments(),
      Allocation.countDocuments({ status: "Allocated" }),
      Maintenance.countDocuments({ status: "Pending" }),
      Booking.countDocuments({ status: "Upcoming" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        assetsAvailable: await Asset.countDocuments({ status: "Available" }),
        assetsAllocated: allocations,
        maintenanceToday: maintenance,
        upcomingReturns: await Allocation.countDocuments({ status: "Allocated" }),
        pendingTransfers: await Allocation.countDocuments({ status: "TransferRequested" }),
        bookingsToday: bookings,
        overdueReturns: await Allocation.countDocuments({ status: "Overdue" }),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOverview };
