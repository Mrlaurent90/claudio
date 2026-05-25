"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import NowCard from "@/components/now/NowCard";
import Planning from "@/components/planning/Planning";
import Decisions from "@/components/decisions/Decisions";
import Resas from "@/components/resas/Resas";
import Budget from "@/components/budget/Budget";
import Premium from "@/components/premium/Premium";
import Checklist from "@/components/checklist/Checklist";
import Alerts from "@/components/alerts/Alerts";
import BottomNav, { type NavItem } from "@/components/nav/BottomNav";
import { computeNow } from "@/lib/now";
import { useTripSync } from "@/lib/sync";
import type { TravelData } from "@/lib/types";

// Leaflet touches `window`, so the map is client-only (no server render).
const TripMap = dynamic(() => import("@/components/map/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] rounded-[20px] border border-line2 bg-bg-2 grid place-items-center text-paper-dim text-sm">
      Chargement de la carte…
    </div>
  ),
});

const NAV: NavItem[] = [
  { id: "planning", label: "Plan", icon: "🗓️" },
  { id: "carte", label: "Carte", icon: "🗺️" },
  { id: "decisions", label: "Décider", icon: "⚖️" },
  { id: "resas", label: "Résas", icon: "🎫" },
  { id: "budget", label: "Budget", icon: "💶" },
  { id: "premium", label: "Premium", icon: "✦" },
  { id: "checklist", label: "Check", icon: "✅" },
  { id: "alertes", label: "Alertes", icon: "⚠️" },
];

function SyncBadge({ online, status }: { online: boolean; status: string }) {
  const txt = !online ? "Hors-ligne · sauvegardé" : status === "local" ? "Local" : status === "pending" ? "Synchro…" : "Synchronisé";
  const color = !online ? "#e0a458" : status === "synced" ? "#9aa861" : "#cc9b7a";
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-paper-dim">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {txt}
    </div>
  );
}

export default function CockpitApp({ data }: { data: TravelData }) {
  const { state, online, syncStatus, toggleCheck, setResa, setDecision } = useTripSync(data.tripId);
  const [activeDay, setActiveDay] = useState(0);
  const [activeSection, setActiveSection] = useState("planning");

  // Header progress is computed once on mount (NowCard handles the live ticking).
  const headerNow = useMemo(() => computeNow(data), [data]);

  // On first load during the trip, open the current day in the planning.
  useEffect(() => {
    if (headerNow.dayIndex !== null) setActiveDay(headerNow.dayIndex);
  }, [headerNow.dayIndex]);

  // Scroll-spy to highlight the active section in the bottom nav.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Header data={data} now={headerNow} />
      <NowCard data={data} onOpenDay={(i) => { setActiveDay(i); jump("planning"); }} />

      <main className="relative z-[2] max-w-[980px] mx-auto px-[18px] pb-28">
        <Planning data={data} activeDay={activeDay} setActiveDay={setActiveDay} />
        <TripMap data={data} activeDay={activeDay} setActiveDay={setActiveDay} />
        <Decisions data={data} chosen={state.decisions} onChoose={setDecision} />
        <Resas data={data} statuses={state.resaStatus} onSetStatus={setResa} />
        <Budget data={data} />
        <Premium data={data} />
        <Checklist data={data} checked={state.checklist} onToggle={toggleCheck} />
        <Alerts data={data} />

        <footer className="text-center pt-8 pb-4 text-paper-dim text-[11.5px] border-t border-line mt-8">
          <div className="flex justify-center mb-2">
            <SyncBadge online={online} status={syncStatus} />
          </div>
          Données dans <b className="text-clay-bright">data/travelData.ts</b>. Carte © OpenStreetMap.
          <br />
          Buon viaggio, Lolo &amp; co. 🇮🇹
        </footer>
      </main>

      <BottomNav items={NAV} active={activeSection} onJump={jump} />
    </>
  );
}
