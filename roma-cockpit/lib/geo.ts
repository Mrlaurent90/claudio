// Local, offline walking estimates between trip stops.
//
// We deliberately avoid an external routing API (OSRM/Mapbox) so the map keeps
// working with no network — true to the app's offline-first design. Instead we
// take the great-circle (haversine) distance and apply a detour factor that
// approximates real pedestrian routing through streets. It's an estimate
// (±~15%), always shown as "~X min", never a precise turn-by-turn figure.

const EARTH_KM = 6371;
const DETOUR = 1.3; // streets are longer than the straight line
const WALK_KMH = 4.5; // relaxed tourist pace

type LatLng = [number, number];

export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

/** Estimated walking distance (km), straight line adjusted for street detours. */
export function walkKm(a: LatLng, b: LatLng): number {
  return haversineKm(a, b) * DETOUR;
}

/** Estimated walking time in whole minutes for a given walking distance. */
export function walkMinutes(walkingKm: number): number {
  return Math.max(1, Math.round((walkingKm / WALK_KMH) * 60));
}

/** Human-friendly distance: "350 m" below 1 km, otherwise "1,2 km". */
export function fmtDist(km: number): string {
  if (km < 1) return `${Math.round((km * 1000) / 50) * 50} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}
