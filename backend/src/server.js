import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
  console.info("SIGINT received. Shutting down...");
  server.close(() => process.exit(0));
});

export default server;
