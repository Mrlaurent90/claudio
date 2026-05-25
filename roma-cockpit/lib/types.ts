// Shared domain types for the whole app. Keeping them here means travelData.ts
// and every component agree on the same shapes (no `any` drifting around).

export type CategoryKey =
  | "payant"
  | "exterieur"
  | "fontaine"
  | "statue"
  | "chill"
  | "pano"
  | "food"
  | "bar"
  | "transport";

export interface Category {
  label: string;
  color: string;
  emo: string;
}

/** Visual style of a badge attached to a step. */
export type BadgeKind = "bdg-resa" | "bdg-todo" | "bdg-conf" | "bdg-opt";

export interface Step {
  t: string; // time label, e.g. "16:30" or "—"
  cat: CategoryKey;
  title: string;
  desc: string;
  logi?: string; // logistics note
  fixed?: boolean; // immovable (booked) slot
  badges?: [BadgeKind, string][];
  /** Optional hero photo URL (Wikimedia Commons). Easily swappable here. */
  img?: string;
}

export interface Moment {
  label: string; // "Matin" | "Après-midi" | "Soirée" | "Départ"
  hr?: string; // hour range, e.g. "9h–13h"
  steps: Step[];
}

export type AlertKind = "alert-warn" | "alert-hot";

export interface Day {
  id: string;
  num: string;
  date: string;
  sum: string;
  obj: string;
  walk: string;
  energy: string;
  moments: Moment[];
  alerts: [AlertKind, string][];
}

export interface Place {
  n: string;
  cat: CategoryKey;
  day: number;
  lat: number;
  lng: number;
  info: string;
  /** The lodging anchor: always shown, distinct marker, start of each route. */
  home?: boolean;
}

export type Urgency = "hi" | "mid" | "lo";

export interface Decision {
  id: string;
  title: string;
  urg: Urgency;
  a: string;
  b: string;
  reco: string;
  impact: string[];
}

export type ResaStatus = "resa" | "todo" | "conf" | "opt";

export interface Resa {
  id: string;
  n: string;
  sub: string;
  st: ResaStatus;
}

export interface BudgetLine {
  l: string;
  mid: number;
  lo: number;
  hi: number;
}

export interface Budget {
  cible: number;
  lines: BudgetLine[];
}

export interface PremiumItem {
  kind: "prem" | "inso";
  title: string;
  desc: string;
  rows?: [string, string][];
}

export interface TravelData {
  tripId: string;
  meta: {
    title: string;
    dates: string;
    duration: string;
    home: string;
    start: string; // ISO
    end: string; // ISO
  };
  categories: Record<CategoryKey, Category>;
  days: Day[];
  places: Place[];
  decisions: Decision[];
  resas: Resa[];
  budget: Budget;
  premium: PremiumItem[];
  checklist: Record<string, string[]>;
  alerts: [string, string][];
}

// ---- Synced state (lives in Supabase, mirrored locally) ---------------------
// Only the things that change *during* the trip are synced. Static itinerary
// content stays in travelData.ts.

export interface SyncState {
  checklist: Record<string, boolean>; // key = `${group}::${item}`
  resaStatus: Record<string, ResaStatus>; // key = resa.id
  decisions: Record<string, "a" | "b" | "">; // key = decision.id → chosen option
}
