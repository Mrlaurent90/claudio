"use client";

import SectionHead from "@/components/ui/SectionHead";
import type { TravelData } from "@/lib/types";

export default function Alerts({ data }: { data: TravelData }) {
  return (
    <section id="alertes" className="pt-10 scroll-mt-2">
      <SectionHead idx="08" title="Alertes" />
      <div className="rounded-[18px] border border-line bg-bg-2 px-[18px] py-1.5">
        {data.alerts.map(([icon, txt]) => (
          <div key={txt} className="flex gap-3 items-start py-3 border-b border-line last:border-b-0 text-[13px]">
            <span className="text-[18px] flex-[0_0_auto] leading-tight">{icon}</span>
            <span>{txt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
