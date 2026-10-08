import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const searchCityAPI = async (query) => {
  const res = await axios.get(
    `${API_URL}/search?name=${encodeURIComponent(query)}`
  );

  return res.data.results || [];
};

export const fetchAirQualityAndWeather = async (lat, lon) => {
  const res = await axios.get(
    `${API_URL}/air-quality?latitude=${lat}&longitude=${lon}`
  );

  return res.data;
};

export const fetchWeather = async (lat, lon) => {
  const res = await axios.get(
    `${API_URL}/weather?latitude=${lat}&longitude=${lon}`
  );

  return res.data;
};

export const fetchHistoricalAqi = async (lat, lon) => {
  const res = await axios.get(
    `${API_URL}/historical-aqi?latitude=${lat}&longitude=${lon}`
  );

  return res.data;
};

export const predictAqiML = async (data) => {
  const res = await axios.post(`${API_URL}/predict`, data);

  return res.data;
};

export const reverseGeocode = async (lat, lon) => {
  const res = await axios.get(
    `${API_URL}/reverse-geocode?latitude=${lat}&longitude=${lon}`
  );

  return res.data;
};