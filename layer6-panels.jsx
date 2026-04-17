// layer6-panels.jsx — right-side panels for Layer 6 glazing

const { useState: useStateL6 } = React;

function L6SpecsCard() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span>Glazing Spec</span>
        <span className="tag">DWG-G0</span>
      </div>
      <div className="panel-body" style={{ padding: 0 }}>
        <div className="specs">
          {window.L6_SPECS.map((s, i) => (
            <div key={i} className="spec">
              <div className="k">{s.k}</div>
              <div className="v">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function L6StepsPanel() {
  const [open, setOpen] = useStateL6(
    () => {
      try { return new Set(JSON.parse(localStorage.getItem("l6-open") || "[1]")); }
      catch { return new Set([1]); }
    }
  );
  const [done, setDone] = useStateL6(
    () => {
      try { return new Set(JSON.parse(localStorage.getItem("l6-done") || "[]")); }
      catch { return new Set(); }
    }
  );
  React.useEffect(() => localStorage.setItem("l6-open", JSON.stringify([...open])), [open]);
  React.useEffect(() => localStorage.setItem("l6-done", JSON.stringify([...done])), [done]);

  const toggle = (id) => {
    const n = new Set(open);
    if (n.has(id)) n.delete(id); else n.add(id);
    setOpen(n);
  };
  const mark = (id) => {
    const n = new Set(done);
    if (n.has(id)) n.delete(id); else n.add(id);
    setDone(n);
  };

  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.55 }}>
      {window.L6_STEPS.map(s => (
        <div key={s.id} style={{ borderBottom: "1px solid var(--line-soft)", padding: "10px 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => toggle(s.id)}>
            <input type="checkbox" checked={done.has(s.id)} onClick={e => e.stopPropagation()} onChange={() => mark(s.id)} />
            <span style={{ color: "var(--accent-2)", minWidth: 22 }}>{String(s.id).padStart(2, "0")}</span>
            <b style={{ flex: 1, color: done.has(s.id) ? "var(--ok)" : "var(--ink)" }}>{s.title}</b>
            <span style={{ color: "var(--ink-soft)", fontSize: 9 }}>{open.has(s.id) ? "▾" : "▸"}</span>
          </div>
          {open.has(s.id) && (
            <div style={{ paddingLeft: 30, paddingTop: 8, color: "var(--line)" }}>
              <div style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>{s.meta}</div>
              <ol style={{ paddingLeft: 16, margin: 0 }}>
                {s.steps.map((t, i) => <li key={i} style={{ marginBottom: 4 }}>{t}</li>)}
              </ol>
              <div style={{ marginTop: 8, borderLeft: "2px solid var(--ok)", paddingLeft: 8, fontSize: 10, color: "var(--ok)" }}>
                ✓ {s.success}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function L6PanelsPanel() {
  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.5 }}>
      <div style={{ background: "rgba(217, 151, 87, 0.08)", border: "1px solid var(--accent)", padding: 8, marginBottom: 10 }}>
        <b style={{ color: "var(--accent)" }}>⚠ UV Orientation</b> — All panels install UV side OUT. Mark each panel with an arrow before cutting.
      </div>
      {window.L6_PANELS.map((grp, gi) => (
        <div key={gi} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-2)", borderBottom: "1px dashed var(--line-soft)", paddingBottom: 3, marginBottom: 5 }}>
            {grp.group}
          </div>
          {grp.items.map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 110px 1fr", gap: 8, padding: "3px 0" }}>
              <span style={{ color: "var(--accent)" }}>{String(it.q).padStart(2, "0")}×</span>
              <b>{it.name}</b>
              <span style={{ color: "var(--line)" }}>{it.size}{it.note && <div style={{ color: "var(--ink-soft)", fontSize: 9.5 }}>{it.note}</div>}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function L6TrimPanel() {
  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.5 }}>
      {window.L6_TRIM.map((grp, gi) => (
        <div key={gi} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-2)", borderBottom: "1px dashed var(--line-soft)", paddingBottom: 3, marginBottom: 5 }}>
            {grp.group}
          </div>
          {grp.items.map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 90px", gap: 8, padding: "3px 0" }}>
              <span style={{ color: "var(--accent)" }}>{String(it.q).padStart(2, "0")}×</span>
              <span><b>{it.name}</b>{it.note && <div style={{ color: "var(--ink-soft)", fontSize: 9.5 }}>{it.note}</div>}</span>
              <span style={{ color: "var(--line)", textAlign: "right" }}>{it.len}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function L6DetailsPanel() {
  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.55 }}>
      {window.L6_DETAILS.map(d => (
        <div key={d.id} style={{ marginBottom: 12, borderLeft: "2px solid var(--accent-2)", paddingLeft: 10 }}>
          <div style={{ color: "var(--accent)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>{d.id} · {d.title}</div>
          <div style={{ color: "var(--line)", marginTop: 4 }}>{d.body}</div>
        </div>
      ))}
    </div>
  );
}

function L6OrderPanel() {
  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.55 }}>
      <div style={{ background: "rgba(255,209,102,0.08)", border: "1px solid var(--warn)", padding: 8, marginBottom: 10 }}>
        <b style={{ color: "var(--warn)" }}>⚠ VERIFY BEFORE ORDERING TRIM</b> — All H/J channels must be explicitly rated 4mm (0.16"). 6mm/8mm will NOT grip. Get in writing.
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-2)", borderBottom: "1px dashed var(--line-soft)", paddingBottom: 3, marginBottom: 6 }}>Order Summary</div>
      {window.L6_ORDER.map((f, i) => {
        const isTotal = f.name === "PROJECT TOTAL";
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "3px 0", borderTop: isTotal ? "1px solid var(--accent)" : undefined, marginTop: isTotal ? 6 : 0, paddingTop: isTotal ? 8 : 3 }}>
            <span style={{ fontWeight: isTotal ? 600 : 400, color: isTotal ? "var(--accent)" : "var(--line)" }}>{f.name}</span>
            <span style={{ color: "var(--accent)", textAlign: "right", fontWeight: isTotal ? 700 : 400 }}>{f.qty}</span>
          </div>
        );
      })}
      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-2)", borderBottom: "1px dashed var(--line-soft)", paddingBottom: 3, marginTop: 14, marginBottom: 6 }}>Fasteners</div>
      {window.L6_FASTENERS.map((f, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "3px 0" }}>
          <span>{f.name}</span><span style={{ color: "var(--accent)", textAlign: "right" }}>{f.qty}</span>
        </div>
      ))}
      <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-2)", borderBottom: "1px dashed var(--line-soft)", paddingBottom: 3, marginTop: 14, marginBottom: 6 }}>Hardware (separate)</div>
      {window.L6_HARDWARE.map((f, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "3px 0" }}>
          <span>{f.name}</span><span style={{ color: "var(--accent)", textAlign: "right" }}>{f.qty}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, padding: 10, border: "1px dashed var(--ok)" }}>
        <b style={{ color: "var(--ok)" }}>Tradeoff note:</b> 4mm saves $3,800–5,200 vs 8mm. Accept: lower R-value (supplemental heat on hard freezes), tighter fastener spacing (8" OC), more seams. Can upgrade to 8mm panel-by-panel later if 8mm-profile channels are swapped in.
      </div>
    </div>
  );
}

function L6DiagPanel() {
  return (
    <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.5 }}>
      {window.L6_DIAG.map((d, i) => (
        <div key={i} style={{ borderLeft: "2px solid var(--warn)", background: "rgba(255,209,102,0.04)", padding: "8px 10px", marginBottom: 8 }}>
          <div style={{ color: "var(--warn)", marginBottom: 4 }}>⚠ {d.sym}</div>
          <div style={{ color: "var(--line)" }}>{d.fix}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  L6SpecsCard, L6StepsPanel, L6PanelsPanel, L6TrimPanel, L6DetailsPanel, L6OrderPanel,
});
