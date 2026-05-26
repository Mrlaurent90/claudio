"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ResaStatus, SyncState } from "@/lib/types";

// =============================================================================
// Offline-first sync hook.
//
// Strategy:
//  1. Local state is the immediate source of truth → UI never blocks on the
//     network. We persist it to localStorage so the app works fully offline.
//  2. If Supabase is configured, we (a) hydrate from the remote row on mount,
//     (b) subscribe to Realtime so the partner's changes arrive live, and
//     (c) push our changes up (debounced). Writes are merged per-key, so two
//     people editing *different* items never clobber each other. Same key =
//     last write wins, but the change is visible to both.
//  3. Offline writes are queued and flushed automatically on reconnect.
// =============================================================================

const TABLE = "trip_state";

const EMPTY: SyncState = { checklist: {}, resaStatus: {}, decisions: {} };

function lsKey(tripId: string) {
  return `roma:state:${tripId}`;
}

function loadLocal(tripId: string): SyncState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(lsKey(tripId));
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function saveLocal(tripId: string, state: SyncState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(lsKey(tripId), JSON.stringify(state));
  } catch {
    /* quota / private mode — non-fatal */
  }
}

// Merge two SyncStates key-by-key. `incoming` wins on conflicting keys.
function merge(base: SyncState, incoming: Partial<SyncState>): SyncState {
  return {
    checklist: { ...base.checklist, ...(incoming.checklist ?? {}) },
    resaStatus: { ...base.resaStatus, ...(incoming.resaStatus ?? {}) },
    decisions: { ...base.decisions, ...(incoming.decisions ?? {}) },
  };
}

export interface UseTripSync {
  state: SyncState;
  online: boolean;
  /** "local" = no backend; "synced"/"pending" reflect Supabase status. */
  syncStatus: "local" | "synced" | "pending";
  toggleCheck: (group: string, item: string) => void;
  setResa: (id: string, st: ResaStatus) => void;
  setDecision: (id: string, choice: "a" | "b" | "") => void;
}

export function checkKey(group: string, item: string) {
  return `${group}::${item}`;
}

export function useTripSync(tripId: string): UseTripSync {
  const [state, setState] = useState<SyncState>(EMPTY);
  const [online, setOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState<UseTripSync["syncStatus"]>(
    isSupabaseConfigured ? "pending" : "local"
  );

  const stateRef = useRef(state);
  stateRef.current = state;
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirty = useRef(false);

  // ---- Hydrate from localStorage immediately (offline-first) ----------------
  useEffect(() => {
    setState(loadLocal(tripId));
  }, [tripId]);

  // ---- Online/offline awareness ---------------------------------------------
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  // Push the current local state up to Supabase (merged via upsert).
  const push = useCallback(async () => {
    if (!supabase || !navigator.onLine) return;
    const s = stateRef.current;
    setSyncStatus("pending");
    const { error } = await supabase.from(TABLE).upsert(
      {
        trip_id: tripId,
        checklist: s.checklist,
        resa_status: s.resaStatus,
        decisions: s.decisions,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "trip_id" }
    );
    if (!error) {
      dirty.current = false;
      setSyncStatus("synced");
    }
  }, [tripId]);

  const schedulePush = useCallback(() => {
    if (!supabase) return;
    dirty.current = true;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(push, 600);
  }, [push]);

  // ---- Remote hydrate + realtime subscription -------------------------------
  useEffect(() => {
    if (!supabase) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase!
        .from(TABLE)
        .select("checklist, resa_status, decisions")
        .eq("trip_id", tripId)
        .maybeSingle();
      if (!active) return;
      if (!error && data) {
        setState((prev) => {
          const merged = merge(prev, {
            checklist: data.checklist ?? {},
            resaStatus: data.resa_status ?? {},
            decisions: data.decisions ?? {},
          });
          saveLocal(tripId, merged);
          return merged;
        });
      }
      setSyncStatus("synced");
      // If we made offline edits before hydrating, push them now.
      if (dirty.current) push();
    })();

    const channel = supabase
      .channel(`trip:${tripId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLE, filter: `trip_id=eq.${tripId}` },
        (payload) => {
          const row = payload.new as {
            checklist?: SyncState["checklist"];
            resa_status?: SyncState["resaStatus"];
            decisions?: SyncState["decisions"];
          };
          setState((prev) => {
            const merged = merge(prev, {
              checklist: row.checklist,
              resaStatus: row.resa_status,
              decisions: row.decisions,
            });
            saveLocal(tripId, merged);
            return merged;
          });
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase!.removeChannel(channel);
    };
  }, [tripId, push]);

  // Flush queued writes when the network comes back.
  useEffect(() => {
    if (online && dirty.current) push();
  }, [online, push]);

  // ---- Mutators -------------------------------------------------------------
  const apply = useCallback(
    (updater: (s: SyncState) => SyncState) => {
      setState((prev) => {
        const next = updater(prev);
        saveLocal(tripId, next);
        return next;
      });
      schedulePush();
    },
    [tripId, schedulePush]
  );

  const toggleCheck = useCallback(
    (group: string, item: string) => {
      const k = checkKey(group, item);
      apply((s) => ({ ...s, checklist: { ...s.checklist, [k]: !s.checklist[k] } }));
    },
    [apply]
  );

  const setResa = useCallback(
    (id: string, st: ResaStatus) => apply((s) => ({ ...s, resaStatus: { ...s.resaStatus, [id]: st } })),
    [apply]
  );

  const setDecision = useCallback(
    (id: string, choice: "a" | "b" | "") => apply((s) => ({ ...s, decisions: { ...s.decisions, [id]: choice } })),
    [apply]
  );

  return { state, online, syncStatus, toggleCheck, setResa, setDecision };
}
