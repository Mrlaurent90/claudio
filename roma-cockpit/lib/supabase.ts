import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The client is optional: if the env vars aren't set yet (e.g. before you've
// created your Supabase project), the app still runs fully — it just falls
// back to local-only state (localStorage) with no cross-device sync.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anon);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string, {
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null;
