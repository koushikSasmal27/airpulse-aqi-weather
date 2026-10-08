import React from "react";
import {
  Wind,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function Pollutants({ current }) {
  const items = [
    { label: "PM2.5", key: "pm2_5", unit: "µg/m³" },
    { label: "PM10", key: "pm10", unit: "µg/m³" },
    { label: "NO₂", key: "nitrogen_dioxide", unit: "µg/m³" },
    { label: "SO₂", key: "sulphur_dioxide", unit: "µg/m³" },
    { label: "O₃", key: "ozone", unit: "µg/m³" },
  ];

  const values = items
    .map((item) => ({
      ...item,
      value: current?.[item.key],
    }))
    .filter((item) => item.value != null);

  const highestPollutant =
    values.length > 0
      ? values.reduce((max, item) =>
          item.value > max.value ? item : max
        )
      : null;

  const getStatus = (value) => {
    if (value == null) return "No data";
    if (value <= 15) return "Low";
    if (value <= 35) return "Moderate";
    if (value <= 55) return "Elevated";
    return "High";
  };

  const getStatusColor = (value) => {
    if (value == null) {
      return {
        text: "text-slate-500",
        bg: "bg-slate-800",
        border: "border-slate-800",
      };
    }

    if (value <= 15) {
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
      };
    }

    if (value <= 35) {
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
      };
    }

    if (value <= 55) {
      return {
        text: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
      };
    }

    return {
      text: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
    };
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Primary Pollutants
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Current atmospheric pollutant concentrations
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#091423]">
          <Wind size={17} className="text-slate-400" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => {
          const value = current?.[item.key];
          const status = getStatus(value);
          const colors = getStatusColor(value);

          return (
            <div
              key={item.key}
              className="rounded-xl border border-slate-800 bg-[#091423] p-4 transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  {item.label}
                </span>

                {value != null && value > 55 ? (
                  <AlertTriangle
                    size={14}
                    className="text-red-400"
                  />
                ) : (
                  <CheckCircle2
                    size={14}
                    className="text-slate-600"
                  />
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-white">
                  {value != null ? Math.round(value) : "--"}
                </span>

                <span className="text-[10px] text-slate-600">
                  {item.unit}
                </span>
              </div>

              <div
                className={`mt-3 inline-flex rounded-md border px-2 py-1 text-[10px] font-medium ${colors.text} ${colors.bg} ${colors.border}`}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>

      {highestPollutant && (
        <div className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400/10">
            <AlertTriangle size={15} className="text-orange-400" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Highest measured pollutant
            </p>

            <p className="mt-0.5 text-sm font-medium text-slate-300">
              {highestPollutant.label}{" "}
              <span className="text-slate-500">
                {Math.round(highestPollutant.value)}{" "}
                {highestPollutant.unit}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}