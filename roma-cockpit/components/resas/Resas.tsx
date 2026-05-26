"use client";

import SectionHead from "@/components/ui/SectionHead";
import type { ResaStatus, TravelData } from "@/lib/types";

const ST_META: Record<ResaStatus, { label: string; bg: string; fg: string }> = {
  resa: { label: "Réservé", bg: "rgba(154,168,97,.18)", fg: "#9aa861" },
  todo: { label: "À réserver vite", bg: "rgba(218,119,86,.2)", fg: "#e88968" },
  conf: { label: "À confirmer", bg: "rgba(224,164,88,.18)", fg: "#e0a458" },
  opt: { label: "Optionnel", bg: "rgba(127,168,201,.18)", fg: "#7fa8c9" },
};

// Tapping a status cycles through the four states — synced live to both phones.
const CYCLE: ResaStatus[] = ["todo", "conf", "resa", "opt"];

export default function Resas({
  data,
  statuses,
  onSetStatus,
}: {
  data: TravelData;
  statuses: Record<string, ResaStatus>;
  onSetStatus: (id: string, st: ResaStatus) => void;
}) {
  return (
    <section id="resas" className="pt-10 scroll-mt-2">
      <SectionHead idx="04" title="Réservations" note="Tape un statut pour le changer" />
      <div className="rounded-[18px] border border-line bg-bg-2 px-[18px] py-1.5">
        {data.resas.map((r) => {
          const st = statuses[r.id] ?? r.st;
          const m = ST_META[st];
          return (
            <div key={r.id} className="flex items-center gap-3 py-3 border-b border-line last:border-b-0">
              <div className="flex-1">
                {r.n}
                <small className="block text-paper-dim text-[11.5px]">{r.sub}</small>
              </div>
              <button
                onClick={() => {
                  const next = CYCLE[(CYCLE.indexOf(st) + 1) % CYCLE.length];
                  onSetStatus(r.id, next);
                }}
                className="text-[10.5px] font-bold uppercase tracking-wide px-[11px] py-1 rounded-full"
                style={{ background: m.bg, color: m.fg }}
              >
                {m.label}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
