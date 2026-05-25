"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import SectionHead from "@/components/ui/SectionHead";
import type { CategoryKey, Place, TravelData } from "@/lib/types";

const DAY_COLORS = ["#e88968", "#e0a458", "#9aa861", "#da7756", "#7fa8c9"];
const DAY_NAMES = ["J1 Dim", "J2 Lun", "J3 Mar", "J4 Mer", "J5 Jeu"];

export default function TripMap({
  data,
  activeDay,
  setActiveDay,
}: {
  data: TravelData;
  activeDay: number;
  setActiveDay: (i: number) => void;
}) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayer = useRef<LayerGroup | null>(null);
  const routeLayer = useRef<LayerGroup | null>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);
  const ready = useRef(false);

  const allCats = Object.keys(data.categories) as CategoryKey[];
  const [activeCats, setActiveCats] = useState<Set<CategoryKey>>(new Set(allCats));
  // "day" = focus one day's route from the lodging; "all" = overview of everything.
  const [mode, setMode] = useState<"day" | "all">("day");

  const home = data.places.find((p) => p.home) ?? null;

  // House marker for the lodging — visually distinct (bigger, gold ring, 🏠).
  function homeIcon(L: typeof import("leaflet")) {
    return L.divIcon({
      className: "",
      html: `<div style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#0f0e0c;border:2.5px solid #e0a458;box-shadow:0 0 0 3px rgba(224,164,88,.35),0 2px 8px rgba(0,0,0,.7);font-size:15px">🏠</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }

  // Numbered, category-coloured dot for an itinerary stop.
  function stopIcon(L: typeof import("leaflet"), color: string, n: number | null) {
    const inner = n !== null
      ? `<span style="font-size:10px;font-weight:800;color:#0f0e0c;line-height:1">${n}</span>`
      : "";
    const size = n !== null ? 22 : 17;
    return L.divIcon({
      className: "",
      html: `<div style="display:grid;place-items:center;width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid #0f0e0c;box-shadow:0 0 0 2px ${color}55,0 2px 7px rgba(0,0,0,.7)">${inner}</div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  function popupHtml(p: Place, color: string, emo: string, label: string) {
    const g = `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
    return (
      `<div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${color}">${emo} ${label} · ${DAY_NAMES[p.day]}</div>` +
      `<div style="font-family:Fraunces,serif;font-size:16px;font-weight:700;color:#e88968">${p.n}</div>` +
      `<div style="font-size:12px;color:#d9cfc0;margin-top:3px">${p.info}</div>` +
      `<a style="display:inline-block;margin-top:9px;font-size:12px;color:#e88968;text-decoration:none;font-weight:600;border:1px solid rgba(245,241,232,.22);padding:5px 11px;border-radius:8px" href="${g}" target="_blank" rel="noopener">↗ Google Maps</a>`
    );
  }

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
      ready.current = true;
      setTimeout(() => map.invalidateSize(), 200);
      draw(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      ready.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Selecting a day (here or from the Planning section) always focuses that
  // day's route — never leaves the map stuck in the "all" overview.
  useEffect(() => {
    setMode("day");
  }, [activeDay]);

  // Redraw on any change. `fit` recenters only when the day/mode changes.
  useEffect(() => {
    draw(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay, mode]);
  useEffect(() => {
    draw(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCats]);

  function draw(fit: boolean) {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map || !markerLayer.current || !routeLayer.current) return;
    markerLayer.current.clearLayers();
    routeLayer.current.clearLayers();

    // Lodging: ALWAYS visible, ignores filters.
    if (home) {
      L.marker([home.lat, home.lng], { icon: homeIcon(L), zIndexOffset: 1000 })
        .addTo(markerLayer.current)
        .bindPopup(
          `<div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#e0a458">🏠 Logement</div>` +
            `<div style="font-family:Fraunces,serif;font-size:16px;font-weight:700;color:#e0a458">${home.n}</div>` +
            `<div style="font-size:12px;color:#d9cfc0;margin-top:3px">${home.info}</div>`
        );
    }

    const fitPts: [number, number][] = home ? [[home.lat, home.lng]] : [];

    if (mode === "day") {
      // Day stops in authored (chronological) order, minus the lodging.
      const dayStops = data.places.filter((p) => p.day === activeDay && !p.home);
      const visible = dayStops.filter((p) => activeCats.has(p.cat));

      // Route = lodging → each visible stop, in order.
      const line: [number, number][] = home ? [[home.lat, home.lng]] : [];
      visible.forEach((p) => line.push([p.lat, p.lng]));
      if (line.length > 1) {
        L.polyline(line, {
          color: DAY_COLORS[activeDay % 5],
          weight: 3,
          opacity: 0.7,
          dashArray: "4 8",
        }).addTo(routeLayer.current);
      }

      // Markers numbered by their position in the full day sequence (stable
      // even when categories are filtered → gaps reflect hidden stops).
      dayStops.forEach((p, idx) => {
        if (!activeCats.has(p.cat)) return;
        const c = data.categories[p.cat];
        L.marker([p.lat, p.lng], { icon: stopIcon(L, c.color, idx + 1) })
          .addTo(markerLayer.current!)
          .bindPopup(popupHtml(p, c.color, c.emo, c.label));
        fitPts.push([p.lat, p.lng]);
      });
    } else {
      // Overview: every stop, category-filtered, no numbering, no routes.
      data.places
        .filter((p) => !p.home && activeCats.has(p.cat))
        .forEach((p) => {
          const c = data.categories[p.cat];
          L.marker([p.lat, p.lng], { icon: stopIcon(L, c.color, null) })
            .addTo(markerLayer.current!)
            .bindPopup(popupHtml(p, c.color, c.emo, c.label));
          fitPts.push([p.lat, p.lng]);
        });
    }

    if (fit && fitPts.length > 0) {
      const bounds = L.latLngBounds(fitPts);
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16, animate: true });
    }
  }

  function toggleCat(k: CategoryKey) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  return (
    <section id="carte" className="pt-10 scroll-mt-2">
      <SectionHead idx="02" title="Carte" note="Trajet du jour depuis le logement" />

      {/* Day selector — single day, synced with the Planning section. */}
      <div className="flex gap-1.5 flex-wrap mb-3">
        {DAY_NAMES.map((nm, i) => {
          const on = mode === "day" && i === activeDay;
          return (
            <button
              key={nm}
              onClick={() => {
                setMode("day");
                setActiveDay(i);
              }}
              className="text-[12px] rounded-lg px-3 py-[6px] border transition font-medium"
              style={
                on
                  ? { background: DAY_COLORS[i % 5], color: "#0f0e0c", borderColor: DAY_COLORS[i % 5] }
                  : { background: "#1a1714", color: "#d9cfc0", borderColor: "rgba(245,241,232,.22)" }
              }
            >
              {nm}
            </button>
          );
        })}
        <button
          onClick={() => setMode("all")}
          className="text-[12px] rounded-lg px-3 py-[6px] border transition font-medium"
          style={
            mode === "all"
              ? { background: "#f5f1e8", color: "#0f0e0c", borderColor: "#f5f1e8" }
              : { background: "#1a1714", color: "#d9cfc0", borderColor: "rgba(245,241,232,.22)" }
          }
        >
          Tous
        </button>
      </div>

      {/* Legend = category toggles + the always-on lodging marker. */}
      <div className="flex gap-[7px] flex-wrap mb-2">
        <span className="text-[12px] rounded-full px-[13px] py-[7px] border inline-flex gap-1.5 items-center bg-bg-2 text-gold border-gold/40">
          🏠 Logement <span className="text-paper-dim font-normal">(toujours)</span>
        </span>
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
      <div className="text-[11px] text-paper-dim mb-3.5">
        {mode === "day"
          ? "Les numéros suivent l'ordre chronologique du jour. Touche une pastille pour filtrer une catégorie."
          : "Vue d'ensemble de tous les lieux du séjour."}
      </div>

      <div ref={mapEl} className="h-[440px] rounded-[20px] border border-line2 shadow-soft z-[2]" />
    </section>
  );
}
