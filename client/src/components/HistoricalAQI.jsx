import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { fetchHistoricalAqi } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function HistoricalAQI({ latitude, longitude }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchHistoricalAqi(latitude, longitude);

        console.log("Historical AQI:", result);

        if (
          !result?.hourly?.time ||
          !result?.hourly?.us_aqi
        ) {
          throw new Error("Historical AQI data not available");
        }

        const dailyData = {};

        result.hourly.time.forEach((time, index) => {
          const aqi = result.hourly.us_aqi[index];

          if (aqi == null) return;

          const date = time.split("T")[0];

          if (!dailyData[date]) {
            dailyData[date] = [];
          }

          dailyData[date].push(aqi);
        });

        const dates = Object.keys(dailyData).sort();

        const labels = dates.map((date) => {
          const d = new Date(`${date}T00:00:00`);

          return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        });

        const values = dates.map((date) => {
          const values = dailyData[date];

          const average =
            values.reduce((sum, value) => sum + value, 0) /
            values.length;

          return Math.round(average);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Average AQI",
              data: values,
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
              tension: 0.35,
              fill: true,
              backgroundColor: "rgba(56, 189, 248, 0.08)",
              borderColor: "#38bdf8",
              pointBackgroundColor: "#38bdf8",
            },
          ],
        });
      } catch (err) {
        console.error("Historical AQI Error:", err);
        setError("Failed to load historical AQI");
      } finally {
        setLoading(false);
      }
    };

    if (latitude != null && longitude != null) {
      loadHistoricalData();
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6">
        <p className="text-sm text-slate-400">
          Loading historical AQI...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6">
        <p className="text-sm text-red-400">{error}</p>
      </section>
    );
  }

  if (!chartData) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `AQI: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#64748b",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#64748b",
        },
        grid: {
          color: "#1e293b",
        },
      },
    },
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          Historical AQI
        </p>

        <h2 className="mt-2 text-lg font-semibold text-white">
          7-Day AQI Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Daily average US AQI for the selected location
        </p>
      </div>

      <div className="mt-6 h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
}