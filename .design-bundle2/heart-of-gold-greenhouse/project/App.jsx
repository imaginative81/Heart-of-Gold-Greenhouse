// App.jsx — main app wiring everything together

const { useState: useAS, useEffect: useAE, useMemo: useAM } = React;

const VIEWS_FRAME = [
  { id: "iso",   label: "Iso" },
  { id: "plan",  label: "Plan" },
  { id: "south", label: "S Elev" },
  { id: "north", label: "N Elev" },
  { id: "east",  label: "E Gable" },
  { id: "west",  label: "W Gable" },
];

const VIEWS_GLAZING = [
  { id: "g-overview", label: "Overview" },
  { id: "g-south",    label: "S Glazing" },
  { id: "g-north",    label: "N Glazing" },
  { id: "g-east",     label: "E Gable" },
  { id: "g-west",     label: "W Gable" },
  { id: "g-roof",     label: "Roof Plan" },
];

const LAYERS = [
  { key: "sills",       label: "Sill Tracks" },
  { key: "southStuds",  label: "South Studs" },
  { key: "northStuds",  label: "North Studs" },
  { key: "gableStuds",  label: "Gable Studs" },
  { key: "door",        label: "Door Frame" },
  { key: "topPlates",   label: "Top Plates" },
  { key: "beams",       label: "Ridge / Eave" },
  { key: "rafters",     label: "Rafters" },
  { key: "purlin",      label: "Mid-Roof Purlin" },
  { key: "fans",        label: "Fan Openings" },
  { key: "wallPurlins", label: "Wall Purlins" },
  { key: "xBrace",      label: "Cross-Bracing" },
  { key: "panelGrid",   label: "Panel Seam Grid", dashed: true },
  { key: "tempBrace",   label: "Temp Bracing",    dashed: true },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fanConfig": "both-gables",
  "showDims": true,
  "showCallouts": true,
  "accentHue": 30
}/*EDITMODE-END*/;

function App() {
  const steps = window.BUILD_STEPS;
  const [activeStep, setActiveStep] = useAS(() => {
    const v = parseInt(localStorage.getItem("gh-step") || "1", 10);
    return isNaN(v) ? 1 : v;
  });
  const [doneSet, setDoneSet] = useAS(() => {
    try { return new Set(JSON.parse(localStorage.getItem("gh-done") || "[]")); } catch { return new Set(); }
  });
  const [layer, setLayer] = useAS(() => localStorage.getItem("gh-layer") || "frame");
  const [view, setView] = useAS(() => localStorage.getItem("gh-view") || "iso");
  const [gView, setGView] = useAS(() => localStorage.getItem("gh-gview") || "g-overview");
  const [panelTab, setPanelTab] = useAS(() => localStorage.getItem("gh-ptab") || "steps");
  const [hoverInfo, setHoverInfo] = useAS(null);
  const [manualLayers, setManualLayers] = useAS({});
  const [tweaks, setTweaks] = useAS(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useAS(false);

  useAE(() => localStorage.setItem("gh-step", String(activeStep)), [activeStep]);
  useAE(() => localStorage.setItem("gh-done", JSON.stringify([...doneSet])), [doneSet]);
  useAE(() => localStorage.setItem("gh-view", view), [view]);
  useAE(() => localStorage.setItem("gh-gview", gView), [gView]);
  useAE(() => localStorage.setItem("gh-layer", layer), [layer]);
  useAE(() => localStorage.setItem("gh-ptab", panelTab), [panelTab]);

  // Tweaks protocol
  useAE(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const updateTweak = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
  };

  // Apply accent hue tweak live
  useAE(() => {
    document.documentElement.style.setProperty("--accent", `oklch(0.72 0.18 ${tweaks.accentHue})`);
  }, [tweaks.accentHue]);

  // Build "show" object from step progression + manual overrides
  const step = steps.find(s => s.id === activeStep) || steps[0];
  const showBase = step.show || {};
  const show = useAM(() => {
    const merged = { ...showBase };
    for (const [k, v] of Object.entries(manualLayers)) {
      if (v !== undefined) merged[k] = v;
    }
    // panelGrid is final-step only unless manually forced
    if (!("panelGrid" in manualLayers) && activeStep < 13) merged.panelGrid = false;
    if (!("tempBrace" in manualLayers) && activeStep !== 6) merged.tempBrace = false;
    return merged;
  }, [showBase, manualLayers, activeStep]);

  const doneCount = doneSet.size;
  const total = steps.length;

  const prev = () => setActiveStep(Math.max(1, activeStep - 1));
  const next = () => setActiveStep(Math.min(total, activeStep + 1));
  const toggleDone = (id) => {
    const n = new Set(doneSet);
    if (n.has(id)) n.delete(id); else n.add(id);
    setDoneSet(n);
  };

  const FRAME_TITLES = {
    iso:   { no: "DWG-A1 · ISOMETRIC",        name: "Assembly Overview" },
    plan:  { no: "DWG-P1 · PLAN VIEW",         name: "Floor & Roof Plan" },
    south: { no: "DWG-E1 · SOUTH ELEVATION",   name: "High Wall · 8'-0\"" },
    north: { no: "DWG-E2 · NORTH ELEVATION",   name: "Low Wall · 6'-8\"" },
    east:  { no: "DWG-E3 · EAST GABLE",        name: "Door Elevation" },
    west:  { no: "DWG-E4 · WEST GABLE",        name: "Exhaust Elevation" },
  };
  const GLAZING_TITLES = {
    "g-overview": { no: "DWG-G0 · GLAZING OVERVIEW", name: "Panel Assembly · Iso + Summary" },
    "g-south":    { no: "DWG-G1 · SOUTH GLAZING",    name: "9 × (24 × 96 in) PC" },
    "g-north":    { no: "DWG-G2 · NORTH GLAZING",    name: "9 × (24 × 80 in) PC" },
    "g-east":     { no: "DWG-G3 · EAST GABLE",        name: "Door + Intake Cutouts" },
    "g-west":     { no: "DWG-G4 · WEST GABLE",        name: "Exhaust Cutout" },
    "g-roof":     { no: "DWG-G5 · ROOF PLAN",         name: "9 Panels · 2 Vent Cutouts" },
  };
  const viewTitle = layer === "frame" ? FRAME_TITLES[view] : GLAZING_TITLES[gView];

  return (
    <div className="app">
      {/* ---- TOP BAR ---- */}
      <div className="topbar">
        <div className="title-block">
          <div className="stamp">HG</div>
          <div>
            <h1>Heart of Gold Greenhouse · Metal Stud Frame</h1>
            <div className="sub">18 ft × 12 ft · 4:12 mono-pitch · 18-ga cold-formed steel</div>
          </div>
        </div>
        <div className="metabar">
          <div className="layer-switch">
            <button className={layer === "frame" ? "active" : ""} onClick={() => setLayer("frame")}>L1 · FRAME</button>
            <button className={layer === "glazing" ? "active" : ""} onClick={() => setLayer("glazing")}>L6 · GLAZING</button>
          </div>
          {layer === "frame" ? (
            <>
              <div>SHEET <b>{String(activeStep).padStart(2, "0")}</b>/13</div>
              <div>SCALE <b>3/8" = 1'-0"</b></div>
              <div>REV <b>B</b> · 04.17.26</div>
              <div>CREW <b>2</b> · EST <b>14 hr</b></div>
            </>
          ) : (
            <>
              <div>PANELS <b>98</b> (7×14 pk)</div>
              <div>TYPE <b>DGSL 4mm TW-PC</b></div>
              <div>REV <b>B</b> · 04.17.26</div>
              <div>CREW <b>2</b> · EST <b>14 hr</b></div>
            </>
          )}
        </div>
      </div>

      {/* ---- VISUALIZER ---- */}
      <div className="visualizer">
        <div className="viz-head">
          <div>
            <div className="drawing-no">{viewTitle.no}</div>
            <div className="drawing-name">{viewTitle.name}</div>
          </div>
          <div className="view-tabs">
            {(layer === "frame" ? VIEWS_FRAME : VIEWS_GLAZING).map(v => (
              <button key={v.id}
                className={(layer === "frame" ? view : gView) === v.id ? "active" : ""}
                onClick={() => layer === "frame" ? setView(v.id) : setGView(v.id)}>{v.label}</button>
            ))}
          </div>
        </div>

        <div className="viz-canvas">
          {layer === "frame" && view === "iso"   && <IsoView show={show} activeStep={activeStep} onHoverStud={setHoverInfo} />}
          {layer === "frame" && view === "plan"  && <Plan show={show} />}
          {layer === "frame" && view === "south" && <SouthElev show={show} />}
          {layer === "frame" && view === "north" && <NorthElev show={show} />}
          {layer === "frame" && view === "east"  && <EastElev show={show} />}
          {layer === "frame" && view === "west"  && <WestElev show={show} />}
          {layer === "glazing" && gView === "g-overview" && <L6Overview />}
          {layer === "glazing" && gView === "g-south"    && <SouthGlazing />}
          {layer === "glazing" && gView === "g-north"    && <NorthGlazing />}
          {layer === "glazing" && gView === "g-east"     && <EastGlazing />}
          {layer === "glazing" && gView === "g-west"     && <WestGlazing />}
          {layer === "glazing" && gView === "g-roof"     && <RoofGlazing />}
        </div>

        {/* Layer toggles — frame iso view only */}
        {layer === "frame" && view === "iso" && (
          <div className="layer-panel">
            <h4>Frame Layers</h4>
            {LAYERS.map(l => (
              <label key={l.key} className="layer-row">
                <input
                  type="checkbox"
                  checked={!!show[l.key]}
                  onChange={e => setManualLayers({ ...manualLayers, [l.key]: e.target.checked })}
                />
                <span className={`swatch${l.dashed ? " dashed" : ""}`} />
                <span>{l.label}</span>
              </label>
            ))}
            <div className="hr" />
            <button
              className="layer-row"
              style={{ background: "transparent", padding: 0, color: "var(--accent-2)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase" }}
              onClick={() => setManualLayers({})}
            >↻ sync to step</button>
          </div>
        )}

        {/* Step scrubber — frame layer only */}
        {layer === "frame" && (
        <div className="step-bar">
          <button className="nav" onClick={prev} disabled={activeStep === 1}>◀ PREV</button>
          <div className="step-pills">
            {steps.map(s => (
              <div
                key={s.id}
                className={`step-pill ${s.id === activeStep ? "active" : ""} ${doneSet.has(s.id) ? "done" : ""}`}
                onClick={() => setActiveStep(s.id)}
                title={`${String(s.id).padStart(2, "0")} · ${s.title}`}
              />
            ))}
          </div>
          <div className="step-label">STEP <b>{String(activeStep).padStart(2, "0")}</b> · {step.title}</div>
          <button className="nav" onClick={next} disabled={activeStep === total}>NEXT ▶</button>
          <button
            className="nav"
            onClick={() => toggleDone(activeStep)}
            style={{ borderColor: doneSet.has(activeStep) ? "var(--ok)" : undefined, color: doneSet.has(activeStep) ? "var(--ok)" : undefined }}
          >
            {doneSet.has(activeStep) ? "✓ DONE" : "MARK DONE"}
          </button>
        </div>
        )}

        {/* Compass (frame iso only) */}
        {layer === "frame" && view === "iso" && (
          <div className="compass">
            <svg viewBox="-25 -25 50 50">
              <circle r="22" fill="none" stroke="var(--line-soft)" />
              <polygon points="0,-18 -5,0 0,-6 5,0" fill="var(--accent)" />
              <polygon points="0,18 -5,0 0,6 5,0" fill="var(--line-soft)" />
              <text y="-22" textAnchor="middle" fontSize="9" fontFamily="var(--mono)" fill="var(--accent)">N</text>
              <text y="25" textAnchor="middle" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)">S</text>
              <text x="22" y="3" textAnchor="middle" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)">E</text>
              <text x="-22" y="3" textAnchor="middle" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)">W</text>
            </svg>
          </div>
        )}

        {/* Scale bar */}
        <div className="scale-bar">
          <span>0</span>
          <div className="bar"><div/><div/><div/><div/></div>
          <span>4 FT</span>
        </div>

        {/* Hover tooltip */}
        {hoverInfo && (
          <div className="hover-tip" style={{ left: hoverInfo.x + 14, top: hoverInfo.y + 14 }}>
            <b>{hoverInfo.type}</b><br/>
            <span className="hint">{hoverInfo.pos} · LEN {hoverInfo.len}</span>
          </div>
        )}
      </div>

      {/* ---- RIGHT PANELS ---- */}
      <div className="panels">
        {layer === "frame" ? <SpecsCard /> : <L6SpecsCard />}
        {layer === "frame" && <ProgressBar done={doneCount} total={total} />}

        <div className="panel" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <div className="panel-head">
            <span>{layer === "frame" ? "Build Plan" : "Glazing Plan"}</span>
            <span className="tag">{panelTab.toUpperCase()}</span>
          </div>
          {layer === "frame" ? (
            <div className="tab-row">
              <button className={panelTab === "steps" ? "active" : ""} onClick={() => setPanelTab("steps")}>Steps</button>
              <button className={panelTab === "detail" ? "active" : ""} onClick={() => setPanelTab("detail")}>Detail</button>
              <button className={panelTab === "cut" ? "active" : ""} onClick={() => setPanelTab("cut")}>Cut List</button>
              <button className={panelTab === "mat" ? "active" : ""} onClick={() => setPanelTab("mat")}>Materials</button>
              <button className={panelTab === "diag" ? "active" : ""} onClick={() => setPanelTab("diag")}>Diag.</button>
            </div>
          ) : (
            <div className="tab-row">
              <button className={panelTab === "g-steps" ? "active" : ""} onClick={() => setPanelTab("g-steps")}>Steps</button>
              <button className={panelTab === "g-panels" ? "active" : ""} onClick={() => setPanelTab("g-panels")}>Panels</button>
              <button className={panelTab === "g-trim" ? "active" : ""} onClick={() => setPanelTab("g-trim")}>Trim</button>
              <button className={panelTab === "g-details" ? "active" : ""} onClick={() => setPanelTab("g-details")}>Details</button>
              <button className={panelTab === "g-order" ? "active" : ""} onClick={() => setPanelTab("g-order")}>Order</button>
            </div>
          )}
          <div className="tab-body">
            {layer === "frame" && panelTab === "steps"  && <StepsPanel activeStep={activeStep} setActiveStep={setActiveStep} doneSet={doneSet} setDoneSet={setDoneSet} />}
            {layer === "frame" && panelTab === "detail" && <StepDetailCard step={step} />}
            {layer === "frame" && panelTab === "cut"    && <CutListPanel />}
            {layer === "frame" && panelTab === "mat"    && <MaterialsPanel />}
            {layer === "frame" && panelTab === "diag"   && <DiagPanel />}
            {layer === "glazing" && panelTab === "g-steps"   && <L6StepsPanel />}
            {layer === "glazing" && panelTab === "g-panels"  && <L6PanelsPanel />}
            {layer === "glazing" && panelTab === "g-trim"    && <L6TrimPanel />}
            {layer === "glazing" && panelTab === "g-details" && <L6DetailsPanel />}
            {layer === "glazing" && panelTab === "g-order"   && <L6OrderPanel />}
            {layer === "glazing" && !panelTab.startsWith("g-") && <L6StepsPanel />}
          </div>
        </div>
      </div>

      {/* ---- TWEAKS PANEL ---- */}
      {tweaksOpen && (
        <div className="tweaks-panel">
          <h3>
            Tweaks
            <button onClick={() => setTweaksOpen(false)} style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1 }}>×</button>
          </h3>
          <div className="body">
            <div>
              <label>Fan placement</label>
              <div className="opt-row">
                {[
                  { k: "both-gables", l: "Both gables" },
                  { k: "split-walls", l: "N/S walls" },
                ].map(o => (
                  <button key={o.k} className={tweaks.fanConfig === o.k ? "active" : ""} onClick={() => updateTweak("fanConfig", o.k)}>{o.l}</button>
                ))}
              </div>
            </div>
            <div>
              <label>Show dimensions <span className="val">{tweaks.showDims ? "on" : "off"}</span></label>
              <div className="opt-row">
                <button className={tweaks.showDims ? "active" : ""} onClick={() => updateTweak("showDims", true)}>On</button>
                <button className={!tweaks.showDims ? "active" : ""} onClick={() => updateTweak("showDims", false)}>Off</button>
              </div>
            </div>
            <div>
              <label>Show callouts <span className="val">{tweaks.showCallouts ? "on" : "off"}</span></label>
              <div className="opt-row">
                <button className={tweaks.showCallouts ? "active" : ""} onClick={() => updateTweak("showCallouts", true)}>On</button>
                <button className={!tweaks.showCallouts ? "active" : ""} onClick={() => updateTweak("showCallouts", false)}>Off</button>
              </div>
            </div>
            <div>
              <label>Accent hue <span className="val">{tweaks.accentHue}°</span></label>
              <input type="range" min="0" max="360" step="5" value={tweaks.accentHue} onChange={e => updateTweak("accentHue", parseInt(e.target.value, 10))} />
            </div>
          </div>
        </div>
      )}

      {/* Apply dim/callout visibility via global style */}
      <style>{`
        ${!tweaks.showDims ? ".dim-line, .dim-text { display: none; }" : ""}
        ${!tweaks.showCallouts ? ".callout-text, .callout-line { display: none; }" : ""}
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
