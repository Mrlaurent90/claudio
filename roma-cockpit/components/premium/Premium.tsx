"use client";

import SectionHead from "@/components/ui/SectionHead";
import type { TravelData } from "@/lib/types";

export default function Premium({ data }: { data: TravelData }) {
  return (
    <section id="premium" className="pt-10 scroll-mt-2">
      <SectionHead idx="06" title="Premium & insolite" />
      <div className="grid gap-3.5 sm:grid-cols-2">
        {data.premium.map((p) => {
          if (p.rows) {
            return (
              <div
                key={p.title}
                className="rounded-[18px] border border-line p-[18px]"
                style={{ background: "linear-gradient(155deg,rgba(36,31,26,.75),rgba(26,23,20,.55))" }}
              >
                <div className="font-display text-[17px] font-semibold text-clay-bright mb-1.5">✦ {p.title}</div>
                <div className="text-[12.5px] text-paper-dim mb-2">{p.desc}</div>
                {p.rows.map((r) => (
                  <div key={r[0]} className="flex text-[11px] mt-1">
                    <span className="text-paper-dim">{r[0]}</span>
                    <b className="text-paper ml-auto">{r[1]}</b>
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div key={p.title} className="rounded-[18px] border border-line bg-bg-2 p-[18px]">
              <div className="font-display text-[15px] font-semibold text-grape mb-1.5">{p.title}</div>
              <div className="text-[12.5px] text-paper-dim">{p.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
