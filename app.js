const STORAGE_KEY = "menselijke-maat-verkenner-v2";

const PHASES = ["eu", "checklist", "vignettes", "citizens", "report"];

const EU_QUESTIONS = [
  {
    id: "purpose",
    title: "Waarvoor wil je AI inzetten?",
    help: "Kies wat het meest lijkt op de toepassing die jullie bespreken.",
    options: [
      ["support", "Ondersteuning", "AI helpt bij samenvatten, zoeken of voorbereiden."],
      ["advice", "Advies aan medewerkers", "AI geeft een signaal, score of voorstel aan een ambtenaar."],
      ["decision", "Besluit of toegang", "AI heeft invloed op een besluit of toegang tot dienstverlening."],
    ],
  },
  {
    id: "rights",
    title: "Kan een inwoner merkbaar geraakt worden?",
    help: "Denk aan geld, hulp, toezicht, bezwaar, wachttijd of toegang tot een regeling.",
    options: [
      ["yes", "Ja", "De uitkomst kan gevolgen hebben voor inwoners."],
      ["maybe", "Misschien", "Dat is nog niet goed uitgezocht."],
      ["no", "Nee", "Het blijft intern en zonder effect op dienstverlening."],
    ],
  },
  {
    id: "prohibited",
    title: "Zit er mogelijk een verboden AI-praktijk in?",
    help: "Bij twijfel: kies 'onzeker' en laat dit eerst juridisch toetsen.",
    tooltip:
      "Social scoring betekent dat mensen een algemene score krijgen op basis van gedrag, kenmerken of voorspellingen, waarna toegang tot diensten of rechten kan veranderen. De AI Act verbiedt bepaalde vormen hiervan.",
    options: [
      ["yes", "Ja", "Bijvoorbeeld social scoring, verboden biometrie of manipulatieve sturing."],
      ["maybe", "Onzeker", "Er is juridische duiding nodig voordat je verder gaat."],
      ["no", "Nee", "Er zijn geen duidelijke signalen van verboden praktijken."],
    ],
  },
  {
    id: "data",
    title: "Welke data gebruikt de toepassing?",
    help: "Kies het gevoeligste type data dat in de praktijk voorkomt.",
    tooltip:
      "Bijzondere persoonsgegevens zijn bijvoorbeeld gegevens over gezondheid, afkomst, religie of biometrische kenmerken. Daarvoor gelden zwaardere privacy-eisen.",
    options: [
      ["anonymous", "Anoniem of synthetisch", "Geen persoonsgegevens."],
      ["personal", "Persoonsgegevens", "Data kan tot personen herleid worden."],
      ["sensitive", "Kwetsbaar of bijzonder", "Bijvoorbeeld gezondheid, schulden, kinderen of biometrie."],
    ],
  },
  {
    id: "human",
    title: "Kan een mens de AI-uitkomst echt controleren?",
    help: "Het gaat niet om een vinkje, maar om echte tijd, kennis en bevoegdheid om af te wijken.",
    options: [
      ["strong", "Ja, goed geregeld", "Medewerkers kunnen begrijpen, controleren en afwijken."],
      ["partial", "Deels", "Er is menselijk toezicht, maar nog niet sterk genoeg."],
      ["weak", "Nee of onduidelijk", "De AI-uitkomst zal waarschijnlijk leidend worden."],
    ],
  },
  {
    id: "supplier",
    title: "Wie levert of beheert de AI?",
    help: "Leveranciersafhankelijkheid bepaalt welke afspraken je nodig hebt.",
    options: [
      ["inhouse", "Eigen organisatie", "Beheer ligt vooral intern."],
      ["hybrid", "Hybride", "Eigen proces met externe model- of softwarecomponent."],
      ["vendor", "Leverancier", "Een externe partij levert een groot deel van de oplossing."],
    ],
  },
  {
    id: "procurement",
    title: "Zijn afspraken over AI al vastgelegd?",
    help: "Denk aan logging, auditrechten, modelwijzigingen, incidenten, data en uitleg.",
    options: [
      ["ready", "Ja", "Er zijn duidelijke AI-afspraken en contractvoorwaarden."],
      ["partial", "Deels", "Er is iets geregeld, maar nog niet compleet."],
      ["none", "Nog niet", "Er zijn nog geen specifieke AI-afspraken."],
    ],
  },
];

const CHECKLIST = [
  {
    id: "easier",
    title: "Wordt het voor inwoners eenvoudiger?",
    help: "Denk aan minder stappen, begrijpelijkere taal en minder kastje-muur.",
  },
  {
    id: "burden",
    title: "Neemt de administratieve last af?",
    help: "Kijk vooral naar kwetsbare inwoners: bewijsstukken, herhaalvragen en digitale drempels.",
  },
  {
    id: "contact",
    title: "Blijft persoonlijk contact makkelijk te vinden?",
    help: "Een inwoner moet kunnen overstappen naar een mens als de situatie daarom vraagt.",
  },
  {
    id: "empathy",
    title: "Is empathische afweging mogelijk?",
    help: "Medewerkers moeten ruimte houden om context, uitzonderingen en hardheid mee te wegen.",
  },
  {
    id: "monitoring",
    title: "Meten jullie of menselijke maat beter of slechter wordt?",
    help: "Gebruik indicatoren zoals begrijpelijkheid, herstelwerk, bezwaar, wachttijd en ervaren rechtvaardigheid.",
  },
];

const SCORE_OPTIONS = [
  ["good", "Goed geregeld", 2],
  ["partial", "Deels", 1],
  ["missing", "Nog niet", 0],
];

const VIGNETTES = [
  {
    id: "stress",
    label: "Schuldenstress",
    title: "Alleenstaande ouder met schuldenstress",
    scenario:
      "De inwoner moet meerdere bewijsstukken aanleveren, begrijpt de brief niet goed en stopt zodra een formulier terugkomt met fouten.",
    prompts: [
      "Waar wordt dit proces voor deze inwoner slechter dan nu?",
      "Wanneer moet een medewerker actief contact opnemen?",
      "Welke indicator toont vroeg dat deze groep vastloopt?",
    ],
  },
  {
    id: "caregiver",
    label: "Mantelzorger",
    title: "Oudere inwoner met mantelzorger",
    scenario:
      "De formele aanvrager en de feitelijke gebruiker zijn niet dezelfde persoon. Informatie loopt via een familielid.",
    prompts: [
      "Welke stap veronderstelt te veel zelfstandigheid?",
      "Hoe regel je toestemming en overdracht zonder extra last?",
      "Wat moet dezelfde dag nog via een mens kunnen?",
    ],
  },
  {
    id: "language",
    label: "Taalbarriere",
    title: "Inwoner met taalbarriere en laag vertrouwen",
    scenario:
      "De inwoner begrijpt formele taal slecht, vertrouwt overheidsteksten weinig en haakt af bij modelmatige toon.",
    prompts: [
      "Welke uitleg moet in gewone taal beschikbaar zijn?",
      "Hoe voorkom je dat AI-taal afstandelijk of dreigend voelt?",
      "Hoe test je of de uitleg echt wordt begrepen?",
    ],
  },
  {
    id: "worker",
    label: "Medewerker",
    title: "Uitvoerende medewerker met hoge caseload",
    scenario:
      "De tool lijkt tijd te winnen, maar uitzonderingen en subtiele context uit gesprekken raken makkelijker uit beeld.",
    prompts: [
      "Waar kan interne efficientie botsen met menselijke dienstverlening?",
      "Welke override-momenten moeten zichtbaar blijven?",
      "Welke signalen tonen dat medewerkers te veel op AI gaan leunen?",
    ],
  },
];

const VIGNETTE_STATUS = [
  ["todo", "Nog niet besproken"],
  ["done", "Besproken"],
  ["redesign", "Herontwerp nodig"],
];

const SURVEY = [
  {
    id: "understand",
    title: "Ik begrijp wat er van mij verwacht wordt.",
    help: "Meet begrijpelijkheid van het huidige proces.",
  },
  {
    id: "human",
    title: "Ik kan een mens bereiken als ik vastloop.",
    help: "Meet of de menselijke route echt zichtbaar en bereikbaar is.",
  },
  {
    id: "fair",
    title: "Ik voel mij eerlijk en respectvol behandeld.",
    help: "Meet ervaren rechtvaardigheid en toon.",
  },
  {
    id: "effort",
    title: "Het proces kost mij niet onnodig veel tijd of moeite.",
    help: "Meet administratieve last en kanaalwisselingen.",
  },
];

const state = loadState();

const dom = {
  views: document.querySelectorAll(".view"),
  navLinks: document.querySelectorAll("[data-view-link]"),
  phaseLinks: document.querySelectorAll("[data-phase-link]"),
  phases: document.querySelectorAll(".phase"),
  questionCard: document.querySelector("#questionCard"),
  euAnswerList: document.querySelector("#euAnswerList"),
  euProgress: document.querySelector("#euProgress"),
  previousQuestion: document.querySelector("#previousQuestion"),
  checklistGrid: document.querySelector("#checklistGrid"),
  checklistScore: document.querySelector("#checklistScore"),
  checklistSummary: document.querySelector("#checklistSummary"),
  vignetteTabs: document.querySelector("#vignetteTabs"),
  vignetteMeta: document.querySelector("#vignetteMeta"),
  vignetteName: document.querySelector("#vignetteName"),
  vignetteScenario: document.querySelector("#vignetteScenario"),
  vignettePrompts: document.querySelector("#vignettePrompts"),
  vignetteStatuses: document.querySelector("#vignetteStatuses"),
  vignetteNotes: document.querySelector("#vignetteNotes"),
  vignetteScore: document.querySelector("#vignetteScore"),
  vignetteSummary: document.querySelector("#vignetteSummary"),
  surveyGrid: document.querySelector("#surveyGrid"),
  surveyScore: document.querySelector("#surveyScore"),
  surveySummary: document.querySelector("#surveySummary"),
  reportPreview: document.querySelector("#reportPreview"),
  downloadReport: document.querySelector("#downloadReport"),
  resetProgress: document.querySelector("#resetProgress"),
};

function defaultState() {
  return {
    view: "home",
    phase: "eu",
    euIndex: 0,
    euAnswers: {},
    checklist: {},
    selectedVignette: VIGNETTES[0].id,
    vignetteStatus: Object.fromEntries(VIGNETTES.map((item) => [item.id, "todo"])),
    vignetteNotes: Object.fromEntries(VIGNETTES.map((item) => [item.id, ""])),
    survey: {},
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // If browser storage is unavailable, the prototype still works for the current session.
  }
}

function init() {
  document.querySelectorAll("[data-start-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = "tool";
      state.phase = "eu";
      saveState();
      render();
    });
  });

  dom.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      state.view = link.dataset.viewLink;
      saveState();
      render();
    });
  });

  dom.phaseLinks.forEach((link) => {
    link.addEventListener("click", () => {
      state.view = "tool";
      state.phase = link.dataset.phaseLink;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-next-phase]").forEach((button) => {
    button.addEventListener("click", () => goRelativePhase(1));
  });

  document.querySelectorAll("[data-prev-phase]").forEach((button) => {
    button.addEventListener("click", () => goRelativePhase(-1));
  });

  dom.previousQuestion.addEventListener("click", () => {
    state.euIndex = Math.max(0, state.euIndex - 1);
    saveState();
    render();
  });

  dom.vignetteNotes.addEventListener("input", (event) => {
    state.vignetteNotes[state.selectedVignette] = event.target.value;
    saveState();
    renderVignetteSummary();
    renderReport();
  });

  dom.downloadReport.addEventListener("click", downloadReport);

  dom.resetProgress.addEventListener("click", () => {
    Object.assign(state, defaultState(), { view: "tool" });
    saveState();
    render();
  });

  render();
}

function goRelativePhase(direction) {
  const current = PHASES.indexOf(state.phase);
  state.view = "tool";
  state.phase = PHASES[Math.min(PHASES.length - 1, Math.max(0, current + direction))];
  saveState();
  render();
}

function render() {
  renderViews();
  renderPhases();
  renderQuestion();
  renderChecklist();
  renderVignettes();
  renderSurvey();
  renderReport();
}

function renderViews() {
  dom.views.forEach((view) => view.classList.toggle("active-view", view.id === state.view));
  dom.navLinks.forEach((link) => link.classList.toggle("active", link.dataset.viewLink === state.view));
}

function renderPhases() {
  dom.phases.forEach((phase) => phase.classList.toggle("active-phase", phase.dataset.phase === state.phase));
  dom.phaseLinks.forEach((link) => link.classList.toggle("active", link.dataset.phaseLink === state.phase));
}

function renderQuestion() {
  const question = EU_QUESTIONS[state.euIndex];
  const answeredCount = Object.keys(state.euAnswers).length;
  dom.euProgress.textContent = `${answeredCount}/${EU_QUESTIONS.length}`;
  dom.previousQuestion.disabled = state.euIndex === 0;

  const tooltip = question.tooltip
    ? `<button class="tooltip" type="button" aria-label="Uitleg bij dit begrip">i<span>${question.tooltip}</span></button>`
    : "";

  dom.questionCard.innerHTML = `
    <p class="kicker">Vraag ${state.euIndex + 1} van ${EU_QUESTIONS.length}</p>
    <div class="question-title-row">
      <h2>${question.title}</h2>
      ${tooltip}
    </div>
    <p>${question.help}</p>
    <div class="option-grid">
      ${question.options
        .map(([value, label, note]) => {
          const active = state.euAnswers[question.id] === value ? " active" : "";
          return `<button class="option-button${active}" type="button" data-eu-answer="${value}">
            <strong>${label}</strong>
            <span>${note}</span>
          </button>`;
        })
        .join("")}
    </div>
  `;

  dom.questionCard.querySelectorAll("[data-eu-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.euAnswers[question.id] = button.dataset.euAnswer;
      if (state.euIndex < EU_QUESTIONS.length - 1) {
        state.euIndex += 1;
      } else {
        state.phase = "checklist";
      }
      saveState();
      render();
    });
  });

  dom.euAnswerList.innerHTML = EU_QUESTIONS.map((item) => {
    const answer = state.euAnswers[item.id];
    if (!answer) return "";
    const option = item.options.find(([value]) => value === answer);
    return `<li><strong>${item.title}</strong><br>${option[1]}</li>`;
  }).join("");
}

function renderChecklist() {
  dom.checklistGrid.innerHTML = CHECKLIST.map((item) => `
    <article class="row-question">
      <div>
        <h3>${item.title}</h3>
        <p>${item.help}</p>
      </div>
      <div class="segmented">
        ${SCORE_OPTIONS.map(([value, label]) => {
          const active = state.checklist[item.id] === value ? " active" : "";
          return `<button class="segment${active}" type="button" data-checklist="${item.id}" data-value="${value}">${label}</button>`;
        }).join("")}
      </div>
    </article>
  `).join("");

  dom.checklistGrid.querySelectorAll("[data-checklist]").forEach((button) => {
    button.addEventListener("click", () => {
      state.checklist[button.dataset.checklist] = button.dataset.value;
      saveState();
      renderChecklist();
      renderReport();
    });
  });

  const summary = getChecklistSummary();
  dom.checklistScore.textContent = summary.label;
  dom.checklistSummary.textContent = summary.text;
}

function renderVignettes() {
  dom.vignetteTabs.innerHTML = VIGNETTES.map((item) => {
    const active = item.id === state.selectedVignette ? " active" : "";
    return `<button class="chip${active}" type="button" data-vignette="${item.id}">${item.label}</button>`;
  }).join("");

  dom.vignetteTabs.querySelectorAll("[data-vignette]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedVignette = button.dataset.vignette;
      saveState();
      renderVignettes();
    });
  });

  const current = VIGNETTES.find((item) => item.id === state.selectedVignette);
  dom.vignetteMeta.textContent = current.label;
  dom.vignetteName.textContent = current.title;
  dom.vignetteScenario.textContent = current.scenario;
  dom.vignettePrompts.innerHTML = current.prompts.map((prompt) => `<li>${prompt}</li>`).join("");
  dom.vignetteStatuses.innerHTML = VIGNETTE_STATUS.map(([value, label]) => {
    const active = state.vignetteStatus[current.id] === value ? " active" : "";
    return `<button class="status-button${active}" type="button" data-status="${value}">${label}</button>`;
  }).join("");
  dom.vignetteNotes.value = state.vignetteNotes[current.id] || "";

  dom.vignetteStatuses.querySelectorAll("[data-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vignetteStatus[current.id] = button.dataset.status;
      saveState();
      renderVignettes();
      renderReport();
    });
  });

  renderVignetteSummary();
}

function renderVignetteSummary() {
  const statuses = Object.values(state.vignetteStatus);
  const done = statuses.filter((status) => status === "done").length;
  const redesign = statuses.filter((status) => status === "redesign").length;
  const notes = Object.values(state.vignetteNotes).filter((note) => note.trim()).length;
  dom.vignetteScore.textContent = redesign > 0 ? `${redesign} herontwerp` : `${done}/${VIGNETTES.length} besproken`;
  dom.vignetteSummary.textContent = `${done} casussen besproken, ${redesign} met herontwerpsignaal en ${notes} met notities.`;
}

function renderSurvey() {
  dom.surveyGrid.innerHTML = SURVEY.map((item) => `
    <article class="row-question">
      <div>
        <h3>${item.title}</h3>
        <p>${item.help}</p>
      </div>
      <div class="segmented">
        ${SCORE_OPTIONS.map(([value, label]) => {
          const active = state.survey[item.id] === value ? " active" : "";
          return `<button class="segment${active}" type="button" data-survey="${item.id}" data-value="${value}">${label}</button>`;
        }).join("")}
      </div>
    </article>
  `).join("");

  dom.surveyGrid.querySelectorAll("[data-survey]").forEach((button) => {
    button.addEventListener("click", () => {
      state.survey[button.dataset.survey] = button.dataset.value;
      saveState();
      renderSurvey();
      renderReport();
    });
  });

  const summary = getSurveySummary();
  dom.surveyScore.textContent = summary.label;
  dom.surveySummary.textContent = summary.text;
}

function getChecklistSummary() {
  return getScoreSummary(CHECKLIST, state.checklist, "checklist");
}

function getSurveySummary() {
  return getScoreSummary(SURVEY, state.survey, "burgerperspectief");
}

function getScoreSummary(items, answers, label) {
  const answered = items.filter((item) => answers[item.id]);
  const total = items.reduce((sum, item) => {
    const option = SCORE_OPTIONS.find(([value]) => value === answers[item.id]);
    return sum + (option ? option[2] : 0);
  }, 0);
  const max = items.length * 2;
  const grade = answered.length ? Math.round((total / max) * 10) : 0;
  const weak = items.filter((item) => ["missing", "partial"].includes(answers[item.id])).map((item) => item.title);

  if (!answered.length) {
    return {
      label: "Nog open",
      grade,
      weak,
      text: `Vul de ${label} in om een score en aandachtspunten te krijgen.`,
    };
  }

  if (answered.length < items.length) {
    return {
      label: `${answered.length}/${items.length}`,
      grade,
      weak,
      text: `De ${label} is deels ingevuld. Voorlopige score: ${grade}/10.`,
    };
  }

  return {
    label: `${grade}/10`,
    grade,
    weak,
    text: grade >= 7 ? `Sterke basis. Score: ${grade}/10.` : `Nog kwetsbaar. Score: ${grade}/10.`,
  };
}

function classifyRoute() {
  const answers = state.euAnswers;
  const risks = [];
  if (answers.prohibited === "yes") risks.push("Mogelijk verboden praktijk");
  if (answers.prohibited === "maybe") risks.push("Juridische onzekerheid over verboden praktijk");
  if (answers.rights !== "no" || answers.purpose === "decision") risks.push("Impact op rechten of toegang");
  if (answers.data === "sensitive") risks.push("Kwetsbare of bijzondere data");
  if (answers.human === "weak") risks.push("Menselijk toezicht is zwak");
  if (answers.procurement !== "ready") risks.push("AI-afspraken zijn nog niet volledig");

  const route = answers.prohibited === "yes" ? "Stop en herontwerp" : risks.length >= 3 ? "Verzwaarde waarborgen" : "Beheerst verder verkennen";
  return { route, risks };
}

function buildRecommendations() {
  const { route, risks } = classifyRoute();
  const checklist = getChecklistSummary();
  const survey = getSurveySummary();
  const recommendations = [];

  if (route === "Stop en herontwerp") {
    recommendations.push("Stop de huidige ontwerpkeuze en laat eerst juridisch toetsen of er sprake is van een verboden AI-praktijk.");
  }

  if (risks.includes("Impact op rechten of toegang")) {
    recommendations.push("Leg vast waar menselijke controle, bezwaar, herstel en uitleg beschikbaar zijn voor inwoners.");
  }

  if (risks.includes("Kwetsbare of bijzondere data")) {
    recommendations.push("Werk grondslag, dataminimalisatie, DPIA en beveiligingsmaatregelen uit voordat je opschaalt.");
  }

  if (risks.includes("AI-afspraken zijn nog niet volledig")) {
    recommendations.push("Maak inkoopafspraken over auditrechten, logging, modelwijzigingen, incidenten en dataverwerking.");
  }

  if (checklist.weak.length) {
    recommendations.push(`Werk deze punten uit de checklist verder uit: ${checklist.weak.slice(0, 2).join(", ")}.`);
  }

  if (survey.weak.length) {
    recommendations.push(`Onderzoek deze burgerperspectieven extra: ${survey.weak.slice(0, 2).join(", ")}.`);
  }

  if (!recommendations.length) {
    recommendations.push("De basis oogt werkbaar. Blijf meten of de toepassing voor inwoners echt begrijpelijker, menselijker en makkelijker wordt.");
  }

  return recommendations;
}

function renderReport() {
  const { route, risks } = classifyRoute();
  const checklist = getChecklistSummary();
  const survey = getSurveySummary();
  const recommendations = buildRecommendations();

  dom.reportPreview.innerHTML = `
    <article class="report-block">
      <h3>Samenvatting</h3>
      <p><strong>Route:</strong> ${route}</p>
      <p><strong>Checklist:</strong> ${checklist.label} · <strong>Burgerperspectief:</strong> ${survey.label}</p>
    </article>
    <article class="report-block">
      <h3>Belangrijkste risico's</h3>
      <ul>${(risks.length ? risks : ["Geen grote rode vlaggen ingevuld."]).map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="report-block">
      <h3>Aanbevolen acties</h3>
      <ol>${recommendations.map((item) => `<li>${item}</li>`).join("")}</ol>
    </article>
  `;
}

function answerLabel(question, value) {
  const option = question.options.find(([optionValue]) => optionValue === value);
  return option ? option[1] : "Niet ingevuld";
}

function tableRows(items, answers) {
  return items
    .map((item) => {
      const option = SCORE_OPTIONS.find(([value]) => value === answers[item.id]);
      return `| ${item.title} | ${option ? option[1] : "Niet ingevuld"} |`;
    })
    .join("\n");
}

function buildMarkdown() {
  const { route, risks } = classifyRoute();
  const checklist = getChecklistSummary();
  const survey = getSurveySummary();
  const recommendations = buildRecommendations();

  const euRows = EU_QUESTIONS.map((question) => `| ${question.title} | ${answerLabel(question, state.euAnswers[question.id])} |`).join("\n");
  const vignetteRows = VIGNETTES.map((item) => {
    const status = VIGNETTE_STATUS.find(([value]) => value === state.vignetteStatus[item.id]);
    const note = state.vignetteNotes[item.id]?.trim() || "Geen notitie";
    return `| ${item.title} | ${status ? status[1] : "Nog niet besproken"} | ${note} |`;
  }).join("\n");

  return `# Menselijke Maat AI Verkenner

## 1. Samenvatting

| Onderdeel | Uitkomst |
| --- | --- |
| Route | ${route} |
| Checklist menselijke maat | ${checklist.label} |
| Burgerperspectief | ${survey.label} |

## 2. EU-regels en governance

| Vraag | Antwoord |
| --- | --- |
${euRows}

## 3. Belangrijkste risico's

${(risks.length ? risks : ["Geen grote rode vlaggen ingevuld."]).map((item) => `- ${item}`).join("\n")}

## 4. Checklist menselijke maat

${checklist.text}

| Vraag | Beoordeling |
| --- | --- |
${tableRows(CHECKLIST, state.checklist)}

## 5. Worst-case users

| Vignette | Status | Notitie |
| --- | --- | --- |
${vignetteRows}

## 6. Burgerperspectief

${survey.text}

| Vraag | Beoordeling |
| --- | --- |
${tableRows(SURVEY, state.survey)}

## 7. Aanbevolen acties

${recommendations.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## 8. Toekomstmodules

- LLM-documentassessment: vraagt backend, validatieset, logging, promptbeheer en menselijke review.
- Chatbot-interview: vraagt consent, sessiebeheer, opslagbeleid, moderatie en escalatie naar een mens.

Gegenereerd op ${new Date().toLocaleString("nl-NL")}.
`;
}

function downloadReport() {
  const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "menselijke-maat-ai-verkenner-rapport.md";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

init();
