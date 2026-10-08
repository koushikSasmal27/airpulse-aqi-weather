import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function ForecastChart({ hourly }) {
  if (!hourly || !hourly.time || !hourly.us_aqi) return null;

  const nowIso = new Date().toISOString().slice(0, 13);

  const foundIndex = hourly.time.findIndex((time) =>
    time.startsWith(nowIso)
  );

  const startIndex = foundIndex >= 0 ? foundIndex : 0;

  const labels = [];
  const dataPoints = [];

  for (let i = startIndex; i < startIndex + 24; i++) {
    if (hourly.time[i]) {
      labels.push(
        new Date(hourly.time[i]).toLocaleTimeString([], {
          hour: "numeric",
        })
      );

      dataPoints.push(hourly.us_aqi[i] ?? null);
    }
  }

  const validValues = dataPoints.filter(
    (value) => value !== null && value !== undefined
  );

  const currentValue = validValues[0] ?? null;
  const peakValue =
    validValues.length > 0 ? Math.max(...validValues) : null;

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.08)",
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#38bdf8",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        borderWidth: 2,
      },
    ],
  };

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
        displayColors: false,
        backgroundColor: "#0b1626",
        borderColor: "#243244",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        padding: 12,
        callbacks: {
          label: (context) => `AQI: ${Math.round(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)",
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
          },
          padding: 8,
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
          },
          maxTicksLimit: 8,
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            24-Hour AQI Forecast
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Expected air quality over the next 24 hours
          </p>
        </div>

        <div className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-[#091423] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Current
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {currentValue !== null ? Math.round(currentValue) : "--"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#091423] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            24h Peak
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {peakValue !== null ? Math.round(peakValue) : "--"}
          </p>
        </div>
      </div>

      <div className="relative h-[270px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}