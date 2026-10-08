import express from "express";
import { getHistoricalAQI } from "../services/openMeteoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        error: "Coordinates required",
      });
    }

    const data = await getHistoricalAQI(latitude, longitude);

    res.json(data);
  } catch (error) {
    console.error(
      "Historical AQI Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch historical AQI data",
      details: error.response?.data || error.message,
    });
  }
});

export default router;