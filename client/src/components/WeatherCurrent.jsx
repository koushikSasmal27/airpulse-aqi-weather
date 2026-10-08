import React from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  CloudSun,
} from "lucide-react";
import { getWeatherCode } from "../utils";

export default function WeatherCurrent({ current }) {
  if (!current) return null;

  const stats = [
    {
      label: "Humidity",
      value: `${Math.round(current.relative_humidity_2m)}%`,
      icon: Droplets,
    },
    {
      label: "Wind Speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      icon: Wind,
    },
    {
      label: "Cloud Cover",
      value: `${Math.round(current.cloud_cover)}%`,
      icon: Cloud,
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      icon: Thermometer,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Current Weather
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Current atmospheric conditions
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#091423]">
          <CloudSun size={17} className="text-sky-400" />
        </div>
      </div>

      <div className="mt-7 flex items-center gap-5">
        <div className="text-6xl font-semibold tracking-tight text-white">
          {Math.round(current.temperature_2m)}°
        </div>

        <div>
          <p className="text-base font-medium text-slate-200">
            {getWeatherCode(current.weather_code)}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Feels like{" "}
            <span className="text-slate-300">
              {Math.round(current.apparent_temperature)}°C
            </span>
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-[#091423] p-4 transition hover:border-slate-700"
            >
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                <Icon size={14} />
                {stat.label}
              </div>

              <p className="mt-2 text-lg font-semibold text-slate-100">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}