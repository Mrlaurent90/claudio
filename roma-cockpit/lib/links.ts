// Curated Google Maps queries. Keyed by the display label used in travelData
// (place `n` or planning step `title`). Mapping to the official Italian name
// makes `maps/search` land directly on the establishment card (hours, reviews,
// photos) instead of a fuzzy results list. Labels absent from this table get
// no link — that's how generic steps ("Dîner simple", balades) are filtered.

const PLACE_QUERIES: Record<string, string> = {
  // Day 1
  "Fontaine des 4 Fleuves": "Fontana dei Quattro Fiumi",
  "Pasquino (statue parlante)": "Pasquino statua",
  Pasquino: "Pasquino statua",
  "Campo de' Fiori": "Campo de' Fiori",
  Panthéon: "Pantheon",
  "Fontaine du Panthéon": "Fontana del Pantheon",
  "Fontaine de Trevi": "Fontana di Trevi",
  "Fontaine du Triton": "Fontana del Tritone",
  "Fontana delle Api": "Fontana delle Api",
  "Piazza di Spagna + Barcaccia": "Piazza di Spagna",
  // Day 2
  "Castel Sant'Angelo": "Castel Sant'Angelo",
  "Ponte Sant'Angelo": "Ponte Sant'Angelo",
  "San Clemente": "Basilica di San Clemente",
  "Palazzo Spada": "Palazzo Spada",
  "Fontaine des Tortues": "Fontana delle Tartarughe",
  "Marforio (statue parlante)": "Marforio",
  "Madama Lucrezia (statue)": "Madama Lucrezia",
  "Abate Luigi (statue)": "Abate Luigi",
  "Il Facchino (statue)": "Il Facchino",
  "Il Babuino (statue)": "Fontana del Babuino",
  "Speakeasy (soir)": "The Jerry Thomas Project",
  Speakeasy: "The Jerry Thomas Project",
  // Day 3 (Vatican)
  "Coupole St-Pierre": "Cupola di San Pietro",
  "Coupole Saint-Pierre": "Cupola di San Pietro",
  "Basilique St-Pierre": "Basilica di San Pietro",
  "Basilique Saint-Pierre": "Basilica di San Pietro",
  "Borgo Pio (déjeuner)": "Borgo Pio",
  "Musées du Vatican": "Musei Vaticani",
  "Ice Club Roma (bar de glace)": "Ice Club Roma",
  // Day 4 (Villa Borghese + panoramas)
  "Villa Borghese (Pincio)": "Villa Borghese",
  "Villa Borghese + Pincio": "Villa Borghese",
  "Piazza del Popolo": "Piazza del Popolo",
  "Via del Babuino (déjeuner)": "Via del Babuino",
  "Aventin — Trou de serrure": "Buco della Serratura dell'Aventino",
  "Jardin des Orangers": "Giardino degli Aranci",
  "Pyramide de Cestius": "Piramide di Caio Cestio",
  "Cimetière protestant": "Cimitero Acattolico",
  "Fontana dell'Acqua Paola": "Fontana dell'Acqua Paola",
  "Gianicolo (belvédère)": "Gianicolo",
  "Gianicolo — coucher de soleil": "Gianicolo",
  // Day 5
  "Aéroport FCO": "Aeroporto di Roma Fiumicino",
};

/**
 * Link to the place's Google Maps card. Returns null when the label isn't a
 * curated, identifiable place (so the caller hides the button).
 */
export function googleMapsFiche(label: string): string | null {
  const name = PLACE_QUERIES[label];
  if (!name) return null;
  const query = encodeURIComponent(`${name} Rome`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
