import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import searchRoutes from "./routes/searchRoutes.js";
import airQualityRoutes from "./routes/airQualityRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import historicalRoutes from "./routes/historicalRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import reverseGeocodeRoutes from "./routes/reverseGeocodeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "AirPulse Server is running",
  });
});

app.use("/api/search", searchRoutes);
app.use("/api/air-quality", airQualityRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/historical-aqi", historicalRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/reverse-geocode", reverseGeocodeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});