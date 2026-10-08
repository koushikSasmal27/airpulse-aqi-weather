import React from "react";
import { Brain, Sparkles } from "lucide-react";

import AqiCard from "../components/AqiCard";
import Pollutants from "../components/Pollutants";
import HistoricalAQI from "../components/HistoricalAQI";

export default function AQIPage({ context }) {
  const { location, data, loading, error } = context;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-slate-300" />
          <p className="mt-4 text-sm text-slate-400">
            Loading air quality data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
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
        <section className="border-b border-slate-800/80 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Air Quality
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Air Quality Details
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Current air quality and machine-learning prediction for{" "}
            <span className="text-slate-200">
              {location.name}
            </span>
          </p>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <AqiCard current={currentAqi} />
          </div>

          <div className="lg:col-span-3">
            <Pollutants current={currentAqi} />
          </div>
        </section>

        <HistoricalAQI
          latitude={location.lat}
          longitude={location.lon}
        />

        <section className="rounded-2xl border border-slate-800 bg-[#0D1929] p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#091423]">
                  <Brain size={17} className="text-sky-400" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    Next 24-Hour AQI Prediction
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Machine-learning-based air quality prediction
                  </p>
                </div>
              </div>
            </div>

            <Sparkles size={17} className="text-slate-600" />
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-[#091423] p-6">
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
                <Brain size={22} className="text-sky-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-200">
                ML Prediction Module
              </h3>

              <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500">
                This section is reserved for the LightGBM prediction
                pipeline. The model will use historical air quality and
                meteorological features to generate AQI predictions for
                the next 24 hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}