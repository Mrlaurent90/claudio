import type { Day, Step, TravelData } from "@/lib/types";

// Parses "HH:MM" into minutes since midnight. Returns null for "—".
function toMinutes(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

export interface NowResult {
  status: "before" | "during" | "after";
  /** Whole-trip progress 0..100. */
  pct: number;
  label: string;
  /** The day index matching `now`, if within the trip. */
  dayIndex: number | null;
  /** The step happening right now (or the next upcoming one today). */
  current?: { day: Day; step: Step; isNext: boolean };
}

// Maps each day's date label to a real calendar date. The trip runs
// 31/05 → 04/06/2026 (consecutive days), so dayIndex 0 = 31 May.
function dateForDay(start: Date, dayIndex: number): Date {
  const d = new Date(start);
  d.setDate(d.getDate() + dayIndex);
  return d;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Computes everything the "Now" UI needs: trip progress, which day we're on,
 * and the step that's happening (or coming up next) right now.
 */
export function computeNow(data: TravelData, now: Date = new Date()): NowResult {
  const start = new Date(data.meta.start);
  const end = new Date(data.meta.end);

  if (now < start) {
    const d = Math.ceil((start.getTime() - now.getTime()) / 864e5);
    return { status: "before", pct: 2, label: `J-${d} avant le départ`, dayIndex: null };
  }
  if (now > end) {
    return { status: "after", pct: 100, label: "Voyage terminé · arrivederci ✨", dayIndex: null };
  }

  const pct = Math.min(100, Math.round(((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100));

  // Find which day index `now` falls on.
  let dayIndex: number | null = null;
  for (let i = 0; i < data.days.length; i++) {
    if (sameDay(dateForDay(start, i), now)) {
      dayIndex = i;
      break;
    }
  }

  let current: NowResult["current"];
  if (dayIndex !== null) {
    const day = data.days[dayIndex];
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const timed = day.moments
      .flatMap((m) => m.steps)
      .map((step) => ({ step, min: toMinutes(step.t) }))
      .filter((x): x is { step: Step; min: number } => x.min !== null)
      .sort((a, b) => a.min - b.min);

    if (timed.length) {
      // "Current" = last step whose time has passed; otherwise the first one.
      let chosen = timed[0];
      let isNext = true;
      for (const x of timed) {
        if (x.min <= nowMin) {
          chosen = x;
          isNext = false;
        }
      }
      // If we've passed the last step, surface it (not "next").
      current = { day, step: chosen.step, isNext };
    }
  }

  return { status: "during", pct, label: `Voyage en cours · ${pct}%`, dayIndex, current };
}
