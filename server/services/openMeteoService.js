import axios from "axios";

export const searchCities = async (name) => {
  const response = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name,
        count: 5,
        language: "en",
        format: "json",
      },
    }
  );

  return response.data;
};

export const getAirQuality = async (latitude, longitude) => {
  const response = await axios.get(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
    {
      params: {
        latitude,
        longitude,
        current:
          "us_aqi,pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,ozone",
        hourly: "us_aqi",
        timezone: "auto",
      },
    }
  );

  return response.data;
};

export const getWeather = async (latitude, longitude) => {
  const response = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
      },
    }
  );

  return response.data;
};

export const getHistoricalAQI = async (latitude, longitude) => {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(startDate.getDate() - 6);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const response = await axios.get(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
    {
      params: {
        latitude,
        longitude,
        hourly: "us_aqi",
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        timezone: "auto",
      },
    }
  );

  return response.data;
};

export const reverseGeocode = async (latitude, longitude) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/reverse",
    {
      params: {
        lat: latitude,
        lon: longitude,
        format: "json",
      },
      headers: {
        "User-Agent": "AirPulse/1.0",
      },
    }
  );

  return response.data;
};