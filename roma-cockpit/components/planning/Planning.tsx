"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import type { BadgeKind, Step, TravelData } from "@/lib/types";
import { googleMapsFiche } from "@/lib/links";

// Hero photo for a step. Bleeds to the card edges with a dark gradient for
// legibility, and removes itself gracefully if the image fails to load.
function StepHero({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="-mt-[15px] -mx-[15px] mb-3 relative h-28 overflow-hidden rounded-t-[18px] bg-bg-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg,rgba(15,14,12,.1),rgba(15,14,12,.7))" }}
      />
    </div>
  );
}

const BADGE_CLASS: Record<BadgeKind, string> = {
  "bdg-resa": "bg-olive/20 text-olive",
  "bdg-todo": "bg-clay/20 text-clay-bright",
  "bdg-conf": "bg-gold/20 text-gold",
  "bdg-opt": "bg-sky/20 text-sky",
};

function StepCard({ step, color, emo, label }: { step: Step; color: string; emo: string; label: string }) {
  const fiche = googleMapsFiche(step.title);
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`relative flex-[0_0_240px] snap-start overflow-hidden rounded-[18px] border border-line p-[15px] ${
        step.fixed ? "shadow-[inset_0_0_0_1px_rgba(224,164,88,.35)]" : ""
      }`}
      style={{ background: "linear-gradient(165deg,#1a1714,rgba(26,23,20,.6))" }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ background: color }} />
      {step.img ? <StepHero src={step.img} alt={step.title} /> : null}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-display text-[15px] font-bold text-gold">{step.t}</span>
        {step.fixed ? (
          <span className="text-[9px] font-bold tracking-wide bg-gold text-ink px-[7px] py-0.5 rounded-[5px] uppercase">
            Fixe
          </span>
        ) : null}
        <span
          className="ml-auto text-[9.5px] font-bold tracking-wide uppercase px-[9px] py-[3px] rounded-full whitespace-nowrap"
          style={{ background: `${color}22`, color }}
        >
          {emo} {label}
        </span>
      </div>
      <div className="text-[15.5px] font-semibold leading-tight mb-[5px]">{step.title}</div>
      <div className="text-[12.5px] text-paper-dim leading-snug">{step.desc}</div>
      {step.logi ? (
        <div className="text-[11px] text-olive mt-2 flex gap-1.5 items-start">↳ {step.logi}</div>
      ) : null}
      {step.badges?.length ? (
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          {step.badges.map(([kind, txt]) => (
            <span
              key={txt}
              className={`text-[9.5px] font-bold px-2 py-[3px] rounded-full uppercase tracking-wide ${BADGE_CLASS[kind]}`}
            >
              {txt}
            </span>
          ))}
        </div>
      ) : null}
      {fiche ? (
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          <a
            href={fiche}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-clay-bright border border-line2 rounded-lg px-2.5 py-[5px] hover:border-clay transition"
          >
            📍 Voir sur Google Maps
          </a>
        </div>
      ) : null}
    </motion.div>
  );
}

export default function Planning({
  data,
  activeDay,
  setActiveDay,
}: {
  data: TravelData;
  activeDay: number;
  setActiveDay: (i: number) => void;
}) {
  const day = data.days[activeDay];

  return (
    <section id="planning" className="pt-10 scroll-mt-2">
      <SectionHead idx="01" title="Planning" note="Balaie chaque rail →" />

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 mb-2">
        {data.days.map((d, i) => {
          const on = i === activeDay;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDay(i)}
              className={`flex-[0_0_auto] min-w-[104px] text-left rounded-2xl border px-4 py-3 transition ${
                on
                  ? "border-clay shadow-soft shadow-glow"
                  : "border-line2 bg-bg-2"
              }`}
              style={on ? { background: "linear-gradient(160deg,#241f1a,#1a1714)" } : undefined}
            >
              <div className="text-[10.5px] text-paper-dim tracking-wide uppercase font-semibold">{d.num}</div>
              <div className={`font-display text-[19px] font-bold mt-[3px] ${on ? "text-clay-bright" : ""}`}>
                {d.date}
              </div>
              <div className="text-[10.5px] mt-1.5 text-paper-dim">{d.sum}</div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-2 flex-wrap my-4 text-[12px]">
            <span className="bg-bg-3 border border-line rounded-full px-3 py-1.5 text-paper-dim">
              🎯 <b className="text-paper font-semibold">{day.obj}</b>
            </span>
            <span className="bg-bg-3 border border-line rounded-full px-3 py-1.5 text-paper-dim">
              🚶 <b className="text-paper font-semibold">{day.walk}</b>
            </span>
            <span className="bg-bg-3 border border-line rounded-full px-3 py-1.5 text-paper-dim">
              ⚡ <b className="text-paper font-semibold">{day.energy}</b>
            </span>
          </div>

          {day.alerts.map(([kind, txt]) => (
            <div
              key={txt}
              className={`mb-2 px-[15px] py-3 rounded-[13px] text-[12.5px] flex gap-2.5 items-start border ${
                kind === "alert-hot"
                  ? "bg-clay/10 border-clay/40 text-clay-bright"
                  : "bg-gold/10 border-gold/30 text-gold"
              }`}
            >
              ⚠️ <span>{txt}</span>
            </div>
          ))}

          {day.moments.map((m) => (
            <div key={m.label} className="mb-5">
              <div className="flex items-center gap-2.5 mb-3 pl-0.5">
                <span className="font-display text-[17px] font-semibold text-clay-bright">{m.label}</span>
                <span className="flex-1 h-px bg-line" />
                <span className="text-[11px] text-paper-dim tracking-wide">{m.hr}</span>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3.5 pt-1 snap-x snap-mandatory">
                {m.steps.map((s, idx) => {
                  const c = data.categories[s.cat];
                  return <StepCard key={`${s.title}-${idx}`} step={s} color={c.color} emo={c.emo} label={c.label} />;
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
