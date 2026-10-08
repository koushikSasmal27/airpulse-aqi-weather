export const predictAQI = async (historicalData) => {
  return {
    message: "ML API endpoint ready for integration",
    predicted_aqi: null,
    status: "placeholder",
    historicalData,
  };
};