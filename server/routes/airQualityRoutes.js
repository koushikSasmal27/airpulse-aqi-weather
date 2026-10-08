import express from "express";
import {
  getAirQuality,
  getWeather,
} from "../services/openMeteoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        error: "Coordinates required",
      });
    }

    const aqi = await getAirQuality(latitude, longitude);
    const weather = await getWeather(latitude, longitude);

    res.json({
      aqi,
      weather,
    });
  } catch (error) {
    console.error(
      "Data Fetch Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch air quality and weather data",
      details: error.response?.data || error.message,
    });
  }
});

export default router;