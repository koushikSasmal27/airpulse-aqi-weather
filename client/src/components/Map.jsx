import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapPin } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function Recenter({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lon != null) {
      map.setView([lat, lon], 11);
    }
  }, [lat, lon, map]);

  return null;
}

export default function Map({ lat, lon, city }) {
  if (lat == null || lon == null) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1929] shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <div>
          <h3 className="text-base font-semibold text-white">
            Location
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={13} />
            {city}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-[#091423] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
          Live Position
        </div>
      </div>

      <div className="h-[380px] w-full">
        <MapContainer
          center={[lat, lon]}
          zoom={11}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Recenter lat={lat} lon={lon} />

          <Marker position={[lat, lon]}>
            <Popup>
              <div className="text-sm font-medium">
                {city}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 border-t border-slate-800 bg-[#091423]">
        <div className="border-r border-slate-800 px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Latitude
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {lat.toFixed(4)}
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Longitude
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {lon.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}