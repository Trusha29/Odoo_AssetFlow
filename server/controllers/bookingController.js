const Booking = require("../models/Booking");
const logActivity = require("../utils/activityLogger");

const createBooking = async (req, res, next) => {
  try {
    const overlap = await Booking.findOne({
      resource: req.body.resource,
      status: { $nin: ["Cancelled", "Completed"] },
      $or: [
        { startTime: { $lt: new Date(req.body.endTime) }, endTime: { $gt: new Date(req.body.startTime) } },
      ],
    });

    if (overlap) {
      return res.status(409).json({ success: false, message: "Booking overlaps with an existing reservation" });
    }

    const booking = await Booking.create({ ...req.body, bookedBy: req.user._id });
    await logActivity(req, "Created booking", "Booking", `Booked resource ${req.body.resource}`);
    res.status(201).json({ success: true, message: "Booking created", data: booking });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("resource", "name assetTag").populate("bookedBy", "name email").sort({ startTime: 1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    await logActivity(req, "Updated booking", "Booking", `Updated booking ${booking._id}`);
    res.status(200).json({ success: true, message: "Booking updated", data: booking });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getBookings, updateBooking };
