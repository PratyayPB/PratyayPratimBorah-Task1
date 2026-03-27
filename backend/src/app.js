import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Assignment management API is running" });
});

export default app;
