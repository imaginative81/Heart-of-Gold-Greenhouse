// Elevations.jsx — plan view + 4 elevation views in blueprint style
const { useMemo: _useMemoE } = React;

const PX_PER_FT = 36;  // scale for elevation views

function Plan({ show }) {
  // Top-down view, 18 ft (E-W) × 12 ft (N-S)
  const W = 18 * PX_PER_FT, H = 12 * PX_PER_FT;
  const padX = 80, padY = 80;
  const vbW = W + padX * 2, vbH = H + padY * 2;

  const xMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
  const yMarks = [0, 2, 4, 6, 8, 10, 12];

  const px = ft => padX + ft * PX_PER_FT;
  const py = ft => padY + ft * PX_PER_FT;

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
      {/* Platform outline */}
      <rect x={padX} y={padY} width={W} height={H} fill="none" className="frame-line track" />

      {/* Sills (inside offset) */}
      {show.sills && (
        <rect x={padX + 3} y={padY + 3} width={W - 6} height={H - 6} fill="none" className="frame-line" strokeDasharray="3 2" />
      )}

      {/* Stud dots (long walls) */}
      {show.southStuds && xMarks.map(x => (
        <rect key={`s-${x}`} x={px(x) - 3} y={py(0) - 3} width="6" height="6" className="frame-line stud" fill="var(--line)" />
      ))}
      {show.northStuds && xMarks.map(x => (
        <rect key={`n-${x}`} x={px(x) - 3} y={py(12) - 3} width="6" height="6" className="frame-line stud" fill="var(--line)" />
      ))}
      {/* Gable studs */}
      {show.gableStuds && yMarks.map(y => (
        <g key={`eg-${y}`}>
          <rect x={px(18) - 3} y={py(y) - 3} width="6" height="6" className="frame-line stud" fill="var(--line)" />
          <rect x={px(0) - 3}  y={py(y) - 3} width="6" height="6" className="frame-line stud" fill="var(--line)" />
        </g>
      ))}
      {/* Door on east gable */}
      {show.door && (
        <g>
          <rect x={px(18) - 5} y={py(4.5)} width="10" height={PX_PER_FT * 3} className="door-fill" />
          <path d={`M ${px(18) - 5},${py(4.5)} Q ${px(18) - 5 - 60},${py(4.5)} ${px(18) - 5 - 60},${py(4.5) + 60}`}
            fill="none" stroke="var(--accent-2)" strokeWidth="0.6" strokeDasharray="3 3" />
          <text x={px(18) - 65} y={py(6) + 4} className="callout-text" textAnchor="end">36" DOOR</text>
        </g>
      )}

      {/* Rafters (overhead lines) */}
      {show.rafters && xMarks.map(x => (
        <line key={`r-${x}`} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(12)} className="frame-line rafter" opacity="0.6" />
      ))}

      {/* Mid-purlin (at y=6) */}
      {show.purlin && (
        <line x1={px(0)} y1={py(6)} x2={px(18)} y2={py(6)} className="frame-line purlin" />
      )}

      {/* Fans */}
      {show.fans && (
        <>
          {/* Exhaust on west gable at y=9..10.5 */}
          <rect x={px(0) - 10} y={py(9)} width="20" height={PX_PER_FT * 1.5} className="opening-fill" />
          <text x={px(0) - 15} y={py(9.75) + 4} className="callout-text" textAnchor="end">EXHAUST</text>
          {/* Intake on east gable at y=5.25..6.75 — conflicts with door; move to east gable high opposite exhaust */}
          {/* Using the alternate: east gable low centered — but door is at y=4.5–7.5. So place intake at y=1.5..3 (low east gable) */}
          <rect x={px(18) - 10} y={py(1.5)} width="20" height={PX_PER_FT * 1.5} className="opening-fill" />
          <text x={px(18) + 18} y={py(2.25) + 4} className="callout-text">INTAKE</text>
        </>
      )}

      {/* Airflow arrow */}
      {show.fans && (
        <g>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--accent-2)" />
            </marker>
          </defs>
          <line x1={px(17)} y1={py(2.5)} x2={px(2)} y2={py(9.5)}
            stroke="var(--accent-2)" strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arrow)" opacity="0.7" />
          <text x={(px(17) + px(2)) / 2} y={(py(2.5) + py(9.5)) / 2 - 8} className="callout-text" textAnchor="middle">CROSS-FLOW</text>
        </g>
      )}

      {/* Dimensions */}
      <g>
        <line x1={px(0)} y1={py(12) + 40} x2={px(18)} y2={py(12) + 40} className="dim-line" />
        <line x1={px(0)} y1={py(12) + 35} x2={px(0)} y2={py(12) + 45} className="dim-line" />
        <line x1={px(18)} y1={py(12) + 35} x2={px(18)} y2={py(12) + 45} className="dim-line" />
        <text x={(px(0) + px(18)) / 2} y={py(12) + 34} className="dim-text">18'-0" · 10 studs @ 2'-0" OC</text>

        <line x1={px(18) + 40} y1={py(0)} x2={px(18) + 40} y2={py(12)} className="dim-line" />
        <line x1={px(18) + 35} y1={py(0)} x2={px(18) + 45} y2={py(0)} className="dim-line" />
        <line x1={px(18) + 35} y1={py(12)} x2={px(18) + 45} y2={py(12)} className="dim-line" />
        <text x={px(18) + 55} y={(py(0) + py(12)) / 2 + 4} className="dim-text" transform={`rotate(90 ${px(18) + 55} ${(py(0) + py(12)) / 2 + 4})`}>12'-0"</text>
      </g>

      {/* Cardinal compass in plan */}
      <g transform={`translate(${padX + 30}, ${padY + 30})`}>
        <circle r="16" fill="none" stroke="var(--line-soft)" />
        <line x1="0" y1="10" x2="0" y2="-14" stroke="var(--accent)" strokeWidth="1.5" />
        <polygon points="0,-16 -3,-10 3,-10" fill="var(--accent)" />
        <text y="-20" className="label-text" textAnchor="middle" fontSize="9">N</text>
      </g>

      {/* Labels */}
      <text x={padX + W / 2} y={padY - 18} className="label-text" textAnchor="middle" opacity="0.7">NORTH WALL · 6'-8"</text>
      <text x={padX + W / 2} y={padY + H + 70} className="label-text" textAnchor="middle" opacity="0.7">SOUTH WALL · 8'-0"</text>
    </svg>
  );
}

function SouthElev({ show }) {
  // Elevation view looking NORTH at south wall (high wall, 18 ft × 8 ft)
  const W = 18 * PX_PER_FT, H = 9 * PX_PER_FT;
  const padX = 70, padY = 70;
  const vbW = W + padX * 2, vbH = H + padY * 2;
  const px = ft => padX + ft * PX_PER_FT;
  const py = ft => padY + (9 - ft) * PX_PER_FT;  // flip so z=0 at bottom
  const xMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
      {/* Ground */}
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />

      {/* Sill */}
      {show.sills && <line x1={px(0)} y1={py(0)} x2={px(18)} y2={py(0)} className="frame-line track" />}

      {/* Top plate */}
      {show.topPlates && <line x1={px(0)} y1={py(8)} x2={px(18)} y2={py(8)} className="frame-line track" />}

      {/* Beam (ridge, on top of top plate) */}
      {show.beams && <line x1={px(0)} y1={py(8) - 5} x2={px(18)} y2={py(8) - 5} className="frame-line beam" />}

      {/* Studs */}
      {show.southStuds && xMarks.map(x => (
        <line key={`s-${x}`} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(8)} className="frame-line stud" />
      ))}

      {/* Horizontal mid purlin */}
      {show.wallPurlins && <line x1={px(0)} y1={py(4)} x2={px(18)} y2={py(4)} className="frame-line purlin" />}

      {/* X-brace corner bays */}
      {show.xBrace && (
        <>
          <line x1={px(0)} y1={py(0)} x2={px(2)} y2={py(8)} className="frame-line brace" />
          <line x1={px(2)} y1={py(0)} x2={px(0)} y2={py(8)} className="frame-line brace" />
          <line x1={px(16)} y1={py(0)} x2={px(18)} y2={py(8)} className="frame-line brace" />
          <line x1={px(18)} y1={py(0)} x2={px(16)} y2={py(8)} className="frame-line brace" />
        </>
      )}

      {/* Panel seam grid */}
      {show.panelGrid && xMarks.map(x => (
        <line key={`ps-${x}`} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(8)} className="frame-line panel-seam" />
      ))}

      {/* Stud callouts */}
      {xMarks.map(x => (
        <text key={`lbl-${x}`} x={px(x)} y={py(0) + 14} className="callout-text" textAnchor="middle" opacity="0.7">{x}'</text>
      ))}

      {/* Dimensions */}
      <g>
        <line x1={px(0) - 30} y1={py(0)} x2={px(0) - 30} y2={py(8)} className="dim-line" />
        <line x1={px(0) - 35} y1={py(0)} x2={px(0) - 25} y2={py(0)} className="dim-line" />
        <line x1={px(0) - 35} y1={py(8)} x2={px(0) - 25} y2={py(8)} className="dim-line" />
        <text x={px(0) - 38} y={(py(0) + py(8)) / 2} className="dim-text" textAnchor="end">8'-0"</text>

        <line x1={px(0)} y1={py(0) + 40} x2={px(18)} y2={py(0) + 40} className="dim-line" />
        <text x={(px(0) + px(18)) / 2} y={py(0) + 34} className="dim-text">18'-0" · 10 studs @ 2'-0" OC (2'-0" typical)</text>
      </g>

      <text x={padX + W / 2} y={padY + H + 60} className="label-text" textAnchor="middle">SOUTH ELEVATION · LOOKING NORTH</text>
    </svg>
  );
}

function NorthElev({ show }) {
  const W = 18 * PX_PER_FT, H = 8 * PX_PER_FT;
  const padX = 70, padY = 70;
  const vbW = W + padX * 2, vbH = H + padY * 2;
  const px = ft => padX + ft * PX_PER_FT;
  const py = ft => padY + (8 - ft) * PX_PER_FT;
  const xMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
  const NH = 6.667;

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {show.sills && <line x1={px(0)} y1={py(0)} x2={px(18)} y2={py(0)} className="frame-line track" />}
      {show.topPlates && <line x1={px(0)} y1={py(NH)} x2={px(18)} y2={py(NH)} className="frame-line track" />}
      {show.beams && <line x1={px(0)} y1={py(NH) - 5} x2={px(18)} y2={py(NH) - 5} className="frame-line beam" />}
      {show.northStuds && xMarks.map(x => (
        <line key={x} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(NH)} className="frame-line stud" />
      ))}
      {show.wallPurlins && <line x1={px(0)} y1={py(3.33)} x2={px(18)} y2={py(3.33)} className="frame-line purlin" />}
      {show.xBrace && (
        <>
          <line x1={px(0)} y1={py(0)} x2={px(2)} y2={py(NH)} className="frame-line brace" />
          <line x1={px(2)} y1={py(0)} x2={px(0)} y2={py(NH)} className="frame-line brace" />
          <line x1={px(16)} y1={py(0)} x2={px(18)} y2={py(NH)} className="frame-line brace" />
          <line x1={px(18)} y1={py(0)} x2={px(16)} y2={py(NH)} className="frame-line brace" />
        </>
      )}
      {show.panelGrid && xMarks.map(x => (
        <line key={`ps-${x}`} x1={px(x)} y1={py(0)} x2={px(x)} y2={py(NH)} className="frame-line panel-seam" />
      ))}
      {xMarks.map(x => (
        <text key={`lbl-${x}`} x={px(x)} y={py(0) + 14} className="callout-text" textAnchor="middle" opacity="0.7">{x}'</text>
      ))}
      <line x1={px(0) - 30} y1={py(0)} x2={px(0) - 30} y2={py(NH)} className="dim-line" />
      <text x={px(0) - 38} y={(py(0) + py(NH)) / 2} className="dim-text" textAnchor="end">6'-8"</text>
      <text x={padX + W / 2} y={padY + H + 50} className="label-text" textAnchor="middle">NORTH ELEVATION · LOOKING SOUTH</text>
    </svg>
  );
}

function EastElev({ show }) {
  // East gable, looking WEST — with door and slope
  const W = 12 * PX_PER_FT, H = 9 * PX_PER_FT;
  const padX = 90, padY = 80;
  const vbW = W + padX * 2, vbH = H + padY * 2;
  const px = ft => padX + ft * PX_PER_FT;
  const py = ft => padY + (9 - ft) * PX_PER_FT;
  const yMarks = [0, 2, 4, 6, 8, 10, 12];
  const hAt = y => 8 - (y / 12) * 1.333;  // but the gable shown: looking WEST, north (y=12) is on LEFT, south (y=0) on RIGHT — so in drawing, we'll render with south on right
  // Plot by ft from north (left). Let leftFt = y (north->south).
  // Actually for east gable seen from outside (looking west), SOUTH is to observer's LEFT... ugh. Let's just pick a convention: left = north (y=12, low), right = south (y=0, high).
  // So in drawing x axis, drawing_x = 12 - y (so y=12 -> drawing_x=0, y=0 -> drawing_x=12).
  const dx = y => px(12 - y);

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {show.sills && <line x1={dx(0)} y1={py(0)} x2={dx(12)} y2={py(0)} className="frame-line track" />}

      {/* Sloped top plate from y=12 (low, left) to y=0 (high, right) */}
      {show.topPlates && <line x1={dx(12)} y1={py(hAt(12))} x2={dx(0)} y2={py(hAt(0))} className="frame-line track" />}

      {/* Gable studs with door opening */}
      {show.gableStuds && yMarks.map(y => {
        if (y === 6) return null; // door center replaced
        return <line key={y} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line stud" />;
      })}

      {/* Door king studs at y=4.5 and 7.5 */}
      {show.door && (
        <>
          <line x1={dx(4.5)} y1={py(0)} x2={dx(4.5)} y2={py(hAt(4.5))} className="frame-line stud" />
          <line x1={dx(7.5)} y1={py(0)} x2={dx(7.5)} y2={py(hAt(7.5))} className="frame-line stud" />
          {/* Jacks inside */}
          <line x1={dx(4.5) + 4} y1={py(0)} x2={dx(4.5) + 4} y2={py(6.5)} className="frame-line stud" strokeWidth="1" />
          <line x1={dx(7.5) - 4} y1={py(0)} x2={dx(7.5) - 4} y2={py(6.5)} className="frame-line stud" strokeWidth="1" />
          {/* Header */}
          <line x1={dx(7.5) - 4} y1={py(6.5)} x2={dx(4.5) + 4} y2={py(6.5)} className="frame-line beam" />
          {/* Door fill */}
          <rect x={Math.min(dx(4.5), dx(7.5)) + 4} y={py(6.5)}
            width={Math.abs(dx(7.5) - dx(4.5)) - 8} height={py(0) - py(6.5)}
            className="door-fill" />
          <text x={(dx(4.5) + dx(7.5)) / 2} y={py(4.5)} className="callout-text" textAnchor="middle" style={{fill: "var(--accent-2)"}}>DOOR</text>
          <text x={(dx(4.5) + dx(7.5)) / 2} y={py(3.5)} className="callout-text" textAnchor="middle" style={{fill: "var(--accent-2)"}}>36" × 78"</text>
        </>
      )}

      {/* Intake fan low, centered at y=2.25 (alt position — low east gable) */}
      {show.fans && (
        <>
          <rect x={dx(3) - 4} y={py(2.5)} width={Math.abs(dx(3) - dx(1.5))} height={py(1) - py(2.5)} className="opening-fill" />
          <line x1={dx(2.25)} y1={py(1.75)} x2={dx(2.25) - 28} y2={py(1.75) + 18} className="callout-line" style={{stroke: "var(--accent)"}} />
          <text x={dx(2.25) - 32} y={py(1.75) + 24} className="callout-text" textAnchor="end" style={{fill: "var(--accent)"}}>INTAKE 18×18</text>
        </>
      )}

      {/* Panel grid */}
      {show.panelGrid && yMarks.map(y => (
        <line key={`ps-${y}`} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line panel-seam" />
      ))}

      {/* Stud callouts — distance from north */}
      {yMarks.map(y => (
        <text key={`lbl-${y}`} x={dx(y)} y={py(0) + 14} className="callout-text" textAnchor="middle" opacity="0.7">{y}'</text>
      ))}

      {/* Height dim on LEFT (north side = 6'8") */}
      <line x1={dx(12) - 30} y1={py(0)} x2={dx(12) - 30} y2={py(hAt(12))} className="dim-line" />
      <text x={dx(12) - 38} y={(py(0) + py(hAt(12))) / 2} className="dim-text" textAnchor="end">6'-8"</text>
      {/* Height dim on RIGHT (south = 8'0") */}
      <line x1={dx(0) + 30} y1={py(0)} x2={dx(0) + 30} y2={py(hAt(0))} className="dim-line" />
      <text x={dx(0) + 38} y={(py(0) + py(hAt(0))) / 2} className="dim-text" textAnchor="start">8'-0"</text>

      {/* Pitch annotation */}
      <text x={(dx(6) + dx(0)) / 2} y={py(hAt(3)) - 14} className="callout-text" textAnchor="middle">4:12 PITCH →</text>

      <text x={padX + W / 2} y={padY + H + 50} className="label-text" textAnchor="middle">EAST GABLE · LOOKING WEST · DOOR</text>
    </svg>
  );
}

function WestElev({ show }) {
  // West gable with exhaust fan. Looking EAST. South to LEFT, North to RIGHT.
  const W = 12 * PX_PER_FT, H = 9 * PX_PER_FT;
  const padX = 90, padY = 80;
  const vbW = W + padX * 2, vbH = H + padY * 2;
  const px = ft => padX + ft * PX_PER_FT;
  const py = ft => padY + (9 - ft) * PX_PER_FT;
  const yMarks = [0, 2, 4, 6, 8, 10, 12];
  const hAt = y => 8 - (y / 12) * 1.333;
  const dx = y => px(y); // left=south (y=0), right=north (y=12)

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet">
      <line x1={padX - 20} y1={py(0)} x2={padX + W + 20} y2={py(0)} className="frame-line track" />
      {show.sills && <line x1={dx(0)} y1={py(0)} x2={dx(12)} y2={py(0)} className="frame-line track" />}
      {show.topPlates && <line x1={dx(0)} y1={py(hAt(0))} x2={dx(12)} y2={py(hAt(12))} className="frame-line track" />}
      {show.gableStuds && yMarks.map(y => (
        <line key={y} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line stud" />
      ))}

      {/* Exhaust fan high on west gable near peak (y=0..2 at height 6.3..7.8) */}
      {show.fans && (
        <>
          <rect x={dx(0.5)} y={py(7.8)} width={dx(2) - dx(0.5)} height={py(6.3) - py(7.8)} className="opening-fill" />
          <text x={(dx(0.5) + dx(2)) / 2} y={py(6.0)} className="callout-text" textAnchor="middle">EXHAUST 18×18</text>
        </>
      )}

      {show.panelGrid && yMarks.map(y => (
        <line key={`ps-${y}`} x1={dx(y)} y1={py(0)} x2={dx(y)} y2={py(hAt(y))} className="frame-line panel-seam" />
      ))}

      {yMarks.map(y => (
        <text key={`lbl-${y}`} x={dx(y)} y={py(0) + 14} className="callout-text" textAnchor="middle" opacity="0.7">{y}'</text>
      ))}

      <line x1={dx(0) - 30} y1={py(0)} x2={dx(0) - 30} y2={py(hAt(0))} className="dim-line" />
      <text x={dx(0) - 38} y={(py(0) + py(hAt(0))) / 2} className="dim-text" textAnchor="end">8'-0"</text>
      <line x1={dx(12) + 30} y1={py(0)} x2={dx(12) + 30} y2={py(hAt(12))} className="dim-line" />
      <text x={dx(12) + 38} y={(py(0) + py(hAt(12))) / 2} className="dim-text" textAnchor="start">6'-8"</text>

      <text x={(dx(6) + dx(12)) / 2} y={py(hAt(9)) - 14} className="callout-text" textAnchor="middle">← 4:12 PITCH</text>
      <text x={padX + W / 2} y={padY + H + 50} className="label-text" textAnchor="middle">WEST GABLE · LOOKING EAST · EXHAUST</text>
    </svg>
  );
}

Object.assign(window, { Plan, SouthElev, NorthElev, EastElev, WestElev });
