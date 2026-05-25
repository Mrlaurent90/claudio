"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import type { TravelData } from "@/lib/types";

export default function Budget({ data }: { data: TravelData }) {
  const b = data.budget;
  const maxHi = Math.max(...b.lines.map((l) => l.hi));
  const sLo = b.lines.reduce((a, l) => a + l.lo, 0);
  const sMid = b.lines.reduce((a, l) => a + l.mid, 0);
  const sHi = b.lines.reduce((a, l) => a + l.hi, 0);
  const reste = b.cible - sMid;

  return (
    <section id="budget" className="pt-10 scroll-mt-2">
      <SectionHead idx="05" title="Budget" note={`Cible ~${b.cible} €`} />
      <div className="rounded-[18px] border border-line bg-bg-2 p-[18px]">
        <div className="font-display text-[38px] font-bold text-clay-bright tracking-tight">
          {sMid} €{" "}
          <small className="text-sm text-paper-dim font-body font-normal">/ cible {b.cible} €</small>
        </div>

        <div className="my-3.5">
          {b.lines.map((l) => (
            <div key={l.l} className="flex items-center gap-3 py-2.5 border-b border-line last:border-b-0 text-[13.5px]">
              <span className="flex-[0_0_auto] w-[100px] text-paper-dim">{l.l}</span>
              <span className="flex-1 h-2 bg-bg-3 rounded-full overflow-hidden">
                <motion.i
                  className="block h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#da7756,#e0a458)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${((l.mid / maxHi) * 100).toFixed(0)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </span>
              <span className="flex-[0_0_auto] w-[88px] text-right font-semibold text-paper">{l.mid} €</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 text-[12px] text-paper-dim">
          <span>Bas <b className="text-paper">{sLo} €</b></span>
          <span>Médian <b className="text-paper">{sMid} €</b></span>
          <span>Haut <b className="text-paper">{sHi} €</b></span>
        </div>
        <div className="flex justify-between mt-1.5 text-[12px] text-paper-dim">
          <span>Marge vs cible</span>
          <b style={{ color: reste >= 0 ? "#9aa861" : "#e88968" }}>
            {reste >= 0 ? "+" : ""}
            {reste} €
          </b>
        </div>
      </div>
    </section>
  );
}
