// layer6.jsx — polycarbonate glazing data
// Layer 6 · DGSL 4mm twin-wall polycarbonate, 2 ft × 4 ft fixed panels
// Flutes run along 4 ft long side (vertical on walls, down-slope on roof)

const L6_SPECS = [
  { k: "Panel", v: "DGSL 4mm TW-PC" },
  { k: "Size", v: "2' × 4' × 0.16\"" },
  { k: "Light", v: "80–89%" },
  { k: "UV block", v: "99.5%" },
  { k: "Total panels", v: "98 (7 × 14-pk)" },
  { k: "Flute dir", v: "along 4 ft side" },
  { k: "UV side", v: "OUTSIDE" },
  { k: "Fastener OC", v: "8\" V · 12\" H" },
];

const L6_PANELS = [
  { group: "South Wall · 2 rows × 9 cols", items: [
    { q: 9, name: "SW-B-01…09 (row bot)", size: "24 × 48", note: "Full panel, flutes vertical. Sill up to 4'-0\"." },
    { q: 9, name: "SW-T-01…09 (row top)", size: "24 × 48", note: "Full panel. 4'-0\" up to 8'-0\" top plate." },
  ]},
  { group: "North Wall · 2 rows × 9 cols", items: [
    { q: 9, name: "NW-B-01…09 (row bot)", size: "24 × 48",      note: "Full panel. Sill up to 4'-0\"." },
    { q: 9, name: "NW-T-01…09 (row top)", size: "24 × 32 (cut)", note: "Cut from full panel to 2'-8\". Keep 16\" scrap." },
  ]},
  { group: "East Gable · 12 panels (trapezoidal top row)", items: [
    { q: 6, name: "EG-B-01…06 (row bot)", size: "24 × 48", note: "Full panel, flutes vertical. 4 panels framed around door opening." },
    { q: 6, name: "EG-T-01…06 (row top)", size: "24 × taper", note: "Top row cut to match sloped top plate (2'-8\" → 4'-0\")." },
  ]},
  { group: "West Gable · 12 panels (trapezoidal top row)", items: [
    { q: 6, name: "WG-B-01…06 (row bot)", size: "24 × 48", note: "Full panel." },
    { q: 6, name: "WG-T-01…06 (row top)", size: "24 × taper", note: "Trapezoidal. WG-T-05 carries 18×18 exhaust cutout." },
  ]},
  { group: "Roof · 3 rows × 9 cols · flutes down-slope", items: [
    { q: 9, name: "RF-E-01…09 (eave row)",   size: "24 × 48",  note: "North eave up 4 ft along slope." },
    { q: 9, name: "RF-M-01…09 (mid row)",    size: "24 × 48",  note: "Mid slope, 4 ft to 8 ft mark. Aligns with mid-purlin." },
    { q: 9, name: "RF-R-01…09 (ridge row)",  size: "24 × 49",  note: "Full panel, trimmed 1\" max for ridge fit. RF-R-03 & RF-R-07 carry 22×22 vent cutouts." },
  ]},
  { group: "Reclaimed scrap + waste allowance", items: [
    { q: 9, name: "NW top-row offcuts (16\" strips)", size: "24 × 16", note: "Reuse for door jack cripples, fan framing infill." },
    { q: 9, name: "Waste allowance (10%)", size: "—", note: "Covers mis-cuts, edge damage, delivery breakage." },
  ]},
];

const L6_TRIM = [
  { group: "H-channel · 4mm profile ONLY", items: [
    { q: 1, name: "Vertical H · South wall",  len: "64 lf", note: "8 seams × 8'-0\"" },
    { q: 1, name: "Vertical H · North wall",  len: "53 lf", note: "8 seams × 6'-8\"" },
    { q: 1, name: "Vertical H · E gable",     len: "35 lf", note: "5 seams × ~7' avg" },
    { q: 1, name: "Vertical H · W gable",     len: "35 lf", note: "5 seams × ~7' avg" },
    { q: 1, name: "Vertical H · Roof",        len: "97 lf", note: "8 seams × 12'-1\"" },
    { q: 1, name: "HORIZONTAL H · S wall",    len: "18 lf", note: "NEW: 1 seam at 4'-0\" height" },
    { q: 1, name: "HORIZONTAL H · N wall",    len: "18 lf", note: "NEW: 1 seam at 4'-0\" height" },
    { q: 1, name: "HORIZONTAL H · E gable",   len: "12 lf", note: "NEW: 1 seam at 4'-0\" height (steps with rake)" },
    { q: 1, name: "HORIZONTAL H · W gable",   len: "12 lf", note: "NEW" },
    { q: 1, name: "HORIZONTAL H · Roof",      len: "36 lf", note: "NEW: 2 seams at 4' and 8' along slope" },
    { q: 1, name: "H-channel SUBTOTAL",       len: "380 lf", note: "Order +10% overage: 420 lf" },
  ]},
  { group: "J-channel · 4mm profile · perimeter", items: [
    { q: 1, name: "Wall sills (S + N)",        len: "36 lf", note: "Weep holes drilled 1/8\" @ 24\" OC, angled DOWN" },
    { q: 1, name: "Wall caps (S + N top)",     len: "36 lf", note: "Top plate · anti-dust breather tape beneath" },
    { q: 1, name: "Gable sills + sloped caps", len: "42 lf", note: "Bottom horizontal + stepped top along rake" },
    { q: 1, name: "Door opening perimeter",    len: "~20 lf", note: "All 4 sides · seals twin-wall cells" },
    { q: 1, name: "Fan opening perimeters (2)", len: "~12 lf", note: "Intake + exhaust · all 4 sides each" },
    { q: 1, name: "Roof vent openings (2)",    len: "~15 lf", note: "All 4 sides of each 22×22 cutout" },
    { q: 1, name: "J-channel SUBTOTAL",        len: "~150 lf", note: "Order +10%: 165 lf" },
  ]},
  { group: "F-channel (optional) · gable rakes", items: [
    { q: 1, name: "East + west rake",          len: "30 lf", note: "Optional — J-channel works if F unavailable" },
  ]},
  { group: "Flashing · aluminum", items: [
    { q: 1, name: "Ridge flashing",            len: "20 lf", note: "6\" legs, covers south high edge" },
    { q: 1, name: "Eave drip edge",            len: "20 lf", note: "Directs water off north low edge" },
  ]},
  { group: "Tape & sealant", items: [
    { q: 3, name: "Solid aluminum tape (top edges)",   len: "3 × 50 ft", note: "~$15/roll · panel TOP ends before J-cap" },
    { q: 3, name: "Vented aluminum tape (bottom edges)", len: "3 × 50 ft", note: "~$15/roll · panel BOTTOM ends under J-cap w/ weeps" },
    { q: 2, name: "Butyl sealant tape 3/4\"",          len: "2 × 200 ft", note: "~$20/roll · channel-to-panel sealing" },
  ]},
];

const L6_FASTENERS = [
  { name: "#8 × 1 in self-drill + neoprene washer", qty: "2 × 1,000 ct boxes (~$100)" },
  { name: "#10 × 2 in flashing screws",              qty: "100 ct" },
];

const L6_HARDWARE = [
  { name: "Roof vent w/ solar auto-opener", qty: "2 (south ridge, 1/3 & 2/3 points)" },
  { name: "Exhaust fan 16 in, 1500+ CFM",    qty: "1 (west gable high)" },
  { name: "Intake fan/shutter, 1000+ CFM",   qty: "1 (east gable low)" },
  { name: "Door 36 × 78, framed + acrylic",  qty: "1 (east gable center)" },
];

const L6_ORDER = [
  { name: "DGSL panels · 7 packs of 14 (98 ct)",      qty: "≈ $1,820" },
  { name: "H-channel 4mm profile · 420 lf w/ overage", qty: "$3,040 – 4,560" },
  { name: "J-channel 4mm profile · 165 lf",            qty: "$900 – 1,500" },
  { name: "F-channel rakes · 30 lf (optional)",         qty: "$180 – 300" },
  { name: "Solid aluminum tape · 3 rolls",              qty: "$45" },
  { name: "Vented aluminum tape · 3 rolls",             qty: "$45" },
  { name: "Butyl tape · 2 rolls",                       qty: "$40" },
  { name: "Fasteners · 2 × 1,000 ct + flashing screws", qty: "$100" },
  { name: "Ridge flashing · 20 lf",                     qty: "$60" },
  { name: "Eave drip edge · 20 lf",                     qty: "$50" },
  { name: "PROJECT TOTAL",                              qty: "$6,280 – 8,460" },
];

const L6_STEPS = [
  { id: 1, title: "Pre-order verification (CRITICAL — do before any install)",
    meta: "4 checks before trim lands on site",
    steps: [
      "Confirm ALL H, J, F channels are explicitly rated for 4mm (0.16 in) twin-wall. 6mm/8mm channels will NOT grip 4mm panels. Phone or email supplier in writing.",
      "Contact DGSL seller: which side is UV-coated, and is it marked? UV-side-out is mandatory — install wrong and panels yellow within 2 years.",
      "Confirm DGSL flute direction: runs along the 4 ft long side. Correct for vertical-wall and down-slope-roof install.",
      "Request written warranty terms (UV, structural, yellowing). Budget 4mm typically 3–10 yr; get it in writing before install.",
    ],
    success: "All 4 verifications received in writing. Proceed to order."
  },
  { id: 2, title: "Verify frame panel-fastening grid",
    meta: "Pre-glazing checklist",
    steps: [
      "Every vertical seam lands on a stud (0/2/4/…/18 ft long walls; 0/2/…/12 ft gables).",
      "NEW: Every horizontal seam lands on a mid-wall blocker at exactly 4'-0\" AFF. Install 2×4 horizontal blocking between studs if not already there — 4mm panels need continuous backing at horizontal seam.",
      "Fan rough openings square within 1/8 in; door rough opening square within 1/8 in.",
      "Frame does not rack under 50 lb lateral push.",
    ],
    success: "Frame ready. Every panel seam has backing."
  },
  { id: 3, title: "Apply butyl tape to all framing contact surfaces",
    meta: "All panel-contact surfaces",
    steps: [
      "Run 3/4\" butyl sealant tape along every stud, rafter, ridge beam, eave beam, mid-purlin, AND horizontal mid-wall blocking.",
      "Apply continuously — no gaps. Butyl seals panel-to-frame interface; critical at every new horizontal seam.",
    ],
    success: "Every member that touches a panel has butyl."
  },
  { id: 4, title: "Panel prep: UV side, edge tapes, oversized holes",
    meta: "Per-panel workflow",
    steps: [
      "Verify UV side per DGSL marking — install UV OUT, always. Mark arrow on every panel.",
      "Apply SOLID aluminum tape to TOP end of every panel (blocks dust + insects into flutes).",
      "Apply VENTED aluminum tape to BOTTOM end (permits drainage, blocks insects).",
      "Pre-drill fastener holes 1/16 in OVERSIZED — thermal expansion of 4mm PC needs slip room.",
      "All fastener penetrations require neoprene washers — no exceptions.",
    ],
    success: "Panels prepped, UV-oriented, holes oversized, edge tapes applied."
  },
  { id: 5, title: "Install south wall — bottom row first, then top",
    meta: "18 panels · 2 rows · horizontal H at 4'-0\"",
    steps: [
      "Install J-channel sill with weep holes drilled @ 24\" OC, 1/8\" dia, angled DOWN.",
      "Seat row-bot panel SW-B-01 in sill J, fasten to east stud with #8 × 1 in + neoprene washer @ 8\" OC on verticals.",
      "Slip vertical H-channel over stud edge, seat SW-B-02. Fastener OC on horizontal seams = 12\".",
      "Continue SW-B-03 → SW-B-09. Cap bottom row with HORIZONTAL H-channel at 4'-0\" — this is the row divider.",
      "Install top row SW-T-01 → SW-T-09 the same way, seating into the horizontal H. Cap top with J-channel + breather tape.",
    ],
    success: "South wall glazed, 2 rows, no gaps, screws snug (neoprene compressed ~50%, not crushing panel)."
  },
  { id: 6, title: "Install north wall — cut top row to 2'-8\"",
    meta: "18 panels · bottom row full · top row cut",
    steps: [
      "Same method as south wall for bottom row.",
      "Cut top-row panels from full 2'×4' stock to 2'×2'-8\" (32 in). Keep the 16 in strips — reclaimed for door cripples, fan opening infill.",
      "UV side still matters on cut pieces. Re-mark arrow on the offcut before storing.",
    ],
    success: "North wall glazed. Offcuts stored for reuse."
  },
  { id: 7, title: "Install gable panels — trapezoidal top row + openings",
    meta: "Door + fan cutouts · U-cap all 4 sides of openings",
    steps: [
      "East gable: frame door rough opening with J-channel on all 4 sides BEFORE hanging adjacent panels.",
      "East gable: frame intake 18×18 opening with J-channel on all 4 sides — seals exposed twin-wall cells.",
      "Install EG-B-01 → EG-B-06 (bottom row, full panels, where openings allow).",
      "Cut EG-T-01 → EG-T-06 with tapered tops matching sloped top plate at 4:12. Taper goes from 2'-8\" at north corner to 4'-0\" at south corner.",
      "West gable: J-cap exhaust 18×18. Install WG-B + WG-T. WG-T-05 carries the fan cutout.",
    ],
    success: "Gables glazed. All openings U-capped on all 4 sides."
  },
  { id: 8, title: "Install roof — eave row first, up the slope",
    meta: "27 panels · 3 rows · flutes down-slope for drainage",
    steps: [
      "Install J-channel eave drip edge at north low edge, weep holes DOWN.",
      "ROW 1 (eave): Install RF-E-01 → RF-E-09 with 4 ft length running NORTH-SOUTH, flutes parallel to slope for condensation drainage. Fasten to rafters @ 8\" OC on verticals, 12\" OC on horizontals.",
      "Cap row 1 with HORIZONTAL H-channel at 4 ft slope mark. This aligns with Layer 1 mid-roof purlin.",
      "ROW 2 (mid): Install RF-M-01 → RF-M-09. Cap with HORIZONTAL H at 8 ft slope mark — install a mid-span wood blocker on rafters if the frame doesn't have one here.",
      "ROW 3 (ridge): RF-R-01 → RF-R-09. Critical: RF-R-03 and RF-R-07 carry 22×22 vent cutouts. J-cap all 4 sides of vent cutouts BEFORE seating panel.",
      "Cap ridge with J + breather tape, then ridge flashing over top.",
    ],
    success: "Roof glazed, vents J-capped, ridge flashed."
  },
  { id: 9, title: "Install hardware",
    meta: "Vents · fans · door",
    steps: [
      "Mount 2 roof vents into prepared cutouts on RF-R-03 & RF-R-07. Install solar auto-openers.",
      "Mount exhaust fan in west gable opening. Intake fan/shutter in east gable opening.",
      "Hang pre-framed door (36×78 with acrylic window) in east gable rough opening.",
    ],
    success: "All hardware operational."
  },
  { id: 10, title: "Seal, water test, fan test",
    meta: "Commissioning",
    steps: [
      "Walk perimeter — no visible butyl gaps, no crushed panels, no missing weep holes.",
      "Water test: hose down roof, verify drainage at eave. No leaks at horizontal seams (most likely leak location on this build).",
      "Fan test: run exhaust, confirm cross-flow from intake. 30 mph wind test — panels should NOT flex or rattle.",
      "If rattle or flex: tighten fastener spacing to 6\" OC on vertical seams. Do not proceed until rigid.",
    ],
    success: "Weathertight. No rattle at 30 mph. Ready for benches, irrigation, plants."
  },
];

const L6_DETAILS = [
  {
    id: "D-01", title: "Pre-Order Verifications (4 Critical Checks)",
    body: "BEFORE ordering trim: (1) Confirm channel profile is explicitly rated 4mm/0.16 in — 6mm or 8mm channels will NOT grip 4mm panels; they will fall out under load. (2) Contact DGSL: which side has UV coating, and is it marked? (3) Confirm flute direction runs along 4 ft long side — required for vertical-wall and down-slope-roof orientation. (4) Get written warranty terms — budget 4mm PC typically 3–10 yr UV coverage; document before install."
  },
  {
    id: "D-02", title: "UV Orientation (unchanged from 8mm plan)",
    body: "DGSL lists 99.5% UV blocking but does not state which side is UV-treated on the listing. CONFIRM with seller in writing before install. UV-coated side faces OUTWARD. Installing inverted voids warranty and causes yellowing + embrittlement within 2 years. Mark every panel with an arrow pointing OUT before cutting or handling."
  },
  {
    id: "D-03", title: "Thermal Expansion (tighter on 4mm)",
    body: "Polycarbonate expansion: 0.065 mm/m/°C. A 4 ft panel in Lumberton's 60°F swing expands/contracts ~2.6 mm. Oversize every fastener hole by 1/16 in beyond screw diameter. Neoprene washers MANDATORY on every #8 × 1 in screw. Over-torque crushes 4mm cells faster than 8mm — compress neoprene washer ~50%, stop immediately. Leave 1/8 in perimeter gap in J-channels."
  },
  {
    id: "D-04", title: "Weep Hole Schedule",
    body: "Every J-channel BOTTOM edge: 1/8 in dia holes @ 24 in OC, angled downward 30°. Locations: wall sills (S + N), gable sills, ALL 4 sides of fan openings (bottom + 2 side-bottoms + header-bottom), ALL 4 sides of door opening, ALL 4 sides of each roof vent cutout, eave drip edge on roof. Prevents condensation buildup inside twin-wall cells."
  },
  {
    id: "D-05", title: "Fastener Spacing (TIGHTER than 8mm plan)",
    body: "4mm twin-wall flexes more than 8mm under wind/snow load. Spacing: VERTICAL seams @ 8 in OC (was 12 in for 8mm). HORIZONTAL seams @ 12 in OC (was 16 in). Increases fastener count ~50% — order 2 × 1,000 ct boxes of #8 × 1 in self-drill with neoprene. If panels rattle at 30 mph wind, tighten vertical-seam spacing to 6 in OC."
  },
  {
    id: "D-06", title: "Horizontal Seams — NEW on this build",
    body: "Because DGSL panels are fixed 2'×4', every wall, gable, and roof has at least one horizontal seam. Walls: one seam at 4'-0\" AFF, requires continuous 2×4 horizontal blocking between studs. Roof: two seams at 4 ft and 8 ft slope marks — the 4 ft seam aligns with Layer 1 mid-roof purlin; the 8 ft seam needs a NEW blocker installed between rafters. Horizontal H-channel grips top of lower panel and bottom of upper panel. Apply butyl tape to blocking BEFORE channel. Most likely leak path on this build — do not skimp on butyl."
  },
  {
    id: "D-07", title: "Flute Direction & Drainage",
    body: "DGSL flutes run along the 4 ft long side. Walls: panels vertical, flutes vertical — condensation drains out through vented aluminum tape at bottom edge. Roof: panels with 4 ft length running NORTH-SOUTH (down-slope), flutes parallel to slope — condensation drains down to north eave. DO NOT rotate panels 90° on roof — horizontal flutes trap water and grow algae."
  },
  {
    id: "D-08", title: "Snow Load (Zone 8a marginal)",
    body: "4mm twin-wall is marginal for snow-prone regions. Lumberton NC averages <5 in annual snow; 4mm is adequate. In a heavy event (>6 in accumulation), clear the roof manually with a soft broom to prevent permanent deflection — 4mm panels take a set and do not fully recover. Never walk on the roof panels; use ladder from ground level."
  },
  {
    id: "D-09", title: "Insulation Reality Check",
    body: "4mm twin-wall R-value ≈ 1.5 (vs 1.6 for 8mm — marginal difference). Still ~3× better than 6-mil poly film. Adequate for Zone 8a all-season with supplemental heating on hard-freeze nights (<25°F). Plan heater sizing for ~1.5 R envelope. If winter heating load exceeds budget, 4mm panels can be swapped for 8mm later panel-by-panel without reworking the frame — but channels must be upgraded to 8mm profile at that time."
  },
  {
    id: "D-10", title: "Fan & Door Opening Cut-Around",
    body: "Exhaust (west gable, 18 × 18 in) and intake (east gable, 18 × 18 in) openings already framed in Layer 1 steel. Door (36 × 78) already framed. Panel cutouts must match rough opening ± 1/8 in. Seal all 4 edges of each cut with J-channel BEFORE mounting hardware — this seals exposed twin-wall cells and prevents debris/moisture. Butyl tape behind J-channel flanges. Hardware flange screws through panel into steel jack studs."
  },
];

const L6_DIAG = [
  { sym: "Channel does not grip panel — slips or falls out",
    fix: "Wrong profile ordered. 6mm or 8mm channels will not seat 4mm panels. Re-order 4mm-rated channel. Do NOT force-install; the panel edge will crack." },
  { sym: "Panels flex and rattle in wind (>25 mph)",
    fix: "Fastener spacing insufficient. Tighten vertical-seam fasteners to 6 in OC (was 8). If rattle persists, add mid-span blocking at 2 ft intervals behind each seam." },
  { sym: "Panels yellow or become brittle within 2 years",
    fix: "UV-coated side installed INWARD (wrong), or non-UV product delivered. Contact DGSL under warranty. Future: verify UV marking BEFORE every panel installed." },
  { sym: "Horizontal seams leak during rain",
    fix: "Butyl tape missing or discontinuous at channel-to-blocking contact. Pull affected panel, apply continuous butyl to blocking face, reinstall. This is the #1 leak path on this build." },
  { sym: "Panel cracks at screw hole",
    fix: "Over-torqued — neoprene washer fully compressed or absent. Holes not oversized for thermal movement. Remove screw, re-drill hole +1/16 in, install new screw with neoprene, stop at ~50% washer compression." },
  { sym: "Algae or green stain down a roof panel",
    fix: "Flutes oriented horizontally on roof — water trapped inside cells. Wrong install. Remove panel, reorient with flutes running down-slope (4 ft length N–S), reinstall." },
  { sym: "Snow deflection on roof",
    fix: "4mm is marginal for snow. Clear accumulation >6 in manually with a soft broom from ground-level ladder. If panel takes permanent set, replace — 4mm TW-PC does not fully recover from plastic deformation." },
  { sym: "Condensation pooling inside wall panels",
    fix: "Vented aluminum tape missing on panel bottom, or J-channel weep holes blocked. Inspect weep holes, clear with 1/8 in bit. Replace bottom tape if solid tape was used by mistake (must be vented on bottom)." },
];

Object.assign(window, { L6_SPECS, L6_PANELS, L6_TRIM, L6_FASTENERS, L6_HARDWARE, L6_ORDER, L6_STEPS, L6_DETAILS, L6_DIAG });
