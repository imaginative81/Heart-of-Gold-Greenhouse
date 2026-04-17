// Panels.jsx — right-side data panels

const { useState: useStateP } = React;

function SpecsCard() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span>Spec Sheet</span>
        <span className="tag">DWG-01</span>
      </div>
      <div className="panel-body" style={{ padding: 0 }}>
        <div className="specs">
          {window.SPECS.map((s, i) => (
            <div key={i} className="spec">
              <div className="k">{s.k}</div>
              <div className="v">{s.v}{s.u && <small>{s.u}</small>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ done, total }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="progress">
      <span className="label">Build</span>
      <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
      <span className="pct">{pct}%</span>
    </div>
  );
}

function StepDetailCard({ step }) {
  if (!step) return null;
  return (
    <div className="step-detail">
      <h3>Step {String(step.id).padStart(2, "0")}</h3>
      <h2>{step.title}</h2>
      <div style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>
        {step.meta}
      </div>
      <ol>
        {step.steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
      <div className="success">
        <div className="k">Success check</div>
        <div className="v">{step.success}</div>
      </div>
    </div>
  );
}

function StepsPanel({ activeStep, setActiveStep, doneSet, setDoneSet }) {
  const steps = window.BUILD_STEPS;
  const toggleDone = (id) => {
    const next = new Set(doneSet);
    if (next.has(id)) next.delete(id); else next.add(id);
    setDoneSet(next);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ul className="step-list">
        {steps.map(s => (
          <li
            key={s.id}
            className={`${activeStep === s.id ? "active" : ""} ${doneSet.has(s.id) ? "done" : ""}`}
            onClick={() => setActiveStep(s.id)}
            onDoubleClick={(e) => { e.stopPropagation(); toggleDone(s.id); }}
          >
            <div className="step-title">{s.title}</div>
            <div className="step-meta">{s.meta}</div>
          </li>
        ))}
      </ul>
      <div style={{ padding: "8px 12px", fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.08em", borderTop: "1px solid var(--line-soft)" }}>
        DOUBLE-CLICK A STEP TO MARK COMPLETE
      </div>
    </div>
  );
}

function CutListPanel() {
  const [checked, setChecked] = useStateP(() => {
    try { return JSON.parse(localStorage.getItem("gh-cut-checks") || "{}"); } catch { return {}; }
  });
  const toggle = (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem("gh-cut-checks", JSON.stringify(next));
  };

  return (
    <div>
      {window.CUT_LIST.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6, fontWeight: 500 }}>
            {g.group}
          </div>
          <table className="cutlist">
            <thead>
              <tr>
                <th className="check"></th>
                <th>Qty</th>
                <th>Spec</th>
                <th>Length</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {g.items.map((it, i) => {
                const key = `${gi}-${i}`;
                return (
                  <tr key={key} className={checked[key] ? "done" : ""}>
                    <td className="check">
                      <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)} />
                    </td>
                    <td className="q">×{it.q}</td>
                    <td>{it.spec}</td>
                    <td className="len">{it.len}</td>
                    <td style={{ color: "var(--ink-soft)", fontSize: 11 }}>{it.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function MaterialsPanel() {
  return (
    <div>
      {window.MATERIALS.map((g, i) => (
        <div key={i} className="mat-group">
          <h4>{g.group}</h4>
          {g.items.map((it, j) => (
            <div key={j} className="mat-row">
              <span className="name">{it.name}</span>
              <span className="qty">{it.qty}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="hr" />
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.5, letterSpacing: "0.02em" }}>
        Practical purchase note: order 40 studs at full 18 ft and cut to length — saves waste vs. pre-cut. Track in 10 ft lengths, splice with 12 in overlap + 4 screws.
      </div>
    </div>
  );
}

function DiagPanel() {
  return (
    <div>
      {window.DIAGNOSTICS.map((d, i) => (
        <div key={i} className="diag">
          <div className="sym">⚠ {d.sym}</div>
          <div className="fix">{d.fix}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SpecsCard, ProgressBar, StepDetailCard, StepsPanel, CutListPanel, MaterialsPanel, DiagPanel });
