import express from "express";
import { reverseGeocode } from "../services/openMeteoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        error: "Coordinates required",
      });
    }

    const data = await reverseGeocode(latitude, longitude);

    res.json(data);
  } catch (error) {
    console.error(
      "Reverse Geocoding Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to find location name",
    });
  }
});

export default router;