"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import SectionHead from "@/components/ui/SectionHead";
import type { CategoryKey, TravelData } from "@/lib/types";

const DAY_COLORS = ["#e88968", "#e0a458", "#9aa861", "#da7756", "#7fa8c9"];
const DAY_NAMES = ["J1 Dim", "J2 Lun", "J3 Mar", "J4 Mer", "J5 Jeu"];

export default function TripMap({ data }: { data: TravelData }) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayer = useRef<LayerGroup | null>(null);
  const routeLayer = useRef<LayerGroup | null>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);

  const allCats = Object.keys(data.categories) as CategoryKey[];
  const [activeDays, setActiveDays] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const [activeCats, setActiveCats] = useState<Set<CategoryKey>>(new Set(allCats));

  // Initialise Leaflet once. Dynamic import keeps it out of the SSR bundle.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false }).setView(
        [41.9015, 12.469],
        13
      );
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap © CARTO",
        maxZoom: 19,
      }).addTo(map);
      markerLayer.current = L.layerGroup().addTo(map);
      routeLayer.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 200);
      draw();
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw whenever filters change.
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDays, activeCats]);

  function draw() {
    const L = LRef.current;
    if (!L || !markerLayer.current || !routeLayer.current) return;
    markerLayer.current.clearLayers();
    routeLayer.current.clearLayers();

    for (let day = 0; day < data.days.length; day++) {
      if (!activeDays.has(day)) continue;
      const pts = data.places.filter((p) => p.day === day && activeCats.has(p.cat));
      if (pts.length > 1) {
        L.polyline(
          pts.map((p) => [p.lat, p.lng] as [number, number]),
          { color: DAY_COLORS[day % 5], weight: 2.5, opacity: 0.5, dashArray: "4 7" }
        ).addTo(routeLayer.current);
      }
    }

    data.places
      .filter((p) => activeCats.has(p.cat) && activeDays.has(p.day))
      .forEach((p) => {
        const c = data.categories[p.cat];
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:17px;height:17px;border-radius:50%;background:${c.color};border:2.5px solid #0f0e0c;box-shadow:0 0 0 2px ${c.color}55,0 2px 7px rgba(0,0,0,.7)"></div>`,
          iconSize: [17, 17],
          iconAnchor: [8, 8],
        });
        const g = `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
        L.marker([p.lat, p.lng], { icon })
          .addTo(markerLayer.current!)
          .bindPopup(
            `<div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${c.color}">${c.emo} ${c.label} · ${DAY_NAMES[p.day]}</div>` +
              `<div style="font-family:Fraunces,serif;font-size:16px;font-weight:700;color:#e88968">${p.n}</div>` +
              `<div style="font-size:12px;color:#d9cfc0;margin-top:3px">${p.info}</div>` +
              `<a style="display:inline-block;margin-top:9px;font-size:12px;color:#e88968;text-decoration:none;font-weight:600;border:1px solid rgba(245,241,232,.22);padding:5px 11px;border-radius:8px" href="${g}" target="_blank" rel="noopener">↗ Google Maps</a>`
          );
      });
  }

  function toggleDay(i: number) {
    setActiveDays((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }
  function toggleCat(k: CategoryKey) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  }

  return (
    <section id="carte" className="pt-10 scroll-mt-2">
      <SectionHead idx="02" title="Carte" note="Itinéraire tracé · filtres" />

      <div className="flex gap-1.5 flex-wrap mb-3">
        {DAY_NAMES.map((nm, i) => {
          const on = activeDays.has(i);
          return (
            <button
              key={nm}
              onClick={() => toggleDay(i)}
              className={`text-[11.5px] rounded-lg px-[11px] py-[5px] border transition ${
                on ? "bg-bg-3 text-paper border-line2" : "bg-transparent text-paper-dim border-line"
              }`}
            >
              {nm}
            </button>
          );
        })}
      </div>

      <div className="flex gap-[7px] flex-wrap mb-3.5">
        {allCats.map((k) => {
          const v = data.categories[k];
          const on = activeCats.has(k);
          return (
            <button
              key={k}
              onClick={() => toggleCat(k)}
              className="text-[12px] rounded-full px-[13px] py-[7px] border inline-flex gap-1.5 items-center transition"
              style={
                on
                  ? { background: v.color, color: "#0f0e0c", borderColor: v.color }
                  : { background: "#1a1714", color: "#d9cfc0", borderColor: "rgba(245,241,232,.22)" }
              }
            >
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: v.color }} />
              {v.label}
            </button>
          );
        })}
      </div>

      <div ref={mapEl} className="h-[420px] rounded-[20px] border border-line2 shadow-soft z-[2]" />
    </section>
  );
}
