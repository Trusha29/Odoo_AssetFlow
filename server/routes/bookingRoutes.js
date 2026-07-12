const express = require("express");
const router = express.Router();
const { createBooking, getBookings, updateBooking } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getBookings);
router.post("/", protect, createBooking);
router.put("/:id", protect, updateBooking);

module.exports = router;
