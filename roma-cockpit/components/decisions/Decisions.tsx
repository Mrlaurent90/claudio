"use client";

import SectionHead from "@/components/ui/SectionHead";
import type { TravelData } from "@/lib/types";

const URG_CLASS: Record<string, string> = {
  hi: "bg-pompeii text-paper", // rare deep-red accent
  mid: "bg-gold text-ink",
  lo: "bg-bg-3 text-paper-dim border border-line",
};
const URG_LABEL: Record<string, string> = { hi: "Urgent", mid: "Bientôt", lo: "Tranquille" };

export default function Decisions({
  data,
  chosen,
  onChoose,
}: {
  data: TravelData;
  chosen: Record<string, "a" | "b" | "">;
  onChoose: (id: string, choice: "a" | "b" | "") => void;
}) {
  return (
    <section id="decisions" className="pt-10 scroll-mt-2">
      <SectionHead idx="03" title="Ce qu'il reste à décider" />
      <div className="grid gap-3.5">
        {data.decisions.map((d) => {
          const pick = chosen[d.id] ?? "";
          return (
            <div
              key={d.id}
              className="rounded-[18px] border border-line p-[17px]"
              style={{ background: "linear-gradient(155deg,rgba(36,31,26,.75),rgba(26,23,20,.55))" }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="font-display text-[17px] font-semibold">{d.title}</span>
                <span
                  className={`ml-auto text-[9.5px] font-bold uppercase tracking-wide px-[9px] py-[3px] rounded-md ${URG_CLASS[d.urg]}`}
                >
                  {URG_LABEL[d.urg]}
                </span>
              </div>

              <div className="flex gap-2.5 my-3">
                {(["a", "b"] as const).map((opt) => {
                  const on = pick === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => onChoose(d.id, on ? "" : opt)}
                      className={`flex-1 text-left rounded-xl border p-[11px] text-[12px] transition ${
                        on ? "border-olive bg-olive/15 text-paper" : "border-line bg-bg-3 text-paper-dim"
                      }`}
                    >
                      <div className="text-[9.5px] tracking-wide uppercase mb-1 flex items-center gap-1.5">
                        Option {opt.toUpperCase()} {on ? <span className="text-olive">✓ choisi</span> : null}
                      </div>
                      {opt === "a" ? d.a : d.b}
                    </button>
                  );
                })}
              </div>

              <div className="text-[12.5px] text-gold flex gap-1.5 items-start mt-1.5">
                →{" "}
                <span>
                  <b className="text-paper">Reco :</b> {d.reco}
                </span>
              </div>
              <div className="flex gap-3 flex-wrap mt-2.5 text-[11px] text-paper-dim">
                {d.impact.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
