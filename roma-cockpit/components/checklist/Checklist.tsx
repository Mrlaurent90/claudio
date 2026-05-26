"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import { checkKey } from "@/lib/sync";
import type { TravelData } from "@/lib/types";

export default function Checklist({
  data,
  checked,
  onToggle,
}: {
  data: TravelData;
  checked: Record<string, boolean>;
  onToggle: (group: string, item: string) => void;
}) {
  const groups = Object.entries(data.checklist);
  const total = groups.reduce((a, [, items]) => a + items.length, 0);
  const done = groups.reduce(
    (a, [grp, items]) => a + items.filter((it) => checked[checkKey(grp, it)]).length,
    0
  );

  return (
    <section id="checklist" className="pt-10 scroll-mt-2">
      <SectionHead idx="07" title="Checklist" note={`${done}/${total} prêt`} />
      <div className="rounded-[18px] border border-line bg-bg-2 px-[18px] py-1">
        {groups.map(([grp, items]) => (
          <div key={grp}>
            <h3 className="font-display text-[15px] text-clay-bright my-4 font-semibold">{grp}</h3>
            {items.map((it) => {
              const on = !!checked[checkKey(grp, it)];
              return (
                <button
                  key={it}
                  onClick={() => onToggle(grp, it)}
                  className="flex items-center gap-3 py-2.5 w-full text-left border-b border-line last:border-b-0 text-[13.5px]"
                >
                  <motion.span
                    animate={{ scale: on ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.25 }}
                    className={`w-[21px] h-[21px] rounded-[7px] border-[1.5px] flex-[0_0_auto] grid place-items-center ${
                      on ? "bg-olive border-olive" : "border-line2"
                    }`}
                  >
                    {on ? <span className="text-ink text-[13px] font-bold">✓</span> : null}
                  </motion.span>
                  <span className={on ? "text-paper-dim line-through" : ""}>{it}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
