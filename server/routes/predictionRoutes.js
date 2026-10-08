import express from "express";
import { predictAQI } from "../services/predictionService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { historicalData } = req.body;

    const prediction = await predictAQI(historicalData);

    res.json(prediction);
  } catch (error) {
    console.error("Prediction Error:", error.message);

    res.status(500).json({
      error: "Failed to generate AQI prediction",
    });
  }
});

export default router;