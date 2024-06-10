export const errorMiddleware = (err, _, res) => {
  err.message = err.message || "Internal server error";
  err.status = err.status || 500;

  res.status(err.statusCode).json({ success: false, message: err.message });
};
