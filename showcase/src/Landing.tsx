import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

const REPO = "https://github.com/Shalihotri/Yantraa";
const ISSUE = `${REPO}/issues/new?title=Workflow%20idea%3A%20&body=Industry%3A%0AProblem%3A%0AData%20sources%3A%0ADecision%20to%20support%3A%0AHuman%20approval%20requirements%3A`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a
      className={`brand ${small ? "brand-small" : ""}`}
      href="#top"
      aria-label="Yantraa home"
    >
      <BrandMark />
      yantraa<span className="brand-period">.</span>
    </a>
  );
}

const cases = [
  {
    id: "banking",
    label: "Investment banking",
    icon: "01",
    title: "From a data room to a defensible deal decision.",
    problem:
      "Deal teams spend hours reconciling filings, financial statements, and diligence notes. Missing evidence can surface only when the investment committee asks the hard questions.",
    solution:
      "Build a diligence workflow that assigns specialist agents to gather evidence, reconcile financials, and flag inconsistencies. A decision model weighs the findings; the deal team owns the final recommendation.",
    trigger: "New deal brief",
    sources: [
      "Financial statements",
      "Filings & data room",
      "Internal deal criteria",
    ],
    agents: ["Document analyst", "Financial analyst", "Risk analyst"],
    decision: "Investment assessment",
    outcomes: [
      "Advance to committee",
      "Request more evidence",
      "Escalate to deal lead",
    ],
    details: [
      "Extract cited financial facts from the approved data room and identify missing documents.",
      "Reconcile periods, compare assumptions, and surface discrepancies for the deal team.",
      "Assess concentration, counterparty, and execution risks against your investment criteria.",
    ],
    model:
      "Combine evidence coverage, financial assumptions, and risk signals into a structured assessment. Missing or conflicting evidence routes back to the deal team.",
    outcome:
      "A committee-ready evidence trail, with open questions and a human-owned decision.",
  },
  {
    id: "payments",
    label: "Payment infrastructure",
    icon: "02",
    title: "Resolve payment exceptions with the full picture.",
    problem:
      "A failed or unmatched payment sends operations teams across processor logs, ledger entries, and support tickets. Manual handoffs slow resolution and make the reasoning difficult to reconstruct.",
    solution:
      "Build an exception workflow that correlates transaction events, checks settlement records, and explains the likely cause. Decision models propose a resolution within policy; sensitive actions require an operator’s approval.",
    trigger: "Payment exception",
    sources: ["Processor events", "Ledger & settlement", "Risk & retry policy"],
    agents: [
      "Transaction analyst",
      "Reconciliation agent",
      "Policy & risk agent",
    ],
    decision: "Resolution assessment",
    outcomes: [
      "Propose safe retry",
      "Queue reconciliation",
      "Escalate to operator",
    ],
    details: [
      "Correlate a payment’s processor events using transaction identifiers and classify the failure.",
      "Match ledger and settlement records, and flag duplicate, missing, or inconsistent entries.",
      "Check retry limits, duplicate-payment risk, and approval requirements before proposing an action.",
    ],
    model:
      "Evaluate the evidence against resolution policies. A retry proposal requires idempotency checks and approval; uncertainty routes to an operator.",
    outcome:
      "A traceable resolution proposal, with policy checks before any movement of funds.",
  },
];

function HeroFlow() {
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (stage >= 3) setRunning(false);
      else setStage(stage + 1);
    }, 1050);
    return () => window.clearTimeout(timer);
  }, [stage, running]);
  const labels = [
    "Brief received. Workflow scoped.",
    "Specialist agents gather evidence.",
    "Decision model evaluates the findings.",
    "Recommendation queued for human review.",
  ];
  return (
    <div className="hero-visual">
      <div className="visual-top">
        <span>
          <i className="status-dot" /> WORKFLOW STUDIO
        </span>
        <span className="mono">REFERENCE DESIGN / 001</span>
      </div>
      <div
        className="flow-canvas"
        role="img"
        aria-label="A deal brief flows through a Yantraa orchestrator to research, analysis and risk agents, then a decision model and human review."
      >
        <div
          className={`flow-node input-node ${stage >= 0 ? "node-active" : ""}`}
        >
          <span className="node-icon">↳</span>
          <div>
            <small>THE STARTING POINT</small>
            <strong>A complex business problem</strong>
          </div>
          <span className="node-check">{stage >= 0 ? "✓" : "01"}</span>
        </div>
        <div className={`flow-connector ${stage >= 1 ? "lit" : ""}`} />
        <div className={`orchestrator ${stage >= 1 ? "node-active" : ""}`}>
          <BrandMark className="orchestrator-mark" />
          <div>
            <strong>Yantraa orchestrator</strong>
            <small>Context. Tools. The right next step.</small>
          </div>
          <span className="mini-pill">AGENTIC</span>
        </div>
        <div className="branch-lines">
          <svg
            viewBox="0 0 480 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M240 0V20H70V40M240 20V40M240 20H410V40" />
          </svg>
        </div>
        <div className="agent-row">
          {[
            ["⌕", "Research", "Find the evidence"],
            ["▤", "Analysis", "Connect the facts"],
            ["◇", "Risk", "Check the boundaries"],
          ].map(([icon, title, sub]) => (
            <div
              className={`agent-card ${stage >= 1 ? "agent-active" : ""}`}
              key={title}
            >
              <span>{icon}</span>
              <strong>{title} agent</strong>
              <small>{sub}</small>
            </div>
          ))}
        </div>
        <div className="branch-lines branch-return">
          <svg
            viewBox="0 0 480 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M70 0V20H240V40M240 0V20M410 0V20H240" />
          </svg>
        </div>
        <div className={`decision-node ${stage >= 2 ? "node-active" : ""}`}>
          <span className="decision-symbol">◇</span>
          <div>
            <strong>Intelligent decision model</strong>
            <small>Evidence → assessment → next action</small>
          </div>
          <span className="model-dots">•••</span>
        </div>
        <div className={`flow-connector ${stage >= 3 ? "lit" : ""}`} />
        <div className={`human-node ${stage >= 3 ? "node-active" : ""}`}>
          <span>◎</span> A clear recommendation. A human in control.
          <span className="human-check">✓</span>
        </div>
      </div>
      <div className="visual-bottom">
        <span aria-live="polite">
          {stage < 0
            ? "One connected workflow. From question to decision."
            : labels[stage]}
        </span>
        <button
          onClick={() => {
            setStage(0);
            setRunning(true);
          }}
          disabled={running}
          aria-label={
            running
              ? "Workflow illustration playing"
              : "Play workflow illustration"
          }
        >
          {running ? "Running…" : stage === 3 ? "Replay" : "Run flow"}
          <span aria-hidden="true">{running ? "◌" : "▷"}</span>
        </button>
      </div>
    </div>
  );
}

function UseCases() {
  const [selected, setSelected] = useState(0);
  const [node, setNode] = useState(0);
  const c = cases[selected];
  return (
    <section
      className="usecases section-wrap"
      id="use-cases"
      aria-labelledby="cases-title"
    >
      <div className="section-eyebrow">
        <span className="tiny-square" /> BUILT AROUND YOUR WORLD{" "}
        <span className="section-number">02 / USE CASES</span>
      </div>
      <div className="section-intro">
        <h2 id="cases-title">
          Specific problems.
          <br />
          <span className="muted">Purpose-built workflows.</span>
        </h2>
        <p>
          Start with the way your industry works.
          <br />
          Build the intelligence around it.
        </p>
      </div>
      <div className="case-tabs" role="tablist" aria-label="Industry use cases">
        {cases.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-controls="case-panel"
            aria-selected={selected === i}
            onClick={() => {
              setSelected(i);
              setNode(0);
            }}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? cases.length - 1
                      : (selected +
                          (event.key === "ArrowRight" ? 1 : -1) +
                          cases.length) %
                        cases.length;
                setSelected(next);
                setNode(0);
                document.getElementById(`tab-${cases[next].id}`)?.focus();
              }
            }}
            tabIndex={selected === i ? 0 : -1}
          >
            <span>{item.icon}</span>
            {item.label}
            <Arrow diagonal />
          </button>
        ))}
      </div>
      <div
        id="case-panel"
        role="tabpanel"
        aria-labelledby={`tab-${c.id}`}
        tabIndex={0}
        className="case-panel"
      >
        <div className="case-copy">
          <span className="tag">{c.label.toUpperCase()}</span>
          <h3>{c.title}</h3>
          <div className="problem-block">
            <span className="copy-label">THE PROBLEM</span>
            <p>{c.problem}</p>
          </div>
          <div className="solution-block">
            <span className="copy-label">THE YANTRAA APPROACH</span>
            <p>{c.solution}</p>
          </div>
          <div className="case-outcome">
            <span aria-hidden="true">↗</span>
            <p>{c.outcome}</p>
          </div>
        </div>
        <div className="case-diagram">
          <div className="diagram-heading">
            <span className="mono">
              {selected === 0 ? "DEAL INTELLIGENCE" : "PAYMENT OPERATIONS"}
            </span>
            <span className="reference-badge">Reference architecture</span>
          </div>
          <div className="trigger-node">
            <span aria-hidden="true">⚑</span>
            {c.trigger}
            <span className="mono">TRIGGER</span>
          </div>
          <div className="diagram-down">↓</div>
          <div className="sources-row">
            {c.sources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
          <div className="diagram-down">↓</div>
          <div className="diagram-boundary">
            <span className="boundary-label">
              YANTRAA · ORCHESTRATION & SHARED CONTEXT
            </span>
            <div className="specialist-row">
              {c.agents.map((agent, i) => (
                <button
                  key={agent}
                  onClick={() => setNode(i)}
                  aria-pressed={node === i}
                >
                  <span className="specialist-icon">{["⌕", "▤", "◇"][i]}</span>
                  {agent}
                  <span className="specialist-index">0{i + 1}</span>
                </button>
              ))}
            </div>
            <div className="diagram-down">↓</div>
            <button
              className={`case-model ${node === 3 ? "selected-model" : ""}`}
              onClick={() => setNode(3)}
              aria-pressed={node === 3}
            >
              <span>◇</span>
              <div>
                <strong>{c.decision}</strong>
                <small>Evidence + decision model + your policies</small>
              </div>
              <span>↗</span>
            </button>
          </div>
          <div className="diagram-down">↓</div>
          <div className="outcomes-row">
            {c.outcomes.map((outcome, i) => (
              <span key={outcome}>
                <i className={`outcome-dot outcome-${i}`} />
                {outcome}
              </span>
            ))}
          </div>
          <div className="human-review">
            <span>◎</span>Human approval before consequential actions
          </div>
          <div className="node-detail" aria-live="polite">
            <span className="copy-label">
              {node === 3 ? "DECISION MODEL" : c.agents[node].toUpperCase()}
            </span>
            <p>{node === 3 ? c.model : c.details[node]}</p>
            <small>Select a component to explore its role.</small>
          </div>
        </div>
      </div>
      <p className="diagram-note">
        Illustrative workflow designs, not connected banking or payment
        services. Your data, integrations, policies, and approval paths shape
        the implementation.
      </p>
    </section>
  );
}

const layers = [
  {
    number: "01",
    label: "Your business context",
    text: "The problem, the people, the rules.",
    tags: ["Domain knowledge", "Policies", "Success criteria"],
  },
  {
    number: "02",
    label: "Your data & systems",
    text: "Bring the tools your teams already use.",
    tags: ["Documents", "APIs", "Databases", "Internal tools"],
  },
  {
    number: "03",
    label: "Agentic orchestration",
    text: "Specialist agents working toward one outcome.",
    tags: ["Task planning", "Shared context", "Tool use", "Handoffs"],
  },
  {
    number: "04",
    label: "Decision intelligence",
    text: "Move from gathered evidence to an informed next step.",
    tags: ["Decision models", "Evidence evaluation", "Uncertainty"],
  },
  {
    number: "05",
    label: "Action & oversight",
    text: "Keep consequential decisions accountable.",
    tags: ["Human review", "Approval gates", "Decision traces"],
  },
];

export function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="nav-container">
          <Logo />
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close −" : "Menu +"}
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? "nav-open" : ""}
            aria-label="Main navigation"
            onClick={() => setMenuOpen(false)}
          >
            <a href="#platform">Platform</a>
            <a href="#use-cases">Use cases</a>
            <a href="#architecture">Architecture</a>
            <a href="./evidence.html">
              Evidence lab <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <a
            className="header-cta"
            href={REPO}
            target="_blank"
            rel="noreferrer"
          >
            Build with Yantraa <Arrow diagonal />
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <a
              className="open-source-pill"
              href={REPO}
              target="_blank"
              rel="noreferrer"
            >
              <span className="status-dot" /> OPEN SOURCE. OPEN POSSIBILITIES.{" "}
              <Arrow diagonal />
            </a>
            <h1 id="hero-title">
              Your industry.
              <br />
              Your workflows.
              <br />
              <span className="serif-word">Agentic by design.</span>
            </h1>
            <p className="hero-description">
              Turn complex business problems into connected, intelligent
              workflows. An open-source environment for building AI agents
              around the way <em>your</em> company works.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#use-cases">
                Explore the possibilities <Arrow />
              </a>
              <a
                className="text-link"
                href={REPO}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub <Arrow diagonal />
              </a>
            </div>
            <div className="hero-footnote">
              <BrandMark className="small-cross" /> Domain-specific agents.
              Evidence-led decisions. Human oversight.
            </div>
          </div>
          <HeroFlow />
        </section>
        <div className="principles-strip">
          <div className="section-wrap principles-inner">
            <span>
              BUILT FOR THE PROBLEM.
              <br />
              <strong>OWNED BY YOU.</strong>
            </span>
            <p>
              <span>01</span> Your industry context
            </p>
            <p>
              <span>02</span> Your tools & data
            </p>
            <p>
              <span>03</span> Your decision logic
            </p>
            <p>
              <span>04</span> Your deployment
            </p>
          </div>
        </div>
        <section
          className="platform section-wrap"
          id="platform"
          aria-labelledby="platform-title"
        >
          <div className="section-eyebrow">
            <span className="tiny-square" /> THE YANTRAA IDEA{" "}
            <span className="section-number">01 / PLATFORM</span>
          </div>
          <div className="section-intro">
            <h2 id="platform-title">
              Connected intelligence.
              <br />
              <span className="muted">For the whole problem.</span>
            </h2>
            <p>
              Yantraa brings agents, business context, and decision intelligence
              into one vision: an end-to-end solution built around a specific
              outcome.
            </p>
          </div>
          <div className="capability-grid">
            <article>
              <div className="capability-top">
                <span className="capability-icon">⌘</span>
                <span className="mono">CONTEXT</span>
              </div>
              <h3>Start with your domain.</h3>
              <p>
                A diligence review and a payment exception need different
                knowledge, tools, and boundaries. Design for the use case from
                the start.
              </p>
              <span className="card-footer">
                The right problem, clearly defined <Arrow />
              </span>
            </article>
            <article>
              <div className="capability-top">
                <span className="capability-icon">⤢</span>
                <span className="mono">ORCHESTRATION</span>
              </div>
              <h3>Let specialists work together.</h3>
              <p>
                Shape workflows around focused agents that research, analyze,
                check, and hand off work with the context the next step needs.
              </p>
              <span className="card-footer">
                Connected work, from end to end <Arrow />
              </span>
            </article>
            <article>
              <div className="capability-top">
                <span className="capability-icon">◇</span>
                <span className="mono">DECISION INTELLIGENCE</span>
              </div>
              <h3>Make the next step informed.</h3>
              <p>
                We’re developing workflows that integrate decision models to
                evaluate evidence, express uncertainty, and support accountable
                action.
              </p>
              <span className="card-footer">
                Decision-model integration · in development
              </span>
            </article>
          </div>
        </section>
        <UseCases />
        <section
          className="architecture-section"
          id="architecture"
          aria-labelledby="architecture-title"
        >
          <div className="section-wrap">
            <div className="section-eyebrow">
              <span className="tiny-square" /> FROM CONTEXT TO CONSEQUENCE{" "}
              <span className="section-number">03 / ARCHITECTURE</span>
            </div>
            <div className="architecture-layout">
              <div className="architecture-copy">
                <h2 id="architecture-title">
                  The entire workflow.
                  <br />
                  <span className="serif-word">From context to action.</span>
                </h2>
                <p>
                  A useful agentic system needs more than a model call. It needs
                  your business context, coordinated tools, a way to evaluate
                  decisions, and a clear path to human review.
                </p>
                <p>
                  Yantraa’s reference architecture connects those pieces around
                  the outcome you want to achieve.
                </p>
                <a
                  className="text-link"
                  href={`${REPO}/blob/main/docs/design.md`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the technical foundation <Arrow diagonal />
                </a>
                <div className="architecture-note">
                  <span>↳</span>
                  <p>
                    <strong>Build the workflow your business needs.</strong>
                    These layers describe the architecture vision; integrations
                    and deployment controls are implemented for each use case.
                  </p>
                </div>
              </div>
              <div
                className="layer-stack"
                aria-label="Reference architecture, from business context through action and oversight"
              >
                {layers.map((layer) => (
                  <div
                    className={`architecture-layer layer-${layer.number}`}
                    key={layer.number}
                  >
                    <span className="layer-number">{layer.number}</span>
                    <div>
                      <h3>{layer.label}</h3>
                      <p>{layer.text}</p>
                      <div className="layer-tags">
                        {layer.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <span className="layer-arrow" aria-hidden="true">
                      {layer.number === "05" ? "↗" : "↓"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="evidence-section section-wrap"
          id="open-source"
          aria-labelledby="evidence-title"
        >
          <div className="evidence-art" aria-hidden="true">
            <div className="evidence-orbit orbit-one" />
            <div className="evidence-orbit orbit-two" />
            <div className="evidence-orbit orbit-three" />
            <span className="evidence-center">
              <BrandMark />
            </span>
            <span className="orbit-label label-check">Evidence</span>
            <span className="orbit-label label-cost">Cost</span>
            <span className="orbit-label label-quality">Decision quality</span>
            <span className="art-caption mono">
              THE FOUNDATION / YANTRAA EVIDENCE
            </span>
          </div>
          <div className="evidence-copy">
            <div className="section-eyebrow">
              <span className="tiny-square" /> OPEN SOURCE, ALREADY IN MOTION
            </div>
            <h2 id="evidence-title">
              Better decisions start
              <br />
              with better questions.
            </h2>
            <p>
              How much evidence does an AI need before it decides? What does
              each check cost? When should it stop and ask for help?
            </p>
            <p>
              <strong>Yantraa Evidence</strong>, our available Python package,
              lets you compare evidence-gathering strategies on cost and
              decision quality. It’s the experimental foundation for the broader
              Yantraa vision.
            </p>
            <div className="release-line">
              <span className="status-dot" />
              Available: evidence evaluation{" "}
              <span className="release-divider">/</span> Developing: integrated
              agentic workflows
            </div>
            <a className="button button-outline" href="./evidence.html">
              Explore the evidence lab <Arrow diagonal />
            </a>
          </div>
        </section>
        <section className="build-section section-wrap" id="get-started">
          <div className="build-inner">
            <div>
              <span className="section-eyebrow">
                YOUR NEXT WORKFLOW STARTS HERE
              </span>
              <h2>
                Bring the problem.
                <br />
                <span className="serif-word">Build what comes next.</span>
              </h2>
              <p>
                Explore the code, experiment with the evidence engine,
                <br className="desktop-break" /> or share the industry workflow
                you want to build.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-accent"
                  href={REPO}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start building on GitHub <Arrow diagonal />
                </a>
                <a
                  className="text-link"
                  href={ISSUE}
                  target="_blank"
                  rel="noreferrer"
                >
                  Discuss your use case <Arrow diagonal />
                </a>
              </div>
            </div>
            <div className="build-symbol" aria-hidden="true">
              <BrandMark />
            </div>
            <div className="build-bottom">
              <span>OPEN SOURCE BY DESIGN</span>
              <span>YOUR CONTEXT. YOUR CODE. YOUR POSSIBILITIES.</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <div className="footer-main">
          <Logo small />
          <p>
            Purpose-built intelligence.
            <br />
            From industry problem to informed action.
          </p>
          <div>
            <a href={REPO} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a
              href={`${REPO}/blob/main/README.md`}
              target="_blank"
              rel="noreferrer"
            >
              Documentation <Arrow diagonal />
            </a>
            <a href="./evidence.html">
              Evidence lab <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Yantraa contributors</span>
          <a
            href={`${REPO}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
          >
            Open source · Apache 2.0 <Arrow diagonal />
          </a>
          <span>Built around what matters.</span>
        </div>
      </footer>
    </>
  );
}
