import type { TravelData } from "@/lib/types";

// =============================================================================
// SINGLE SOURCE OF TRUTH for all trip content.
// Edit anything here (steps, places, budget…) and the whole app updates.
// `tripId` is the non-guessable identifier used in the URL and in Supabase.
// =============================================================================

// Place photos (Wikimedia Commons), keyed by a short slug and reused by both the
// planning step heroes and the map popups. Swap a URL here and both update.
// Steps/places without an entry render a category-coloured tile instead.
const wiki = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1000`;
const PHOTO = {
  fontaine4Fleuves: wiki("Fontana_dei_Quattro_Fiumi_(in_detail).JPG"),
  pasquino: wiki("Roma-pasquino01.jpg"),
  campoDeFiori: wiki("Top_of_Campo_dei_Fiori.JPG"),
  pantheon: wiki("Rome_Pantheon_front.jpg"),
  fontanaPantheon: wiki("Fontana_del_Pantheon.jpg"),
  trevi: wiki("Fontaine_Trevi_-_Rome.jpg"),
  spagna: wiki("Spanish_steps_Rome_Italy.jpg"),
  castel: wiki("0_Castel_et_pont_Sant%27Angelo_(1).JPG"),
  ponteSantAngelo: wiki("Ponte_Sant%27Angelo_Rome.jpg"),
  sanClemente: wiki("Basilica_di_San_Clemente_(Rome).jpg"),
  palazzoSpada: wiki("Galleria_Spada_-_Borromini.jpg"),
  tartarughe: wiki("Fontana_delle_Tartarughe_Roma.jpg"),
  babuino: wiki("Fontana_del_Babuino.jpg"),
  marforio: wiki("Marforio_-_Musei_Capitolini.jpg"),
  coupole: wiki("Panorama_of_Piazza_San_Pietro.JPG"),
  basiliquePietro: wiki("Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg"),
  museesVatican: wiki("Rome_-_Vatican_Museum_-_Spiral_Staircase_by_Giuseppe_Momo_-_0673.jpg"),
  borghese: wiki("Apollo_and_Daphne_(Bernini)_(cropped).jpg"),
  pincio: wiki("Terrazza_del_Pincio_Roma.jpg"),
  popolo: wiki("0_Piazza_de_Popolo_%C3%A0_Rome.JPG"),
  orangers: wiki("Giardino_degli_Aranci_Roma.jpg"),
  aventin: wiki("Aventino_s_Maria_del_Priorato_villa_dal_giardino_1050419.JPG"),
  piramide: wiki("Pyramid_of_Cestius_Rome.jpg"),
  cimitero: wiki("Cimitero_acattolico_Roma.jpg"),
  acquaPaola: wiki("Fontana_dell%27Acqua_Paola_Rome.jpg"),
  gianicolo: wiki("Roma_Gianicolo_01.JPG"),
} as const;

export const travelData: TravelData = {
  tripId: "roma-31mai-7f3k9",
  meta: {
    title: "Roma",
    dates: "31 mai → 4 juin 2026",
    duration: "5 jours · 4 nuits",
    home: "Via Francesco Sivori 5",
    start: "2026-05-31T00:00:00",
    end: "2026-06-04T23:59:00",
  },

  categories: {
    payant: { label: "Monument payant", color: "#da7756", emo: "🎟️" },
    exterieur: { label: "Monument extérieur", color: "#e0a458", emo: "⛪" },
    fontaine: { label: "Fontaine", color: "#7fa8c9", emo: "⛲" },
    statue: { label: "Statue parlante", color: "#b08abd", emo: "🗣️" },
    chill: { label: "Chill / balade", color: "#9aa861", emo: "🚶" },
    pano: { label: "Panorama", color: "#cc9b7a", emo: "🌅" },
    food: { label: "Food", color: "#c77d4a", emo: "🍝" },
    bar: { label: "Bar / soir", color: "#a0617f", emo: "🍸" },
    transport: { label: "Transport", color: "#8a8378", emo: "🚕" },
  },

  days: [
    {
      id: "d0",
      num: "Jour 1",
      date: "Dim 31/05",
      sum: "Arrivée + centre",
      obj: "Arrivée en douceur + centre historique",
      walk: "Modéré",
      energy: "Tranquille",
      moments: [
        {
          label: "Après-midi",
          hr: "14h–18h",
          steps: [
            { t: "—", cat: "transport", title: "Arrivée Rome + Airbnb", desc: "Via Francesco Sivori 5, quartier Prati (proche Vatican).", logi: "Pose valises, on souffle.", badges: [["bdg-resa", "Logement OK"]] },
            { t: "16:30", cat: "fontaine", title: "Fontaine des 4 Fleuves", desc: "Piazza Navona — chef-d'œuvre du Bernin.", logi: "~15 min à pied.", img: PHOTO.fontaine4Fleuves },
            { t: "16:45", cat: "statue", title: "Pasquino", desc: "La 1re statue parlante, à 2 pas de Navona.", logi: "Zéro détour.", img: PHOTO.pasquino },
            { t: "17:15", cat: "exterieur", title: "Campo de' Fiori", desc: "Place vivante, ambiance apéro le soir.", img: PHOTO.campoDeFiori },
          ],
        },
        {
          label: "Soirée",
          hr: "18h–22h",
          steps: [
            { t: "18:00", cat: "exterieur", title: "Panthéon", desc: "Sublime à la lumière du soir. Entrée à vérifier.", img: PHOTO.pantheon },
            { t: "18:30", cat: "fontaine", title: "Fontaine du Panthéon", desc: "Fontana del Pantheon + obélisque, sur la piazza.", img: PHOTO.fontanaPantheon },
            { t: "19:30", cat: "fontaine", title: "Fontaine de Trevi", desc: "Jeter la pièce. Bondée même le soir mais incontournable.", img: PHOTO.trevi },
            { t: "20:00", cat: "fontaine", title: "Piazza di Spagna + Barcaccia", desc: "Escaliers + fontaine de la Barcaccia (Bernin père).", img: PHOTO.spagna },
            { t: "21:00", cat: "food", title: "Dîner simple", desc: "Trattoria de quartier. On ne se charge pas le 1er soir." },
          ],
        },
      ],
      alerts: [],
    },
    {
      id: "d1",
      num: "Jour 2",
      date: "Lun 01/06",
      sum: "Castel + centre + insolite",
      obj: "Castel Sant'Angelo + centre + statues + speakeasy",
      walk: "Soutenu",
      energy: "Bon rythme",
      moments: [
        {
          label: "Matin",
          hr: "9h–13h",
          steps: [
            { t: "09:00", cat: "payant", fixed: true, title: "Castel Sant'Angelo", desc: "Forteresse + terrasse panoramique.", logi: "~12 min à pied.", badges: [["bdg-resa", "Réservé 9h"]], img: PHOTO.castel },
            { t: "10:45", cat: "pano", title: "Ponte Sant'Angelo", desc: "Les anges du Bernin sur le Tibre.", img: PHOTO.ponteSantAngelo },
            { t: "11:30", cat: "chill", title: "Balade centre historique", desc: "Ruelles, places, gelato. On flâne." },
          ],
        },
        {
          label: "Après-midi",
          hr: "13h–18h",
          steps: [
            { t: "13:00", cat: "food", title: "Déjeuner centre", desc: "Au feeling selon où on est." },
            { t: "14:00", cat: "payant", title: "San Clemente", desc: "Basilique à 3 niveaux : église baroque, basilique paléochrétienne, puis temple de Mithra souterrain. Refuge au frais les après-midis de chaleur.", logi: "Réservation conseillée · ouvert le lundi.", badges: [["bdg-opt", "Optionnel"]], img: PHOTO.sanClemente },
            { t: "15:00", cat: "payant", title: "Palazzo Spada", desc: "La fausse perspective de Borromini (trompe-l'œil).", logi: "Ouvre 8h30–19h30, fermé le mardi.", badges: [["bdg-opt", "Optionnel"]], img: PHOTO.palazzoSpada },
            { t: "15:45", cat: "fontaine", title: "Fontaine des Tortues", desc: "Fontana delle Tartarughe, ghetto juif — la plus mignonne de Rome.", img: PHOTO.tartarughe },
            { t: "16:30", cat: "statue", title: "Parcours statues parlantes", desc: "Marforio, Madama Lucrezia, Abate Luigi, Babuino, il Facchino.", logi: "Petit circuit thématique.", img: PHOTO.babuino },
          ],
        },
        {
          label: "Soirée",
          hr: "21h+",
          steps: [
            { t: "21:00", cat: "bar", title: "Speakeasy", desc: "Bar caché type Jerry Thomas Project (mot de passe + résa).", badges: [["bdg-opt", "À arbitrer"]] },
          ],
        },
      ],
      alerts: [],
    },
    {
      id: "d2",
      num: "Jour 3",
      date: "Mar 02/06",
      sum: "Journée Vatican",
      obj: "Grosse journée Vatican — soirée légère obligatoire",
      walk: "Intense",
      energy: "Garder de l'énergie",
      moments: [
        {
          label: "Matin",
          hr: "8h–13h",
          steps: [
            { t: "08:00", cat: "pano", fixed: true, title: "Coupole Saint-Pierre", desc: "Montée tôt = vue dégagée, moins de queue.", logi: "320 marches (ascenseur partiel).", badges: [["bdg-resa", "Réservé"]], img: PHOTO.coupole },
            { t: "09:30", cat: "payant", title: "Basilique Saint-Pierre", desc: "Pietà de Michel-Ange, baldaquin du Bernin.", logi: "⚠️ Épaules + genoux couverts.", img: PHOTO.basiliquePietro },
            { t: "12:30", cat: "food", title: "Déjeuner Borgo Pio", desc: "Ruelle piétonne à côté, moins touristique qu'on croit." },
          ],
        },
        {
          label: "Après-midi",
          hr: "15h–18h",
          steps: [
            { t: "15:00", cat: "payant", fixed: true, title: "Musées du Vatican", desc: "Chapelle Sixtine en final. Compter 3h min.", logi: "Arriver 20 min avant.", badges: [["bdg-resa", "Réservé 15h"]], img: PHOTO.museesVatican },
          ],
        },
        {
          label: "Soirée",
          hr: "21h+",
          steps: [
            { t: "21:00", cat: "bar", title: "Ice Club Roma (bar de glace)", desc: "Bar entièrement en glace — gadget mais fun. À arbitrer vs fatigue.", badges: [["bdg-opt", "Optionnel"]] },
          ],
        },
      ],
      alerts: [["alert-hot", "Journée la plus dense. PAS de Castel Sant'Angelo ici (fait lundi). Soirée légère, hydratation."]],
    },
    {
      id: "d3",
      num: "Jour 4",
      date: "Mer 03/06",
      sum: "Borghese + panoramas + sunset",
      obj: "Borghese + panoramas + Aventin + Gianicolo sunset + dîner tonton",
      walk: "Soutenu",
      energy: "Journée variée",
      moments: [
        {
          label: "Matin",
          hr: "9h–13h",
          steps: [
            { t: "09:00", cat: "payant", fixed: true, title: "Galleria Borghese", desc: "Bernin (Apollon & Daphné), Caravage. Créneau strict 2h.", logi: "⚠️ Résa horaire OBLIGATOIRE.", badges: [["bdg-todo", "À réserver vite"]], img: PHOTO.borghese },
            { t: "11:15", cat: "pano", title: "Villa Borghese + Pincio", desc: "Grand parc, barques, terrasse du Pincio.", img: PHOTO.pincio },
            { t: "12:30", cat: "pano", title: "Piazza del Popolo", desc: "Vue plongeante depuis le Pincio puis descente.", img: PHOTO.popolo },
          ],
        },
        {
          label: "Après-midi",
          hr: "13h–18h",
          steps: [
            { t: "13:15", cat: "food", title: "Déjeuner Via del Babuino", desc: "Vers la place d'Espagne." },
            { t: "16:30", cat: "statue", title: "Aventin — Trou de serrure", desc: "Le buco di Roma : St-Pierre cadrée dans une serrure.", logi: "Un peu de queue.", img: PHOTO.aventin },
            { t: "17:15", cat: "pano", title: "Jardin des Orangers", desc: "Giardino degli Aranci — vue sur Rome, juste à côté.", img: PHOTO.orangers },
            { t: "18:00", cat: "exterieur", title: "Pyramide de Cestius", desc: "Pyramide antique (12 av. J.-C.) encastrée dans les remparts d'Aurélien. Vue extérieure uniquement — intérieur fermé à ces dates. Gratuit.", img: PHOTO.piramide },
            { t: "18:15", cat: "chill", title: "Cimetière protestant", desc: "Cimitero Acattolico : tombes de Keats & Shelley, cyprès et colonie de chats. Havre de paix au pied de la Pyramide. Gratuit.", logi: "Juste à côté de la Pyramide.", img: PHOTO.cimitero },
          ],
        },
        {
          label: "Soirée",
          hr: "19h+",
          steps: [
            { t: "19:15", cat: "fontaine", title: "Fontana dell'Acqua Paola", desc: "« Il Fontanone » : fontaine monumentale baroque + panorama (scène d'ouverture de La Grande Bellezza).", logi: "Sur la montée vers le Gianicolo.", img: PHOTO.acquaPaola },
            { t: "19:30", cat: "pano", title: "Gianicolo — coucher de soleil", desc: "LE plus beau panorama de Rome au sunset.", logi: "Transfert depuis Aventin (bus/taxi).", img: PHOTO.gianicolo },
            { t: "21:00", cat: "food", title: "🍝 Dîner avec tonton", desc: "Soirée romaine avec le tonton qui vit à Rome. Il choisit l'adresse ?", logi: "Caler le lieu + l'heure avec lui.", badges: [["bdg-conf", "À caler avec tonton"]] },
          ],
        },
      ],
      alerts: [
        ["alert-warn", "Matin : éviter Vatican / Saint-Pierre — audience générale du pape ~10h. Le créneau Borghese 9h tombe parfait."],
        ["alert-hot", "Journée étalée géographiquement (Borghese nord → Aventin sud → Gianicolo ouest). Anticiper transferts + dîner tonton."],
      ],
    },
    {
      id: "d4",
      num: "Jour 5",
      date: "Jeu 04/06",
      sum: "Départ tranquille",
      obj: "Départ tranquille",
      walk: "Léger",
      energy: "On lève le pied",
      moments: [
        {
          label: "Matin",
          hr: "9h–12h",
          steps: [
            { t: "09:00", cat: "food", title: "Café + petit-déj", desc: "Cornetto + cappuccino près du logement." },
            { t: "10:00", cat: "chill", title: "Dernière balade Prati", desc: "Derniers achats / photos." },
            { t: "11:00", cat: "transport", fixed: true, title: "Check-out Airbnb", desc: "Récupérer les valises." },
          ],
        },
        {
          label: "Départ",
          hr: "12h+",
          steps: [
            { t: "12:00", cat: "transport", fixed: true, title: "Transfert aéroport FCO", desc: "Taxi / Leonardo Express / navette (cf. décisions).", badges: [["bdg-todo", "Mode à choisir"]] },
          ],
        },
      ],
      alerts: [],
    },
  ],

  places: [
    { n: "Logement (Via Sivori 5)", cat: "chill", day: 0, lat: 41.906036, lng: 12.447664, info: "Base du séjour · 6e ét., vue Vatican · proche métro Cipro", home: true },
    { n: "Fontaine des 4 Fleuves", cat: "fontaine", day: 0, t: "16:30", lat: 41.8992, lng: 12.4731, info: "Piazza Navona · Bernin", img: PHOTO.fontaine4Fleuves },
    { n: "Pasquino (statue parlante)", cat: "statue", day: 0, t: "16:45", lat: 41.8985, lng: 12.4719, info: "La 1re statue parlante", img: PHOTO.pasquino },
    { n: "Campo de' Fiori", cat: "exterieur", day: 0, t: "17:15", lat: 41.8956, lng: 12.4722, info: "Place vivante", img: PHOTO.campoDeFiori },
    { n: "Panthéon", cat: "exterieur", day: 0, t: "18:00", lat: 41.8986, lng: 12.4769, info: "Temple antique · oculus", img: PHOTO.pantheon },
    { n: "Fontaine du Panthéon", cat: "fontaine", day: 0, t: "18:30", lat: 41.8990, lng: 12.4768, info: "Fontana del Pantheon · obélisque", img: PHOTO.fontanaPantheon },
    { n: "Fontaine de Trevi", cat: "fontaine", day: 0, t: "19:30", lat: 41.9009, lng: 12.4833, info: "Le soir, jeter la pièce", img: PHOTO.trevi },
    { n: "Piazza di Spagna + Barcaccia", cat: "fontaine", day: 0, t: "20:00", lat: 41.9058, lng: 12.4823, info: "Escaliers + fontaine Bernin", img: PHOTO.spagna },
    { n: "Castel Sant'Angelo", cat: "payant", day: 1, t: "09:00", lat: 41.9031, lng: 12.4663, info: "Réservé 9h · terrasse pano", img: PHOTO.castel },
    { n: "Ponte Sant'Angelo", cat: "pano", day: 1, t: "10:45", lat: 41.9016, lng: 12.4664, info: "Anges du Bernin", img: PHOTO.ponteSantAngelo },
    { n: "San Clemente", cat: "payant", day: 1, t: "14:00", lat: 41.8894, lng: 12.4975, info: "Basilique 3 niveaux · refuge au frais · résa conseillée", img: PHOTO.sanClemente },
    { n: "Palazzo Spada", cat: "payant", day: 1, t: "15:00", lat: 41.8954, lng: 12.4715, info: "Optionnel · trompe-l'œil · 8h30–19h30, fermé mardi", img: PHOTO.palazzoSpada },
    { n: "Fontaine des Tortues", cat: "fontaine", day: 1, t: "15:45", lat: 41.8941, lng: 12.4775, info: "Ghetto juif · la plus mignonne", img: PHOTO.tartarughe },
    { n: "Marforio (statue parlante)", cat: "statue", day: 1, t: "16:30", lat: 41.8936, lng: 12.4843, info: "Musées Capitolins", img: PHOTO.marforio },
    { n: "Madama Lucrezia (statue)", cat: "statue", day: 1, t: "16:45", lat: 41.8961, lng: 12.4805, info: "Piazza Venezia" },
    { n: "Abate Luigi (statue)", cat: "statue", day: 1, t: "17:00", lat: 41.8970, lng: 12.4757, info: "Piazza Vidoni" },
    { n: "Il Facchino (statue)", cat: "statue", day: 1, t: "17:10", lat: 41.8979, lng: 12.4789, info: "Via Lata" },
    { n: "Il Babuino (statue)", cat: "statue", day: 1, t: "17:30", lat: 41.9070, lng: 12.4790, info: "Via del Babuino", img: PHOTO.babuino },
    { n: "Speakeasy (soir)", cat: "bar", day: 1, t: "21:00", lat: 41.8990, lng: 12.4710, info: "Jerry Thomas Project · à arbitrer" },
    { n: "Coupole St-Pierre", cat: "pano", day: 2, t: "08:00", lat: 41.9022, lng: 12.4539, info: "8h · réservé", img: PHOTO.coupole },
    { n: "Basilique St-Pierre", cat: "payant", day: 2, t: "09:30", lat: 41.9022, lng: 12.4533, info: "Tenue correcte", img: PHOTO.basiliquePietro },
    { n: "Borgo Pio (déjeuner)", cat: "food", day: 2, t: "12:30", lat: 41.9047, lng: 12.4585, info: "Ruelle piétonne" },
    { n: "Musées du Vatican", cat: "payant", day: 2, t: "15:00", lat: 41.9065, lng: 12.4536, info: "15h · réservé", img: PHOTO.museesVatican },
    { n: "Ice Club Roma (bar de glace)", cat: "bar", day: 2, t: "21:00", lat: 41.9006, lng: 12.4717, info: "Bar de glace · optionnel" },
    { n: "Galleria Borghese", cat: "payant", day: 3, t: "09:00", lat: 41.9142, lng: 12.4922, info: "9h · à réserver", img: PHOTO.borghese },
    { n: "Villa Borghese (Pincio)", cat: "pano", day: 3, t: "11:15", lat: 41.9109, lng: 12.4783, info: "Parc + terrasse", img: PHOTO.pincio },
    { n: "Piazza del Popolo", cat: "pano", day: 3, t: "12:30", lat: 41.9108, lng: 12.4768, info: "Vue depuis Pincio", img: PHOTO.popolo },
    { n: "Via del Babuino (déjeuner)", cat: "food", day: 3, t: "13:15", lat: 41.9070, lng: 12.4793, info: "Vers place d'Espagne" },
    { n: "Aventin — Trou de serrure", cat: "statue", day: 3, t: "16:30", lat: 41.8836, lng: 12.4783, info: "Buco di Roma", img: PHOTO.aventin },
    { n: "Jardin des Orangers", cat: "pano", day: 3, t: "17:15", lat: 41.8843, lng: 12.4794, info: "Vue · à côté", img: PHOTO.orangers },
    { n: "Pyramide de Cestius", cat: "exterieur", day: 3, t: "18:00", lat: 41.8758, lng: 12.4814, info: "Vue extérieure · intérieur fermé · gratuit", img: PHOTO.piramide },
    { n: "Cimetière protestant", cat: "chill", day: 3, t: "18:15", lat: 41.8764, lng: 12.4787, info: "Keats & Shelley · chats · gratuit", img: PHOTO.cimitero },
    { n: "Fontana dell'Acqua Paola", cat: "fontaine", day: 3, t: "19:15", lat: 41.8895, lng: 12.4626, info: "« Il Fontanone » · panorama Gianicolo", img: PHOTO.acquaPaola },
    { n: "Gianicolo (belvédère)", cat: "pano", day: 3, t: "19:30", lat: 41.8919, lng: 12.4614, info: "Sunset", img: PHOTO.gianicolo },
    { n: "Dîner avec tonton", cat: "food", day: 3, t: "21:00", lat: 41.8930, lng: 12.4660, info: "Lieu à caler avec lui" },
    { n: "Aéroport FCO", cat: "transport", day: 4, t: "12:00", lat: 41.8003, lng: 12.2389, info: "Transfert départ" },
  ],

  decisions: [
    { id: "dec-borghese", title: "Galleria Borghese — réserver", urg: "hi", a: "Réserver créneau 9h mercredi", b: "Zapper (risque de regret)", reco: "Réserve MAINTENANT le créneau 9h. Sold-out des semaines avant, créneaux 2h stricts.", impact: ["💶 ~13€/pers", "😌 fatigue OK", "📍 colle au planning mer."] },
    { id: "dec-tonton", title: "Dîner avec tonton — quel soir & où ?", urg: "hi", a: "Mercredi après le Gianicolo", b: "Autre soir si tonton préfère", reco: "Cale vite avec lui : c'est LA contrainte sociale du séjour. S'il choisit l'adresse, tu économises la résa premium.", impact: ["💶 variable", "👨 priorité famille", "📅 fixer la date tôt"] },
    { id: "dec-aeroport", title: "Transport aéroport (J5)", urg: "mid", a: "Leonardo Express (~14€, 32 min)", b: "Taxi forfait (~50€ fixe)", reco: "Taxi avec valises + vol serré ; train si budget prioritaire.", impact: ["💶 14€ vs 50€", "🧳 taxi = porte-à-porte", "⏱️ taxi ~45 min"] },
    { id: "dec-speakeasy", title: "Speakeasy lundi soir", urg: "lo", a: "Réserver Jerry Thomas Project", b: "Bar de quartier improvisé", reco: "Si l'idée plaît, réserve : les speakeasies romains demandent souvent un 'mot de passe'.", impact: ["💶 cocktails ~14€", "🌙 ambiance unique", "📞 résa conseillée"] },
    { id: "dec-iceclub", title: "Ice Club (bar de glace) — utile ?", urg: "lo", a: "Y aller mardi soir", b: "Skip (gadget)", reco: "Skip plutôt. Après le Vatican vous serez cuits. Mais c'est sur la carte si l'envie vient.", impact: ["💶 ~15€ entrée", "😴 mardi = fatigue max", "🎭 effet gadget"] },
    { id: "dec-rooftop", title: "Rooftop sunset — alternative soirée premium", urg: "lo", a: "Apéritivo rooftop au coucher du soleil (vue coupole)", b: "S'en tenir au Gianicolo / soirée prévue", reco: "Belle alternative premium au sunset si l'envie d'un cadre chic prend le pas sur le Gianicolo. À réserver le jour même selon la météo.", impact: ["💶 ~25-35€/pers", "🌅 golden hour", "📍 en ville, facile"] },
  ],

  resas: [
    { id: "resa-vols", n: "Vols Transavia", sub: "MPL ↔ FCO", st: "resa" },
    { id: "resa-airbnb", n: "Airbnb", sub: "Via Francesco Sivori 5 · 4 nuits", st: "resa" },
    { id: "resa-castel", n: "Castel Sant'Angelo", sub: "Lundi 01/06 · 9h", st: "resa" },
    { id: "resa-vatican", n: "Coupole + Musées du Vatican", sub: "Mardi 02/06 · coupole 8h, musées 15h", st: "resa" },
    { id: "resa-borghese", n: "Galleria Borghese", sub: "Mercredi 03/06 · créneau 9h visé", st: "todo" },
    { id: "resa-tonton", n: "Dîner avec tonton", sub: "Soir + lieu à caler avec lui", st: "conf" },
    { id: "resa-soir", n: "Speakeasy / Ice Club", sub: "Selon arbitrage", st: "opt" },
    { id: "resa-transport", n: "Transport aéroport", sub: "Mode à choisir", st: "conf" },
  ],

  budget: {
    cible: 2000,
    lines: [
      { l: "Vols", mid: 200, lo: 160, hi: 260 },
      { l: "Logement", mid: 480, lo: 400, hi: 560 },
      { l: "Visites", mid: 160, lo: 120, hi: 200 },
      { l: "Nourriture", mid: 420, lo: 300, hi: 560 },
      { l: "Transports", mid: 90, lo: 50, hi: 140 },
      { l: "Premium/soirs", mid: 160, lo: 80, hi: 260 },
      { l: "Extras", mid: 120, lo: 60, hi: 200 },
    ],
  },

  premium: [
    { kind: "prem", title: "Apéritivo rooftop au sunset", desc: "Rooftop avec vue (coupole en ligne de mire). Cocktail + golden hour romain.", rows: [["Plaisir", "★★★★★"], ["Budget", "~25-35€/pers"], ["Logistique", "Facile, en ville"], ["Effet waouh", "Très fort"]] },
    { kind: "prem", title: "Dîner avec tonton", desc: "Le vrai temps fort social : une soirée romaine en famille. S'il connaît une bonne table, c'est l'expérience premium ET locale du séjour.", rows: [["Plaisir", "★★★★★"], ["Budget", "variable"], ["Logistique", "Caler avec lui"], ["Effet waouh", "Authentique"]] },
    { kind: "inso", title: "① Statues parlantes (les 6)", desc: "Pasquino, Marforio, Madama Lucrezia, Abate Luigi, il Facchino, il Babuino. La satire populaire depuis la Renaissance. Toutes sur la carte." },
    { kind: "inso", title: "② Trou de serrure de l'Aventin", desc: "Le buco di Roma : Saint-Pierre cadrée dans une serrure + Jardin des Orangers à côté. J4." },
    { kind: "inso", title: "③ Bar de glace OU speakeasy", desc: "Ice Club (bar de glace, gadget fun) vs speakeasy caché. Choisis-en un. Les deux sont sur la carte." },
  ],

  checklist: {
    "Documents & billets": ["Cartes d'identité / passeports", "Billets d'avion (QR)", "QR Vatican (coupole + musées)", "QR Castel Sant'Angelo", "QR Galleria Borghese", "Confirmation Airbnb", "Carte offline Rome"],
    "Sac & terrain": ["Chaussures confortables", "Batterie externe", "Gourde", "Lunettes de soleil", "Crème solaire"],
    "Avant départ": ["Vérifier horaires officiels des résas", "Tenue correcte basilique", "Réserver Galleria Borghese", "Caler le dîner tonton", "Choisir transport aéroport"],
  },

  alerts: [
    ["⛪", "Vatican & basilique : épaules et genoux couverts obligatoires. Pas de short au-dessus du genou."],
    ["⏳", "Musées du Vatican mardi 15h : arriver 20 min avant même avec coupe-file."],
    ["😮‍💨", "Mardi = journée la plus intense. Soirée légère, hydratation."],
    ["🚫", "Mercredi matin : éviter le Vatican (audience du pape ~10h)."],
    ["🎟️", "Galleria Borghese : réserver d'urgence — créneaux limités, sold-out fréquent."],
    ["👨", "Caler le dîner tonton tôt : c'est la contrainte sociale à fixer en premier."],
    ["✅", "Avant de partir : revérifier TOUS les horaires officiels."],
  ],
};
