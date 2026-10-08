import React from "react";
import {
  Activity,
  Wind,
  Droplets,
  CloudRain,
  Thermometer,
  ShieldCheck,
  Umbrella,
} from "lucide-react";

export default function HealthRecommendation({ aqi, current }) {
  const pm25 = current?.pm2_5;
  const temperature = current?.temperature_2m;
  const precipitation = current?.precipitation;
  const wind = current?.wind_speed_10m;
  const humidity = current?.relative_humidity_2m;

  const recommendations = [];

  if (aqi == null) {
    recommendations.push({
      title: "AQI data unavailable",
      message: "Air quality information is currently unavailable.",
      icon: Activity,
      color: "text-slate-400",
    });
  } else if (aqi <= 50) {
    recommendations.push({
      title: "Good air quality",
      message: "Suitable conditions for most outdoor activities.",
      icon: Activity,
      color: "text-emerald-400",
    });
  } else if (aqi <= 100) {
    recommendations.push({
      title: "Moderate air quality",
      message: "Most people can continue normal outdoor activities.",
      icon: Activity,
      color: "text-yellow-400",
    });
  } else if (aqi <= 150) {
    recommendations.push({
      title: "Sensitive groups should take care",
      message:
        "Consider reducing prolonged or intense outdoor activities if you are sensitive to air pollution.",
      icon: ShieldCheck,
      color: "text-orange-400",
    });
  } else if (aqi <= 200) {
    recommendations.push({
      title: "Limit prolonged outdoor activity",
      message:
        "Consider reducing prolonged or intense outdoor activities.",
      icon: ShieldCheck,
      color: "text-orange-400",
    });
  } else if (aqi <= 300) {
    recommendations.push({
      title: "Unhealthy air quality",
      message:
        "Avoid prolonged outdoor activity and consider reducing exposure to polluted air.",
      icon: ShieldCheck,
      color: "text-red-400",
    });
  } else {
    recommendations.push({
      title: "Very unhealthy air quality",
      message:
        "Avoid outdoor exposure as much as possible and keep indoor air clean.",
      icon: ShieldCheck,
      color: "text-red-500",
    });
  }

  if (pm25 > 55) {
    recommendations.push({
      title: "High PM2.5",
      message:
        "Fine particle pollution is elevated. Consider reducing outdoor exposure.",
      icon: Wind,
      color: "text-orange-400",
    });
  }

  if (temperature >= 35) {
    recommendations.push({
      title: "High temperature",
      message:
        "Stay hydrated and avoid prolonged activity during the hottest part of the day.",
      icon: Thermometer,
      color: "text-orange-400",
    });
  }

  if (precipitation > 2) {
    recommendations.push({
      title: "Rain expected",
      message:
        "Wet conditions are present. Carry an umbrella and take care on wet roads.",
      icon: CloudRain,
      color: "text-sky-400",
    });
  }

  if (wind >= 30) {
    recommendations.push({
      title: "Strong winds",
      message:
        "Be cautious outdoors, particularly in exposed or open areas.",
      icon: Wind,
      color: "text-sky-400",
    });
  }

  if (humidity >= 80) {
    recommendations.push({
      title: "High humidity",
      message:
        "Stay hydrated and take breaks if outdoor conditions feel uncomfortable.",
      icon: Droplets,
      color: "text-sky-400",
    });
  }

  const visibleRecommendations = recommendations.slice(0, 3);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Health & Lifestyle
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Recommendations based on current atmospheric conditions
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#091423]">
          <ShieldCheck size={17} className="text-slate-400" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        {visibleRecommendations.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={`${item.title}-${index}`}
              className="rounded-xl border border-slate-800 bg-[#091423] p-4 transition hover:border-slate-700"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <Icon size={17} className={item.color} />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-200">
                    {item.title}
                  </h4>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-5 sm:grid-cols-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            AQI
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-200">
            {aqi != null ? Math.round(aqi) : "--"}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            PM2.5
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-200">
            {pm25 != null ? `${Math.round(pm25)} µg/m³` : "--"}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Temperature
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-200">
            {temperature != null ? `${Math.round(temperature)}°C` : "--"}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Humidity
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-200">
            {humidity != null ? `${Math.round(humidity)}%` : "--"}
          </p>
        </div>
      </div>
    </div>
  );
}