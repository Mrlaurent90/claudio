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

  const allCats = Object.keys(data.categories) as CategoryKey[];
  // Multi-select: show one OR several days at once.
  const [activeDays, setActiveDays] = useState<Set<number>>(new Set([activeDay]));
  const [activeCats, setActiveCats] = useState<Set<CategoryKey>>(new Set(allCats));

  const home = data.places.find((p) => p.home) ?? null;

  function homeIcon(L: typeof import("leaflet")) {
    return L.divIcon({
      className: "",
      html: `<div style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#0f0e0c;border:2.5px solid #e0a458;box-shadow:0 0 0 3px rgba(224,164,88,.35),0 2px 8px rgba(0,0,0,.7);font-size:15px">🏠</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }

  // Numbered stop: category colour inside, day colour ring (ties it to its route).
  function stopIcon(L: typeof import("leaflet"), fill: string, ring: string, n: number) {
    return L.divIcon({
      className: "",
      html: `<div style="display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:${fill};border:2.5px solid ${ring};box-shadow:0 0 0 2px ${ring}55,0 2px 7px rgba(0,0,0,.7)"><span style="font-size:10px;font-weight:800;color:#0f0e0c;line-height:1">${n}</span></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
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
      setTimeout(() => map.invalidateSize(), 200);
      draw(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changing the day in the Planning section focuses the map on that single
  // day (the Planning ↔ map link). The user can then add more days here.
  useEffect(() => {
    setActiveDays(new Set([activeDay]));
  }, [activeDay]);

  // Redraw + recenter when the day set changes; redraw without recentering when
  // only category visibility changes.
  useEffect(() => {
    draw(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDays]);
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

    // Lodging: ALWAYS visible, ignores all filters.
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

    // One route per selected day, each starting from the lodging.
    const days = [...activeDays].sort((a, b) => a - b);
    for (const day of days) {
      const dayColor = DAY_COLORS[day % 5];
      const dayStops = data.places.filter((p) => p.day === day && !p.home);

      const line: [number, number][] = home ? [[home.lat, home.lng]] : [];
      dayStops.forEach((p) => {
        if (activeCats.has(p.cat)) line.push([p.lat, p.lng]);
      });
      if (line.length > 1) {
        L.polyline(line, { color: dayColor, weight: 3, opacity: 0.7, dashArray: "4 8" }).addTo(
          routeLayer.current
        );
      }

      dayStops.forEach((p, idx) => {
        if (!activeCats.has(p.cat)) return;
        const c = data.categories[p.cat];
        L.marker([p.lat, p.lng], { icon: stopIcon(L, c.color, dayColor, idx + 1) })
          .addTo(markerLayer.current!)
          .bindPopup(popupHtml(p, c.color, c.emo, c.label));
        fitPts.push([p.lat, p.lng]);
      });
    }

    if (fit && fitPts.length > 0) {
      map.fitBounds(L.latLngBounds(fitPts), { padding: [48, 48], maxZoom: 16, animate: true });
    }
  }

  function toggleDay(i: number) {
    setActiveDays((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      if (next.size === 0) next.add(i); // keep at least one
      if (next.size === 1) setActiveDay([...next][0]); // sync Planning when single
      return next;
    });
  }
  function toggleCat(k: CategoryKey) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  const allDaysOn = activeDays.size === data.days.length;

  // Day selector — rendered both above and below the map so you can switch days
  // without scrolling. `variant` only keeps React keys unique between copies.
  const dayChips = (variant: string) => (
    <div className="flex gap-1.5 flex-wrap items-center">
      {DAY_NAMES.map((nm, i) => {
        const on = activeDays.has(i);
        return (
          <button
            key={variant + nm}
            onClick={() => toggleDay(i)}
            aria-pressed={on}
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
        key={variant + "all"}
        onClick={() =>
          setActiveDays(allDaysOn ? new Set([activeDay]) : new Set(data.days.map((_, i) => i)))
        }
        className="text-[12px] rounded-lg px-3 py-[6px] border transition font-medium"
        style={
          allDaysOn
            ? { background: "#f5f1e8", color: "#0f0e0c", borderColor: "#f5f1e8" }
            : { background: "#1a1714", color: "#d9cfc0", borderColor: "rgba(245,241,232,.22)" }
        }
      >
        {allDaysOn ? "Réduire" : "Tous"}
      </button>
    </div>
  );

  return (
    <section id="carte" className="pt-10 scroll-mt-2">
      <SectionHead idx="02" title="Carte" note="Trajets depuis le logement" />

      {dayChips("top")}
      <div className="text-[11px] text-paper-dim mt-2 mb-3">
        Choisis un ou plusieurs jours · les numéros suivent l&apos;ordre chronologique.
      </div>

      {/* Compact category legend / filters with emoji. Tap to show/hide. */}
      <div className="flex gap-1.5 flex-wrap mb-1.5">
        <span className="text-[11px] rounded-full px-2.5 py-1 border inline-flex gap-1 items-center bg-bg-2 text-gold border-gold/40">
          🏠 Logement
        </span>
        {allCats.map((k) => {
          const v = data.categories[k];
          const on = activeCats.has(k);
          return (
            <button
              key={k}
              onClick={() => toggleCat(k)}
              aria-pressed={on}
              className="text-[11px] rounded-full px-2.5 py-1 border inline-flex gap-1 items-center transition"
              style={
                on
                  ? { background: v.color, color: "#0f0e0c", borderColor: v.color }
                  : { background: "#1a1714", color: "#d9cfc0", borderColor: "rgba(245,241,232,.22)" }
              }
            >
              <span className="leading-none">{v.emo}</span>
              {v.label}
            </button>
          );
        })}
      </div>
      <div className="text-[11px] text-paper-dim mb-3.5">Touche un type pour l&apos;afficher ou le masquer.</div>

      <div ref={mapEl} className="h-[440px] rounded-[20px] border border-line2 shadow-soft z-[2]" />

      {/* Day selector mirrored under the map for quick switching on-site. */}
      <div className="mt-3">
        <div className="text-[11px] text-paper-dim mb-1.5 font-medium">Itinéraires par jour</div>
        {dayChips("bottom")}
      </div>
    </section>
  );
}
