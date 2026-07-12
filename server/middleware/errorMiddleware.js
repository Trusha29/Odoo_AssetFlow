const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

module.exports = { errorHandler, notFound };
