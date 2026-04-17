// data.jsx — build step metadata, cut list, diagnostics, specs
// exposes everything on window for other babel scripts

const BUILD_STEPS = [
  {
    id: 1,
    title: "Lay Out Tracks on Platform",
    meta: "Perimeter sills · 18 ft × 12 ft",
    show: { sills: true },
    steps: [
      "Snap chalk lines on platform for the 18 ft × 12 ft outside perimeter.",
      "Lay 6 in track along all four perimeter lines, web down (open side up).",
      "Splice tracks where needed: overlap 12 in, fasten with 4 screws in the overlap.",
      "Verify square: diagonals equal within 1/4 in.",
      "Fasten track to platform rim with 3/8 in × 4 in lag screws every 24 in. Pre-drill platform.",
    ],
    success: "Tracks immovable, square, level."
  },
  {
    id: 2,
    title: "Stand South Wall Studs",
    meta: "10 C-studs @ 8 ft · 2 ft OC",
    show: { sills: true, southStuds: true },
    steps: [
      "Cut 10 C-studs to 8 ft. Use abrasive chop saw or fine-tooth metal-cutting blade.",
      "Stand each stud in the south sill track at 2 ft OC marks.",
      "Plumb each stud. Fasten to sill track with 2 screws per side (4 total per base).",
      "Do not install top plate yet.",
    ],
    success: "All 10 studs plumb within 1/8 in, landing on 0/2/4/6/8/10/12/14/16/18 ft marks."
  },
  {
    id: 3,
    title: "Stand North Wall Studs",
    meta: "10 C-studs @ 6 ft 8 in · 2 ft OC",
    show: { sills: true, southStuds: true, northStuds: true },
    steps: [
      "Cut 10 C-studs to 6 ft 8 in.",
      "Stand in north sill track at 2 ft OC marks matching south wall positions.",
      "Plumb and fasten as Step 2.",
    ],
    success: "North studs mirror south stud positions exactly."
  },
  {
    id: 4,
    title: "Frame Gables",
    meta: "7 studs each · door on east gable",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true },
    steps: [
      "Stand corner studs first (shared with long walls).",
      "Cut intermediate gable studs at stepped lengths: 6'8\" / 6'10⅝\" / 7'1¼\" / 7'3⅞\" / 7'6½\" / 7'9⅛\" / 8'0\".",
      "Top-cut each at 4:12 pitch (18.43° off square).",
      "Stand at 2 ft OC from north across 12 ft gable span.",
      "East gable door: king studs at 4.5 & 7.5 ft marks, jacks at 78 in, header of 2 C-studs boxed @ 48 in, cripples above.",
    ],
    success: "Gable stud tops aligned on 4:12 slope. Door rough opening 36 × 78 in, square."
  },
  {
    id: 5,
    title: "Install Top Plates",
    meta: "Long walls + sloped gable plates",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true },
    steps: [
      "Cut south wall top plate (18 ft track). Splice as needed.",
      "Seat top plate over south wall stud tops. Plumb. Fasten 2 screws/side per stud.",
      "Repeat for north wall top plate (18 ft).",
      "Gable top plate: bevel-cut ends, cut at 4:12 angle so it seats on sloped stud tops.",
    ],
    success: "All stud tops captured in track. No gaps."
  },
  {
    id: 6,
    title: "Plumb & Square Check",
    meta: "Brace before rafters",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, tempBrace: true },
    steps: [
      "Verify all wall studs plumb within 1/8 in over full height.",
      "Verify corner-to-corner diagonals equal within 1/2 in.",
      "Install temporary diagonal bracing on all four walls until roof is in place.",
    ],
    success: "Frame holds geometry without hand support."
  },
  {
    id: 7,
    title: "Ridge & Eave Beams",
    meta: "2 × 18 ft C-studs",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true },
    steps: [
      "Lay 18 ft C-stud on south wall top plate, aligned to outside face. This is the ridge beam.",
      "Fasten ridge beam to south top plate with screws every 16 in.",
      "Lay 18 ft C-stud on north wall top plate. Eave beam.",
      "Fasten same as ridge.",
    ],
    success: "Both beams continuous, straight, fastened at 16 in OC."
  },
  {
    id: 8,
    title: "Install Rafters",
    meta: "10 rafters @ 12 ft 4 in · 4:12 pitch",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true },
    steps: [
      "Cut 10 rafters from C-studs, 12 ft 4 in long each.",
      "South end (ridge end): bird's-mouth or angled cut at 4:12 to seat on ridge beam.",
      "North end (eave end): bird's-mouth or angled cut at 4:12 to seat on eave beam.",
      "Set first rafter at east gable end. Fasten at ridge and eave with angle clips.",
      "Set remaining 9 rafters at 2'-0\" OC, aligned over wall studs below.",
    ],
    success: "Rafters straight, parallel, level across ridge and eave."
  },
  {
    id: 9,
    title: "Mid-Roof Purlin",
    meta: "1 × 18 ft C-stud, mid-span",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true, purlin: true },
    steps: [
      "Cut one 18 ft C-stud.",
      "Mark midpoint of slope on each rafter: ~6 ft from ridge along the rafter.",
      "Fasten purlin to rafters at mid-span using angle clips.",
      "Run purlin continuous from east gable to west gable.",
    ],
    success: "Purlin continuous, fastened at every rafter crossing."
  },
  {
    id: 10,
    title: "Frame Fan Openings",
    meta: "Exhaust 18\" × 18\" W gable · intake E gable",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true, purlin: true, fans: true },
    steps: [
      "Exhaust: centered on west gable, top 6 in below roof peak. 18 × 18 in rough opening.",
      "Cut intermediate gable studs to create opening. Add jack studs each side, full height.",
      "Install header + sill (short C-stud segments screwed between jacks).",
      "Intake: low on east gable, bottom 12 in above sill. Same framing method.",
      "Maintain 2 ft OC panel fastening line with cripples above/below opening.",
    ],
    success: "Openings square. Accept fan with 1/8–1/4 in clearance on all sides."
  },
  {
    id: 11,
    title: "Horizontal Wall Purlins",
    meta: "Mid-height stiffener · all walls",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true, purlin: true, fans: true, wallPurlins: true },
    steps: [
      "Cut horizontal C-stud track or flat strap along inside face of each wall at mid-height.",
      "South wall: ~4 ft. North wall: ~3 ft 4 in.",
      "Fasten to each stud with 2 screws.",
    ],
    success: "Horizontal purlin continuous. Mid-wall stiffened."
  },
  {
    id: 12,
    title: "Cross-Bracing",
    meta: "Flat strap X on each wall",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true, purlin: true, fans: true, wallPurlins: true, xBrace: true },
    steps: [
      "Install 1-1/4 in × 20 ga galvanized flat strap in X pattern across two opposing corner bays of each long wall.",
      "Fasten strap ends to corner studs and top/bottom tracks with 4 screws each.",
      "Tension with turnbuckle mid-span or pull taut before fastening.",
      "Repeat on each gable, one X per gable.",
    ],
    success: "Frame does not rack under 50 lb lateral push at any corner."
  },
  {
    id: 13,
    title: "Final Frame Check",
    meta: "Sign-off before glazing",
    show: { sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true, topPlates: true, beams: true, rafters: true, purlin: true, fans: true, wallPurlins: true, xBrace: true, panelGrid: true },
    steps: [
      "Push each corner laterally. Frame must not rack.",
      "Verify all studs plumb, all rafters parallel.",
      "Verify fan openings square and sized correctly.",
      "Confirm every vertical panel seam lands on a stud at 0/2/4/…/18 ft (walls) and 0/2/…/12 ft (gables).",
    ],
    success: "Panel-fastening grid verified. Ready for Layer 6 glazing."
  },
];

const CUT_LIST = [
  { group: "South Wall", items: [
    { q: 10, spec: "6\" 18-ga C-stud", len: "8 ft 0 in", note: "Vertical posts, 2'-0\" OC" },
    { q: 1,  spec: "6\" 18-ga track",  len: "18 ft",     note: "Sill (splice 2 × 10 ft)" },
    { q: 1,  spec: "6\" 18-ga track",  len: "18 ft",     note: "Top plate" },
  ]},
  { group: "North Wall", items: [
    { q: 10, spec: "6\" 18-ga C-stud", len: "6 ft 8 in", note: "Vertical posts, 2'-0\" OC" },
    { q: 1,  spec: "6\" 18-ga track",  len: "18 ft",     note: "Sill" },
    { q: 1,  spec: "6\" 18-ga track",  len: "18 ft",     note: "Top plate" },
  ]},
  { group: "East Gable (door)", items: [
    { q: 5, spec: "6\" 18-ga C-stud", len: "stepped", note: "6'10⅝\" / 7'1¼\" / 7'3⅞\" / 7'6½\" / 7'9⅛\"" },
    { q: 2, spec: "6\" 18-ga C-stud", len: "king",   note: "Flank door @ 4.5 & 7.5 ft" },
    { q: 2, spec: "6\" 18-ga C-stud", len: "78 in",   note: "Jack studs" },
    { q: 2, spec: "6\" 18-ga C-stud", len: "48 in",   note: "Boxed header" },
    { q: 1, spec: "6\" 18-ga track",  len: "12 ft",   note: "Sill" },
    { q: 1, spec: "6\" 18-ga track",  len: "12 ft 1 in", note: "Sloped top plate, 4:12 angle" },
  ]},
  { group: "West Gable", items: [
    { q: 5, spec: "6\" 18-ga C-stud", len: "stepped", note: "Same lengths as east gable" },
    { q: 1, spec: "6\" 18-ga track",  len: "12 ft",   note: "Sill" },
    { q: 1, spec: "6\" 18-ga track",  len: "12 ft 1 in", note: "Sloped top plate" },
  ]},
  { group: "Roof", items: [
    { q: 10, spec: "6\" 18-ga C-stud", len: "12 ft 4 in", note: "Rafters, 2'-0\" OC, 4:12 pitch" },
    { q: 1,  spec: "6\" 18-ga C-stud", len: "18 ft",     note: "Ridge beam (south high)" },
    { q: 1,  spec: "6\" 18-ga C-stud", len: "18 ft",     note: "Eave beam (north low)" },
    { q: 1,  spec: "6\" 18-ga C-stud", len: "18 ft",     note: "Mid-roof purlin" },
  ]},
  { group: "Horizontal Wall Purlins", items: [
    { q: 2, spec: "6\" 18-ga track or C-stud", len: "18 ft", note: "Long walls — south @ ~4 ft, north @ ~3'-4\"" },
    { q: 2, spec: "6\" 18-ga track or C-stud", len: "12 ft", note: "Gables — continuous mid-height stiffener" },
  ]},
  { group: "Fan Openings", items: [
    { q: 1, spec: "Rough opening", len: "18 × 18 in", note: "Exhaust — west gable high" },
    { q: 1, spec: "Rough opening", len: "18 × 18 in", note: "Intake — east gable low" },
    { q: 6, spec: "Stud offcuts",  len: "varies",    note: "Jacks, headers, sills, cripples" },
  ]},
];

const MATERIALS = [
  { group: "Steel framing", items: [
    { name: "6\" 18-ga C-stud @ 18 ft", qty: "40" },
    { name: "6\" 18-ga track @ 10 ft",  qty: "14" },
  ]},
  { group: "Fasteners & hardware", items: [
    { name: "#10 × 3/4 in self-drilling hex", qty: "2 × 1000 ct" },
    { name: "Angle clips / L-brackets",       qty: "60" },
    { name: "3/8 in × 4 in lag screws",       qty: "40" },
    { name: "1-1/4 in × 20-ga flat strap",    qty: "100 ft roll" },
  ]},
  { group: "Openings", items: [
    { name: "Door 36 × 78 in (east gable)",   qty: "1" },
    { name: "Exhaust fan 16 in, 1500+ CFM",   qty: "1" },
    { name: "Intake fan/shutter, 1000+ CFM",  qty: "1" },
  ]},
];

const DIAGNOSTICS = [
  { sym: "Frame racks under lateral push", fix: "Cross-bracing insufficient. Add second X on affected wall." },
  { sym: "Studs out of plumb after top plate install", fix: "Top plate not straight, or stud bottoms shifted in track. Re-plumb and refasten." },
  { sym: "Rafter sags between beams", fix: "Clip fastening insufficient, or 18-ga inadequate for span. Upgrade to 16-ga rafters or add second mid-roof purlin." },
  { sym: "Fan opening out of square", fix: "Re-cut header or sill. Panels will not seal around out-of-square openings." },
  { sym: "Panel seam misses stud", fix: "Cut was off the 2 ft grid. Re-measure all stud positions BEFORE installing panels. Most common failure, most expensive to fix." },
  { sym: "Door won't clear intake fan", fix: "Move intake to east gable high opposite exhaust, or relocate to south gable low." },
];

const SPECS = [
  { k: "Length E–W", v: "18", u: "ft" },
  { k: "Width N–S",  v: "12", u: "ft" },
  { k: "South wall", v: "8", u: "ft" },
  { k: "North wall", v: "6'8\"", u: "" },
  { k: "Roof pitch", v: "4:12", u: "" },
  { k: "Rafter len", v: "12'4\"", u: "" },
  { k: "Stud OC",    v: "2'-0\"", u: "" },
  { k: "Gauge",      v: "18", u: "ga" },
];

Object.assign(window, { BUILD_STEPS, CUT_LIST, MATERIALS, DIAGNOSTICS, SPECS });
