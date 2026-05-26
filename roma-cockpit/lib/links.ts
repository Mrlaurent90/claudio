// Builder for the Google Maps place-card deep link. We append "Rome" to
// disambiguate place names and rely on encodeURIComponent for spaces/accents.
// `maps/search` lands on the establishment card (hours, reviews, photos).

export function googleMapsSearch(name: string): string {
  const query = encodeURIComponent(`${name} Rome`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
