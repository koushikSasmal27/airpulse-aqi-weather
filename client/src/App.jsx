import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Search, MapPin, Wind, Loader2 } from "lucide-react";

import {
  fetchAirQualityAndWeather,
  searchCityAPI,
  reverseGeocode,
} from "./services/api";

import Dashboard from "./pages/Dashboard";
import AQIPage from "./pages/AQIPage";
import WeatherPage from "./pages/WeatherPage";

const DEFAULT_LOCATION = {
  lat: 22.5726,
  lon: 88.3639,
  name: "Kolkata",
  region: "West Bengal",
  country: "India",
};

export default function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const loadData = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchAirQualityAndWeather(lat, lon);
      setData(res);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to fetch data from the server. Ensure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(location.lat, location.lon);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);

        try {
          const results = await searchCityAPI(searchQuery);
          setSuggestions(results || []);
        } catch (error) {
          console.error("City search failed:", error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectCity = (city) => {
    setLocation({
      lat: city.latitude,
      lon: city.longitude,
      name: city.name,
      region: city.admin1 || "",
      country: city.country || "",
    });

    setSearchQuery("");
    setSuggestions([]);
  };

  const handleGeolocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const result = await reverseGeocode(lat, lon);

        const address = result?.address;

        setLocation({
          lat,
          lon,
          name:
            address?.city ||
            address?.town ||
            address?.village ||
            address?.municipality ||
            "Current Location",
          region:
            address?.state ||
            address?.state_district ||
            "",
          country: address?.country || "",
        });
      } catch (error) {
        console.error("Reverse geocoding failed:", error);

        setLocation({
          lat,
          lon,
          name: "Current Location",
          region: "",
          country: "",
        });
      }
    },
    () => {
      alert(
        "Geolocation permission denied. Falling back to default location."
      );

      setLocation(DEFAULT_LOCATION);
    }
  );
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
              <Wind size={25} className="text-cyan-400" />
            </div>

            <h1 className="hidden text-xl font-bold tracking-tight sm:block">
              Air<span className="text-cyan-400">Pulse</span>
            </h1>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 transition focus-within:border-cyan-400/50 focus-within:bg-white/10">
              <Search
                size={19}
                className="ml-4 shrink-0 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              {isSearching && (
                <Loader2
                  size={18}
                  className="mr-4 animate-spin text-cyan-400"
                />
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                {suggestions.map((city) => (
                  <button
                    key={`${city.id}-${city.latitude}`}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition last:border-0 hover:bg-white/10"
                  >
                    <MapPin
                      size={17}
                      className="shrink-0 text-cyan-400"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {city.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {city.admin1 ? `${city.admin1}, ` : ""}
                        {city.country}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleGeolocation}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/20"
          >
            <MapPin size={18} />
            <span className="hidden md:inline">My Location</span>
          </button>
        </div>

        <nav className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/aqi"
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`
              }
            >
              AQI Details
            </NavLink>

            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-cyan-400 text-cyan-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`
              }
            >
              Weather Details
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="mx-auto min-h-[calc(100vh-140px)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                context={{
                  location,
                  data,
                  loading,
                  error,
                }}
              />
            }
          />

          <Route
            path="/aqi"
            element={
              <AQIPage
                context={{
                  location,
                  data,
                  loading,
                  error,
                }}
              />
            }
          />

          <Route
            path="/weather"
            element={
              <WeatherPage
                context={{
                  location,
                  data,
                  loading,
                  error,
                }}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}