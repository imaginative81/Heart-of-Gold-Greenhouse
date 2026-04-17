// layer6-views.jsx — glazing plan + elevations for Layer 6
// DGSL 4mm 2'×4' panels: 2-row walls, stepped 2-row gables, 3-row roof

const L6_PX = 36;

const PANEL_FILL = "rgba(90, 209, 230, 0.08)";
const PANEL_STROKE = "var(--accent-2)";
const HSEAM = "var(--accent)";

function panelLabel(x, y, w, h, id, sub) {
  return (
    <g>
      <text x={x + w / 2} y={y + h / 2 - 4} className="callout-text" textAnchor="middle"
        style={{ fill: "var(--accent-2)", fontSize: 10 }}>{id}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 10} className="callout-text" textAnchor="middle"
        style={{ fill: "var(--ink-soft)", fontSize: 8.5 }}>{sub}</text>}
    </g>
  );
}

function SouthGlazing() {
  const W = 18 * L6_PX, H = 9 * L6_PX;
  const padX = 80, padY = 80;
  const px = ft => padX + ft * L6_PX;
  const py = ft => padY + (9 - ft) * L6_PX;
  return (
    <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {[0,2,4,6,8,10,12,14,16,18].map(x => (
        <line key={x} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(8)} className="frame-line stud" opacity="0.6" />
      ))}
      <line x1={px(0)} y1={py(8)} x2={px(18)} y2={py(8)} className="frame-line track" />

      {/* Mid-wall horizontal blocker at 4'-0" */}
      <line x1={px(0)} y1={py(4)} x2={px(18)} y2={py(4)} stroke={HSEAM} strokeWidth="1.6" />

      {/* Bottom row — 9 panels 2' × 4' */}
      {Array.from({length: 9}).map((_, i) => (
        <g key={`b-${i}`}>
          <rect x={px(i*2)} y={py(4)} width={L6_PX*2} height={py(0)-py(4)}
            fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
          {panelLabel(px(i*2), py(4), L6_PX*2, py(0)-py(4), `SW-B-${String(i+1).padStart(2,"0")}`, "24 × 48")}
        </g>
      ))}
      {/* Top row — 9 panels 2' × 4' */}
      {Array.from({length: 9}).map((_, i) => (
        <g key={`t-${i}`}>
          <rect x={px(i*2)} y={py(8)} width={L6_PX*2} height={py(4)-py(8)}
            fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
          {panelLabel(px(i*2), py(8), L6_PX*2, py(4)-py(8), `SW-T-${String(i+1).padStart(2,"0")}`, "24 × 48")}
        </g>
      ))}

      {/* H-profile markers: vertical seams (circles) + horizontal seam (text) */}
      {[2,4,6,8,10,12,14,16].map(x => (
        <circle key={`h-${x}`} cx={px(x)} cy={py(6)} r="3" fill="var(--accent-2)" opacity="0.7" />
      ))}

      {/* Edge caps */}
      <rect x={px(0)} y={py(8)-4} width={W} height="4" fill="var(--accent)" opacity="0.4" />
      <rect x={px(0)} y={py(0)} width={W} height="4" fill="var(--accent)" opacity="0.4" />

      <text x={px(9)} y={py(8)-10} className="callout-text" textAnchor="middle" style={{fill:"var(--accent)"}}>J-CAP TOP · solid Al tape + breather</text>
      <text x={px(9)} y={py(4)-6} className="callout-text" textAnchor="middle" style={{fill:HSEAM}}>◆ HORIZONTAL H @ 4'-0" — butyl on blocking, #1 leak path</text>
      <text x={px(9)} y={py(0)+16} className="callout-text" textAnchor="middle" style={{fill:"var(--accent)"}}>J-CAP SILL · weep 1/8" @ 24" OC ▼ · vented Al tape</text>
      <text x={px(1)} y={py(2)-10} className="callout-text" style={{fill:"var(--accent-2)"}}>● VERTICAL H · fasten @ 8" OC</text>

      <text x={padX + W/2} y={padY + H + 40} className="label-text" textAnchor="middle">SOUTH WALL · 18 PANELS (2 ROWS × 9) · DGSL 4mm 2'×4' · FLUTES VERTICAL</text>
    </svg>
  );
}

function NorthGlazing() {
  const W = 18 * L6_PX, H = 8 * L6_PX;
  const padX = 80, padY = 80;
  const px = ft => padX + ft * L6_PX;
  const py = ft => padY + (8 - ft) * L6_PX;
  const NH = 6.667; // 6'-8"
  return (
    <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {[0,2,4,6,8,10,12,14,16,18].map(x => (
        <line key={x} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(NH)} className="frame-line stud" opacity="0.6" />
      ))}
      <line x1={px(0)} y1={py(NH)} x2={px(18)} y2={py(NH)} className="frame-line track" />

      <line x1={px(0)} y1={py(4)} x2={px(18)} y2={py(4)} stroke={HSEAM} strokeWidth="1.6" />

      {/* Bottom row full panels */}
      {Array.from({length: 9}).map((_, i) => (
        <g key={`b-${i}`}>
          <rect x={px(i*2)} y={py(4)} width={L6_PX*2} height={py(0)-py(4)}
            fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
          {panelLabel(px(i*2), py(4), L6_PX*2, py(0)-py(4), `NW-B-${String(i+1).padStart(2,"0")}`, "24 × 48")}
        </g>
      ))}
      {/* Top row CUT to 2'-8" */}
      {Array.from({length: 9}).map((_, i) => (
        <g key={`t-${i}`}>
          <rect x={px(i*2)} y={py(NH)} width={L6_PX*2} height={py(4)-py(NH)}
            fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" strokeDasharray="3 2" />
          {panelLabel(px(i*2), py(NH), L6_PX*2, py(4)-py(NH), `NW-T-${String(i+1).padStart(2,"0")}`, "24 × 32 ✂")}
        </g>
      ))}

      {[2,4,6,8,10,12,14,16].map(x => (
        <circle key={`h-${x}`} cx={px(x)} cy={py(5.3)} r="3" fill="var(--accent-2)" opacity="0.7" />
      ))}

      <rect x={px(0)} y={py(NH)-4} width={W} height="4" fill="var(--accent)" opacity="0.4" />
      <rect x={px(0)} y={py(0)} width={W} height="4" fill="var(--accent)" opacity="0.4" />

      <text x={px(9)} y={py(NH)-10} className="callout-text" textAnchor="middle" style={{fill:"var(--accent)"}}>J-CAP TOP (top plate @ 6'-8")</text>
      <text x={px(9)} y={py(4)-6} className="callout-text" textAnchor="middle" style={{fill:HSEAM}}>◆ HORIZONTAL H @ 4'-0"</text>
      <text x={px(9)} y={py(0)+16} className="callout-text" textAnchor="middle" style={{fill:"var(--accent)"}}>J-CAP SILL · weep + vented tape</text>
      <text x={px(1)} y={py(5.3)-8} className="callout-text" style={{fill:"var(--accent)"}}>✂ TOP ROW CUT 32" · keep 16" offcuts</text>

      <text x={padX + W/2} y={padY + H + 40} className="label-text" textAnchor="middle">NORTH WALL · 18 PANELS (9 FULL + 9 CUT TO 32") · FLUTES VERTICAL</text>
    </svg>
  );
}

function EastGlazing() {
  // Gable: left=north (low 6'-8"), right=south (high 8'-0"). Width = 12 ft.
  const W = 12 * L6_PX, H = 9 * L6_PX;
  const padX = 100, padY = 80;
  const px = ft => padX + ft * L6_PX;
  const py = ft => padY + (9 - ft) * L6_PX;
  const hAt = y => 8 - (y / 12) * 1.333; // y from south (0) to north (12)
  const dx = y => px(12 - y); // left (y=12) = north low, right (y=0) = south high

  // 6 cols × 2 ft wide. Bottom row full 4 ft (y_height 0→4). Top row tapered (4→topPlate).
  const cols = [0, 2, 4, 6, 8, 10]; // y-start of each column from south end
  // Door: centered on x=9 ft (mid-wall), 3 ft wide, 6'-6" tall.
  // Mid-wall in ft from south = 6 ft. Door y-range: 4.5 to 7.5 ft.
  // Door z-range: 0 to 6.5 ft. Door falls in cols starting at y=4 and y=6 (width 2 ft each, centered on y=6 means spans y=5→7, but we use 2-ft-wide grid).
  // Use: door occupies the central column pair y=4..6 and y=6..8? That's 4 ft wide. User spec is 36" (3 ft). Frame uses 2-ft cols; treat door as spanning y=4..7 visually, covering 1.5 cols. Simplify: door in col y=4..6 (2 ft wide representation).
  // Actually door rough is 36" so centered at y=6 means y=4.5 to y=7.5. In a 2-ft grid this removes one full panel (y=4..6 bottom) + partially cuts adjacent (y=6..8 bottom).

  return (
    <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {[0,2,4,6,8,10,12].map(y => (
        <line key={y} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line stud" opacity="0.6" />
      ))}
      <line x1={dx(12)} y1={py(hAt(12))} x2={dx(0)} y2={py(hAt(0))} className="frame-line track" />

      {/* Horizontal H at 4'-0" across the gable */}
      <line x1={dx(12)} y1={py(4)} x2={dx(0)} y2={py(4)} stroke={HSEAM} strokeWidth="1.6" />

      {/* Bottom row — 6 full panels y=0..2, 2..4, 4..6, 6..8, 8..10, 10..12 */}
      {cols.map((y0, i) => {
        const y1 = y0 + 2;
        const left  = Math.min(dx(y0), dx(y1));
        const right = Math.max(dx(y0), dx(y1));
        const w = right - left;
        const isDoorCol = (y0 === 4 || y0 === 6); // door zone
        return (
          <g key={`b-${i}`}>
            <rect x={left} y={py(4)} width={w} height={py(0)-py(4)}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
            <text x={(left+right)/2} y={py(2)+2} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)",fontSize:10}}>EG-B-{String(i+1).padStart(2,"0")}</text>
          </g>
        );
      })}

      {/* Door cutout: y=4.5 to y=7.5, z=0 to 6.5 — crosses horizontal seam */}
      {(() => {
        const l = Math.min(dx(4.5), dx(7.5));
        const r = Math.max(dx(4.5), dx(7.5));
        return (
          <g>
            <rect x={l} y={py(6.5)} width={r-l} height={py(0)-py(6.5)}
              fill="#0b2340" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="4 3" />
            <text x={(l+r)/2} y={py(3)} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent)",fontSize:10}}>DOOR 36×78</text>
            <text x={(l+r)/2} y={py(3)+12} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent)",fontSize:8.5}}>J-cap all 4 sides</text>
          </g>
        );
      })()}

      {/* Top row — tapered panels */}
      {cols.map((y0, i) => {
        const y1 = y0 + 2;
        const left  = Math.min(dx(y0), dx(y1));
        const right = Math.max(dx(y0), dx(y1));
        const yLeft  = left === dx(y1)  ? py(hAt(y1)) : py(hAt(y0));
        const yRight = right === dx(y0) ? py(hAt(y0)) : py(hAt(y1));
        return (
          <g key={`t-${i}`}>
            <polygon points={[[left, yLeft],[right,yRight],[right,py(4)],[left,py(4)]].map(q=>q.join(",")).join(" ")}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" strokeDasharray="3 2" />
            <text x={(left+right)/2} y={((yLeft+yRight)/2 + py(4))/2 + 3} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)",fontSize:9.5}}>EG-T-{String(i+1).padStart(2,"0")} ✂</text>
          </g>
        );
      })}

      {/* Intake 18×18 — east gable low (near sill) at y≈1.5..3 (south-ish third, low) */}
      <rect x={dx(2.25) - L6_PX*0.75} y={py(2.5)} width={L6_PX*1.5} height={py(1) - py(2.5)}
        fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
      <line x1={dx(2.25)} y1={py(1.75)} x2={dx(2.25) - 55} y2={py(1.75) + 28} className="callout-line" style={{stroke:"var(--accent)"}} />
      <text x={dx(2.25) - 60} y={py(1.75) + 34} textAnchor="end" className="callout-text" style={{fill:"var(--accent)"}}>INTAKE 18×18 · J-cap 4 sides</text>

      <text x={padX + W/2} y={padY - 20} className="label-text" textAnchor="middle" opacity="0.7">← NORTH (6'-8")       SOUTH (8'-0") →</text>
      <text x={dx(6)} y={py(4)-6} className="callout-text" textAnchor="middle" style={{fill:HSEAM}}>◆ HORIZONTAL H @ 4'-0"</text>
      <text x={padX + W/2} y={padY + H + 50} className="label-text" textAnchor="middle">EAST GABLE · 12 PANELS (6 FULL + 6 TAPERED) · DOOR + INTAKE CUTOUTS</text>
    </svg>
  );
}

function WestGlazing() {
  const W = 12 * L6_PX, H = 9 * L6_PX;
  const padX = 100, padY = 80;
  const px = ft => padX + ft * L6_PX;
  const py = ft => padY + (9 - ft) * L6_PX;
  const hAt = y => 8 - (y / 12) * 1.333;
  const dx = y => px(y); // left=south (high), right=north (low)
  const cols = [0, 2, 4, 6, 8, 10];

  return (
    <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {[0,2,4,6,8,10,12].map(y => (
        <line key={y} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line stud" opacity="0.6" />
      ))}
      <line x1={dx(0)} y1={py(hAt(0))} x2={dx(12)} y2={py(hAt(12))} className="frame-line track" />

      <line x1={dx(0)} y1={py(4)} x2={dx(12)} y2={py(4)} stroke={HSEAM} strokeWidth="1.6" />

      {/* Bottom row full */}
      {cols.map((y0, i) => {
        const left = dx(y0), right = dx(y0+2);
        return (
          <g key={`b-${i}`}>
            <rect x={left} y={py(4)} width={right-left} height={py(0)-py(4)}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
            <text x={(left+right)/2} y={py(2)+2} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)",fontSize:10}}>WG-B-{String(i+1).padStart(2,"0")}</text>
          </g>
        );
      })}

      {/* Top row tapered */}
      {cols.map((y0, i) => {
        const left = dx(y0), right = dx(y0+2);
        const yLeft = py(hAt(y0)), yRight = py(hAt(y0+2));
        const hasExhaust = (y0 === 8); // WG-T-05 carries exhaust
        return (
          <g key={`t-${i}`}>
            <polygon points={[[left, yLeft],[right,yRight],[right,py(4)],[left,py(4)]].map(q=>q.join(",")).join(" ")}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" strokeDasharray="3 2" />
            {hasExhaust && (
              <rect x={dx(8.25)} y={py(6.3)} width={dx(9.75)-dx(8.25)} height={py(4.8)-py(6.3)}
                fill="#0b2340" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="4 3" />
            )}
            <text x={(left+right)/2} y={((yLeft+yRight)/2 + py(4))/2 + 3} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)",fontSize:9.5}}>WG-T-{String(i+1).padStart(2,"0")} ✂</text>
          </g>
        );
      })}

      <g>
        <line x1={dx(9)} y1={py(5.5)} x2={dx(9) + 50} y2={py(5.5) - 30} className="callout-line" style={{stroke:"var(--accent)"}} />
        <text x={dx(9) + 55} y={py(5.5) - 34} className="callout-text" style={{fill:"var(--accent)"}}>EXHAUST 18×18 · J-cap 4 sides</text>
        <text x={dx(9) + 55} y={py(5.5) - 22} className="callout-text" style={{fill:"var(--accent)"}}>· cuts WG-T-05</text>
      </g>

      <text x={padX + W/2} y={padY - 20} className="label-text" textAnchor="middle" opacity="0.7">← SOUTH (8'-0")       NORTH (6'-8") →</text>
      <text x={dx(6)} y={py(4)-6} className="callout-text" textAnchor="middle" style={{fill:HSEAM}}>◆ HORIZONTAL H @ 4'-0"</text>
      <text x={padX + W/2} y={padY + H + 50} className="label-text" textAnchor="middle">WEST GABLE · 12 PANELS · EXHAUST CUTS WG-T-05</text>
    </svg>
  );
}

function RoofGlazing() {
  // Plan view: 18 ft E–W × 12'-1" slope. 9 cols × 3 rows (eave / mid / ridge).
  const slopeFt = 12;
  const W = 18 * L6_PX, H = slopeFt * L6_PX;
  const padX = 80, padY = 70;
  const px = ft => padX + ft * L6_PX;
  const py = ft => padY + ft * L6_PX; // y=0 at south ridge, y=12 at north eave

  return (
    <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} preserveAspectRatio="xMidYMid meet">
      <rect x={padX} y={padY} width={W} height={H} fill="none" className="frame-line track" />
      {[0,2,4,6,8,10,12,14,16,18].map(x => (
        <line key={x} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(slopeFt)} className="frame-line rafter" opacity="0.6" />
      ))}
      {/* 3 rows: seams at slope=4 and slope=8 (from ridge) */}
      <line x1={px(0)} y1={py(4)} x2={px(18)} y2={py(4)} stroke={HSEAM} strokeWidth="1.6" />
      <line x1={px(0)} y1={py(8)} x2={px(18)} y2={py(8)} stroke={HSEAM} strokeWidth="1.6" />

      {/* Row labels: y=0..4 ridge row, y=4..8 mid row, y=8..12 eave row */}
      {Array.from({length: 9}).map((_, i) => {
        const x0 = i*2, x1 = x0 + 2;
        return (
          <g key={i}>
            <rect x={px(x0)} y={py(0)} width={L6_PX*2} height={py(4)-py(0)}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
            <text x={px(x0) + L6_PX} y={py(2)} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)", fontSize: 10}}>RF-R-{String(i+1).padStart(2,"0")}</text>
            <rect x={px(x0)} y={py(4)} width={L6_PX*2} height={py(8)-py(4)}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
            <text x={px(x0) + L6_PX} y={py(6)} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)", fontSize: 10}}>RF-M-{String(i+1).padStart(2,"0")}</text>
            <rect x={px(x0)} y={py(8)} width={L6_PX*2} height={py(12)-py(8)}
              fill={PANEL_FILL} stroke={PANEL_STROKE} strokeWidth="0.8" />
            <text x={px(x0) + L6_PX} y={py(10)} textAnchor="middle" className="callout-text"
              style={{fill:"var(--accent-2)", fontSize: 10}}>RF-E-{String(i+1).padStart(2,"0")}</text>
          </g>
        );
      })}

      {/* Flute direction arrows on one panel per column (down-slope) */}
      <g opacity="0.55">
        {Array.from({length: 9}).map((_, i) => (
          <g key={`fl-${i}`}>
            <line x1={px(i*2)+L6_PX} y1={py(0.4)} x2={px(i*2)+L6_PX} y2={py(3.6)} stroke="var(--line-soft)" strokeWidth="0.6" />
            <polygon points={`${px(i*2)+L6_PX-3},${py(3.3)} ${px(i*2)+L6_PX+3},${py(3.3)} ${px(i*2)+L6_PX},${py(3.7)}`} fill="var(--line-soft)" />
          </g>
        ))}
        <text x={px(9)} y={py(0.9)+2} textAnchor="middle" className="callout-text" style={{fill:"var(--ink-soft)", fontSize: 8.5}}>↓ flutes down-slope</text>
      </g>

      {/* Vents — on RIDGE ROW (RF-R) — RF-R-03 at col index 2 (x=4..6, center 5), RF-R-07 at col index 6 (x=12..14, center 13).
          Spec: "south ridge at 1/3 and 2/3 of ridge length" — ridge is 18 ft E–W. 1/3 = 6 ft from east → x=12; 2/3 = 12 ft from east → x=6. */}
      {[{ xc: 6, name: "VENT-2", rf: "RF-R-03" }, { xc: 13, name: "VENT-1", rf: "RF-R-07" }].map((v, i) => (
        <g key={i}>
          <rect x={px(v.xc) - 22} y={py(0.8)} width="44" height="44"
            fill="#0b2340" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="4 3" />
          <text x={px(v.xc)} y={py(0.8) + 20} textAnchor="middle" className="callout-text" style={{fill:"var(--accent)", fontSize: 9}}>{v.name}</text>
          <text x={px(v.xc)} y={py(0.8) + 34} textAnchor="middle" className="callout-text" style={{fill:"var(--accent)", fontSize: 8}}>22×22</text>
        </g>
      ))}

      {/* Ridge flashing + eave drip */}
      <rect x={px(0)} y={py(0) - 6} width={W} height="5" fill="var(--accent)" opacity="0.5" />
      <text x={px(9)} y={py(0) - 10} textAnchor="middle" className="callout-text" style={{fill:"var(--accent)"}}>RIDGE FLASHING · 20 lf</text>

      <rect x={px(0)} y={py(slopeFt) + 1} width={W} height="5" fill="var(--accent)" opacity="0.5" />
      <text x={px(9)} y={py(slopeFt) + 22} textAnchor="middle" className="callout-text" style={{fill:"var(--accent)"}}>EAVE DRIP EDGE · 20 lf · weep holes + vented tape</text>

      {/* Horizontal seam callouts */}
      <text x={px(18) + 8} y={py(4)+3} className="callout-text" style={{fill:HSEAM, fontSize:9}}>◆ H-SEAM #1 · on mid-purlin</text>
      <text x={px(18) + 8} y={py(8)+3} className="callout-text" style={{fill:HSEAM, fontSize:9}}>◆ H-SEAM #2 · NEW blocker req'd</text>

      <g transform={`translate(${padX + 30}, ${padY + 30})`}>
        <circle r="14" fill="#0b2340" stroke="var(--line-soft)" />
        <polygon points="0,-12 -3,-4 0,-6 3,-4" fill="var(--accent)" />
        <text y="-18" className="label-text" textAnchor="middle" fontSize="9">N</text>
      </g>

      <text x={padX + W/2} y={padY - 20} textAnchor="middle" className="label-text" opacity="0.7">SOUTH (RIDGE HIGH) · INSTALL DIRECTION: EAVE ↑ RIDGE</text>
      <text x={padX + W/2} y={padY + H + 45} textAnchor="middle" className="label-text" opacity="0.7">NORTH (EAVE LOW)</text>
      <text x={padX + W/2} y={padY + H + 75} textAnchor="middle" className="label-text">ROOF · 27 PANELS (3 ROWS × 9) · 2 VENT CUTOUTS IN RIDGE ROW</text>
    </svg>
  );
}

function L6Overview() {
  return (
    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>Glazing Assembly · Iso</div>
        <div style={{ flex: 1, width: "100%" }}>
          <IsoView
            show={{
              sills: true, southStuds: true, northStuds: true, gableStuds: true, door: true,
              topPlates: true, beams: true, rafters: true, purlin: true, fans: true,
              wallPurlins: true, xBrace: false, panelGrid: true, tempBrace: false,
            }}
            onHoverStud={null}
          />
        </div>
      </div>
      <div style={{ fontSize: 10.5, lineHeight: 1.6, color: "var(--line)", padding: "8px 12px", fontFamily: "var(--mono)", overflow: "auto" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10, borderBottom: "1px solid var(--line-soft)", paddingBottom: 6 }}>
          Layer 6 · DGSL 4mm Glazing
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 14px", marginBottom: 12 }}>
          <span style={{color:"var(--ink-soft)"}}>PRODUCT</span><b>DGSL 4mm TW-PC · 2' × 4'</b>
          <span style={{color:"var(--ink-soft)"}}>ORDER</span><b>7 × 14-pk = 98 panels</b>
          <span style={{color:"var(--ink-soft)"}}>S WALL</span><span>18 (2 rows × 9)</span>
          <span style={{color:"var(--ink-soft)"}}>N WALL</span><span>18 (9 full + 9 cut 32")</span>
          <span style={{color:"var(--ink-soft)"}}>E GABLE</span><span>12 · door + intake</span>
          <span style={{color:"var(--ink-soft)"}}>W GABLE</span><span>12 · exhaust</span>
          <span style={{color:"var(--ink-soft)"}}>ROOF</span><span>27 (3 rows × 9) · 2 vents</span>
          <span style={{color:"var(--ink-soft)"}}>FASTENER</span><span>8" V · 12" H OC</span>
          <span style={{color:"var(--ink-soft)"}}>EST. COST</span><b style={{color:"var(--accent)"}}>$6,280 – 8,460</b>
        </div>
        <div style={{ border: "1px solid var(--warn)", padding: 10, marginBottom: 8 }}>
          <div style={{ color: "var(--warn)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>⚠ Verify Before Ordering Trim</div>
          All H/J channels must be explicitly rated <b>4mm / 0.16"</b>. 6mm or 8mm profile will NOT grip — panels fall out.
        </div>
        <div style={{ border: "1px solid var(--accent)", padding: 10, marginBottom: 8 }}>
          <div style={{ color: "var(--accent)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>⚠ UV Orientation</div>
          DGSL lists 99.5% UV block but side not marked on listing. <b>Confirm with seller in writing</b> before install. UV side OUT.
        </div>
        <div style={{ border: "1px dashed var(--accent-2)", padding: 10, marginBottom: 8 }}>
          <div style={{ color: "var(--accent-2)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>◆ New: Horizontal Seams</div>
          Every wall has 1 H-seam @ 4'-0", roof has 2 H-seams. Needs horizontal blocking between studs + continuous butyl — #1 leak path.
        </div>
        <div style={{ border: "1px dashed var(--line-soft)", padding: 10 }}>
          <div style={{ color: "var(--ink-soft)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>Flute Direction</div>
          Flutes along 4 ft long side. Walls: vertical. Roof: down-slope (4 ft length N–S). Never rotate on roof — traps water.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SouthGlazing, NorthGlazing, EastGlazing, WestGlazing, RoofGlazing, L6Overview });
