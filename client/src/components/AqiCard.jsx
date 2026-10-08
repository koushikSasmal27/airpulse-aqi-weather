
import React from "react";
import { Activity, ShieldCheck } from "lucide-react";
import { getAqiInfo } from "../utils";

export default function AqiCard({ current }) {
  const aqi = current?.us_aqi;
  const { category, color } = getAqiInfo(aqi);

  const getDescription = () => {
    if (aqi == null) return "Air quality data unavailable";
    if (aqi <= 50) return "Air quality is satisfactory";
    if (aqi <= 100) return "Air quality is acceptable";
    if (aqi <= 150) return "Sensitive groups may be affected";
    if (aqi <= 200) return "Health effects may be experienced";
    if (aqi <= 300) return "Health alert for everyone";
    return "Health emergency conditions";
  };

  const getCategory = () => {
    if (aqi == null) return null;
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Sensitive";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const activeCategory = getCategory();

  const categories = [
    {
      label: "Good",
      range: "0–50",
      active: activeCategory === "Good",
      color: "text-emerald-400",
    },
    {
      label: "Moderate",
      range: "51–100",
      active: activeCategory === "Moderate",
      color: "text-yellow-400",
    },
    {
      label: "Sensitive",
      range: "101–150",
      active: activeCategory === "Sensitive",
      color: "text-orange-300",
    },
    {
      label: "Unhealthy",
      range: "151–200",
      active: activeCategory === "Unhealthy",
      color: "text-orange-400",
    },
    {
      label: "Very Unhealthy",
      range: "201–300",
      active: activeCategory === "Very Unhealthy",
      color: "text-red-400",
    },
    {
      label: "Hazardous",
      range: "301–500",
      active: activeCategory === "Hazardous",
      color: "text-red-500",
    },
  ];

  const getPercentage = () => {
    if (aqi == null) return 0;
    return Math.min((aqi / 500) * 100, 100);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div
        className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: color }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                <Activity size={16} className="text-slate-300" />
              </div>

              <h3 className="text-sm font-medium text-slate-300">
                Current Air Quality
              </h3>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              United States AQI standard
            </p>
          </div>

          <ShieldCheck size={20} className="text-slate-500" />
        </div>

        <div className="mt-8 flex items-end gap-4">
          <span
            className="text-7xl font-semibold leading-none tracking-tight"
            style={{ color }}
          >
            {aqi != null ? Math.round(aqi) : "--"}
          </span>

          <div className="pb-1">
            <div
              className="inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold"
              style={{
                color,
                borderColor: `${color}40`,
                backgroundColor: `${color}12`,
              }}
            >
              {category}
            </div>

            <p className="mt-2 max-w-[180px] text-xs leading-5 text-slate-500">
              {getDescription()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${getPercentage()}%`,
                backgroundColor: color,
              }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {categories.map((item) => (
              <div
                key={item.label}
                className={`rounded-lg border px-2 py-2 text-center transition ${
                  item.active
                    ? `border-current bg-slate-800 ${item.color}`
                    : "border-slate-800 bg-[#091423] text-slate-600"
                }`}
              >
                <p className="text-[10px] font-semibold">
                  {item.label}
                </p>

                <p className="mt-0.5 text-[9px] opacity-70">
                  {item.range}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

