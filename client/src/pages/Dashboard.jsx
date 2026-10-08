import React from "react";
import { MapPin, Activity, ArrowUpRight } from "lucide-react";

import AqiCard from "../components/AqiCard";
import WeatherCurrent from "../components/WeatherCurrent";
import Pollutants from "../components/Pollutants";
import Map from "../components/Map";
import HealthRecommendation from "../components/HealthRecommendation";

export default function Dashboard({ context }) {
  const { location, data, loading, error } = context;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#07111f]">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-slate-300" />
          <p className="mt-4 text-sm text-slate-400">
            Loading atmospheric data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#07111f]">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-center">
          <p className="text-sm font-medium text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  let currentAqi = data.aqi?.current;

  if (
    currentAqi?.us_aqi == null &&
    data.aqi?.hourly?.us_aqi &&
    currentAqi?.time
  ) {
    const hIdx = data.aqi.hourly.time.findIndex(
      (t) => t === currentAqi.time
    );

    if (hIdx !== -1) {
      currentAqi = {
        ...currentAqi,
        us_aqi: data.aqi.hourly.us_aqi[hIdx],
      };
    }
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="mx-auto max-w-7xl space-y-7">
        <section className="flex flex-col justify-between gap-5 border-b border-slate-800/80 pb-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              <Activity size={14} />
              Air Quality Monitor
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {location.name}
            </h1>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin size={15} />
              <span>
                {location.region ? `${location.region}, ` : ""}
                {location.country}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live atmospheric data
            <ArrowUpRight size={14} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AqiCard current={currentAqi} />
          <WeatherCurrent current={data.weather?.current} />
        </section>

        <section>
          <HealthRecommendation
            aqi={currentAqi?.us_aqi}
            current={{
              ...currentAqi,
              ...(data.weather?.current || {}),
            }}
          />
        </section>

        <section>
          <Pollutants current={currentAqi} />
        </section>

        <section>
          <Map
            lat={location.lat}
            lon={location.lon}
            city={location.name}
          />
        </section>
      </div>
    </div>
  );
}