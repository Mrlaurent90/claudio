"use client";

import { motion } from "framer-motion";
import type { NowResult } from "@/lib/now";
import type { TravelData } from "@/lib/types";

export default function Header({ data, now }: { data: TravelData; now: NowResult }) {
  return (
    <header className="relative z-[2] px-[22px] pb-7 safe-top border-b border-line bg-gradient-to-b from-bg-2/70 to-transparent pt-[30px]">
      <div className="text-[11px] tracking-[0.42em] uppercase text-clay-bright font-semibold mb-2.5 flex items-center gap-2">
        <span className="inline-block w-[26px] h-0.5 bg-clay" />
        Cockpit de voyage · à deux
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display font-black text-gradient leading-[0.86] tracking-[-0.03em]"
        style={{ fontSize: "clamp(46px,15vw,80px)" }}
      >
        {data.meta.title}
      </motion.h1>
      <div className="mt-3.5 text-paper-dim text-sm flex gap-2.5 flex-wrap items-center">
        <span className="inline-flex gap-1.5 items-center bg-clay/15 border border-clay/40 text-clay-bright px-3 py-1.5 rounded-full text-[12.5px]">
          📍 {data.meta.dates}
        </span>
        <span className="inline-flex gap-1.5 items-center bg-bg-3 border border-line2 px-3 py-1.5 rounded-full text-[12.5px] text-paper">
          <b className="text-paper font-semibold">{data.meta.duration}</b>
        </span>
        <span className="inline-flex gap-1.5 items-center bg-bg-3 border border-line2 px-3 py-1.5 rounded-full text-[12.5px] text-paper">
          🏠 {data.meta.home}
        </span>
      </div>

      <div className="mt-5">
        <div className="h-[7px] bg-bg-3 rounded-full overflow-hidden border border-line">
          <motion.div
            className="h-full rounded-full shadow-glow"
            style={{ background: "linear-gradient(90deg,#da7756,#e0a458)" }}
            initial={{ width: 0 }}
            animate={{ width: `${now.pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="text-[11.5px] text-clay-bright mt-[7px] tracking-[0.06em] font-medium">
          {now.label}
        </div>
      </div>
    </header>
  );
}
