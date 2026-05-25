"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { computeNow } from "@/lib/now";
import type { TravelData } from "@/lib/types";

// Answers "what are we doing right now?" in one glance. Recomputes every
// minute so it stays accurate without a refresh.
export default function NowCard({
  data,
  onOpenDay,
}: {
  data: TravelData;
  onOpenDay: (dayIndex: number) => void;
}) {
  const [now, setNow] = useState(() => computeNow(data));

  useEffect(() => {
    const id = setInterval(() => setNow(computeNow(data)), 60_000);
    return () => clearInterval(id);
  }, [data]);

  const cur = now.current;
  const cat = cur ? data.categories[cur.step.cat] : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-[18px] mt-5 mb-1"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-line2 p-5 shadow-soft"
        style={{ background: "linear-gradient(160deg,#241f1a,#1a1714)" }}
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-clay-bright font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-clay opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
          </span>
          Maintenant
        </div>

        <AnimatePresence mode="wait">
          {cur && cat ? (
            <motion.button
              key={cur.step.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => now.dayIndex !== null && onOpenDay(now.dayIndex)}
              className="mt-3 w-full text-left"
            >
              <div className="text-[12px] text-paper-dim mb-1">
                {cur.isNext ? "Prochaine étape" : "En cours"} · {cur.step.t}
              </div>
              <div className="font-display text-[22px] font-bold leading-tight flex items-center gap-2">
                <span>{cat.emo}</span>
                <span>{cur.step.title}</span>
              </div>
              <div className="text-[13px] text-paper-dim mt-1">{cur.step.desc}</div>
              {cur.step.logi ? (
                <div className="text-[12px] text-olive mt-2">↳ {cur.step.logi}</div>
              ) : null}
            </motion.button>
          ) : (
            <motion.div
              key={now.status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 font-display text-[20px] font-bold"
            >
              {now.status === "before"
                ? `Ça approche — ${now.label.toLowerCase()} 🧳`
                : now.status === "after"
                  ? "Voyage terminé · arrivederci ✨"
                  : "Journée libre — profite de Rome 🍝"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
