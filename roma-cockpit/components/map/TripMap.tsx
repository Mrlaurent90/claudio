"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import SectionHead from "@/components/ui/SectionHead";
import type { CategoryKey, Place, TravelData } from "@/lib/types";
import { fmtDist, walkKm, walkMinutes } from "@/lib/geo";
import { googleMapsFiche } from "@/lib/links";

const DAY_COLORS = ["#e88968", "#e0a458", "#9aa861", "#da7756", "#7fa8c9"];
const DAY_NAMES = ["J1 Dim", "J2 Lun", "J3 Mar", "J4 Mer", "J5 Jeu"];

export default function TripMap({
  data,
  activeDay,
  setActiveDay,
  onOpenPlanning,
}: {
  data: TravelData;
  activeDay: number;
  setActiveDay: (i: number) => void;
  /** Jump to the planning section, focused on the given day. */
  onOpenPlanning?: (dayIndex: number) => void;
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

  // Keep the planning-jump callback fresh for Leaflet popup click handlers,
  // which are bound imperatively and would otherwise capture a stale closure.
  const openPlanRef = useRef(onOpenPlanning);
  openPlanRef.current = onOpenPlanning;

  // The ordered, visible (filtered) walking stops for one day — shared by the
  // map drawing and the day summary so both agree on legs/distances.
  function visibleStops(day: number): Place[] {
    return data.places.filter((p) => p.day === day && !p.home && activeCats.has(p.cat));
  }

  // Foot-only legs (transport transfers like the airport aren't walked).
  function walkLegKm(from: Place | null, to: Place): number | null {
    if (!from || to.cat === "transport") return null;
    return walkKm([from.lat, from.lng], [to.lat, to.lng]);
  }

  // Summary of the currently selected day(s): stop count + total walking.
  const summary = useMemo(() => {
    let stops = 0;
    let km = 0;
    let hasTransfer = false;
    for (const day of activeDays) {
      const list = visibleStops(day);
      stops += list.length;
      let prev: Place | null = home;
      for (const p of list) {
        const leg = walkLegKm(prev, p);
        if (leg === null) hasTransfer = true;
        else km += leg;
        prev = p;
      }
    }
    return { stops, km, minutes: km > 0 ? walkMinutes(km) : 0, hasTransfer };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDays, activeCats]);

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
      html: `<div style="display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:${fill};border:2.5px solid ${ring};box-shadow:0 0 0 2px ${ring}55,0 2px 7px rgba(0,0,0,.7)"><span style="font-size:12px;font-weight:800;color:#0f0e0c;line-height:1">${n}</span></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });
  }

  // A small non-interactive pill placed at a leg midpoint: "~7 min".
  function legIcon(L: typeof import("leaflet"), text: string) {
    return L.divIcon({
      className: "",
      html: `<div style="white-space:nowrap;font-size:10px;font-weight:700;color:#0f0e0c;background:#d9cfc0;border:1px solid rgba(15,14,12,.25);border-radius:999px;padding:1px 7px;box-shadow:0 1px 4px rgba(0,0,0,.5)">${text}</div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }

  function popupHtml(p: Place, color: string, emo: string, label: string, legInfo: string) {
    const fiche = googleMapsFiche(p.n);
    const time = p.t ? ` · ${p.t}` : "";
    const leg = legInfo
      ? `<div style="font-size:12px;color:#9aa861;margin-top:6px;font-weight:600">${legInfo}</div>`
      : "";
    const ficheLink = fiche
      ? `<a style="font-size:12px;color:#e88968;text-decoration:none;font-weight:600;border:1px solid rgba(245,241,232,.22);padding:5px 11px;border-radius:8px" href="${fiche}" target="_blank" rel="noopener">📍 Voir sur Google Maps</a>`
      : "";
    return (
      `<div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${color}">${emo} ${label} · ${DAY_NAMES[p.day]}${time}</div>` +
      `<div style="font-family:Fraunces,serif;font-size:16px;font-weight:700;color:#e88968">${p.n}</div>` +
      `<div style="font-size:12px;color:#d9cfc0;margin-top:3px">${p.info}</div>` +
      leg +
      `<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">` +
      `<button class="js-open-plan" style="cursor:pointer;font-size:12px;color:#0f0e0c;background:#e88968;font-weight:700;border:none;padding:6px 11px;border-radius:8px">Ouvrir dans le planning</button>` +
      ficheLink +
      `</div>`
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
      const stops = visibleStops(day);

      const line: [number, number][] = home ? [[home.lat, home.lng]] : [];
      stops.forEach((p) => line.push([p.lat, p.lng]));
      if (line.length > 1) {
        L.polyline(line, { color: dayColor, weight: 3, opacity: 0.7, dashArray: "4 8" }).addTo(
          routeLayer.current
        );
      }

      let prev: Place | null = home;
      stops.forEach((p, idx) => {
        const c = data.categories[p.cat];
        const legKm = walkLegKm(prev, p);

        // Leg label + popup text: walking estimate, or a transfer note.
        let legInfo = "";
        if (prev) {
          const fromName = prev.home ? "le logement" : prev.n;
          if (p.cat === "transport") {
            legInfo = `🚕 Transfert depuis ${fromName} (non à pied)`;
          } else if (legKm !== null) {
            const mins = walkMinutes(legKm);
            legInfo = `🚶 ~${mins} min depuis ${fromName} · ${fmtDist(legKm)}`;
            const mid: [number, number] = [(prev.lat + p.lat) / 2, (prev.lng + p.lng) / 2];
            L.marker(mid, { icon: legIcon(L, `~${mins} min`), interactive: false, zIndexOffset: -500 }).addTo(
              routeLayer.current!
            );
          }
        }

        const marker = L.marker([p.lat, p.lng], { icon: stopIcon(L, c.color, dayColor, idx + 1) })
          .addTo(markerLayer.current!)
          .bindPopup(popupHtml(p, c.color, c.emo, c.label, legInfo));

        marker.on("popupopen", (e) => {
          const btn = (e.popup.getElement() as HTMLElement | undefined)?.querySelector(".js-open-plan");
          btn?.addEventListener("click", () => openPlanRef.current?.(p.day), { once: true });
        });

        fitPts.push([p.lat, p.lng]);
        prev = p;
      });
    }

    if (fit && fitPts.length > 0) {
      map.fitBounds(L.latLngBounds(fitPts), { padding: [48, 48], maxZoom: 16, animate: true });
    }
  }

  // Single-select: exactly one day at a time (never several at once).
  function selectDay(i: number) {
    setActiveDays(new Set([i]));
    setActiveDay(i); // keep the Planning section in sync
  }
  function toggleCat(k: CategoryKey) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  // Day selector — rendered both above and below the map so you can switch days
  // without scrolling. `variant` only keeps React keys unique between copies.
  const dayChips = (variant: string) => (
    <div className="flex gap-1.5 flex-wrap items-center">
      {DAY_NAMES.map((nm, i) => {
        const on = activeDays.has(i);
        return (
          <button
            key={variant + nm}
            onClick={() => selectDay(i)}
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
    </div>
  );

  return (
    <section id="carte" className="pt-10 scroll-mt-2">
      <SectionHead idx="02" title="Carte" note="Trajets depuis le logement" />

      {dayChips("top")}
      <div className="text-[11px] text-paper-dim mt-2 mb-3">
        Choisis un jour · les numéros suivent l&apos;ordre chronologique.
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

      {/* Day summary: stops + estimated walking. Distances are straight-line
          adjusted for street detours (~±15%), shown as estimates. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2.5 text-[12px]">
        <span className="text-paper">
          <b className="text-clay-bright">{summary.stops}</b> étape{summary.stops > 1 ? "s" : ""}
        </span>
        {summary.km > 0 && (
          <>
            <span className="text-paper">
              🚶 <b className="text-clay-bright">~{summary.minutes} min</b> de marche
            </span>
            <span className="text-paper-dim">≈ {fmtDist(summary.km)}</span>
          </>
        )}
        {summary.hasTransfer && <span className="text-gold">🚕 + transfert</span>}
        <span className="text-paper-dim text-[10.5px]">estimation à pied</span>
      </div>

      <div ref={mapEl} className="h-[440px] rounded-[20px] border border-line2 shadow-soft z-[2]" />

      {/* Day selector mirrored under the map for quick switching on-site. */}
      <div className="mt-3">
        <div className="text-[11px] text-paper-dim mb-1.5 font-medium">Itinéraires par jour</div>
        {dayChips("bottom")}
      </div>
    </section>
  );
}
