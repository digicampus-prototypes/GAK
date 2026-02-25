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
        note: "AI is being used for real municipal processes today.",
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
        note: "Citizens could be materially affected by AI-supported decisions.",
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
      "Does the use case include possible prohibited practices (social scoring, emotion recognition in workplace/schools, untargeted face scraping, or similar)?",
    help: "If yes, the branch starts with a stop-and-redesign path.",
    options: [
      {
        value: "yes",
        label: "Yes or likely yes",
        note: "At least one prohibited pattern appears in scope.",
        next: "result",
      },
      {
        value: "unsure",
        label: "Unclear; legal interpretation needed",
        note: "You need a legal review before procurement or rollout.",
        next: "dataSensitivity",
      },
      {
        value: "no",
        label: "No prohibited patterns in scope",
        note: "Proceed to data and decision-governance checks.",
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
        note: "Data identifies or can identify natural persons.",
        next: "automation",
      },
      {
        value: "special",
        label: "Special category or vulnerable-group data",
        note: "Health, ethnicity, children, or other protected-context data.",
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
    help: "This influences required safeguards and governance intensity.",
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
        note: "Staff can override and are accountable for final outcomes.",
        next: "sourcing",
      },
      {
        value: "assistive",
        label: "Assistive only (no decision impact)",
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
        note: "Combined external model with municipal integration.",
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
        note: "Templates and controls are already embedded in tender docs.",
        next: "result",
      },
      {
        value: "partial",
        label: "Partly; some controls exist",
        note: "Coverage is inconsistent across teams or contracts.",
        next: "result",
      },
      {
        value: "none",
        label: "Not yet",
        note: "No AI-specific procurement guardrails are formally defined.",
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
};

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
  dom.layerBadge.textContent = `Layer ${q.layer} · ${q.short}`;
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
    const answerLabel = answerLookup[id][answerValue];
    li.textContent = `Layer ${index + 1}: ${q.short} -> ${answerLabel}`;
    dom.routeList.appendChild(li);
  });
}

function chooseOption(option) {
  const qId = state.current;

  if (!state.order.includes(qId)) {
    state.order.push(qId);
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

  const previous = state.order.pop();
  if (!previous) {
    return;
  }

  delete state.answers[previous];
  state.current = previous;
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

  state.markdown = toMarkdown(model, profile);
  state.showingResult = true;
  dom.downloadBtn.disabled = false;
  dom.resultCard.classList.remove("hidden");
  render();
}

function generatePlan(profile) {
  const prohibited = profile.prohibitedSignals === "yes";
  const sensitiveData = ["special", "biometric"].includes(profile.dataSensitivity);
  const personalData = ["personal", "special", "biometric"].includes(profile.dataSensitivity);
  const highRiskCandidate =
    profile.rightsImpact === "yes" || profile.automation === "fully" || sensitiveData;
  const vendorDependency = ["vendor", "hybrid"].includes(profile.sourcing);
  const procurementGap = profile.procurement === "none" || profile.procurement === "partial";

  const pills = [];
  pills.push({ label: answerLookup.stage[profile.stage] });
  if (prohibited) {
    pills.push({ label: "Track: Stop-and-redesign", warn: true });
  } else {
    pills.push({
      label: highRiskCandidate ? "Track: High-risk candidate" : "Track: Limited/moderate-risk",
      warn: highRiskCandidate,
    });
  }
  if (vendorDependency) {
    pills.push({ label: "External provider dependency" });
  }
  if (personalData) {
    pills.push({ label: "GDPR-heavy workload", warn: profile.dataSensitivity !== "personal" });
  }

  const reasons = [];
  if (prohibited) {
    reasons.push("You flagged indicators that can map to prohibited AI practices.");
  }
  if (highRiskCandidate) {
    reasons.push("Your answers indicate a likely high-impact or rights-sensitive public-sector use case.");
  }
  if (personalData) {
    reasons.push("Personal data processing requires GDPR legal basis and likely impact assessment.");
  }
  if (vendorDependency) {
    reasons.push("Supplier governance and contractual controls become critical.");
  }
  if (procurementGap) {
    reasons.push("Current procurement setup is not yet strong enough for repeatable compliant rollout.");
  }
  if (reasons.length === 0) {
    reasons.push("Your path fits a lower-risk adoption lane with lighter safeguards.");
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
      "Start with a single low-complexity municipal use case and define measurable public value, success criteria, and an explicit non-goal list."
    );
  }

  if (profile.stage === "pilot") {
    steps.push(
      "Pause scale-up and set pilot guardrails: scope limits, rollback trigger, and mandatory human accountability for each decision point."
    );
  }

  if (profile.stage === "live") {
    steps.push(
      "Run a 30-day compliance gap assessment on live systems and prioritize remediation before feature expansion."
    );
  }

  steps.push(
    "Form a municipal AI governance cell (service owner, legal, DPO, procurement, security, citizen-service representative) with weekly decision logs."
  );
  steps.push(
    "Classify each AI use case under the AI Act (prohibited, high-risk candidate, or limited risk) and keep supporting evidence auditable."
  );

  if (prohibited) {
    steps.push(
      "After redesign, restart risk classification from the beginning and require formal legal sign-off before pilot restart."
    );
  } else if (highRiskCandidate) {
    steps.push(
      "Treat the solution as high-risk candidate until proven otherwise; prepare technical documentation, risk management, human oversight, and post-market monitoring controls."
    );
    steps.push(
      "Plan implementation milestones against the 2 August 2026 application date for most AI Act obligations."
    );
  } else {
    steps.push(
      "Keep the system in a limited-risk lane: clear user disclosures, quality checks, and documented human fallback."
    );
  }

  if (personalData) {
    steps.push(
      "Define GDPR lawful basis, minimization, retention, and security controls; run a DPIA when risk thresholds are met."
    );
  } else {
    steps.push("Maintain strict data-minimization discipline and avoid unnecessary personal-data ingestion.");
  }

  if (profile.automation === "fully") {
    steps.push(
      "Introduce mandatory human review, appeal pathways, and clear citizen contestability before any legally significant decision output."
    );
  } else if (profile.automation === "human_loop") {
    steps.push(
      "Document exact override authority for staff and track override frequency as a quality-and-fairness indicator."
    );
  } else {
    steps.push(
      "Constrain usage to assistive tasks and block direct automated decisioning in policy and technical controls."
    );
  }

  if (vendorDependency) {
    steps.push(
      "Use AI-specific contract clauses: audit rights, model change notifications, logging access, incident SLAs, and data-processing/sub-processor transparency."
    );
  }

  if (procurementGap) {
    steps.push(
      "Build a standard municipal AI procurement pack (technical questionnaire + legal clauses + security annex) before new tenders."
    );
  }

  steps.push(
    "Deliver role-based AI literacy training for procurement, frontline services, legal, and management, with annual refresh cycles."
  );
  steps.push(
    "Publish a plain-language transparency notice for residents: purpose, data used, human oversight, and complaint/appeal channel."
  );
  steps.push(
    "Set quarterly monitoring: accuracy drift, bias checks, incidents, vendor changes, and retirement criteria for underperforming systems."
  );

  const title = prohibited
    ? "Branch outcome: Stop-and-redesign before implementation"
    : highRiskCandidate
      ? "Branch outcome: High-risk candidate implementation track"
      : "Branch outcome: Limited/moderate-risk implementation track";

  const intro = prohibited
    ? "This branch prioritizes immediate risk containment, then controlled redesign aligned with EU rules."
    : "This branch balances practical rollout with legal, governance, and public-trust controls.";

  return { title, intro, pills, reasons, steps };
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

## References
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
