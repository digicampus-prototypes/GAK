const QUESTIONS = {
  stage: {
    layer: 1,
    short: "Starting point",
    prompt: "Where is your municipality in the AI journey?",
    help: "Pick the option that best matches your current status.",
    options: [
      {
        value: "explore",
        label: "Exploring use cases",
        note: "No pilots are running yet; you are prioritizing ideas.",
        next: "rightsImpact",
      },
      {
        value: "pilot",
        label: "Running one or more pilots",
        note: "Testing solutions in real municipal workflows.",
        next: "rightsImpact",
      },
      {
        value: "live",
        label: "Already in live operations",
        note: "AI is used for real municipal processes today.",
        next: "rightsImpact",
      },
    ],
  },
  rightsImpact: {
    layer: 2,
    short: "Public-rights impact",
    prompt:
      "Will AI output influence rights or access to public services (benefits, permits, housing, education, policing, employment)?",
    help: "If unsure, pick the cautious option.",
    options: [
      {
        value: "yes",
        label: "Yes, it can affect rights or access",
        note: "Residents could be materially affected by AI-supported decisions.",
        next: "prohibitedSignals",
      },
      {
        value: "unsure",
        label: "Not sure yet",
        note: "Impact exists but boundaries are still unclear.",
        next: "prohibitedSignals",
      },
      {
        value: "no",
        label: "No, mostly internal support",
        note: "Mainly drafting, triage, productivity, or back-office support.",
        next: "prohibitedSignals",
      },
    ],
  },
  prohibitedSignals: {
    layer: 3,
    short: "Prohibited-use check",
    prompt:
      "Does the use case include possible prohibited practices (social scoring, untargeted face scraping, certain emotion recognition uses, or similar)?",
    help: "If yes, your final branch will force a stop-and-redesign path.",
    options: [
      {
        value: "yes",
        label: "Yes or likely yes",
        note: "At least one prohibited pattern appears in scope.",
        next: "dataSensitivity",
      },
      {
        value: "unsure",
        label: "Unclear; legal interpretation needed",
        note: "You need legal review before procurement or rollout.",
        next: "dataSensitivity",
      },
      {
        value: "no",
        label: "No prohibited patterns in scope",
        note: "Proceed to data and human-impact checks.",
        next: "dataSensitivity",
      },
    ],
  },
  dataSensitivity: {
    layer: 4,
    short: "Data sensitivity",
    prompt: "What is the highest data sensitivity in scope?",
    help: "Choose the highest level you expect in production.",
    options: [
      {
        value: "anonymous",
        label: "Anonymous or synthetic only",
        note: "No personal data is processed.",
        next: "automation",
      },
      {
        value: "personal",
        label: "Personal data",
        note: "Data identifies or can identify residents or staff.",
        next: "automation",
      },
      {
        value: "special",
        label: "Special category or vulnerable-group data",
        note: "Health, children, or similar protected-context data.",
        next: "automation",
      },
      {
        value: "biometric",
        label: "Biometric or remote identification data",
        note: "Face, voice, gait, or related biometric processing.",
        next: "automation",
      },
    ],
  },
  automation: {
    layer: 5,
    short: "Decision automation",
    prompt: "How is AI used in decision-making?",
    help: "This strongly affects safeguards and menselijke maat outcomes.",
    options: [
      {
        value: "fully",
        label: "Fully automated decision or scoring",
        note: "Output may directly determine a service or legal effect.",
        next: "sourcing",
      },
      {
        value: "human_loop",
        label: "Human-in-the-loop decision support",
        note: "Staff can override and remain accountable.",
        next: "sourcing",
      },
      {
        value: "assistive",
        label: "Assistive only (no direct decision impact)",
        note: "Drafting, summarization, and operational support only.",
        next: "sourcing",
      },
    ],
  },
  sourcing: {
    layer: 6,
    short: "Technology sourcing",
    prompt: "How will the municipality source the AI capability?",
    help: "Supply chain choices affect procurement and audit controls.",
    options: [
      {
        value: "vendor",
        label: "Third-party vendor or GPAI service",
        note: "External provider hosts model and/or application.",
        next: "procurement",
      },
      {
        value: "hybrid",
        label: "Hybrid (vendor + local custom components)",
        note: "External model with municipal integration.",
        next: "procurement",
      },
      {
        value: "inhouse",
        label: "Primarily in-house model/system",
        note: "Municipality controls model lifecycle directly.",
        next: "procurement",
      },
    ],
  },
  procurement: {
    layer: 7,
    short: "Procurement readiness",
    prompt: "Are AI-specific procurement controls already in place?",
    help: "Think audit rights, logs, incident notification, and data-processing clauses.",
    options: [
      {
        value: "ready",
        label: "Yes, ready and standardized",
        note: "Controls are embedded in tender and contract templates.",
        next: "audience",
      },
      {
        value: "partial",
        label: "Partly; some controls exist",
        note: "Coverage is inconsistent across teams or contracts.",
        next: "audience",
      },
      {
        value: "none",
        label: "Not yet",
        note: "No AI-specific guardrails are formally defined.",
        next: "audience",
      },
    ],
  },
  audience: {
    layer: 8,
    short: "Primary users",
    prompt: "Who uses the AI-supported workflow directly?",
    help: "This defines whether impacts are direct for residents or mainly internal.",
    options: [
      {
        value: "civilians",
        label: "Residents/civilians",
        note: "Tool interaction is primarily citizen-facing.",
        next: "fallback",
      },
      {
        value: "civil_servants",
        label: "Civil servants",
        note: "Used mainly by municipal staff in service delivery.",
        next: "fallback",
      },
      {
        value: "both",
        label: "Both residents and civil servants",
        note: "Mixed workflow or shared system.",
        next: "fallback",
      },
    ],
  },
  fallback: {
    layer: 9,
    short: "Human fallback",
    prompt: "If the AI flow fails or a person struggles, what human fallback is guaranteed?",
    help: "A strong fallback is central to menselijke maat.",
    options: [
      {
        value: "immediate",
        label: "Immediate same-contact handover",
        note: "Person can switch to a human channel right away.",
        next: "stressCoverage",
      },
      {
        value: "delayed",
        label: "Delayed callback/follow-up",
        note: "Human support exists, but not immediately.",
        next: "stressCoverage",
      },
      {
        value: "none",
        label: "No defined human fallback",
        note: "No guaranteed route to human support.",
        next: "stressCoverage",
      },
    ],
  },
  stressCoverage: {
    layer: 10,
    short: "10-case stress test",
    prompt:
      "How many of your 10 hardest resident profiles have you tested end-to-end against the current system baseline?",
    help: "The higher the coverage, the stronger the menselijke maat evidence.",
    options: [
      {
        value: "low",
        label: "0 to 2 tested",
        note: "Very limited stress testing so far.",
        next: "measurement",
      },
      {
        value: "medium",
        label: "3 to 6 tested",
        note: "Partial stress-test coverage.",
        next: "measurement",
      },
      {
        value: "high",
        label: "7 to 10 tested",
        note: "Broad stress testing done before scaling.",
        next: "measurement",
      },
    ],
  },
  measurement: {
    layer: 11,
    short: "Outcome measurement",
    prompt:
      "Do you measure outcomes versus current systems on better/worse/quicker/easier for both residents and civil servants?",
    help: "Without this baseline comparison, menselijke maat claims stay unproven.",
    options: [
      {
        value: "robust",
        label: "Yes, robust and recurring",
        note: "Metrics are segmented and reviewed periodically.",
        next: "result",
      },
      {
        value: "partial",
        label: "Partly",
        note: "Some metrics exist but not complete or segmented.",
        next: "result",
      },
      {
        value: "none",
        label: "Not yet",
        note: "No systematic comparison to current systems.",
        next: "result",
      },
    ],
  },
};

const answerLookup = {
  stage: {
    explore: "Exploring",
    pilot: "Pilot",
    live: "Live operations",
  },
  rightsImpact: {
    yes: "Rights impact: Yes",
    unsure: "Rights impact: Unclear",
    no: "Rights impact: No",
  },
  prohibitedSignals: {
    yes: "Prohibited risk flagged",
    unsure: "Prohibited risk unclear",
    no: "No prohibited indicators",
  },
  dataSensitivity: {
    anonymous: "Anonymous data",
    personal: "Personal data",
    special: "Special/vulnerable data",
    biometric: "Biometric data",
  },
  automation: {
    fully: "Fully automated decisioning",
    human_loop: "Human-in-the-loop",
    assistive: "Assistive use only",
  },
  sourcing: {
    vendor: "Vendor/GPAI sourcing",
    hybrid: "Hybrid sourcing",
    inhouse: "In-house system",
  },
  procurement: {
    ready: "Procurement ready",
    partial: "Procurement partial",
    none: "Procurement not ready",
  },
  audience: {
    civilians: "Direct residents",
    civil_servants: "Civil servants only",
    both: "Residents + civil servants",
  },
  fallback: {
    immediate: "Immediate human fallback",
    delayed: "Delayed human fallback",
    none: "No fallback",
  },
  stressCoverage: {
    low: "10-case coverage: low",
    medium: "10-case coverage: medium",
    high: "10-case coverage: high",
  },
  measurement: {
    robust: "Measurement: robust",
    partial: "Measurement: partial",
    none: "Measurement: none",
  },
};

const PERSONAS = [
  {
    id: "literacy",
    label: "Resident with low literacy",
    watchpoint: "Plain language and guided prompts.",
    plainLanguage: true,
    highNeed: true,
  },
  {
    id: "digital",
    label: "Digitally low-skilled resident",
    watchpoint: "Need assisted digital and walk-in support.",
    digital: true,
    highNeed: true,
  },
  {
    id: "visual",
    label: "Resident with visual impairment",
    watchpoint: "Screen-reader and contrast accessibility.",
    accessibility: true,
    highNeed: true,
  },
  {
    id: "hearing",
    label: "Resident with hearing impairment",
    watchpoint: "Text-first alternatives for voice/phone steps.",
    accessibility: true,
    highNeed: true,
  },
  {
    id: "stress",
    label: "Resident under stress or cognitive overload",
    watchpoint: "Empathetic human intervention capacity.",
    empathy: true,
    highNeed: true,
  },
  {
    id: "multiproblem",
    label: "Household with multi-problem case complexity",
    watchpoint: "Cross-domain case ownership and escalation path.",
    complex: true,
    highNeed: true,
  },
  {
    id: "language",
    label: "Resident with language barrier",
    watchpoint: "Translation quality and multilingual support.",
    translation: true,
    highNeed: true,
  },
  {
    id: "offline",
    label: "Resident with no stable device or internet",
    watchpoint: "Offline and phone alternatives must remain available.",
    offline: true,
    highNeed: true,
  },
  {
    id: "elderly",
    label: "Elderly resident dependent on caregiver",
    watchpoint: "Continuity and consent-aware support.",
    continuity: true,
    highNeed: true,
  },
  {
    id: "trust",
    label: "Resident with low trust in government",
    watchpoint: "Transparency, explainability, and contestability.",
    trust: true,
    highNeed: true,
  },
];

const dom = {
  layerBadge: document.querySelector("#layerBadge"),
  questionTitle: document.querySelector("#questionTitle"),
  questionHelp: document.querySelector("#questionHelp"),
  options: document.querySelector("#options"),
  routeList: document.querySelector("#routeList"),
  backBtn: document.querySelector("#backBtn"),
  restartBtn: document.querySelector("#restartBtn"),
  downloadBtn: document.querySelector("#downloadBtn"),
  resultCard: document.querySelector("#resultCard"),
  resultTitle: document.querySelector("#resultTitle"),
  resultIntro: document.querySelector("#resultIntro"),
  profilePills: document.querySelector("#profilePills"),
  planSteps: document.querySelector("#planSteps"),
  branchReasons: document.querySelector("#branchReasons"),
  humanTableBody: document.querySelector("#humanTableBody"),
  humanSummary: document.querySelector("#humanSummary"),
};

const state = {
  current: "stage",
  answers: {},
  order: [],
  showingResult: false,
  markdown: "",
};

function init() {
  dom.backBtn.addEventListener("click", handleBack);
  dom.restartBtn.addEventListener("click", resetAll);
  dom.downloadBtn.addEventListener("click", downloadPlan);
  render();
}

function render() {
  renderQuestion();
  renderPath();
  dom.backBtn.disabled = state.order.length === 0 && !state.showingResult;
}

function renderQuestion() {
  if (state.showingResult) {
    dom.layerBadge.textContent = "Result";
    dom.questionTitle.textContent = "Review your branch below";
    dom.questionHelp.textContent = "Use Back to change an answer and recalculate.";
    dom.options.innerHTML = "";
    return;
  }

  const q = QUESTIONS[state.current];
  dom.layerBadge.textContent = `Layer ${q.layer} - ${q.short}`;
  dom.questionTitle.textContent = q.prompt;
  dom.questionHelp.textContent = q.help;
  dom.options.innerHTML = "";

  q.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.innerHTML = `<strong>${option.label}</strong><span>${option.note}</span>`;
    button.addEventListener("click", () => chooseOption(option));
    dom.options.appendChild(button);
  });
}

function renderPath() {
  dom.routeList.innerHTML = "";
  state.order.forEach((id, index) => {
    const li = document.createElement("li");
    const q = QUESTIONS[id];
    const answerValue = state.answers[id];
    const answerLabel = answerLookup[id] && answerLookup[id][answerValue] ? answerLookup[id][answerValue] : "-";
    li.textContent = `Layer ${index + 1}: ${q.short} -> ${answerLabel}`;
    dom.routeList.appendChild(li);
  });
}

function pruneAfter(questionId) {
  const index = state.order.indexOf(questionId);
  if (index === -1) {
    return;
  }
  const removed = state.order.slice(index + 1);
  removed.forEach((id) => {
    delete state.answers[id];
  });
  state.order = state.order.slice(0, index + 1);
}

function chooseOption(option) {
  const qId = state.current;

  if (!state.order.includes(qId)) {
    state.order.push(qId);
  } else {
    pruneAfter(qId);
  }
  state.answers[qId] = option.value;

  if (option.next === "result") {
    buildResult();
    return;
  }

  state.current = option.next;
  state.showingResult = false;
  dom.resultCard.classList.add("hidden");
  dom.downloadBtn.disabled = true;
  render();
}

function handleBack() {
  if (state.showingResult) {
    state.showingResult = false;
    dom.resultCard.classList.add("hidden");
    const previous = state.order[state.order.length - 1];
    if (previous) {
      state.current = previous;
    }
    dom.downloadBtn.disabled = true;
    render();
    return;
  }

  if (state.order.length === 0) {
    return;
  }

  const lastAnswered = state.order[state.order.length - 1];
  if (state.current !== lastAnswered) {
    state.current = lastAnswered;
    render();
    return;
  }

  const removed = state.order.pop();
  delete state.answers[removed];
  state.current = state.order.length > 0 ? state.order[state.order.length - 1] : "stage";
  render();
}

function resetAll() {
  state.current = "stage";
  state.answers = {};
  state.order = [];
  state.showingResult = false;
  state.markdown = "";
  dom.resultCard.classList.add("hidden");
  dom.downloadBtn.disabled = true;
  render();
}

function buildResult() {
  const profile = {
    stage: state.answers.stage,
    rightsImpact: state.answers.rightsImpact,
    prohibitedSignals: state.answers.prohibitedSignals,
    dataSensitivity: state.answers.dataSensitivity,
    automation: state.answers.automation,
    sourcing: state.answers.sourcing,
    procurement: state.answers.procurement,
    audience: state.answers.audience,
    fallback: state.answers.fallback,
    stressCoverage: state.answers.stressCoverage,
    measurement: state.answers.measurement,
  };

  const model = generatePlan(profile);

  dom.resultTitle.textContent = model.title;
  dom.resultIntro.textContent = model.intro;

  dom.profilePills.innerHTML = "";
  model.pills.forEach((pill) => {
    const span = document.createElement("span");
    span.className = `pill${pill.warn ? " warn" : ""}`;
    span.textContent = pill.label;
    dom.profilePills.appendChild(span);
  });

  dom.planSteps.innerHTML = "";
  model.steps.forEach((stepText) => {
    const li = document.createElement("li");
    li.textContent = stepText;
    dom.planSteps.appendChild(li);
  });

  dom.branchReasons.innerHTML = "";
  model.reasons.forEach((reason) => {
    const li = document.createElement("li");
    li.textContent = reason;
    dom.branchReasons.appendChild(li);
  });

  dom.humanTableBody.innerHTML = "";
  model.humanRows.forEach((row) => {
    const tr = document.createElement("tr");
    appendTextCell(tr, row.caseLabel);
    appendTagCell(tr, row.better);
    appendTagCell(tr, row.worseRisk);
    appendTagCell(tr, row.quicker);
    appendTagCell(tr, row.easier);
    appendTextCell(tr, row.watchpoint);
    dom.humanTableBody.appendChild(tr);
  });
  dom.humanSummary.textContent = model.humanSummary;

  state.markdown = toMarkdown(model, profile);
  state.showingResult = true;
  dom.downloadBtn.disabled = false;
  dom.resultCard.classList.remove("hidden");
  render();
}

function appendTextCell(row, text) {
  const td = document.createElement("td");
  td.textContent = text;
  row.appendChild(td);
}

function appendTagCell(row, status) {
  const td = document.createElement("td");
  const span = document.createElement("span");
  span.className = `tag ${status.className}`;
  span.textContent = status.label;
  td.appendChild(span);
  row.appendChild(td);
}

function generatePlan(profile) {
  const prohibited = profile.prohibitedSignals === "yes";
  const prohibitedUnclear = profile.prohibitedSignals === "unsure";
  const sensitiveData = ["special", "biometric"].includes(profile.dataSensitivity);
  const personalData = ["personal", "special", "biometric"].includes(profile.dataSensitivity);
  const highRiskCandidate =
    profile.rightsImpact === "yes" || profile.automation === "fully" || sensitiveData;
  const vendorDependency = ["vendor", "hybrid"].includes(profile.sourcing);
  const procurementGap = profile.procurement === "none" || profile.procurement === "partial";
  const residentFacing = profile.audience === "civilians" || profile.audience === "both";
  const staffFacing = profile.audience === "civil_servants" || profile.audience === "both";
  const fallbackImmediate = profile.fallback === "immediate";
  const fallbackNone = profile.fallback === "none";
  const lowStressCoverage = profile.stressCoverage === "low";
  const mediumStressCoverage = profile.stressCoverage === "medium";
  const highStressCoverage = profile.stressCoverage === "high";
  const measurementGap = profile.measurement === "none" || profile.measurement === "partial";
  const robustMeasurement = profile.measurement === "robust";

  const humanAnalysis = generateHumanMaatAnalysis(profile);
  const highWorseRiskCount = humanAnalysis.rows.filter((row) => row.worseRisk.label === "High").length;
  const harderCount = humanAnalysis.rows.filter((row) => row.easier.label === "Harder").length;
  const likelyWorseCount = humanAnalysis.rows.filter((row) => row.better.label === "Worse").length;

  const pills = [];
  pills.push({ label: answerLookup.stage[profile.stage] || "Stage not set" });
  if (prohibited) {
    pills.push({ label: "Track: Stop-and-redesign", warn: true });
  } else {
    pills.push({
      label: highRiskCandidate ? "Track: High-risk candidate" : "Track: Limited/moderate-risk",
      warn: highRiskCandidate,
    });
  }
  pills.push({
    label: residentFacing ? "Citizen-facing impact" : "Internal-first impact",
    warn: residentFacing && !fallbackImmediate,
  });
  if (vendorDependency) {
    pills.push({ label: "External provider dependency" });
  }
  if (personalData) {
    pills.push({ label: "GDPR-heavy workload", warn: profile.dataSensitivity !== "personal" });
  }
  pills.push({
    label: robustMeasurement ? "Menselijke maat measured" : "Menselijke maat not yet proven",
    warn: !robustMeasurement,
  });

  const reasons = [];
  if (prohibited) {
    reasons.push("You flagged indicators that can map to prohibited AI practices.");
  }
  if (prohibitedUnclear) {
    reasons.push("Potential prohibited-practice exposure is still legally unclear.");
  }
  if (highRiskCandidate) {
    reasons.push("Your answers indicate a likely high-impact or rights-sensitive use case.");
  }
  if (personalData) {
    reasons.push("Personal-data processing requires GDPR legal basis and likely impact assessment.");
  }
  if (vendorDependency) {
    reasons.push("Supplier governance and contractual controls are critical.");
  }
  if (procurementGap) {
    reasons.push("Current procurement setup is not yet strong enough for repeatable compliant rollout.");
  }
  if (fallbackNone) {
    reasons.push("No guaranteed human fallback creates a direct menselijke maat risk.");
  }
  if (lowStressCoverage) {
    reasons.push("Very low 10-case stress-test coverage weakens evidence for real-world fairness.");
  }
  if (measurementGap) {
    reasons.push("Without consistent better/worse/quicker/easier measurement, impact remains unverified.");
  }
  if (highWorseRiskCount >= 4) {
    reasons.push(`${highWorseRiskCount} of 10 hard cases still show high risk of worse outcomes.`);
  }
  if (harderCount >= 4) {
    reasons.push(`${harderCount} of 10 hard cases are likely harder than the current service journey.`);
  }
  if (likelyWorseCount >= 3) {
    reasons.push(`${likelyWorseCount} of 10 hard cases are likely to have worse outcomes than baseline.`);
  }
  if (!residentFacing) {
    reasons.push("Benefits to residents are indirect; frontline translation into service quality must be tested.");
  }
  if (reasons.length === 0) {
    reasons.push("Your path fits a lower-risk adoption lane with relatively strong safeguards.");
  }

  const steps = [];
  if (prohibited) {
    steps.push(
      "Freeze the current design immediately and run a legal red-team review before any procurement or pilot expansion."
    );
    steps.push(
      "Redesign the use case to remove prohibited techniques and document the redesign decision in an AI use-case register."
    );
  }

  if (profile.stage === "explore") {
    steps.push(
      "Start with one bounded use case and define measurable public value, success criteria, and explicit non-goals."
    );
  }
  if (profile.stage === "pilot") {
    steps.push(
      "Pause scale-up and set pilot guardrails: scope limits, rollback trigger, and mandatory accountable human review."
    );
  }
  if (profile.stage === "live") {
    steps.push(
      "Run a 30-day compliance and human-impact gap assessment on live systems before expanding functionality."
    );
  }

  steps.push(
    "Form a municipal AI governance cell (service owner, legal, DPO, procurement, security, citizen-service representative) with weekly decision logs."
  );
  steps.push(
    "Classify each use case under the AI Act (prohibited, high-risk candidate, limited risk) and keep evidence auditable."
  );

  if (prohibited) {
    steps.push(
      "After redesign, restart risk classification from the beginning and require formal legal sign-off before pilot restart."
    );
  } else if (highRiskCandidate) {
    steps.push(
      "Treat the solution as high-risk candidate until proven otherwise; prepare technical documentation, risk management, human oversight, and post-market monitoring."
    );
    steps.push(
      "Plan implementation milestones against 2 August 2026, when most AI Act obligations start to apply."
    );
  } else {
    steps.push(
      "Keep the system in a limited-risk lane: transparent disclosures, quality controls, and documented human fallback."
    );
  }

  if (personalData) {
    steps.push(
      "Define GDPR lawful basis, minimization, retention, and security controls; run DPIA when risk thresholds are met."
    );
  } else {
    steps.push("Maintain strict data minimization and avoid unnecessary personal-data ingestion.");
  }

  if (profile.automation === "fully") {
    steps.push(
      "Introduce mandatory human review, appeal pathways, and contestability before any legally significant decision output."
    );
  } else if (profile.automation === "human_loop") {
    steps.push(
      "Document exact override authority for staff and monitor override rates as a fairness and quality indicator."
    );
  } else {
    steps.push(
      "Constrain usage to assistive tasks and technically block direct automated decisioning."
    );
  }

  if (vendorDependency) {
    steps.push(
      "Use AI-specific contract clauses: audit rights, model-change notifications, log access, incident SLAs, and sub-processor transparency."
    );
  }
  if (procurementGap) {
    steps.push(
      "Build a standard AI procurement pack (technical questionnaire, legal clauses, security annex) before new tenders."
    );
  }

  steps.push(
    "Create a menselijke maat charter with service principles: dignity, accessibility, proportionality, and no dead-end channels."
  );
  steps.push(
    "Run and document the 10 hardest-case benchmark against current systems using better/worse/quicker/easier scores before scaling."
  );

  if (residentFacing) {
    steps.push(
      "Provide multi-channel resident access (digital, phone, desk) and guarantee an immediate route to a human for vulnerable situations."
    );
  } else if (staffFacing) {
    steps.push(
      "For staff-facing tools, test downstream resident effects explicitly to ensure internal efficiency does not reduce resident service quality."
    );
  }

  if (fallbackNone) {
    steps.push(
      "Implement a same-day human fallback SLA and publish escalation routes visible to residents and frontline staff."
    );
  }

  if (lowStressCoverage || mediumStressCoverage) {
    steps.push(
      "Expand stress-test coverage to all 10 hard cases and include at least one real-world scenario per case type."
    );
  } else if (highStressCoverage) {
    steps.push(
      "Use completed stress-test evidence as a go/no-go gate in governance and procurement decisions."
    );
  }

  if (measurementGap) {
    steps.push(
      "Stand up quarterly metrics segmented by residents and civil servants: completion, error correction, appeals, and channel drop-off."
    );
  } else {
    steps.push(
      "Keep quarterly menselijke maat reporting public and include corrective actions for any case that trends worse than baseline."
    );
  }

  steps.push(
    "Deliver role-based AI literacy training for procurement, frontline services, legal, and management with annual refresh cycles."
  );
  steps.push(
    "Publish plain-language transparency notice: purpose, data used, human oversight, and complaint/appeal route."
  );
  steps.push(
    "Set quarterly monitoring on drift, bias, incidents, vendor changes, and retirement criteria for underperforming systems."
  );

  const title = prohibited
    ? "Branch outcome: Stop-and-redesign before implementation"
    : highRiskCandidate
      ? "Branch outcome: High-risk candidate implementation track"
      : "Branch outcome: Limited/moderate-risk implementation track";

  const intro = prohibited
    ? "This branch prioritizes immediate risk containment, then controlled redesign aligned with EU requirements and menselijke maat safeguards."
    : "This branch balances practical rollout with legal compliance, operational governance, and menselijke maat outcomes.";

  return {
    title,
    intro,
    pills,
    reasons,
    steps,
    humanRows: humanAnalysis.rows,
    humanSummary: humanAnalysis.summary,
  };
}

function generateHumanMaatAnalysis(profile) {
  const rows = PERSONAS.map((persona) => evaluatePersona(persona, profile));
  const highRiskCount = rows.filter((row) => row.worseRisk.label === "High").length;
  const hardCount = rows.filter((row) => row.easier.label === "Harder").length;
  const worseCount = rows.filter((row) => row.better.label === "Worse").length;
  const quickCount = rows.filter((row) => row.quicker.label === "Quicker").length;

  const summary = `${highRiskCount}/10 high worse-risk, ${hardCount}/10 harder, ${worseCount}/10 likely worse outcomes, ${quickCount}/10 quicker than baseline. Prioritize high-risk and harder cases before scale-up.`;

  return { rows, summary };
}

function evaluatePersona(persona, profile) {
  let betterScore = 0;
  let worseRiskScore = 0;
  let quickerScore = 0;
  let easierScore = 0;

  const residentFacing = profile.audience === "civilians" || profile.audience === "both";
  const fallback = profile.fallback;

  if (residentFacing) {
    betterScore += 1;
    quickerScore += 1;
    easierScore += 1;
  } else {
    betterScore -= 1;
    easierScore -= 1;
  }

  if (fallback === "immediate") {
    betterScore += 1;
    easierScore += 2;
    worseRiskScore -= 1;
  } else if (fallback === "delayed") {
    worseRiskScore += 1;
  } else if (fallback === "none") {
    betterScore -= 1;
    easierScore -= 2;
    worseRiskScore += 3;
  }

  if (profile.stressCoverage === "high") {
    betterScore += 1;
    easierScore += 1;
    worseRiskScore -= 1;
  } else if (profile.stressCoverage === "medium") {
    worseRiskScore += 1;
  } else if (profile.stressCoverage === "low") {
    betterScore -= 1;
    easierScore -= 1;
    worseRiskScore += 2;
  }

  if (profile.measurement === "robust") {
    betterScore += 1;
    worseRiskScore -= 1;
  } else if (profile.measurement === "partial") {
    worseRiskScore += 1;
  } else if (profile.measurement === "none") {
    betterScore -= 1;
    worseRiskScore += 2;
  }

  if (profile.automation === "fully") {
    quickerScore += 2;
    betterScore -= 1;
    easierScore -= 1;
    worseRiskScore += 2;
  } else if (profile.automation === "human_loop") {
    quickerScore += 1;
    worseRiskScore += 1;
  }

  if (profile.rightsImpact === "yes") {
    worseRiskScore += 1;
  } else if (profile.rightsImpact === "unsure") {
    worseRiskScore += 1;
  }

  if (profile.prohibitedSignals === "yes") {
    worseRiskScore += 3;
    betterScore -= 1;
  } else if (profile.prohibitedSignals === "unsure") {
    worseRiskScore += 1;
  }

  if (profile.dataSensitivity === "special") {
    worseRiskScore += 1;
  } else if (profile.dataSensitivity === "biometric") {
    worseRiskScore += 2;
    betterScore -= 1;
  }

  if (profile.stage === "explore") {
    quickerScore -= 1;
    worseRiskScore += 1;
  } else if (profile.stage === "pilot") {
    worseRiskScore += 1;
  }

  if (profile.procurement === "none") {
    worseRiskScore += 2;
  } else if (profile.procurement === "partial") {
    worseRiskScore += 1;
  }

  if (profile.sourcing === "vendor" || profile.sourcing === "hybrid") {
    worseRiskScore += 1;
  }

  if (persona.highNeed) {
    worseRiskScore += 1;
    easierScore -= 1;
  }
  if (persona.plainLanguage) {
    if (profile.stressCoverage !== "high") {
      easierScore -= 1;
    }
  }
  if (persona.digital) {
    quickerScore -= 1;
    if (fallback !== "immediate") {
      worseRiskScore += 1;
    }
  }
  if (persona.accessibility) {
    if (profile.stressCoverage !== "high") {
      easierScore -= 1;
      worseRiskScore += 1;
    }
  }
  if (persona.empathy) {
    if (profile.automation === "fully") {
      easierScore -= 1;
      worseRiskScore += 1;
    }
    if (fallback === "immediate") {
      easierScore += 1;
    }
  }
  if (persona.complex) {
    if (profile.automation === "fully") {
      worseRiskScore += 1;
      easierScore -= 1;
    }
  }
  if (persona.translation) {
    if (fallback === "none") {
      easierScore -= 1;
      worseRiskScore += 1;
    }
  }
  if (persona.offline) {
    quickerScore -= 1;
    if (fallback === "none") {
      worseRiskScore += 2;
    }
  }
  if (persona.continuity) {
    if (fallback === "immediate") {
      betterScore += 1;
    } else {
      worseRiskScore += 1;
    }
  }
  if (persona.trust) {
    betterScore -= 1;
    if (profile.measurement !== "robust") {
      worseRiskScore += 1;
    }
    if (profile.dataSensitivity === "biometric") {
      worseRiskScore += 1;
    }
  }

  return {
    caseLabel: persona.label,
    better: mapBetter(betterScore),
    worseRisk: mapWorseRisk(worseRiskScore),
    quicker: mapQuicker(quickerScore),
    easier: mapEasier(easierScore),
    watchpoint: persona.watchpoint,
  };
}

function mapBetter(score) {
  if (score >= 2) {
    return makeStatus("Better", "good");
  }
  if (score === 1) {
    return makeStatus("Slightly better", "warn");
  }
  if (score === 0) {
    return makeStatus("Similar", "neutral");
  }
  return makeStatus("Worse", "bad");
}

function mapWorseRisk(score) {
  if (score >= 5) {
    return makeStatus("High", "bad");
  }
  if (score >= 3) {
    return makeStatus("Medium", "warn");
  }
  return makeStatus("Low", "good");
}

function mapQuicker(score) {
  if (score >= 2) {
    return makeStatus("Quicker", "good");
  }
  if (score === 1) {
    return makeStatus("Slightly quicker", "warn");
  }
  if (score === 0) {
    return makeStatus("Similar", "neutral");
  }
  return makeStatus("Slower", "bad");
}

function mapEasier(score) {
  if (score >= 2) {
    return makeStatus("Easier", "good");
  }
  if (score === 1) {
    return makeStatus("Slightly easier", "warn");
  }
  if (score === 0) {
    return makeStatus("Similar", "neutral");
  }
  return makeStatus("Harder", "bad");
}

function makeStatus(label, className) {
  return { label, className };
}

function toMarkdown(model, profile) {
  const answerLines = state.order
    .map((id) => {
      const q = QUESTIONS[id];
      const answerLabel = answerLookup[id][state.answers[id]];
      return `- Layer ${q.layer} (${q.short}): ${answerLabel}`;
    })
    .join("\n");

  const reasonLines = model.reasons.map((reason) => `- ${reason}`).join("\n");
  const stepLines = model.steps.map((step, idx) => `${idx + 1}. ${step}`).join("\n");

  const humanRows = model.humanRows
    .map(
      (row) =>
        `| ${row.caseLabel} | ${row.better.label} | ${row.worseRisk.label} | ${row.quicker.label} | ${row.easier.label} | ${row.watchpoint} |`
    )
    .join("\n");

  return `# EU Responsible AI Municipal Plan

## Branch
${model.title}

${model.intro}

## Selected path
${answerLines}

## Why this branch
${reasonLines}

## Step-by-step plan
${stepLines}

## Menselijke maat stress test (10 hardest cases)
Menselijke maat = human-centered and proportional public service quality, especially for vulnerable residents.

| Case | Better | Worse risk | Quicker | Easier | Watchpoint |
| --- | --- | --- | --- | --- | --- |
${humanRows}

${model.humanSummary}

## References
- Project context: https://www.instituutgak.nl
- AI Act (Regulation (EU) 2024/1689): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- European Commission AI policy page: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- GDPR (Regulation (EU) 2016/679): https://eur-lex.europa.eu/eli/reg/2016/679/oj

Generated on: ${new Date().toISOString()}
Profile stage: ${profile.stage}
`;
}

function downloadPlan() {
  if (!state.markdown) {
    return;
  }
  const blob = new Blob([state.markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "municipal-eu-ai-plan.md";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

init();
