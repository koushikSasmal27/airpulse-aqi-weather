import express from "express";
import { getWeather } from "../services/openMeteoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        error: "Coordinates required",
      });
    }

    const weather = await getWeather(latitude, longitude);

    res.json(weather);
  } catch (error) {
    console.error(
      "Weather API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch weather data",
      details: error.response?.data || error.message,
    });
  }
});

export default router;