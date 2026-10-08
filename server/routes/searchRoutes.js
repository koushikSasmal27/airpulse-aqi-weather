import express from "express";
import { searchCities } from "../services/openMeteoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: "City name required",
      });
    }

    const data = await searchCities(name);

    res.json(data);
  } catch (error) {
    console.error(
      "Search API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to search cities",
    });
  }
});

export default router;