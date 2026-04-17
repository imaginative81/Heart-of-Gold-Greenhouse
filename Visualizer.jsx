// Visualizer.jsx — the blueprint drawing
// Renders the frame in isometric or elevation views, with layer toggles and hover probing.

const { useState, useMemo, useRef, useEffect } = React;

// ---------- ISOMETRIC HELPERS ----------
// 3D coords: x = east-west length (0..18 ft), y = north-south width (0..12 ft), z = up (0..8 ft)
// Iso projection: classic 30° axonometric.
const ISO_ANGLE = 30 * Math.PI / 180;
const COS = Math.cos(ISO_ANGLE);
const SIN = Math.sin(ISO_ANGLE);
const ISO_SCALE = 16; // px per ft

function iso(x, y, z) {
  // x along east (right-down), y along north (left-down), z up
  const px = (x - y) * COS * ISO_SCALE;
  const py = ((x + y) * SIN - z) * ISO_SCALE;
  return [px, py];
}

function IsoLine({ a, b, className = "frame-line stud", ...rest }) {
  const [x1, y1] = iso(...a);
  const [x2, y2] = iso(...b);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={className} {...rest} />;
}

// ---------- ISO VIEW ----------
function IsoView({ show, activeStep, onHoverStud }) {
  // Long-wall stud positions (0..18 ft @ 2 ft OC)
  const xMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
  // Gable intermediate marks (0..12 ft @ 2 ft OC)
  const yMarks = [0, 2, 4, 6, 8, 10, 12];

  // Heights on 4:12 pitch at a given y (ft from north)
  const heightAt = y => 6 + 8/12 + (y * 16/12) / 12; // 6'8" + 1.333"/ft * y ... wait: 16 in / 12 ft = 1.333 in/ft? no, 16in rise over 12ft = (16/12 in/ft) = 1.333 in/ft. in feet: 1.333/12 = 0.1111 ft/ft.
  // Clean: rise over 12 ft = 16 in = 1.333 ft. So height = 6.667 + (y/12) * 1.333.
  const H = y => 6.667 + (y / 12) * 1.333;

  // Door on east gable at x=18, centered at y=6. Door 3 ft wide, 6.5 ft tall.
  const door = { x: 18, y0: 4.5, y1: 7.5, zTop: 6.5 };

  // Fans
  const exhaust = { x: 0, y: 6, z0: H(6) - 1.5 - 0.5, z1: H(6) - 0.5 }; // west gable, just below peak (peak H(0)? actually peak is at y=12). west gable shape mirrors east.
  // Re-think: peak of gable is at south (y=12) where wall is tallest. So "below peak" means high on gable near south side.
  // Let's position exhaust high near peak: at west gable (x=0), centered-ish at y=10, z from ~6.5 to ~8.
  const exhaustRO = { x: 0, y0: 9, y1: 10.5, z0: 6.3, z1: 7.8 };
  // Intake low on east gable, just above sill, centered on gable horizontally around y=6
  const intakeRO = { x: 18, y0: 5.25, y1: 6.75, z0: 1, z1: 2.5 };

  const studs = [];
  const labels = [];

  // Platform base (faint)
  const base = [
    [[0,0,0],[18,0,0]], [[18,0,0],[18,12,0]], [[18,12,0],[0,12,0]], [[0,12,0],[0,0,0]]
  ];

  // SILLS (tracks at platform level) — drawn as thicker lines
  const sills = base;

  // SOUTH (y=0) wall studs
  const southStuds = xMarks.map(x => ({ a: [x, 0, 0], b: [x, 0, 8], x }));

  // NORTH (y=12) wall studs
  const northStuds = xMarks.map(x => ({ a: [x, 12, 0], b: [x, 12, H(12)], x })); // H(12) = 8? peak at y=12
  // Wait: 4:12 pitch over 12 ft = 16in rise, so the HIGH side is 8 ft tall. Per spec, south is 8 ft (high), north is 6'8" (low). So height is MAX at y=0 (south), MIN at y=12 (north). Let me redefine:
  // H(y) = 8 - (y/12) * 1.333  so H(0)=8, H(12)=6.667. yes.
  const heightFn = y => 8 - (y / 12) * 1.333;

  // Redo all stud heights with heightFn
  const southStudsFixed = xMarks.map(x => ({ a: [x, 0, 0], b: [x, 0, heightFn(0)], x })); // 8 ft
  const northStudsFixed = xMarks.map(x => ({ a: [x, 12, 0], b: [x, 12, heightFn(12)], x })); // 6.667 ft

  // EAST gable (x=18) — door cutout
  const eastGable = [];
  yMarks.forEach(y => {
    const h = heightFn(y);
    // Skip if this stud is inside door frame (replaced by king studs at 4.5 and 7.5)
    if (y === 6) {
      // door center — king studs instead
      eastGable.push({ a: [18, 4.5, 0], b: [18, 4.5, heightFn(4.5)], kind: "king" });
      eastGable.push({ a: [18, 7.5, 0], b: [18, 7.5, heightFn(7.5)], kind: "king" });
      // header at top of door (z=6.5), from y=4.5 to 7.5
      eastGable.push({ a: [18, 4.5, 6.5], b: [18, 7.5, 6.5], kind: "header" });
      return; // skip the middle stud
    }
    if (y === 0 || y === 12) return; // corners shared with long walls
    eastGable.push({ a: [18, y, 0], b: [18, y, h], kind: "gable" });
  });

  // WEST gable (x=0)
  const westGable = [];
  yMarks.forEach(y => {
    if (y === 0 || y === 12) return;
    const h = heightFn(y);
    westGable.push({ a: [0, y, 0], b: [0, y, h], kind: "gable" });
  });

  // TOP PLATES
  // South top plate: along y=0, at z=heightFn(0)=8
  const topSouth = { a: [0, 0, 8], b: [18, 0, 8] };
  const topNorth = { a: [0, 12, heightFn(12)], b: [18, 12, heightFn(12)] };
  // Gable sloped top plates
  const topEast = { a: [18, 0, heightFn(0)], b: [18, 12, heightFn(12)] };
  const topWest = { a: [0, 0, heightFn(0)],  b: [0, 12, heightFn(12)] };

  // BEAMS: ridge (south-high edge) and eave (north-low edge) — same as top plates really, but called out as continuous beams sitting on top
  // RAFTERS at xMarks, sloping from south-top to north-top
  const rafters = xMarks.map(x => ({ a: [x, 0, 8], b: [x, 12, heightFn(12)] }));

  // MID-ROOF PURLIN: along the slope at 6 ft from south, i.e. y=6
  const midPurlin = { a: [0, 6, heightFn(6)], b: [18, 6, heightFn(6)] };

  // HORIZONTAL WALL PURLINS
  const hPurlins = [
    { a: [0, 0, 4], b: [18, 0, 4] },             // south wall at ~4 ft
    { a: [0, 12, 3.33], b: [18, 12, 3.33] },     // north wall at ~3'4"
    { a: [18, 0, 4], b: [18, 12, 3.33] },        // east gable mid
    { a: [0, 0, 4], b: [0, 12, 3.33] },          // west gable mid
  ];

  // X-BRACING on long walls (corner bays 0-2 and 16-18 on each)
  const xBraces = [
    // south wall east bay X
    { a: [16, 0, 0], b: [18, 0, 8] }, { a: [18, 0, 0], b: [16, 0, 8] },
    { a: [0, 0, 0],  b: [2, 0, 8] },  { a: [2, 0, 0],  b: [0, 0, 8] },
    // north wall
    { a: [16, 12, 0], b: [18, 12, heightFn(12)] }, { a: [18, 12, 0], b: [16, 12, heightFn(12)] },
    { a: [0, 12, 0],  b: [2, 12, heightFn(12)] },  { a: [2, 12, 0],  b: [0, 12, heightFn(12)] },
    // gables X
    { a: [18, 2, 0], b: [18, 10, heightFn(10)] }, { a: [18, 10, 0], b: [18, 2, heightFn(2)] },
    { a: [0, 2, 0],  b: [0, 10, heightFn(10)] },  { a: [0, 10, 0], b: [0, 2, heightFn(2)] },
  ];

  // TEMPORARY BRACE (diagonal on each wall)
  const tempBraces = [
    { a: [0, 0, 0], b: [18, 0, 8] },
    { a: [0, 12, 0], b: [18, 12, heightFn(12)] },
    { a: [18, 0, 0], b: [18, 12, heightFn(12)] },
    { a: [0, 0, 0], b: [0, 12, heightFn(12)] },
  ];

  // Viewport: compute bounds
  const bounds = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let x = 0; x <= 18; x += 2) for (let y = 0; y <= 12; y += 2) for (let z of [0, heightFn(y)]) {
      const [px, py] = iso(x, y, z);
      minX = Math.min(minX, px); maxX = Math.max(maxX, px);
      minY = Math.min(minY, py); maxY = Math.max(maxY, py);
    }
    const pad = 60;
    return { minX: minX - pad, minY: minY - pad, w: (maxX - minX) + pad * 2, h: (maxY - minY) + pad * 2 };
  }, []);

  const handleHover = (e, info) => {
    if (!onHoverStud) return;
    onHoverStud({ ...info, x: e.clientX, y: e.clientY });
  };
  const handleLeave = () => onHoverStud && onHoverStud(null);

  // Panel seam grid (decorative overlay showing 2ft grid on skin)
  const panelGridLines = [];
  if (show.panelGrid) {
    // vertical seams on south wall
    xMarks.forEach(x => panelGridLines.push({ a: [x, 0, 0], b: [x, 0, 8], className: "frame-line panel-seam" }));
    xMarks.forEach(x => panelGridLines.push({ a: [x, 12, 0], b: [x, 12, heightFn(12)], className: "frame-line panel-seam" }));
    yMarks.forEach(y => panelGridLines.push({ a: [18, y, 0], b: [18, y, heightFn(y)], className: "frame-line panel-seam" }));
    yMarks.forEach(y => panelGridLines.push({ a: [0, y, 0], b: [0, y, heightFn(y)], className: "frame-line panel-seam" }));
  }

  return (
    <svg viewBox={`${bounds.minX} ${bounds.minY} ${bounds.w} ${bounds.h}`} preserveAspectRatio="xMidYMid meet">
      {/* Ground shadow plane (faint hatch) */}
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(232,226,204,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      {(() => {
        const corners = [[0,0,0],[18,0,0],[18,12,0],[0,12,0]].map(p => iso(...p).join(",")).join(" ");
        return <polygon points={corners} fill="url(#hatch)" stroke="rgba(232,226,204,0.2)" strokeWidth="0.8" strokeDasharray="2 3" />;
      })()}

      {/* Platform label */}
      {(() => {
        const [px, py] = iso(9, 6, 0);
        return <text x={px} y={py + 14} className="label-text" textAnchor="middle" opacity="0.5">PLATFORM 18 × 12</text>;
      })()}

      {/* SILLS (always show if flag) */}
      {show.sills && sills.map((s, i) => (
        <IsoLine key={`sill-${i}`} a={s[0]} b={s[1]} className="frame-line track" />
      ))}

      {/* SOUTH STUDS */}
      {show.southStuds && southStudsFixed.map((s, i) => {
        const [x1, y1] = iso(...s.a);
        const [x2, y2] = iso(...s.b);
        return (
          <line key={`ss-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            className="frame-line stud stud-hover"
            onMouseMove={e => handleHover(e, { type: "South wall stud", pos: `x = ${s.x} ft`, len: "8'0\"" })}
            onMouseLeave={handleLeave}
          />
        );
      })}

      {/* NORTH STUDS */}
      {show.northStuds && northStudsFixed.map((s, i) => {
        const [x1, y1] = iso(...s.a);
        const [x2, y2] = iso(...s.b);
        return (
          <line key={`ns-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            className="frame-line stud stud-hover"
            onMouseMove={e => handleHover(e, { type: "North wall stud", pos: `x = ${s.x} ft`, len: "6'8\"" })}
            onMouseLeave={handleLeave}
          />
        );
      })}

      {/* GABLE STUDS */}
      {show.gableStuds && [...eastGable, ...westGable].map((s, i) => {
        const [x1, y1] = iso(...s.a);
        const [x2, y2] = iso(...s.b);
        const ftInch = v => {
          const f = Math.floor(v); const inch = Math.round((v - f) * 12);
          return `${f}'${inch}"`;
        };
        const dy = s.b[2] - s.a[2];
        return (
          <line key={`g-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            className={`frame-line stud stud-hover ${s.kind === "king" ? "" : ""}`}
            strokeDasharray={s.kind === "header" ? "3 2" : ""}
            onMouseMove={e => handleHover(e, { type: s.kind === "king" ? "Door king stud" : (s.kind === "header" ? "Door header" : "Gable stud"), pos: `y = ${s.a[1]} ft`, len: s.kind === "header" ? "48 in" : ftInch(dy) })}
            onMouseLeave={handleLeave}
          />
        );
      })}

      {/* DOOR opening fill (east gable) */}
      {show.door && (() => {
        const p1 = iso(18, 4.5, 0);
        const p2 = iso(18, 7.5, 0);
        const p3 = iso(18, 7.5, 6.5);
        const p4 = iso(18, 4.5, 6.5);
        return (
          <polygon points={[p1, p2, p3, p4].map(p => p.join(",")).join(" ")}
            className="door-fill" />
        );
      })()}
      {show.door && (() => {
        const [px, py] = iso(18, 6, 3.2);
        return <text x={px} y={py} className="callout-text" textAnchor="middle">DOOR 36×78</text>;
      })()}

      {/* TOP PLATES */}
      {show.topPlates && [topSouth, topNorth, topEast, topWest].map((p, i) => (
        <IsoLine key={`tp-${i}`} a={p.a} b={p.b} className="frame-line track" />
      ))}

      {/* TEMP BRACE */}
      {show.tempBrace && tempBraces.map((b, i) => (
        <IsoLine key={`tb-${i}`} a={b.a} b={b.b} className="frame-line brace" />
      ))}

      {/* BEAMS — ridge + eave (heavier line over top plates) */}
      {show.beams && (
        <>
          <IsoLine a={[0, 0, 8]} b={[18, 0, 8]} className="frame-line beam" />
          <IsoLine a={[0, 12, heightFn(12)]} b={[18, 12, heightFn(12)]} className="frame-line beam" />
        </>
      )}

      {/* RAFTERS */}
      {show.rafters && rafters.map((r, i) => {
        const [x1, y1] = iso(...r.a);
        const [x2, y2] = iso(...r.b);
        return (
          <line key={`r-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            className="frame-line rafter stud-hover"
            onMouseMove={e => handleHover(e, { type: "Rafter", pos: `x = ${xMarks[i]} ft`, len: "12'4\" @ 4:12" })}
            onMouseLeave={handleLeave}
          />
        );
      })}

      {/* MID-ROOF PURLIN */}
      {show.purlin && <IsoLine a={midPurlin.a} b={midPurlin.b} className="frame-line purlin" />}

      {/* HORIZONTAL WALL PURLINS */}
      {show.wallPurlins && hPurlins.map((p, i) => (
        <IsoLine key={`hp-${i}`} a={p.a} b={p.b} className="frame-line purlin" />
      ))}

      {/* X-BRACING */}
      {show.xBrace && xBraces.map((b, i) => (
        <IsoLine key={`xb-${i}`} a={b.a} b={b.b} className="frame-line brace" />
      ))}

      {/* FAN OPENINGS */}
      {show.fans && (() => {
        // exhaust on west gable: x=0, y=9..10.5, z=6.3..7.8
        const ex = [[0,9,6.3],[0,10.5,6.3],[0,10.5,7.8],[0,9,7.8]].map(p => iso(...p).join(",")).join(" ");
        const intk = [[18,5.25,1],[18,6.75,1],[18,6.75,2.5],[18,5.25,2.5]].map(p => iso(...p).join(",")).join(" ");
        const [exlx, exly] = iso(0, 9.75, 8.6);
        const [inx, iny] = iso(18, 6, 0.3);
        return (
          <>
            <polygon points={ex} className="opening-fill" />
            <text x={exlx} y={exly} className="callout-text" textAnchor="middle">EXHAUST 18×18</text>
            <polygon points={intk} className="opening-fill" />
            <text x={inx} y={iny} className="callout-text" textAnchor="middle">INTAKE 18×18</text>
          </>
        );
      })()}

      {/* PANEL SEAM GRID */}
      {panelGridLines.map((l, i) => <IsoLine key={`ps-${i}`} a={l.a} b={l.b} className={l.className} />)}

      {/* Overall DIMENSION callouts */}
      {(() => {
        // length dim below south wall
        const ax = iso(0, 0, 0), bx = iso(18, 0, 0);
        const offY = 30;
        return (
          <>
            <line x1={ax[0]} y1={ax[1] + offY - 5} x2={ax[0]} y2={ax[1] + offY + 5} className="dim-line" />
            <line x1={bx[0]} y1={bx[1] + offY - 5} x2={bx[0]} y2={bx[1] + offY + 5} className="dim-line" />
            <line x1={ax[0]} y1={ax[1] + offY} x2={bx[0]} y2={bx[1] + offY} className="dim-line" />
            <text x={(ax[0] + bx[0]) / 2} y={(ax[1] + bx[1]) / 2 + offY - 6} className="dim-text">18'-0"</text>
          </>
        );
      })()}
      {(() => {
        // width dim right of east gable
        const ax = iso(18, 0, 0), bx = iso(18, 12, 0);
        const offX = 30;
        return (
          <>
            <line x1={ax[0] + offX - 5} y1={ax[1]} x2={ax[0] + offX + 5} y2={ax[1]} className="dim-line" />
            <line x1={bx[0] + offX - 5} y1={bx[1]} x2={bx[0] + offX + 5} y2={bx[1]} className="dim-line" />
            <line x1={ax[0] + offX} y1={ax[1]} x2={bx[0] + offX} y2={bx[1]} className="dim-line" />
            <text x={(ax[0] + bx[0]) / 2 + offX + 20} y={(ax[1] + bx[1]) / 2 + 4} className="dim-text">12'-0"</text>
          </>
        );
      })()}
      {(() => {
        // height dim on west gable far-left
        const ax = iso(0, 0, 0), bx = iso(0, 0, 8);
        const offX = -30;
        return (
          <>
            <line x1={ax[0] + offX - 5} y1={ax[1]} x2={ax[0] + offX + 5} y2={ax[1]} className="dim-line" />
            <line x1={bx[0] + offX - 5} y1={bx[1]} x2={bx[0] + offX + 5} y2={bx[1]} className="dim-line" />
            <line x1={ax[0] + offX} y1={ax[1]} x2={bx[0] + offX} y2={bx[1]} className="dim-line" />
            <text x={ax[0] + offX - 18} y={(ax[1] + bx[1]) / 2 + 4} className="dim-text" transform={`rotate(-90 ${ax[0] + offX - 18} ${(ax[1] + bx[1]) / 2 + 4})`}>8'-0"</text>
          </>
        );
      })()}

      {/* Cardinal labels */}
      {(() => {
        const s = iso(9, 0, 0), n = iso(9, 12, 0), e = iso(18, 6, 0), w = iso(0, 6, 0);
        return (
          <>
            <text x={s[0]} y={s[1] + 50} className="label-text" textAnchor="middle" opacity="0.6">SOUTH · HIGH</text>
            <text x={n[0]} y={n[1] + 70} className="label-text" textAnchor="middle" opacity="0.6">NORTH · LOW</text>
            <text x={e[0] + 60} y={e[1] + 28} className="label-text" textAnchor="middle" opacity="0.6">EAST · DOOR</text>
            <text x={w[0] - 60} y={w[1] + 28} className="label-text" textAnchor="middle" opacity="0.6">WEST · EXHAUST</text>
          </>
        );
      })()}
    </svg>
  );
}

// Expose heightFn for other views
const heightFn = y => 8 - (y / 12) * 1.333;

window.IsoView = IsoView;
window.heightFn = heightFn;
window.iso = iso;
