require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const assetRoutes = require("./routes/assetRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const seedData = require("./config/seed");

require("./models/User");

const app = express();
connectDB().then(() => seedData());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

