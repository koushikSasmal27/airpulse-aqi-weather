import React from "react";
import { CalendarDays, CloudSun } from "lucide-react";
import { getWeatherCode, formatDate } from "../utils";

export default function SevenDayWeather({ daily }) {
  if (!daily || !daily.time) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            7-Day Forecast
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Daily weather outlook
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#091423]">
          <CalendarDays size={17} className="text-slate-400" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {daily.time.map((date, i) => (
          <div
            key={date}
            className={`grid grid-cols-[1fr_auto_1fr] items-center rounded-xl border px-4 py-3 transition ${
              i === 0
                ? "border-slate-700 bg-[#091423]"
                : "border-slate-800 bg-transparent hover:bg-[#091423]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  i === 0 ? "bg-sky-400/10" : "bg-slate-800"
                }`}
              >
                <CloudSun
                  size={16}
                  className={
                    i === 0 ? "text-sky-400" : "text-slate-500"
                  }
                />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-200">
                  {i === 0 ? "Today" : formatDate(date)}
                </p>

                {i === 0 && (
                  <p className="text-[10px] text-slate-500">
                    Current day
                  </p>
                )}
              </div>
            </div>

            <div className="px-4 text-center text-xs text-slate-400">
              {getWeatherCode(daily.weather_code[i])}
            </div>

            <div className="flex justify-end gap-3">
              <span className="text-sm font-semibold text-white">
                {Math.round(daily.temperature_2m_max[i])}°
              </span>

              <span className="text-sm text-slate-500">
                {Math.round(daily.temperature_2m_min[i])}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}