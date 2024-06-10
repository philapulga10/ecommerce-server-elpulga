export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.status = err.status || 500;

  res.status(err.statusCode).json({ success: false, message: err.message });
};
