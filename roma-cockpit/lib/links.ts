// Builders for Google Maps deep links. We append "Rome" to disambiguate place
// names and rely on encodeURIComponent for spaces and accents.

function query(name: string): string {
  return encodeURIComponent(`${name} Rome`);
}

/** Navigation: opens directions toward the place. */
export function googleMapsDirections(name: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${query(name)}`;
}

/** Establishment listing: opens the place card (hours, reviews, photos). */
export function googleMapsSearch(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${query(name)}`;
}
