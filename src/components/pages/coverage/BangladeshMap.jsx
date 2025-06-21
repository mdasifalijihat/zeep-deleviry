import React, { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,   
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import districts from "../../../../public/warehouses.json";

// 🔹 Leaflet default icon fix
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 8, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

const BangladeshMap = () => {
  const BD_CENTER = [23.8103, 90.4125];

  const [query, setQuery] = useState("");
  const [targetCoords, setTargetCoords] = useState(null);

  const [currentPos, setCurrentPos] = useState(null);   // ⬅️ ইউজারের লোকেশন
  const [routeCoords, setRouteCoords] = useState([]);   // ⬅️ Polyline পয়েন্ট
  const [distanceKm, setDistanceKm] = useState(null);   // ⬅️ দূরত্ব

  /* ---------- ১. বর্তমান পজিশন নেওয়া ---------- */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      },
      () => console.warn("Geo‑permission denied"),
      { enableHighAccuracy: true, maximumAge: 30_000 }
    );
  }, []);

  /* ---------- ২. টেক্সট‑ফিল্টার ---------- */
  const filtered = useMemo(
    () =>
      districts.filter((d) =>
        d.district.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  /* ---------- ৩. টার্গেট সিলেক্ট করলে ---------- */
  const handleSelect = (name) => {
    setQuery(name);
    const hit = districts.find(
      (d) => d.district.toLowerCase() === name.toLowerCase()
    );
    if (hit) setTargetCoords([hit.latitude, hit.longitude]);
  };

  /* ---------- ৪. রুট কলকুলেশন ---------- */
  useEffect(() => {
    if (!currentPos || !targetCoords) return;

    const [startLat, startLng] = currentPos;
    const [endLat, endLng] = targetCoords;

    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.code !== "Ok") throw new Error("Route fetch failed");

        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [
          lat,
          lng,
        ]);
        setRouteCoords(coords);
        setDistanceKm((data.routes[0].distance / 1000).toFixed(1));
      } catch (err) {
        console.error(err);
        setRouteCoords([]);
        setDistanceKm(null);
      }
    })();
  }, [currentPos, targetCoords]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        আমরা এখন ৬৪&nbsp;জেলায়
      </h1>

      {/* ---------- সার্চ ইনপুট ---------- */}
      <div className="relative flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setTargetCoords(null);
            setRouteCoords([]);
            setDistanceKm(null);
          }}
          placeholder="জেলার নাম লিখুন…"
          className="input input-bordered w-full max-w-md"
        />

        {query && filtered.length > 0 && (
          <ul className="absolute top-full left-0 w-full max-w-md bg-base-100 shadow rounded-box z-10 max-h-60 overflow-y-auto">
            {filtered.map((d) => (
              <li
                key={d.district}
                className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                onClick={() => handleSelect(d.district)}
              >
                {d.district}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ---------- রুট দূরত্ব দেখানো ---------- */}
      {distanceKm && (
        <p className="text-center mb-4">
          🔄 মোট দূরত্ব&nbsp;
          <span className="font-semibold">{distanceKm} কিমি</span>
        </p>
      )}

      {/* ---------- ম্যাপ ---------- */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={BD_CENTER}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* সব জেলা মার্কার */}
          {districts.map((d) => (
            <Marker
              key={d.district}
              position={[d.latitude, d.longitude]}
              icon={markerIcon}
            >
              <Popup minWidth={180}>
                <p className="font-semibold">{d.district}</p>
                {d.covered_area && (
                  <p className="text-xs text-gray-500">
                    {d.covered_area.slice(0, 3).join(", ")}
                    {d.covered_area.length > 3 && "…"}
                  </p>
                )}
              </Popup>
            </Marker>
          ))}

          {/* ইউজারের বর্তমান পজিশন মার্কার */}
          {currentPos && (
            <Marker position={currentPos} icon={markerIcon}>
              <Popup>আপনার অবস্থান</Popup>
            </Marker>
          )}

          {/* রুট পলিলাইন */}
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} weight={5} />
          )}

          <FlyTo coords={targetCoords ?? BD_CENTER} />
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
