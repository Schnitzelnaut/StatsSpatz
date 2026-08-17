const {
  useState,
  useEffect,
  useMemo,
  useCallback
} = React;
const {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} = Recharts;

/* ---------- logo (sparrow + sun spiral) ---------- */
const LOGO_SRC = "data:image/webp;base64,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";
function Sparrow({
  puffed = false,
  size = 40
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_SRC,
    alt: "StatSpatz Logo",
    width: size,
    height: size,
    style: {
      borderRadius: size * 0.22,
      display: "block",
      transition: "transform 700ms cubic-bezier(.34,1.56,.64,1), box-shadow 700ms ease",
      transform: puffed ? "scale(1.08) rotate(-2deg)" : "scale(1) rotate(0deg)",
      boxShadow: puffed ? "0 0 18px rgba(217,164,91,0.55)" : "0 0 0 rgba(217,164,91,0)"
    }
  });
}

/* ---------- weather lookup (Open-Meteo, no API key) ---------- */
const WEATHERCODE_DE = {
  0: "Klar",
  1: "Meist klar",
  2: "Teilweise bewölkt",
  3: "Bewölkt",
  45: "Nebel",
  48: "Nebel (Reif)",
  51: "Leichter Nieselregen",
  53: "Nieselregen",
  55: "Starker Nieselregen",
  61: "Leichter Regen",
  63: "Regen",
  65: "Starker Regen",
  71: "Leichter Schnee",
  73: "Schnee",
  75: "Starker Schnee",
  80: "Regenschauer",
  81: "Regenschauer",
  82: "Heftige Regenschauer",
  95: "Gewitter",
  96: "Gewitter mit Hagel",
  99: "Starkes Gewitter"
};
async function fetchWetterAmStandort() {
  if (!navigator.geolocation) throw new Error("Geolocation nicht verfügbar");
  const pos = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
    timeout: 8000
  }));
  const {
    latitude,
    longitude
  } = pos.coords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Wetterdienst nicht erreichbar");
  const data = await res.json();
  const c = data.current || {};
  const beschreibung = WEATHERCODE_DE[c.weathercode] || "";
  const temp = c.temperature_2m != null ? `${Math.round(c.temperature_2m)}°C` : "";
  return {
    wetter: [beschreibung, temp].filter(Boolean).join(", "),
    luftfeuchtigkeit: c.relative_humidity_2m != null ? `${Math.round(c.relative_humidity_2m)}%` : ""
  };
}

/* ---------- storage adapter: uses Claude's window.storage when available (artifact preview), falls back to plain localStorage when the app runs standalone (installed PWA) ---------- */
const storageAdapter = {
  async get(key, shared) {
    if (typeof window !== "undefined" && window.storage) return window.storage.get(key, shared);
    const raw = localStorage.getItem(key);
    if (raw === null) throw new Error("not found");
    return {
      key,
      value: raw,
      shared: !!shared
    };
  },
  async set(key, value, shared) {
    if (typeof window !== "undefined" && window.storage) return window.storage.set(key, value, shared);
    try {
      localStorage.setItem(key, value);
      return {
        key,
        value,
        shared: !!shared
      };
    } catch (e) {
      return null;
    }
  }
};
/* ---------- version ---------- */
const APP_VERSION = "1.3.0";
const APP_BUILT_AT = "2026-08-17";

/* ---------- field config ---------- */
const STANDORTE = ["Zuhause", "Bei Mutter", "Unterwegs", "Sonstiges"];
const TAGESZEITEN = ["Morgens", "Mittags", "Nachmittags", "Abends", "War heute gleichmäßig"];
const ZYKLUS = ["–", "Menstruation", "Follikelphase", "Eisprung", "Lutealphase", "Weiß nicht"];
const MAHLZEITEN = ["Kaum etwas", "Wenig", "Normal", "Gut gegessen"];
const MED_AKTIONEN = ["Neues Medikament", "Medikament entfernt", "Dosis geändert"];
const SLIDER_FIELDS = [{
  key: "energie",
  label: "Energielevel",
  lowLabel: "erschöpft",
  highLabel: "energiegeladen",
  invert: false
}, {
  key: "wohlbefinden",
  label: "Allgemeines Wohlbefinden",
  lowLabel: "sehr schlecht",
  highLabel: "sehr gut",
  invert: false
}, {
  key: "brainfog",
  label: "Brain Fog",
  lowLabel: "klar im Kopf",
  highLabel: "starker Nebel",
  invert: true
}, {
  key: "kopfschmerz",
  label: "Kopfschmerz",
  lowLabel: "keiner",
  highLabel: "sehr stark",
  invert: true
}, {
  key: "gelenkschmerz",
  label: "Gelenkschmerz",
  lowLabel: "keiner",
  highLabel: "sehr stark",
  invert: true
}, {
  key: "muskelschmerz",
  label: "Muskelschmerz",
  lowLabel: "keiner",
  highLabel: "sehr stark",
  invert: true
}, {
  key: "migraene",
  label: "Migräne",
  lowLabel: "keine",
  highLabel: "sehr stark",
  invert: true
}, {
  key: "reizempfindlichkeit",
  label: "Lärm- & Lichtempfindlichkeit",
  lowLabel: "unempfindlich",
  highLabel: "sehr empfindlich",
  invert: true
}, {
  key: "schlafqualitaet",
  label: "Schlafqualität",
  lowLabel: "schlecht",
  highLabel: "erholsam",
  invert: false
}, {
  key: "stress",
  label: "Stresslevel",
  lowLabel: "entspannt",
  highLabel: "sehr gestresst",
  invert: true
}, {
  key: "belastung",
  label: "Körperliche Belastung heute",
  lowLabel: "kaum bewegt",
  highLabel: "sehr aktiv",
  invert: true
}];
const TOGGLE_FIELDS = [{
  key: "pem",
  label: "Anzeichen von PEM (Verschlechterung nach Anstrengung)"
}, {
  key: "pots",
  label: "Schwindel / Herzrasen beim Aufstehen"
}, {
  key: "halsschmerz",
  label: "Halsschmerzen"
}, {
  key: "uebelkeit",
  label: "Übelkeit"
}];
const SPRUECHE = ["Du musst heute nicht stark sein. Du musst nur atmen, und das tust du bereits.", "Dein Körper kämpft einen Kampf, den man von außen nicht sieht. Das macht ihn nicht weniger echt.", "Ruhe ist keine Kapitulation. Ruhe ist der Weg zurück zu dir selbst.", "Jeder Tag, den du festhältst, ist ein kleines Licht auf dem Weg zurück zu dir.", "Du bist nicht deine Symptome. Du bist der Mensch, der sie mit so viel Mut trägt.", "Was heute schwer war, muss morgen nicht schwer sein. Der Wind dreht sich.", "Du wächst nicht trotz dieser Zeit, sondern durch die Art, wie du sie trägst.", "Kleine Schritte zählen genauso wie große. Du bist heute einen davon gegangen.", "Dein Nest ist da, auch wenn der Himmel heute stürmisch war.", "Vertrau darauf: auch die längste Nacht kennt einen Morgen.", "Du bist geliebt, genau so, wie du heute warst.", "Nicht jeder Tag muss leicht sein, damit er wertvoll ist.", "Schritt für Schritt.", "Selbst wenn alles wieder schiefgeht, geht die Sonne trotzdem auf."];
function emptyFeatureRequest() {
  return {
    id: crypto.randomUUID(),
    text: "",
    erstelltAm: new Date().toISOString(),
    erledigt: false
  };
}
function emptyMedication() {
  return {
    id: crypto.randomUUID(),
    name: "",
    dosis: "",
    einheit: "mg"
  };
}
function emptyChange() {
  return {
    id: crypto.randomUUID(),
    aktion: MED_AKTIONEN[0],
    medId: "",
    name: "",
    dosis: "",
    altDosis: ""
  };
}
function emptyEntry() {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    standort: "Zuhause",
    wetter: "",
    luftfeuchtigkeit: "",
    ...Object.fromEntries(SLIDER_FIELDS.map(f => [f.key, 5])),
    schlaflaenge: 7,
    ...Object.fromEntries(TOGGLE_FIELDS.map(f => [f.key, false])),
    zyklus: "–",
    mahlzeiten: "Normal",
    schlimmsteZeit: "War heute gleichmäßig",
    medikamenteGeaendert: false,
    medikamentenAenderungen: [],
    sonstiges: "",
    savedAt: null
  };
}
const SECTIONS = [{
  id: "ort",
  title: "Ort & Wetter"
}, {
  id: "energie",
  title: "Energie"
}, {
  id: "kopf",
  title: "Kopf & Nerven"
}, {
  id: "koerper",
  title: "Körper"
}, {
  id: "schlaf",
  title: "Schlaf"
}, {
  id: "alltag",
  title: "Alltag & Zyklus"
}, {
  id: "sonstiges",
  title: "Sonstiges"
}];

/* ---------- main app ---------- */
function StatSpatz() {
  const [view, setView] = useState("form"); // form | verlauf | medikamente | einstellungen
  const [entry, setEntry] = useState(emptyEntry());
  const [entries, setEntries] = useState([]);
  const [medications, setMedications] = useState([]);
  const [featureRequests, setFeatureRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [showSpruch, setShowSpruch] = useState(false);
  const [spruch, setSpruch] = useState("");
  const [error, setError] = useState("");
  const [wetterStatus, setWetterStatus] = useState("idle"); // idle | loading | done | error

  const todayKey = new Date().toISOString().slice(0, 10);
  const holeWetter = useCallback(async (force = false) => {
    setWetterStatus("loading");
    try {
      const w = await fetchWetterAmStandort();
      setEntry(prev => {
        if (!force && prev.date === todayKey && (prev.wetter || prev.luftfeuchtigkeit) && prev.savedAt) {
          return prev; // don't overwrite an already-saved day unless forced
        }
        return {
          ...prev,
          ...w
        };
      });
      setWetterStatus("done");
    } catch (e) {
      setWetterStatus("error");
    }
  }, [todayKey]);
  useEffect(() => {
    (async () => {
      try {
        const res = await storageAdapter.get("entries", true);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setEntries(parsed);
          const todays = parsed.find(e => e.date === todayKey);
          if (todays) setEntry({
            ...emptyEntry(),
            ...todays
          });
        }
      } catch (e) {}
      try {
        const m = await storageAdapter.get("medications", true);
        if (m && m.value) setMedications(JSON.parse(m.value));
      } catch (e) {}
      try {
        const f = await storageAdapter.get("featureRequests", true);
        if (f && f.value) setFeatureRequests(JSON.parse(f.value));
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  /* auto-fetch weather once for today's (still unsaved) entry */
  useEffect(() => {
    if (!loading) holeWetter(false);
  }, [loading]);
  const completion = useMemo(() => {
    let filled = 0;
    if (entry.standort) filled++;
    if (SLIDER_FIELDS.every(f => typeof entry[f.key] === "number")) filled++;
    if (entry.schlaflaenge) filled++;
    filled++;
    if (entry.zyklus) filled++;
    if (entry.mahlzeiten) filled++;
    filled++;
    return filled / SECTIONS.length;
  }, [entry]);
  const setField = useCallback((key, value) => {
    setEntry(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  async function persistMedications(next) {
    setMedications(next);
    try {
      await storageAdapter.set("medications", JSON.stringify(next), true);
    } catch (e) {}
  }
  async function persistFeatureRequests(next) {
    setFeatureRequests(next);
    try {
      await storageAdapter.set("featureRequests", JSON.stringify(next), true);
    } catch (e) {}
  }
  function applyChangesToMedications(changes) {
    let next = [...medications];
    changes.forEach(c => {
      if (c.aktion === "Neues Medikament" && c.name) {
        next.push({
          id: crypto.randomUUID(),
          name: c.name,
          dosis: c.dosis,
          einheit: "mg"
        });
      } else if (c.aktion === "Medikament entfernt" && c.medId) {
        next = next.filter(m => m.id !== c.medId);
      } else if (c.aktion === "Dosis geändert" && c.medId) {
        next = next.map(m => m.id === c.medId ? {
          ...m,
          dosis: c.dosis
        } : m);
      }
    });
    return next;
  }
  async function save() {
    setSaving(true);
    setError("");
    try {
      const toSave = {
        ...entry,
        date: todayKey,
        savedAt: new Date().toISOString()
      };
      const rest = entries.filter(e => e.date !== todayKey);
      const next = [...rest, toSave].sort((a, b) => a.date.localeCompare(b.date));
      const result = await storageAdapter.set("entries", JSON.stringify(next), true);
      if (!result) throw new Error("Speichern fehlgeschlagen");
      setEntries(next);
      setEntry(toSave);
      if (entry.medikamenteGeaendert && entry.medikamentenAenderungen.length > 0) {
        const nextMeds = applyChangesToMedications(entry.medikamentenAenderungen);
        await persistMedications(nextMeds);
      }
      setSpruch(SPRUECHE[Math.floor(Math.random() * SPRUECHE.length)]);
      setShowSpruch(true);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    } catch (e) {
      setError("Konnte nicht gespeichert werden. Nochmal versuchen?");
    } finally {
      setSaving(false);
    }
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      style: styles.appBg
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...styles.center,
        color: PALETTE.textSecondary,
        fontFamily: FONT.body
      }
    }, /*#__PURE__*/React.createElement(Sparrow, null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, "lädt …")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles.appBg
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.shell
  }, /*#__PURE__*/React.createElement(Header, {
    view: view,
    setView: setView,
    puffed: justSaved,
    justSaved: justSaved && entry.date === todayKey,
    hasToday: !!entry.savedAt && entry.date === todayKey
  }), view === "form" && /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(FormView, {
    entry: entry,
    setField: setField,
    medications: medications,
    completion: completion,
    onSave: save,
    saving: saving,
    justSaved: justSaved,
    error: error,
    wetterStatus: wetterStatus,
    onRefreshWetter: () => holeWetter(true)
  })), view === "verlauf" && /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(VerlaufView, {
    entries: entries,
    medications: medications,
    featureRequests: featureRequests
  })), view === "medikamente" && /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(MedikamenteView, {
    medications: medications,
    onChange: persistMedications
  })), view === "einstellungen" && /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(EinstellungenView, {
    featureRequests: featureRequests,
    onChangeFeatureRequests: persistFeatureRequests
  }))), showSpruch && /*#__PURE__*/React.createElement(SpruchOverlay, {
    text: spruch,
    onClose: () => setShowSpruch(false)
  }));
}

/* ---------- error boundary: catches render errors in a tab so a bug there shows a message instead of a silent blank screen ---------- */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  render() {
    if (this.state.error) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: FONT.display,
          fontSize: 16,
          fontWeight: 600,
          color: PALETTE.coral,
          marginBottom: 10
        }
      }, "Hier ist etwas schiefgelaufen"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: PALETTE.textSecondary,
          background: PALETTE.bgBottom,
          border: `1px solid ${PALETTE.cardBorder}`,
          borderRadius: 10,
          padding: 12,
          fontFamily: FONT.mono,
          wordBreak: "break-word"
        }
      }, this.state.error.message || String(this.state.error)));
    }
    return this.props.children;
  }
}
const PALETTE = {
  bgTop: "#262B3D",
  bgBottom: "#14161F",
  card: "#2C3244",
  cardBorder: "#3B4258",
  text: "#F1EDE4",
  textSecondary: "#9DA3BA",
  gold: "#D9A45B",
  sage: "#8FB596",
  coral: "#E2836F",
  sky: "#7FA6C9",
  track: "#3B4258"
};
const FONT = {
  display: "'Fraunces', 'Georgia', serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace"
};
const styles = {
  appBg: {
    minHeight: "100vh",
    width: "100%",
    background: `linear-gradient(180deg, ${PALETTE.bgTop} 0%, ${PALETTE.bgBottom} 100%)`,
    fontFamily: FONT.body,
    color: PALETTE.text,
    paddingBottom: "calc(48px + env(safe-area-inset-bottom, 0px))",
    paddingTop: "env(safe-area-inset-top, 0px)",
    paddingLeft: "env(safe-area-inset-left, 0px)",
    paddingRight: "env(safe-area-inset-right, 0px)",
    position: "relative"
  },
  shell: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "20px 18px 40px"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    paddingTop: "env(safe-area-inset-top, 0px)"
  }
};

/* ---------- header ---------- */
function Header({
  view,
  setView,
  puffed,
  justSaved,
  hasToday
}) {
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
  const stunde = new Date().getHours();
  const tageszeit = stunde < 5 ? "Nacht" : stunde < 11 ? "Morgen" : stunde < 17 ? "Tag" : stunde < 22 ? "Abend" : "Nacht";
  const gruss = tageszeit === "Morgen" ? "Guten Morgen, Spatz" : tageszeit === "Tag" ? "Schön, dass du da bist, Spatz" : tageszeit === "Abend" ? "Guten Abend, Spatz" : "Noch wach, Spatz?";
  const zusatz = justSaved ? "Heute ist alles festgehalten. Gut gemacht." : hasToday ? "Dein heutiger Eintrag ist schon da — du kannst ihn jederzeit anpassen." : "Wenn du magst, halten wir heute gemeinsam fest, wie es dir geht.";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Sparrow, {
    puffed: puffed
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.display,
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: 0.2
    }
  }, "StatSpatz"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: PALETTE.textSecondary,
      marginTop: 1,
      textTransform: "capitalize"
    }
  }, today))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setView(view === "einstellungen" ? "form" : "einstellungen"),
    "aria-label": "Einstellungen",
    style: {
      background: "transparent",
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 999,
      width: 38,
      height: 38,
      color: PALETTE.textSecondary,
      cursor: "pointer",
      fontSize: 16
    }
  }, "⚙")), view === "form" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(217,164,91,0.08)",
      border: `1px solid rgba(217,164,91,0.25)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.display,
      fontSize: 16,
      fontWeight: 600,
      color: PALETTE.gold,
      marginBottom: 4
    }
  }, gruss), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: PALETTE.textSecondary,
      lineHeight: 1.5
    }
  }, zusatz)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 18
    }
  }, [{
    id: "form",
    label: "Heute"
  }, {
    id: "verlauf",
    label: "Verlauf"
  }, {
    id: "medikamente",
    label: "Medikamente"
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setView(t.id),
    style: {
      flex: 1,
      padding: "10px 0",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontFamily: FONT.body,
      fontWeight: 600,
      fontSize: 13,
      background: view === t.id ? PALETTE.gold : "transparent",
      color: view === t.id ? "#20232F" : PALETTE.textSecondary,
      transition: "all 200ms ease"
    }
  }, t.label))));
}

/* ---------- progress feathers ---------- */
function ProgressFeathers({
  completion
}) {
  const total = SECTIONS.length;
  const filled = Math.round(completion * total);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginBottom: 22
    }
  }, SECTIONS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    title: s.title,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 4,
      background: i < filled ? PALETTE.gold : PALETTE.track,
      transition: "background 300ms ease"
    }
  })));
}

/* ---------- reusable field shells ---------- */
function Card({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PALETTE.card,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 18,
      padding: "18px 16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.display,
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 14,
      color: PALETTE.text
    }
  }, title), children);
}
function SliderRow({
  field,
  value,
  onChange
}) {
  const pct = value / 10 * 100;
  const hot = field.invert ? value >= 7 : value <= 3;
  const good = field.invert ? value <= 3 : value >= 7;
  const color = hot ? PALETTE.coral : good ? PALETTE.sage : PALETTE.sky;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: PALETTE.text
    }
  }, field.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.mono,
      fontSize: 14,
      color,
      fontWeight: 600
    }
  }, value)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 10,
    value: value,
    onChange: e => onChange(field.key, Number(e.target.value)),
    style: {
      width: "100%",
      accentColor: color,
      height: 6,
      background: `linear-gradient(90deg, ${color} ${pct}%, ${PALETTE.track} ${pct}%)`,
      borderRadius: 4,
      appearance: "none",
      WebkitAppearance: "none",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 11,
      color: PALETTE.textSecondary,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, field.lowLabel), /*#__PURE__*/React.createElement("span", null, field.highLabel)));
}
function ToggleRow({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onChange(!value),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 4px",
      cursor: "pointer",
      borderBottom: `1px solid ${PALETTE.cardBorder}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: PALETTE.text,
      paddingRight: 12
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 26,
      borderRadius: 999,
      background: value ? PALETTE.gold : PALETTE.track,
      position: "relative",
      transition: "background 200ms ease",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 3,
      left: value ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#F1EDE4",
      transition: "left 200ms ease"
    }
  })));
}
function ChipGroup({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    onClick: () => onChange(opt),
    style: {
      padding: "9px 14px",
      borderRadius: 999,
      border: `1px solid ${value === opt ? PALETTE.gold : PALETTE.cardBorder}`,
      background: value === opt ? "rgba(217,164,91,0.16)" : "transparent",
      color: value === opt ? PALETTE.gold : PALETTE.textSecondary,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, opt)));
}

/* ---------- form view ---------- */
function FormView({
  entry,
  setField,
  medications,
  completion,
  onSave,
  saving,
  justSaved,
  error,
  wetterStatus,
  onRefreshWetter
}) {
  function updateChanges(next) {
    setField("medikamentenAenderungen", next);
  }
  function addChange() {
    updateChanges([...entry.medikamentenAenderungen, emptyChange()]);
  }
  function updateChange(id, patch) {
    updateChanges(entry.medikamentenAenderungen.map(c => c.id === id ? {
      ...c,
      ...patch
    } : c));
  }
  function removeChange(id) {
    updateChanges(entry.medikamentenAenderungen.filter(c => c.id !== id));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProgressFeathers, {
    completion: completion
  }), /*#__PURE__*/React.createElement(Card, {
    title: "Ort & Wetter"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(ChipGroup, {
    options: STANDORTE,
    value: entry.standort,
    onChange: v => setField("standort", v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Wetter",
    placeholder: wetterStatus === "loading" ? "lädt …" : "z.B. bewölkt",
    value: entry.wetter,
    onChange: v => setField("wetter", v)
  }), /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Luftfeuchtigkeit",
    placeholder: wetterStatus === "loading" ? "lädt …" : "z.B. 65%",
    value: entry.luftfeuchtigkeit,
    onChange: v => setField("luftfeuchtigkeit", v)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onRefreshWetter,
    title: "Wetter am aktuellen Standort neu abrufen",
    "aria-label": "Wetter neu abrufen",
    style: {
      flexShrink: 0,
      width: 40,
      height: 40,
      borderRadius: 10,
      border: `1px solid ${PALETTE.cardBorder}`,
      background: "transparent",
      color: wetterStatus === "loading" ? PALETTE.textSecondary : PALETTE.sky,
      cursor: "pointer",
      fontSize: 16
    }
  }, "⟳")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: PALETTE.textSecondary,
      marginTop: 6
    }
  }, wetterStatus === "done" && "automatisch anhand deines Standorts ermittelt", wetterStatus === "error" && "automatischer Abruf nicht möglich — bitte manuell eintragen oder Standortzugriff erlauben", wetterStatus === "loading" && "ermittle Wetter am Standort …")), /*#__PURE__*/React.createElement(Card, {
    title: "Energie"
  }, /*#__PURE__*/React.createElement(SliderRow, {
    field: SLIDER_FIELDS.find(f => f.key === "energie"),
    value: entry.energie,
    onChange: setField
  }), /*#__PURE__*/React.createElement(SliderRow, {
    field: SLIDER_FIELDS.find(f => f.key === "wohlbefinden"),
    value: entry.wohlbefinden,
    onChange: setField
  }), /*#__PURE__*/React.createElement(ToggleRow, {
    label: TOGGLE_FIELDS[0].label,
    value: entry.pem,
    onChange: v => setField("pem", v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(SliderRow, {
    field: SLIDER_FIELDS.find(f => f.key === "belastung"),
    value: entry.belastung,
    onChange: setField
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Kopf & Nerven"
  }, ["brainfog", "kopfschmerz", "migraene", "reizempfindlichkeit"].map(k => {
    const f = SLIDER_FIELDS.find(x => x.key === k);
    return /*#__PURE__*/React.createElement(SliderRow, {
      key: k,
      field: f,
      value: entry[k],
      onChange: setField
    });
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Körper"
  }, ["gelenkschmerz", "muskelschmerz"].map(k => {
    const f = SLIDER_FIELDS.find(x => x.key === k);
    return /*#__PURE__*/React.createElement(SliderRow, {
      key: k,
      field: f,
      value: entry[k],
      onChange: setField
    });
  }), TOGGLE_FIELDS.filter(f => f.key !== "pem").map(f => /*#__PURE__*/React.createElement(ToggleRow, {
    key: f.key,
    label: f.label,
    value: entry[f.key],
    onChange: v => setField(f.key, v)
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Schlaf"
  }, /*#__PURE__*/React.createElement(SliderRow, {
    field: SLIDER_FIELDS.find(f => f.key === "schlafqualitaet"),
    value: entry.schlafqualitaet,
    onChange: setField
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "Schlaflänge"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT.mono,
      fontSize: 14,
      color: PALETTE.sky,
      fontWeight: 600
    }
  }, entry.schlaflaenge, " h")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 14,
    step: 0.5,
    value: entry.schlaflaenge,
    onChange: e => setField("schlaflaenge", Number(e.target.value)),
    style: {
      width: "100%",
      accentColor: PALETTE.sky
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Alltag & Zyklus"
  }, /*#__PURE__*/React.createElement(SliderRow, {
    field: SLIDER_FIELDS.find(f => f.key === "stress"),
    value: entry.stress,
    onChange: setField
  }), /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Mahlzeiten – wie viel gegessen"
  }), /*#__PURE__*/React.createElement(ChipGroup, {
    options: MAHLZEITEN,
    value: entry.mahlzeiten,
    onChange: v => setField("mahlzeiten", v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Zyklus"
  }), /*#__PURE__*/React.createElement(ChipGroup, {
    options: ZYKLUS,
    value: entry.zyklus,
    onChange: v => setField("zyklus", v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Wann war es am schlimmsten?"
  }), /*#__PURE__*/React.createElement(ChipGroup, {
    options: TAGESZEITEN,
    value: entry.schlimmsteZeit,
    onChange: v => setField("schlimmsteZeit", v)
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Sonstiges"
  }, /*#__PURE__*/React.createElement(ToggleRow, {
    label: "Medikamente haben sich heute geändert",
    value: entry.medikamenteGeaendert,
    onChange: v => {
      setField("medikamenteGeaendert", v);
      if (v && entry.medikamentenAenderungen.length === 0) {
        updateChanges([emptyChange()]);
      }
    }
  }), entry.medikamenteGeaendert && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, entry.medikamentenAenderungen.map(c => /*#__PURE__*/React.createElement(MedChangeRow, {
    key: c.id,
    change: c,
    medications: medications,
    onUpdate: patch => updateChange(c.id, patch),
    onRemove: () => removeChange(c.id)
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addChange,
    style: {
      background: "transparent",
      border: `1px dashed ${PALETTE.cardBorder}`,
      borderRadius: 10,
      padding: "10px 0",
      color: PALETTE.textSecondary,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "+ weitere Änderung")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Spatz, was möchtest du sonst noch festhalten?"
  }), /*#__PURE__*/React.createElement(TextArea, {
    placeholder: "Frei für alles, was hier fehlt …",
    value: entry.sonstiges,
    onChange: v => setField("sonstiges", v)
  })), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: PALETTE.coral,
      fontSize: 13,
      marginBottom: 10,
      textAlign: "center"
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: onSave,
    disabled: saving,
    style: {
      width: "100%",
      padding: "16px 0",
      borderRadius: 16,
      border: "none",
      background: justSaved ? PALETTE.sage : PALETTE.gold,
      color: "#20232F",
      fontFamily: FONT.display,
      fontWeight: 700,
      fontSize: 16,
      cursor: saving ? "default" : "pointer",
      opacity: saving ? 0.7 : 1,
      transition: "background 300ms ease"
    }
  }, saving ? "speichert …" : justSaved ? "Gespeichert ✓" : "Heute speichern"));
}
function MedChangeRow({
  change,
  medications,
  onUpdate,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: change.aktion,
    onChange: e => onUpdate({
      aktion: e.target.value,
      medId: "",
      name: "",
      dosis: "",
      altDosis: ""
    }),
    style: selectStyle
  }, MED_AKTIONEN.map(a => /*#__PURE__*/React.createElement("option", {
    key: a,
    value: a
  }, a))), /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      background: "transparent",
      border: "none",
      color: PALETTE.coral,
      cursor: "pointer",
      fontSize: 13
    }
  }, "entfernen")), change.aktion === "Neues Medikament" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Name",
    value: change.name,
    onChange: v => onUpdate({
      name: v
    }),
    placeholder: "z.B. LDN"
  }), /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Dosis",
    value: change.dosis,
    onChange: v => onUpdate({
      dosis: v
    }),
    placeholder: "z.B. 3mg"
  })), (change.aktion === "Medikament entfernt" || change.aktion === "Dosis geändert") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary,
      marginBottom: 6
    }
  }, "Welches Medikament?"), /*#__PURE__*/React.createElement("select", {
    value: change.medId,
    onChange: e => {
      const med = medications.find(m => m.id === e.target.value);
      onUpdate({
        medId: e.target.value,
        altDosis: med ? med.dosis : ""
      });
    },
    style: {
      ...selectStyle,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "– auswählen –"), medications.map(m => /*#__PURE__*/React.createElement("option", {
    key: m.id,
    value: m.id
  }, m.name, " (", m.dosis, ")")))), change.aktion === "Dosis geändert" && /*#__PURE__*/React.createElement(LabeledInput, {
    label: `Neue Dosis (bisher ${change.altDosis || "–"})`,
    value: change.dosis,
    onChange: v => onUpdate({
      dosis: v
    }),
    placeholder: "z.B. 5mg"
  })));
}
const selectStyle = {
  background: PALETTE.bgBottom,
  border: `1px solid ${PALETTE.cardBorder}`,
  borderRadius: 10,
  padding: "8px 10px",
  color: PALETTE.text,
  fontSize: 13,
  fontFamily: FONT.body
};
function FieldLabel({
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: PALETTE.textSecondary,
      marginBottom: 8
    }
  }, text);
}
function LabeledInput({
  label,
  value,
  onChange,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    style: {
      width: "100%",
      background: PALETTE.bgBottom,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 10,
      padding: "10px 12px",
      color: PALETTE.text,
      fontSize: 14,
      fontFamily: FONT.body,
      boxSizing: "border-box"
    }
  }));
}
function TextArea({
  value,
  onChange,
  placeholder
}) {
  return /*#__PURE__*/React.createElement("textarea", {
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    rows: 3,
    style: {
      width: "100%",
      background: PALETTE.bgBottom,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 10,
      padding: "10px 12px",
      color: PALETTE.text,
      fontSize: 14,
      fontFamily: FONT.body,
      resize: "vertical",
      boxSizing: "border-box"
    }
  });
}

/* ---------- correlation analysis ---------- */
const VERGLEICH_METRIKEN = [{
  key: "wohlbefinden",
  label: "Wohlbefinden"
}, {
  key: "energie",
  label: "Energie"
}, {
  key: "brainfog",
  label: "Brain Fog"
}, {
  key: "kopfschmerz",
  label: "Kopfschmerz"
}, {
  key: "gelenkschmerz",
  label: "Gelenkschmerz"
}, {
  key: "muskelschmerz",
  label: "Muskelschmerz"
}, {
  key: "migraene",
  label: "Migräne"
}, {
  key: "schlafqualitaet",
  label: "Schlafqualität"
}, {
  key: "stress",
  label: "Stress"
}];
function pearson(xs, ys) {
  const n = xs.length;
  if (n < 3) return null;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0,
    denX = 0,
    denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  if (denX === 0 || denY === 0) return null;
  return num / Math.sqrt(denX * denY);
}
const KORR_FELDER = [...VERGLEICH_METRIKEN, {
  key: "schlaflaenge",
  label: "Schlaflänge"
}, {
  key: "reizempfindlichkeit",
  label: "Reizempfindlichkeit"
}, {
  key: "belastung",
  label: "Belastung"
}];
function computeCorrelations(entries) {
  const results = [];

  // same-day pairs
  for (let i = 0; i < KORR_FELDER.length; i++) {
    for (let j = i + 1; j < KORR_FELDER.length; j++) {
      const a = KORR_FELDER[i],
        b = KORR_FELDER[j];
      const pairs = entries.filter(e => typeof e[a.key] === "number" && typeof e[b.key] === "number");
      if (pairs.length < 8) continue;
      const r = pearson(pairs.map(e => e[a.key]), pairs.map(e => e[b.key]));
      if (r === null) continue;
      results.push({
        a: a.label,
        b: b.label,
        r,
        n: pairs.length,
        lag: false
      });
    }
  }

  // lag-1 pairs: "Belastung" & "Stress" heute vs. Symptome am Folgetag (PEM-Muster)
  const sorted = [...entries].sort((x, y) => x.date.localeCompare(y.date));
  const lagQuellen = [{
    key: "belastung",
    label: "Belastung (Vortag)"
  }, {
    key: "stress",
    label: "Stress (Vortag)"
  }];
  const lagZiele = KORR_FELDER.filter(f => !["belastung", "stress"].includes(f.key));
  lagQuellen.forEach(quelle => {
    lagZiele.forEach(ziel => {
      const xs = [],
        ys = [];
      for (let i = 0; i < sorted.length - 1; i++) {
        const heute = sorted[i],
          morgen = sorted[i + 1];
        const heuteDatum = new Date(heute.date),
          morgenDatum = new Date(morgen.date);
        const diffTage = Math.round((morgenDatum - heuteDatum) / 86400000);
        if (diffTage !== 1) continue;
        if (typeof heute[quelle.key] === "number" && typeof morgen[ziel.key] === "number") {
          xs.push(heute[quelle.key]);
          ys.push(morgen[ziel.key]);
        }
      }
      if (xs.length < 8) return;
      const r = pearson(xs, ys);
      if (r === null) return;
      results.push({
        a: quelle.label,
        b: `${ziel.label} (Folgetag)`,
        r,
        n: xs.length,
        lag: true
      });
    });
  });
  return results.sort((x, y) => Math.abs(y.r) - Math.abs(x.r)).slice(0, 8);
}
function staerkeLabel(r) {
  const abs = Math.abs(r);
  if (abs >= 0.6) return "starker";
  if (abs >= 0.4) return "mittlerer";
  if (abs >= 0.25) return "schwacher";
  return "sehr schwacher";
}
function KorrelationenCard({
  entries
}) {
  const korrelationen = useMemo(() => computeCorrelations(entries), [entries]);
  const genugDaten = entries.length >= 10;
  return /*#__PURE__*/React.createElement(Card, {
    title: "Auffällige Zusammenhänge"
  }, !genugDaten ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: PALETTE.textSecondary,
      fontSize: 13,
      lineHeight: 1.5
    }
  }, "Noch ", 10 - entries.length, " ", 10 - entries.length === 1 ? "Tag" : "Tage", " bis genug Daten für eine verlässliche Auswertung da sind.") : korrelationen.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: PALETTE.textSecondary,
      fontSize: 13
    }
  }, "Noch keine auffälligen Zusammenhänge gefunden.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, korrelationen.map((k, i) => {
    const positiv = k.r > 0;
    const color = positiv ? PALETTE.sage : PALETTE.coral;
    const breite = Math.min(100, Math.abs(k.r) * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: PALETTE.text
      }
    }, k.a), /*#__PURE__*/React.createElement("span", {
      style: {
        color: PALETTE.textSecondary
      }
    }, " ", positiv ? "steigt mit" : "sinkt, wenn steigt:", " "), /*#__PURE__*/React.createElement("span", {
      style: {
        color: PALETTE.text
      }
    }, k.b)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: PALETTE.track,
        borderRadius: 4,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${breite}%`,
        height: "100%",
        background: color,
        borderRadius: 4
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: PALETTE.textSecondary,
        marginTop: 3
      }
    }, staerkeLabel(k.r), " ", positiv ? "positiver" : "negativer", " Zusammenhang · r = ", k.r.toFixed(2), " · ", k.n, " ", k.lag ? "Tagespaare" : "Tage", k.lag ? " · zeitversetzt" : ""));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: PALETTE.textSecondary,
      marginTop: 14,
      lineHeight: 1.5,
      borderTop: `1px solid ${PALETTE.cardBorder}`,
      paddingTop: 10
    }
  }, "Ein Zusammenhang ist noch kein Beweis für eine Ursache. Je mehr Tage gesammelt werden, desto verlässlicher wird das Bild.")));
}

/* ---------- export for AI analysis ---------- */
function exportiereDaten(entries, medications, featureRequests) {
  const payload = {
    exportiert_am: new Date().toISOString(),
    anzahl_tage: entries.length,
    medikamente_aktuell: medications,
    feature_wuensche_von_leo: (featureRequests || []).filter(f => !f.erledigt),
    eintraege: entries
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `statspatz-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function ExportCard({
  entries,
  medications,
  featureRequests
}) {
  const offen = (featureRequests || []).filter(f => !f.erledigt).length;
  return /*#__PURE__*/React.createElement(Card, {
    title: "Frag die KI"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: PALETTE.textSecondary,
      lineHeight: 1.5,
      marginBottom: 14
    }
  }, "Lädt alle bisher gesammelten Tage", offen > 0 ? ` sowie ${offen} offene Feature-Wunsch${offen === 1 ? "" : "e"}` : "", " als Datei herunter. Die kannst du direkt in einen Chat schicken, um eine ausführlichere Analyse zu bekommen oder neue Funktionen einbauen zu lassen."), /*#__PURE__*/React.createElement("button", {
    onClick: () => exportiereDaten(entries, medications, featureRequests),
    disabled: entries.length === 0,
    style: {
      width: "100%",
      padding: "13px 0",
      borderRadius: 12,
      border: "none",
      background: entries.length === 0 ? PALETTE.track : PALETTE.gold,
      color: "#20232F",
      fontWeight: 700,
      fontSize: 14,
      cursor: entries.length === 0 ? "default" : "pointer"
    }
  }, "Daten exportieren (", entries.length, " ", entries.length === 1 ? "Tag" : "Tage", ")"));
}

/* ---------- verlauf (history) view ---------- */
function ChipGroupMulti({
  options,
  values,
  onToggle,
  colors
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, options.map(opt => {
    const active = values.includes(opt.key);
    return /*#__PURE__*/React.createElement("button", {
      key: opt.key,
      onClick: () => onToggle(opt.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 14px",
        borderRadius: 999,
        border: `1px solid ${active ? colors[opt.key] || PALETTE.gold : PALETTE.cardBorder}`,
        background: active ? `${colors[opt.key] || PALETTE.gold}22` : "transparent",
        color: active ? colors[opt.key] || PALETTE.gold : PALETTE.textSecondary,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: colors[opt.key] || PALETTE.gold
      }
    }), opt.label);
  }));
}
const LINIENFARBEN = [PALETTE.gold, PALETTE.sage, PALETTE.coral, PALETTE.sky, "#B98FD9", "#D9C25B"];
function VerlaufView({
  entries,
  medications,
  featureRequests
}) {
  const [metrik, setMetrik] = useState("wohlbefinden");
  const [zeitMetriken, setZeitMetriken] = useState(["wohlbefinden", "energie"]);
  const alleMetrikOptionen = useMemo(() => [...VERGLEICH_METRIKEN, {
    key: "schlaflaenge",
    label: "Schlaflänge"
  }, {
    key: "reizempfindlichkeit",
    label: "Reizempfindlichkeit"
  }, {
    key: "belastung",
    label: "Belastung"
  }], []);
  const farbenByMetrik = useMemo(() => {
    const map = {};
    alleMetrikOptionen.forEach((m, i) => map[m.key] = LINIENFARBEN[i % LINIENFARBEN.length]);
    return map;
  }, [alleMetrikOptionen]);
  function toggleZeitMetrik(key) {
    setZeitMetriken(prev => prev.includes(key) ? prev.filter(k => k !== key) : prev.length >= 4 ? prev : [...prev, key]);
  }
  const chartData = useMemo(() => entries.map(e => {
    const row = {
      date: e.date.slice(5)
    };
    zeitMetriken.forEach(k => row[k] = e[k]);
    return row;
  }), [entries, zeitMetriken]);
  const vergleichData = useMemo(() => {
    const byOrt = {};
    entries.forEach(e => {
      const ort = e.standort || "Unbekannt";
      if (!byOrt[ort]) byOrt[ort] = {
        sum: 0,
        count: 0
      };
      const val = e[metrik];
      if (typeof val === "number") {
        byOrt[ort].sum += val;
        byOrt[ort].count += 1;
      }
    });
    return Object.entries(byOrt).map(([ort, {
      sum,
      count
    }]) => ({
      ort,
      wert: Math.round(sum / count * 10) / 10,
      anzahl: count
    })).sort((a, b) => b.anzahl - a.anzahl);
  }, [entries, metrik]);
  if (entries.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
      title: "Verlauf"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: PALETTE.textSecondary,
        fontSize: 14,
        textAlign: "center",
        padding: "20px 0"
      }
    }, "Noch keine Einträge. Der erste Tag wartet.")), /*#__PURE__*/React.createElement(ExportCard, {
      entries: entries,
      medications: medications,
      featureRequests: featureRequests
    }));
  }
  const metrikDef = VERGLEICH_METRIKEN.find(m => m.key === metrik);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KorrelationenCard, {
    entries: entries
  }), /*#__PURE__*/React.createElement(Card, {
    title: "Vergleich nach Ort"
  }, /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Was möchtest du vergleichen?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ChipGroup, {
    options: VERGLEICH_METRIKEN.map(m => m.label),
    value: metrikDef.label,
    onChange: label => setMetrik(VERGLEICH_METRIKEN.find(m => m.label === label).key)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: Math.max(120, vergleichData.length * 46)
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: vergleichData,
    layout: "vertical",
    margin: {
      left: 8,
      right: 24,
      top: 4,
      bottom: 4
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: PALETTE.cardBorder,
    strokeDasharray: "3 3",
    horizontal: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    domain: [0, 10],
    stroke: PALETTE.textSecondary,
    fontSize: 11
  }), /*#__PURE__*/React.createElement(YAxis, {
    type: "category",
    dataKey: "ort",
    stroke: PALETTE.textSecondary,
    fontSize: 12,
    width: 90
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      background: PALETTE.bgBottom,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 8
    },
    labelStyle: {
      color: PALETTE.text
    },
    formatter: (value, name, props) => [`${value} (⌀ von ${props.payload.anzahl} Tagen)`, metrikDef.label]
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "wert",
    radius: [0, 8, 8, 0]
  }, vergleichData.map((_, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: [PALETTE.gold, PALETTE.sky, PALETTE.sage, PALETTE.coral][i % 4]
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: PALETTE.textSecondary,
      marginTop: 6
    }
  }, "Durchschnittswert von 0–10 je Standort, über alle bisherigen Einträge.")), /*#__PURE__*/React.createElement(Card, {
    title: "Über Zeit vergleichen"
  }, /*#__PURE__*/React.createElement(FieldLabel, {
    text: "Wähle bis zu 4 Werte zum Vergleichen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ChipGroupMulti, {
    options: alleMetrikOptionen,
    values: zeitMetriken,
    onToggle: toggleZeitMetrik,
    colors: farbenByMetrik
  })), zeitMetriken.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: PALETTE.textSecondary,
      fontSize: 13,
      textAlign: "center",
      padding: "20px 0"
    }
  }, "Wähl mindestens einen Wert aus.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 220
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: chartData,
    margin: {
      left: -20,
      right: 8,
      top: 8
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    stroke: PALETTE.cardBorder,
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: PALETTE.textSecondary,
    fontSize: 11
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [0, 14],
    stroke: PALETTE.textSecondary,
    fontSize: 11
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      background: PALETTE.bgBottom,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 8
    },
    labelStyle: {
      color: PALETTE.text
    }
  }), zeitMetriken.map(k => /*#__PURE__*/React.createElement(Line, {
    key: k,
    type: "monotone",
    dataKey: k,
    name: alleMetrikOptionen.find(m => m.key === k).label,
    stroke: farbenByMetrik[k],
    strokeWidth: 2,
    dot: {
      r: 3
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      marginTop: 8,
      fontSize: 12,
      color: PALETTE.textSecondary
    }
  }, zeitMetriken.map(k => /*#__PURE__*/React.createElement(Legend, {
    key: k,
    color: farbenByMetrik[k],
    label: alleMetrikOptionen.find(m => m.key === k).label
  }))))), /*#__PURE__*/React.createElement(Card, {
    title: "Alle Einträge"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [...entries].reverse().map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 12,
      padding: "10px 12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, e.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary
    }
  }, e.standort)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      fontFamily: FONT.mono,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: PALETTE.sage
    }
  }, "E ", e.energie), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PALETTE.coral
    }
  }, "BF ", e.brainfog)))))), /*#__PURE__*/React.createElement(ExportCard, {
    entries: entries,
    medications: medications,
    featureRequests: featureRequests
  }));
}
function Legend({
  color,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", null, label));
}

/* ---------- medikamente (Grundtab) view ---------- */
function MedikamenteView({
  medications,
  onChange
}) {
  const [draft, setDraft] = useState(emptyMedication());
  function addMed() {
    if (!draft.name.trim()) return;
    onChange([...medications, draft]);
    setDraft(emptyMedication());
  }
  function removeMed(id) {
    onChange(medications.filter(m => m.id !== id));
  }
  function updateDosis(id, dosis) {
    onChange(medications.map(m => m.id === id ? {
      ...m,
      dosis
    } : m));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    title: "Aktuelle Medikamente"
  }, medications.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: PALETTE.textSecondary,
      fontSize: 13,
      marginBottom: 12
    }
  }, "Noch keine Medikamente eingetragen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, medications.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 10,
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 14
    }
  }, m.name), /*#__PURE__*/React.createElement("input", {
    value: m.dosis,
    onChange: e => updateDosis(m.id, e.target.value),
    style: {
      width: 80,
      background: PALETTE.bgBottom,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 8,
      padding: "6px 8px",
      color: PALETTE.text,
      fontFamily: FONT.mono,
      fontSize: 13
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeMed(m.id),
    style: {
      background: "transparent",
      border: "none",
      color: PALETTE.coral,
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1
    }
  }, "×"))))), /*#__PURE__*/React.createElement(Card, {
    title: "Medikament hinzufügen"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Name",
    value: draft.name,
    onChange: v => setDraft({
      ...draft,
      name: v
    }),
    placeholder: "z.B. LDN"
  }), /*#__PURE__*/React.createElement(LabeledInput, {
    label: "Dosis",
    value: draft.dosis,
    onChange: v => setDraft({
      ...draft,
      dosis: v
    }),
    placeholder: "z.B. 3mg"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addMed,
    style: {
      marginTop: 12,
      width: "100%",
      padding: "10px 0",
      borderRadius: 10,
      border: "none",
      background: PALETTE.gold,
      color: "#20232F",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Hinzufügen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary,
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Dies ist die Grundliste. Änderungen (neu, entfernt, Dosis) trägst du am besten im Tagesbogen unter „Sonstiges\" ein, dann bleibt nachvollziehbar, wann sich was geändert hat.")));
}

/* ---------- einstellungen (settings) view ---------- */
function EinstellungenView({
  featureRequests,
  onChangeFeatureRequests
}) {
  const [draftWunsch, setDraftWunsch] = useState("");
  function addWunsch() {
    if (!draftWunsch.trim()) return;
    onChangeFeatureRequests([...(featureRequests || []), {
      ...emptyFeatureRequest(),
      text: draftWunsch.trim()
    }]);
    setDraftWunsch("");
  }
  function removeWunsch(id) {
    onChangeFeatureRequests((featureRequests || []).filter(f => f.id !== id));
  }
  function toggleErledigt(id) {
    onChangeFeatureRequests((featureRequests || []).map(f => f.id === id ? {
      ...f,
      erledigt: !f.erledigt
    } : f));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    title: "Feature vorschlagen"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: PALETTE.textSecondary,
      lineHeight: 1.5,
      marginBottom: 12
    }
  }, "Spatz, fehlt dir was in der App? Schreib's hier rein, dann landet's beim nächsten Export mit in der Datei."), /*#__PURE__*/React.createElement(TextArea, {
    placeholder: "z.B. eine Möglichkeit, einen Tag im Nachhinein zu bearbeiten …",
    value: draftWunsch,
    onChange: setDraftWunsch
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addWunsch,
    style: {
      marginTop: 10,
      width: "100%",
      padding: "11px 0",
      borderRadius: 12,
      border: "none",
      background: PALETTE.gold,
      color: "#20232F",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Wunsch hinzufügen"), (featureRequests || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 16
    }
  }, featureRequests.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 10,
      padding: "10px 12px",
      opacity: f.erledigt ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => toggleErledigt(f.id),
    style: {
      flex: 1,
      fontSize: 13,
      color: PALETTE.text,
      textDecoration: f.erledigt ? "line-through" : "none",
      cursor: "pointer"
    },
    title: "Als erledigt markieren"
  }, f.text), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeWunsch(f.id),
    style: {
      background: "transparent",
      border: "none",
      color: PALETTE.coral,
      cursor: "pointer",
      fontSize: 16,
      lineHeight: 1
    }
  }, "×"))))), /*#__PURE__*/React.createElement(VersionCard, null));
}
function VersionCard() {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("");
  async function nachUpdateSuchen() {
    setChecking(true);
    setStatus("");
    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          await reg.update();
          if (reg.waiting) {
            reg.waiting.postMessage({
              type: "SKIP_WAITING"
            });
          }
        }
      }
      const res = await fetch(`app.compiled.js?check=${Date.now()}`, {
        cache: "no-store"
      });
      await res.text();
      setStatus("Aktuell — lädt neu …");
      setTimeout(() => window.location.reload(), 600);
    } catch (e) {
      setStatus("Konnte nicht prüfen, bitte Internetverbindung checken.");
    } finally {
      setChecking(false);
    }
  }
  return /*#__PURE__*/React.createElement(Card, {
    title: "Version"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.mono,
      fontSize: 13,
      color: PALETTE.text,
      marginBottom: 4
    }
  }, "StatSpatz ", APP_VERSION), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary,
      marginBottom: 14
    }
  }, "Build vom ", APP_BUILT_AT), /*#__PURE__*/React.createElement("button", {
    onClick: nachUpdateSuchen,
    disabled: checking,
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 12,
      border: `1px solid ${PALETTE.cardBorder}`,
      background: "transparent",
      color: PALETTE.sky,
      fontWeight: 600,
      fontSize: 14,
      cursor: checking ? "default" : "pointer"
    }
  }, checking ? "prüft …" : "Nach Update suchen"), status && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: PALETTE.textSecondary,
      marginTop: 10
    }
  }, status));
}

/* ---------- motivational overlay ---------- */
function SpruchOverlay({
  text,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(20,22,31,0.82)",
      backdropFilter: "blur(3px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      zIndex: 50,
      animation: "fadeIn 300ms ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: 360,
      width: "100%",
      background: `linear-gradient(160deg, ${PALETTE.card} 0%, #23283A 100%)`,
      border: `1px solid ${PALETTE.cardBorder}`,
      borderRadius: 22,
      padding: "32px 26px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_SRC,
    alt: "",
    width: 68,
    height: 68,
    style: {
      borderRadius: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT.display,
      fontSize: 17,
      lineHeight: 1.55,
      color: PALETTE.text,
      marginBottom: 22
    }
  }, text), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      padding: "11px 26px",
      borderRadius: 999,
      border: "none",
      background: PALETTE.gold,
      color: "#20232F",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Danke, Spatz")));
}