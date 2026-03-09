const QUESTIONS = {
  stage: {
    layer: 1,
    short: "Startpositie",
    prompt: "Waar staat de gemeente nu in de AI-reis?",
    help: "Kies de optie die het best past bij jullie huidige situatie.",
    options: [
      {
        value: "explore",
        label: "Verkennen",
        note: "Er lopen nog geen pilots; jullie prioriteren mogelijke toepassingen.",
        next: "rightsImpact",
      },
      {
        value: "pilot",
        label: "Pilotfase",
        note: "Er lopen al experimenten in echte werkprocessen.",
        next: "rightsImpact",
      },
      {
        value: "live",
        label: "Al in gebruik",
        note: "AI ondersteunt vandaag al een bestaand gemeentelijk proces.",
        next: "rightsImpact",
      },
    ],
  },
  rightsImpact: {
    layer: 2,
    short: "Rechtenimpact",
    prompt:
      "Kan de AI-uitkomst invloed hebben op rechten of toegang tot publieke dienstverlening, zoals uitkeringen, vergunningen, wonen, onderwijs of handhaving?",
    help: "Bij twijfel is het veiliger om de voorzichtige optie te kiezen.",
    options: [
      {
        value: "yes",
        label: "Ja, waarschijnlijk wel",
        note: "Inwoners kunnen direct of indirect geraakt worden door de AI-uitkomst.",
        next: "prohibitedSignals",
      },
      {
        value: "unsure",
        label: "Nog onduidelijk",
        note: "De impact is nog niet scherp afgebakend.",
        next: "prohibitedSignals",
      },
      {
        value: "no",
        label: "Nee, vooral intern ondersteunend",
        note: "Het gaat vooral om samenvatten, triage of productiviteitswinst.",
        next: "prohibitedSignals",
      },
    ],
  },
  prohibitedSignals: {
    layer: 3,
    short: "Verboden-praktijken check",
    prompt:
      "Zijn er signalen van mogelijk verboden praktijken, zoals social scoring, ongerichte gezichtsdataverzameling of bepaalde vormen van emotion recognition?",
    help: "Bij een ja volgt later automatisch een stop-en-herontwerp route.",
    options: [
      {
        value: "yes",
        label: "Ja of waarschijnlijk ja",
        note: "Er lijkt minstens een verboden patroon in scope te zitten.",
        next: "dataSensitivity",
      },
      {
        value: "unsure",
        label: "Onzeker, juridische duiding nodig",
        note: "Juridische toetsing is nodig voordat inkoop of uitrol start.",
        next: "dataSensitivity",
      },
      {
        value: "no",
        label: "Nee, geen duidelijke signalen",
        note: "De route gaat verder met data- en mensimpact.",
        next: "dataSensitivity",
      },
    ],
  },
  dataSensitivity: {
    layer: 4,
    short: "Gegevensgevoeligheid",
    prompt: "Wat is de hoogste gevoeligheid van de data in de beoogde inzet?",
    help: "Kies het hoogste niveau dat waarschijnlijk in productie gebruikt wordt.",
    options: [
      {
        value: "anonymous",
        label: "Alleen anonieme of synthetische data",
        note: "Er worden geen persoonsgegevens verwerkt.",
        next: "automation",
      },
      {
        value: "personal",
        label: "Persoonsgegevens",
        note: "De data identificeert of kan personen identificeerbaar maken.",
        next: "automation",
      },
      {
        value: "special",
        label: "Bijzondere of kwetsbare gegevens",
        note: "Bijvoorbeeld gezondheid, kinderen of kwetsbare doelgroepen.",
        next: "automation",
      },
      {
        value: "biometric",
        label: "Biometrische data",
        note: "Bijvoorbeeld gezicht, stem, loopgedrag of afgeleide biometrie.",
        next: "automation",
      },
    ],
  },
  automation: {
    layer: 5,
    short: "Mate van automatisering",
    prompt: "Hoe wordt AI gebruikt in de besluitvorming of uitvoering?",
    help: "Dit bepaalt in sterke mate de benodigde waarborgen voor menselijke maat.",
    options: [
      {
        value: "fully",
        label: "Volledig geautomatiseerd",
        note: "AI-output kan direct leiden tot een besluit, score of rechtsgevolg.",
        next: "sourcing",
      },
      {
        value: "human_loop",
        label: "Mens-in-de-lus",
        note: "Medewerkers kunnen en moeten overrulen waar nodig.",
        next: "sourcing",
      },
      {
        value: "assistive",
        label: "Alleen ondersteunend",
        note: "Bijvoorbeeld samenvatten, voorbereiden of concepten opstellen.",
        next: "sourcing",
      },
    ],
  },
  sourcing: {
    layer: 6,
    short: "Leveranciersmodel",
    prompt: "Hoe wordt de AI-capaciteit geleverd?",
    help: "De leveringsvorm bepaalt de contractuele en technische beheersmaatregelen.",
    options: [
      {
        value: "vendor",
        label: "Derde partij of GPAI-dienst",
        note: "Een externe leverancier host model en/of applicatie.",
        next: "procurement",
      },
      {
        value: "hybrid",
        label: "Hybride",
        note: "Een externe component wordt gekoppeld aan gemeentelijke systemen.",
        next: "procurement",
      },
      {
        value: "inhouse",
        label: "Voornamelijk in-house",
        note: "De organisatie beheert model of systeem grotendeels zelf.",
        next: "procurement",
      },
    ],
  },
  procurement: {
    layer: 7,
    short: "Inkoopgereedheid",
    prompt: "Zijn AI-specifieke inkoop- en contractvoorwaarden al ingericht?",
    help: "Denk aan auditrechten, logging, incidentmeldingen en data-afspraken.",
    options: [
      {
        value: "ready",
        label: "Ja, gestandaardiseerd",
        note: "Er zijn al standaardclausules en processtappen.",
        next: "audience",
      },
      {
        value: "partial",
        label: "Deels",
        note: "Er zijn losse elementen, maar nog geen consistente lijn.",
        next: "audience",
      },
      {
        value: "none",
        label: "Nog niet",
        note: "Er zijn nog geen AI-specifieke guardrails vastgelegd.",
        next: "audience",
      },
    ],
  },
  audience: {
    layer: 8,
    short: "Primaire gebruikers",
    prompt: "Wie gebruikt of ervaart deze AI-ondersteunde workflow direct?",
    help: "Dit maakt zichtbaar of de impact vooral intern of direct burgergericht is.",
    options: [
      {
        value: "civilians",
        label: "Inwoners",
        note: "De interactie is primair burgergericht.",
        next: "fallback",
      },
      {
        value: "civil_servants",
        label: "Ambtenaren",
        note: "De tool wordt vooral intern in de uitvoering gebruikt.",
        next: "fallback",
      },
      {
        value: "both",
        label: "Beiden",
        note: "Zowel inwoners als medewerkers krijgen direct met de flow te maken.",
        next: "fallback",
      },
    ],
  },
  fallback: {
    layer: 9,
    short: "Menselijke fallback",
    prompt: "Wat gebeurt er als iemand vastloopt of de AI-flow niet past?",
    help: "Een sterke fallback is kernvoorwaarde voor menselijke maat.",
    options: [
      {
        value: "immediate",
        label: "Direct menselijk contact",
        note: "De persoon kan meteen naar een menselijk kanaal doorschakelen.",
        next: "stressCoverage",
      },
      {
        value: "delayed",
        label: "Later terugbel- of opvolgmoment",
        note: "Er is hulp, maar niet direct in dezelfde interactie.",
        next: "stressCoverage",
      },
      {
        value: "none",
        label: "Geen duidelijke fallback",
        note: "Er is geen gegarandeerde route naar menselijk contact.",
        next: "stressCoverage",
      },
    ],
  },
  stressCoverage: {
    layer: 10,
    short: "10-case stresstest",
    prompt: "Hoeveel van de 10 lastigste gebruikersprofielen zijn al end-to-end getest tegenover het huidige proces?",
    help: "Hoe hoger de dekking, hoe sterker het bewijs dat menselijke maat echt meegenomen is.",
    options: [
      {
        value: "low",
        label: "0 tot 2 profielen",
        note: "Er is nog nauwelijks systematisch getest.",
        next: "measurement",
      },
      {
        value: "medium",
        label: "3 tot 6 profielen",
        note: "Er is deels getest, maar nog niet breed genoeg.",
        next: "measurement",
      },
      {
        value: "high",
        label: "7 tot 10 profielen",
        note: "De stresstest is al behoorlijk volledig uitgevoerd.",
        next: "measurement",
      },
    ],
  },
  measurement: {
    layer: 11,
    short: "Outcome-meting",
    prompt:
      "Wordt nu al gemeten of het proces voor inwoners en medewerkers beter, slechter, sneller of makkelijker is dan de huidige situatie?",
    help: "Zonder meetlijn blijft menselijke maat vooral een aanname.",
    options: [
      {
        value: "robust",
        label: "Ja, structureel",
        note: "Er zijn terugkerende indicatoren en periodieke reviewmomenten.",
        next: "result",
      },
      {
        value: "partial",
        label: "Deels",
        note: "Er zijn signalen of losse metingen, maar nog niet compleet.",
        next: "result",
      },
      {
        value: "none",
        label: "Nog niet",
        note: "Er is nog geen systematische vergelijking met de huidige praktijk.",
        next: "result",
      },
    ],
  },
};

const ANSWER_LOOKUP = {
  stage: {
    explore: "Verkennen",
    pilot: "Pilotfase",
    live: "Al in gebruik",
  },
  rightsImpact: {
    yes: "Rechtenimpact: ja",
    unsure: "Rechtenimpact: onduidelijk",
    no: "Rechtenimpact: nee",
  },
  prohibitedSignals: {
    yes: "Verboden-risico gesignaleerd",
    unsure: "Verboden-risico onduidelijk",
    no: "Geen duidelijke verboden signalen",
  },
  dataSensitivity: {
    anonymous: "Anoniem of synthetisch",
    personal: "Persoonsgegevens",
    special: "Bijzondere of kwetsbare gegevens",
    biometric: "Biometrische data",
  },
  automation: {
    fully: "Volledig geautomatiseerd",
    human_loop: "Mens-in-de-lus",
    assistive: "Alleen ondersteunend",
  },
  sourcing: {
    vendor: "Leverancier of GPAI-dienst",
    hybrid: "Hybride levering",
    inhouse: "In-house systeem",
  },
  procurement: {
    ready: "Inkoop gereed",
    partial: "Inkoop deels gereed",
    none: "Inkoop nog niet gereed",
  },
  audience: {
    civilians: "Direct bij inwoners",
    civil_servants: "Vooral ambtenaren",
    both: "Inwoners en ambtenaren",
  },
  fallback: {
    immediate: "Directe fallback",
    delayed: "Vertraagde fallback",
    none: "Geen fallback",
  },
  stressCoverage: {
    low: "10-case dekking: laag",
    medium: "10-case dekking: middel",
    high: "10-case dekking: hoog",
  },
  measurement: {
    robust: "Meting: structureel",
    partial: "Meting: deels",
    none: "Meting: ontbreekt",
  },
};

const PERSONAS = [
  {
    id: "laaggeletterd",
    label: "Inwoner met lage taalvaardigheid",
    watchpoint: "Duidelijke taal en begeleide stappen zijn cruciaal.",
    plainLanguage: true,
    highNeed: true,
  },
  {
    id: "digitaalzwak",
    label: "Inwoner met lage digitale vaardigheden",
    watchpoint: "Assisted digital, telefoon en balie moeten beschikbaar blijven.",
    digital: true,
    highNeed: true,
  },
  {
    id: "visueel",
    label: "Inwoner met visuele beperking",
    watchpoint: "Schermlezer, contrast en niet-visuele alternatieven nodig.",
    accessibility: true,
    highNeed: true,
  },
  {
    id: "auditief",
    label: "Inwoner met auditieve beperking",
    watchpoint: "Tekstalternatieven en duidelijke escalatie zijn nodig.",
    accessibility: true,
    highNeed: true,
  },
  {
    id: "stress",
    label: "Inwoner onder stress of cognitieve druk",
    watchpoint: "Empathische overname door een mens moet snel mogelijk zijn.",
    empathy: true,
    highNeed: true,
  },
  {
    id: "multiprobleem",
    label: "Huishouden met multiproblematiek",
    watchpoint: "Casuseigenaarschap over domeinen heen is noodzakelijk.",
    complex: true,
    highNeed: true,
  },
  {
    id: "taalbarriere",
    label: "Inwoner met taalbarriere",
    watchpoint: "Vertaling en meertalige ondersteuning mogen geen bijzaak zijn.",
    translation: true,
    highNeed: true,
  },
  {
    id: "offline",
    label: "Inwoner zonder stabiel device of internet",
    watchpoint: "Offline, papier en telefoon moeten overeind blijven.",
    offline: true,
    highNeed: true,
  },
  {
    id: "mantelzorg",
    label: "Oudere inwoner met mantelzorger",
    watchpoint: "Continuiteit, toestemming en heldere overdracht tellen zwaar.",
    continuity: true,
    highNeed: true,
  },
  {
    id: "wantrouwen",
    label: "Inwoner met laag vertrouwen in overheid",
    watchpoint: "Uitlegbaarheid, aanvechtbaarheid en transparantie zijn doorslaggevend.",
    trust: true,
    highNeed: true,
  },
];

const CHECKLIST_CRITERIA = [
  {
    id: "humaner",
    title: "Menselijker of ten minste niet onmenselijker",
    detail:
      "Hoe maakt deze applicatie de dienstverlening menselijker, of hoe voorkomt zij dat inwoners minder menselijk behandeld worden?",
  },
  {
    id: "last",
    title: "Administratieve last voor kwetsbare burgers",
    detail:
      "Is er expliciet nagedacht over extra formulieren, bewijsdruk, herhaalcontact of digitale frictie voor kwetsbare groepen?",
  },
  {
    id: "contact",
    title: "Persoonlijk contact en empathische besluitvorming",
    detail:
      "Blijft persoonlijk contact mogelijk en is duidelijk waar empathische afweging door mensen nodig blijft?",
  },
  {
    id: "monitoring",
    title: "Monitoring in het huidige proces",
    detail:
      "Wordt menselijke maat in het huidige proces al gevolgd via evaluaties, klantreizen of gebruikersonderzoek?",
  },
  {
    id: "indicatoren",
    title: "Aanvullende indicatoren nodig",
    detail:
      "Is al helder welke extra indicatoren nodig zijn om effecten op menselijke maat straks te volgen en te corrigeren?",
  },
];

const CHECKLIST_OPTIONS = [
  {
    value: 3,
    label: "Sterk onderbouwd",
  },
  {
    value: 2,
    label: "Redelijk uitgewerkt",
  },
  {
    value: 1,
    label: "Kwetsbaar punt",
  },
  {
    value: 0,
    label: "Nog onbekend",
  },
];

const VIGNETTES = [
  {
    id: "schuldstress",
    meta: "Vignette 01",
    title: "Alleenstaande ouder met schuldenstress",
    scenario:
      "Een inwoner moet meerdere bewijsstukken aanleveren, begrijpt de brief niet goed en haakt af zodra een formulier terugkomt met fouten.",
    prompts: [
      "Welke stap in het nieuwe AI-proces kan deze inwoner juist slechter af laten zijn dan vandaag?",
      "Waar moet menselijk contact worden ingebouwd om escalatie van stress te voorkomen?",
      "Welke indicator laat het snelst zien dat deze casus verslechtert?",
    ],
  },
  {
    id: "mantelzorger",
    meta: "Vignette 02",
    title: "Oudere inwoner die leunt op een mantelzorger",
    scenario:
      "De formele aanvrager en de feitelijke gebruiker van het proces zijn niet dezelfde persoon. Informatie gaat vaak via een zoon, dochter of buur.",
    prompts: [
      "Hoe voorkom je dat de AI-flow te veel zelfstandigheid veronderstelt?",
      "Waar ontstaan risico's rond toestemming, bereikbaarheid en continuiteit?",
      "Welke fallback moet op dezelfde dag beschikbaar zijn?",
    ],
  },
  {
    id: "taal",
    meta: "Vignette 03",
    title: "Inwoner met taalbarriere en laag systeemvertrouwen",
    scenario:
      "De inwoner begrijpt formele taal niet, vertrouwt overheidsteksten weinig en trekt conclusies uit toon en timing van het bericht.",
    prompts: [
      "Welke onderdelen van de AI-output moeten in gewone taal of meerdere talen beschikbaar zijn?",
      "Hoe voorkom je dat schijnzekerheid of modeltaal het vertrouwen verder ondermijnt?",
      "Welke testcasus laat zien of uitleg echt werkt?",
    ],
  },
  {
    id: "uitvoerder",
    meta: "Vignette 04",
    title: "Uitvoerende medewerker met hoge caseload",
    scenario:
      "Een medewerker gebruikt de tool intern. Het systeem lijkt tijd te winnen, maar subtiele context uit gesprekken en uitzonderingen raakt uit beeld.",
    prompts: [
      "Waar kan interne efficientie botsen met de kwaliteit van dienstverlening voor inwoners?",
      "Welke override-momenten moeten verplicht zichtbaar blijven?",
      "Hoe toets je of minder werkdruk niet leidt tot minder menselijk handelen?",
    ],
  },
];

const VIGNETTE_STATUS_OPTIONS = [
  {
    value: "todo",
    label: "Nog niet besproken",
  },
  {
    value: "reviewed",
    label: "Besproken",
  },
  {
    value: "redesign",
    label: "Herontwerp nodig",
  },
];

const SURVEY_QUESTIONS = [
  {
    id: "begrijpelijk",
    title: "Ik begrijp wat er in dit proces van mij verwacht wordt",
    detail: "Gebruik dit in een kort interview of als schriftelijke vraag aan inwoners.",
  },
  {
    id: "bereikbaar",
    title: "Ik kan een mens bereiken als ik vastloop",
    detail: "Toetst of de huidige dienstverlening een echte menselijke uitweg heeft.",
  },
  {
    id: "respectvol",
    title: "Ik voel mij eerlijk en respectvol behandeld",
    detail: "Signaleert of menselijke maat vooral een beleidsclaim of ook een ervaring is.",
  },
  {
    id: "last",
    title: "Het proces kost mij niet onnodig veel tijd of moeite",
    detail: "Vraagt naar administratieve last, herhaalwerk en kanaalwisselingen.",
  },
];

const SURVEY_OPTIONS = [
  {
    value: 3,
    label: "Sterk eens",
  },
  {
    value: 2,
    label: "Eerder eens",
  },
  {
    value: 1,
    label: "Eerder oneens",
  },
  {
    value: 0,
    label: "Sterk oneens / onbekend",
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
  checklistGrid: document.querySelector("#checklistGrid"),
  checklistSummary: document.querySelector("#checklistSummary"),
  checklistBadge: document.querySelector("#checklistBadge"),
  vignetteTabs: document.querySelector("#vignetteTabs"),
  vignetteMeta: document.querySelector("#vignetteMeta"),
  vignetteTitle: document.querySelector("#vignetteTitle"),
  vignetteScenario: document.querySelector("#vignetteScenario"),
  vignettePrompts: document.querySelector("#vignettePrompts"),
  vignetteStatuses: document.querySelector("#vignetteStatuses"),
  vignetteNotes: document.querySelector("#vignetteNotes"),
  vignetteSummary: document.querySelector("#vignetteSummary"),
  vignetteBadge: document.querySelector("#vignetteBadge"),
  surveyGrid: document.querySelector("#surveyGrid"),
  surveySummary: document.querySelector("#surveySummary"),
  surveyBadge: document.querySelector("#surveyBadge"),
};

const state = {
  current: "stage",
  answers: {},
  order: [],
  showingResult: false,
  markdown: "",
  checklistAnswers: {},
  selectedVignette: VIGNETTES[0].id,
  vignetteStates: Object.fromEntries(VIGNETTES.map((item) => [item.id, "todo"])),
  vignetteNotes: Object.fromEntries(VIGNETTES.map((item) => [item.id, ""])),
  surveyAnswers: {},
};

function init() {
  dom.backBtn.addEventListener("click", handleBack);
  dom.restartBtn.addEventListener("click", resetAll);
  dom.downloadBtn.addEventListener("click", downloadPlan);
  dom.vignetteNotes.addEventListener("input", handleVignetteNote);
  renderChecklist();
  renderVignetteTabs();
  renderSurvey();
  render();
}

function render() {
  renderQuestion();
  renderPath();
  renderChecklist();
  renderVignette();
  renderSurvey();
  dom.backBtn.disabled = state.order.length === 0 && !state.showingResult;
}

function renderQuestion() {
  if (state.showingResult) {
    dom.layerBadge.textContent = "Resultaat";
    dom.questionTitle.textContent = "Bekijk hieronder de volledige route-uitkomst";
    dom.questionHelp.textContent = "Gebruik Terug om een antwoord te wijzigen en het rapport te verversen.";
    dom.options.innerHTML = "";
    return;
  }

  const question = QUESTIONS[state.current];
  dom.layerBadge.textContent = `Laag ${question.layer} · ${question.short}`;
  dom.questionTitle.textContent = question.prompt;
  dom.questionHelp.textContent = question.help;
  dom.options.innerHTML = "";

  question.options.forEach((option) => {
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
    const listItem = document.createElement("li");
    const answerValue = state.answers[id];
    const answerLabel = ANSWER_LOOKUP[id] && ANSWER_LOOKUP[id][answerValue] ? ANSWER_LOOKUP[id][answerValue] : "-";
    listItem.textContent = `Laag ${index + 1}: ${QUESTIONS[id].short} -> ${answerLabel}`;
    dom.routeList.appendChild(listItem);
  });
}

function renderChecklist() {
  dom.checklistGrid.innerHTML = "";
  CHECKLIST_CRITERIA.forEach((criterion) => {
    const card = document.createElement("article");
    card.className = "criterion-card";

    const title = document.createElement("h3");
    title.textContent = criterion.title;
    card.appendChild(title);

    const detail = document.createElement("p");
    detail.textContent = criterion.detail;
    card.appendChild(detail);

    const row = document.createElement("div");
    row.className = "score-row";

    CHECKLIST_OPTIONS.forEach((option) => {
      const button = document.createElement("button");
      button.className = `score-btn${state.checklistAnswers[criterion.id] === option.value ? " active" : ""}`;
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        state.checklistAnswers[criterion.id] = option.value;
        renderChecklist();
        rebuildIfComplete();
      });
      row.appendChild(button);
    });

    card.appendChild(row);
    dom.checklistGrid.appendChild(card);
  });

  const summary = getChecklistSummary();
  dom.checklistSummary.textContent = summary.text;
  applyBadge(dom.checklistBadge, summary.badge, summary.tone);
}

function renderVignetteTabs() {
  dom.vignetteTabs.innerHTML = "";
  VIGNETTES.forEach((vignette) => {
    const button = document.createElement("button");
    button.className = `chip-btn${state.selectedVignette === vignette.id ? " active" : ""}`;
    button.type = "button";
    button.textContent = vignette.meta;
    button.addEventListener("click", () => {
      state.selectedVignette = vignette.id;
      renderVignette();
    });
    dom.vignetteTabs.appendChild(button);
  });
}

function renderVignette() {
  renderVignetteTabs();

  const vignette = VIGNETTES.find((item) => item.id === state.selectedVignette);
  dom.vignetteMeta.textContent = vignette.meta;
  dom.vignetteTitle.textContent = vignette.title;
  dom.vignetteScenario.textContent = vignette.scenario;
  dom.vignettePrompts.innerHTML = "";
  vignette.prompts.forEach((prompt) => {
    const listItem = document.createElement("li");
    listItem.textContent = prompt;
    dom.vignettePrompts.appendChild(listItem);
  });

  dom.vignetteStatuses.innerHTML = "";
  VIGNETTE_STATUS_OPTIONS.forEach((option) => {
    const button = document.createElement("button");
    button.className = `status-btn${state.vignetteStates[vignette.id] === option.value ? " active" : ""}`;
    button.type = "button";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      state.vignetteStates[vignette.id] = option.value;
      renderVignette();
      rebuildIfComplete();
    });
    dom.vignetteStatuses.appendChild(button);
  });

  dom.vignetteNotes.value = state.vignetteNotes[vignette.id];
  updateVignetteSummary();
}

function renderSurvey() {
  dom.surveyGrid.innerHTML = "";
  SURVEY_QUESTIONS.forEach((question) => {
    const card = document.createElement("article");
    card.className = "criterion-card";

    const title = document.createElement("h3");
    title.textContent = question.title;
    card.appendChild(title);

    const detail = document.createElement("p");
    detail.textContent = question.detail;
    card.appendChild(detail);

    const row = document.createElement("div");
    row.className = "score-row";

    SURVEY_OPTIONS.forEach((option) => {
      const button = document.createElement("button");
      button.className = `score-btn${state.surveyAnswers[question.id] === option.value ? " active" : ""}`;
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        state.surveyAnswers[question.id] = option.value;
        renderSurvey();
        rebuildIfComplete();
      });
      row.appendChild(button);
    });

    card.appendChild(row);
    dom.surveyGrid.appendChild(card);
  });

  const summary = getSurveySummary();
  dom.surveySummary.textContent = summary.text;
  applyBadge(dom.surveyBadge, summary.badge, summary.tone);
}

function handleVignetteNote(event) {
  state.vignetteNotes[state.selectedVignette] = event.target.value;
  updateVignetteSummary();
  rebuildIfComplete();
}

function updateVignetteSummary() {
  const summary = getVignetteSummary();
  dom.vignetteSummary.textContent = summary.text;
  applyBadge(dom.vignetteBadge, summary.badge, summary.tone);
}

function applyBadge(element, text, tone) {
  element.textContent = text;
  element.className = "status-badge";
  if (tone) {
    element.classList.add(tone);
  }
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
  const questionId = state.current;

  if (!state.order.includes(questionId)) {
    state.order.push(questionId);
  } else {
    pruneAfter(questionId);
  }

  state.answers[questionId] = option.value;

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

function isDecisionTreeComplete() {
  return Boolean(state.answers.measurement);
}

function rebuildIfComplete() {
  if (isDecisionTreeComplete()) {
    buildResult();
  }
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
    const pillElement = document.createElement("span");
    pillElement.className = `pill${pill.warn ? " warn" : ""}`;
    pillElement.textContent = pill.label;
    dom.profilePills.appendChild(pillElement);
  });

  dom.planSteps.innerHTML = "";
  model.steps.forEach((stepText) => {
    const listItem = document.createElement("li");
    listItem.textContent = stepText;
    dom.planSteps.appendChild(listItem);
  });

  dom.branchReasons.innerHTML = "";
  model.reasons.forEach((reason) => {
    const listItem = document.createElement("li");
    listItem.textContent = reason;
    dom.branchReasons.appendChild(listItem);
  });

  dom.humanTableBody.innerHTML = "";
  model.humanRows.forEach((row) => {
    const tableRow = document.createElement("tr");
    appendTextCell(tableRow, row.caseLabel);
    appendTagCell(tableRow, row.better);
    appendTagCell(tableRow, row.worseRisk);
    appendTagCell(tableRow, row.quicker);
    appendTagCell(tableRow, row.easier);
    appendTextCell(tableRow, row.watchpoint);
    dom.humanTableBody.appendChild(tableRow);
  });

  dom.humanSummary.textContent = model.humanSummary;
  state.markdown = toMarkdown(model, profile);
  state.showingResult = true;
  dom.downloadBtn.disabled = false;
  dom.resultCard.classList.remove("hidden");
  renderQuestion();
  renderPath();
}

function appendTextCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function appendTagCell(row, status) {
  const cell = document.createElement("td");
  const tag = document.createElement("span");
  tag.className = `tag ${status.className}`;
  tag.textContent = status.label;
  cell.appendChild(tag);
  row.appendChild(cell);
}

function getChecklistSummary() {
  const answered = CHECKLIST_CRITERIA.filter((criterion) => Number.isInteger(state.checklistAnswers[criterion.id]));
  if (answered.length === 0) {
    return {
      badge: "Nog niet ingevuld",
      tone: "neutral",
      score: null,
      text: "Nog geen checklistantwoorden. Vul de criteria in om een voorlopige score en aandachtspunten te zien.",
      weakPoints: CHECKLIST_CRITERIA.map((criterion) => criterion.title),
    };
  }

  const maxScore = CHECKLIST_CRITERIA.length * 3;
  const total = CHECKLIST_CRITERIA.reduce((sum, criterion) => sum + (state.checklistAnswers[criterion.id] ?? 0), 0);
  const percentage = total / maxScore;
  const reportGrade = (percentage * 9 + 1).toFixed(1);
  const weakPoints = CHECKLIST_CRITERIA.filter((criterion) => (state.checklistAnswers[criterion.id] ?? -1) <= 1).map(
    (criterion) => criterion.title
  );

  if (answered.length < CHECKLIST_CRITERIA.length) {
    return {
      badge: `${reportGrade}/10 voorlopig`,
      tone: "warning",
      score: reportGrade,
      text: `Checklist deels ingevuld. Voorlopige score ${reportGrade}/10. Vul de resterende criteria in voor een betrouwbaarder beeld.`,
      weakPoints,
    };
  }

  if (percentage >= 0.75) {
    return {
      badge: `${reportGrade}/10 sterk`,
      tone: "good",
      score: reportGrade,
      text: `Sterke basis op menselijke maat. Voorlopige score ${reportGrade}/10. Houd vooral de zwakste punten actief onder review.`,
      weakPoints,
    };
  }

  if (percentage >= 0.5) {
    return {
      badge: `${reportGrade}/10 aanscherpen`,
      tone: "warning",
      score: reportGrade,
      text: `Werkbaar, maar nog niet overtuigend. Voorlopige score ${reportGrade}/10. Verdiep vooral de onderdelen die nu kwetsbaar blijven.`,
      weakPoints,
    };
  }

  return {
    badge: `${reportGrade}/10 risicovol`,
    tone: "warning",
    score: reportGrade,
    text: `Menselijke maat is nog onvoldoende uitgewerkt. Voorlopige score ${reportGrade}/10. Zet eerst de basiscriteria scherper neer voordat opgeschaald wordt.`,
    weakPoints,
  };
}

function getVignetteSummary() {
  const statuses = Object.values(state.vignetteStates);
  const reviewed = statuses.filter((status) => status === "reviewed").length;
  const redesign = statuses.filter((status) => status === "redesign").length;
  const notes = Object.values(state.vignetteNotes).filter((note) => note.trim().length > 0).length;

  if (reviewed === 0 && redesign === 0 && notes === 0) {
    return {
      badge: "Nog niet besproken",
      tone: "neutral",
      text: "Kies een vignette, bespreek de casus en noteer wat er aangepast moet worden om de menselijke maat overeind te houden.",
      redesignCount: 0,
    };
  }

  const badge = redesign > 0 ? `${redesign} herontwerp` : `${reviewed} besproken`;
  const tone = redesign > 0 ? "warning" : "good";
  const text = `${reviewed} vignettes besproken, ${redesign} met directe herontwerpsignalen en ${notes} met notities. Gebruik deze inzichten om abstracte risico's concreet te maken.`;

  return {
    badge,
    tone,
    text,
    redesignCount: redesign,
  };
}

function getSurveySummary() {
  const answered = SURVEY_QUESTIONS.filter((question) => Number.isInteger(state.surveyAnswers[question.id]));
  if (answered.length === 0) {
    return {
      badge: "Sjabloon",
      tone: "neutral",
      score: null,
      lowSignals: SURVEY_QUESTIONS.map((question) => question.title),
      text: "Nog geen burgerperspectief ingevuld. Gebruik dit onderdeel als korte interviewleidraad of quick scan in het bestaande proces.",
    };
  }

  const maxScore = SURVEY_QUESTIONS.length * 3;
  const total = SURVEY_QUESTIONS.reduce((sum, question) => sum + (state.surveyAnswers[question.id] ?? 0), 0);
  const percentage = total / maxScore;
  const lowSignals = SURVEY_QUESTIONS.filter((question) => (state.surveyAnswers[question.id] ?? -1) <= 1).map(
    (question) => question.title
  );

  if (answered.length < SURVEY_QUESTIONS.length) {
    return {
      badge: "Deels ingevuld",
      tone: "warning",
      score: (percentage * 100).toFixed(0),
      lowSignals,
      text: "Burgerperspectief is nog incompleet. Gebruik meer interviews of metingen voordat deze signalen als representatief worden gezien.",
    };
  }

  if (percentage >= 0.72) {
    return {
      badge: "Positief signaal",
      tone: "good",
      score: (percentage * 100).toFixed(0),
      lowSignals,
      text: "De eerste signalen uit burgerperspectief zijn relatief positief. Blijf dit wel vergelijken met kwetsbare casussen en feitelijke uitkomsten.",
    };
  }

  return {
    badge: "Waarschuwing",
    tone: "warning",
    score: (percentage * 100).toFixed(0),
    lowSignals,
    text: "Burgerperspectief laat duidelijke frictie zien in het huidige proces. Gebruik dit als tegenwicht voor interne efficientiedoelen.",
  };
}

function generatePlan(profile) {
  const prohibited = profile.prohibitedSignals === "yes";
  const prohibitedUnclear = profile.prohibitedSignals === "unsure";
  const sensitiveData = ["special", "biometric"].includes(profile.dataSensitivity);
  const personalData = ["personal", "special", "biometric"].includes(profile.dataSensitivity);
  const highRiskCandidate =
    profile.rightsImpact === "yes" || profile.automation === "fully" || sensitiveData;
  const vendorDependency = ["vendor", "hybrid"].includes(profile.sourcing);
  const procurementGap = ["none", "partial"].includes(profile.procurement);
  const residentFacing = profile.audience === "civilians" || profile.audience === "both";
  const staffFacing = profile.audience === "civil_servants" || profile.audience === "both";
  const fallbackImmediate = profile.fallback === "immediate";
  const fallbackNone = profile.fallback === "none";
  const lowStressCoverage = profile.stressCoverage === "low";
  const mediumStressCoverage = profile.stressCoverage === "medium";
  const highStressCoverage = profile.stressCoverage === "high";
  const measurementGap = ["none", "partial"].includes(profile.measurement);
  const robustMeasurement = profile.measurement === "robust";

  const checklist = getChecklistSummary();
  const vignette = getVignetteSummary();
  const survey = getSurveySummary();
  const humanAnalysis = generateHumanMaatAnalysis(profile);
  const highWorseRiskCount = humanAnalysis.rows.filter((row) => row.worseRisk.label === "Hoog").length;
  const harderCount = humanAnalysis.rows.filter((row) => row.easier.label === "Moeilijker").length;
  const likelyWorseCount = humanAnalysis.rows.filter((row) => row.better.label === "Slechter").length;

  const pills = [];
  pills.push({ label: ANSWER_LOOKUP.stage[profile.stage] || "Startpositie onbekend" });
  pills.push({
    label: prohibited ? "Route: stop en herontwerp" : highRiskCandidate ? "Route: high-risk kandidaat" : "Route: lager risico",
    warn: prohibited || highRiskCandidate,
  });
  pills.push({
    label: residentFacing ? "Direct merkbaar voor inwoners" : "Eerst intern merkbaar",
    warn: residentFacing && !fallbackImmediate,
  });
  if (vendorDependency) {
    pills.push({ label: "Leveranciersafhankelijk" });
  }
  if (personalData) {
    pills.push({ label: "GDPR-zwaar", warn: profile.dataSensitivity !== "personal" });
  }
  pills.push({
    label: checklist.score ? `Checklist ${checklist.score}/10` : "Checklist nog open",
    warn: !checklist.score || Number(checklist.score) < 7,
  });
  pills.push({
    label: robustMeasurement ? "Menselijke maat meetbaar" : "Menselijke maat nog niet bewezen",
    warn: !robustMeasurement,
  });

  const reasons = [];
  if (prohibited) {
    reasons.push("Er zijn signalen van mogelijk verboden AI-praktijken; dat vraagt direct om stopzetten en herontwerp.");
  }
  if (prohibitedUnclear) {
    reasons.push("Er is juridische onzekerheid over mogelijke verboden praktijken; die twijfel moet eerst worden opgelost.");
  }
  if (highRiskCandidate) {
    reasons.push("Deze toepassing lijkt een high-risk kandidaat of heeft duidelijke impact op rechten en publieke dienstverlening.");
  }
  if (personalData) {
    reasons.push("Persoonsgegevens of gevoelige data maken privacy-, grondslag- en beveiligingsvragen direct relevant.");
  }
  if (vendorDependency) {
    reasons.push("Externe leveranciers vergroten de noodzaak van auditrechten, transparantie en contractuele controle.");
  }
  if (procurementGap) {
    reasons.push("De huidige inkoopbasis is nog niet sterk genoeg voor herhaalbare en verantwoorde uitrol.");
  }
  if (fallbackNone) {
    reasons.push("Er is geen gegarandeerde menselijke fallback, terwijl juist dat een kernvoorwaarde is voor menselijke maat.");
  }
  if (lowStressCoverage) {
    reasons.push("De 10-case stresstest is nog amper uitgevoerd, waardoor kwetsbare uitzonderingen buiten beeld kunnen blijven.");
  }
  if (measurementGap) {
    reasons.push("Zonder structurele meting blijft onduidelijk of het proces echt beter, sneller of menselijker wordt.");
  }
  if (highWorseRiskCount >= 4) {
    reasons.push(`${highWorseRiskCount} van de 10 moeilijke casussen laten nog een hoog risico op verslechtering zien.`);
  }
  if (harderCount >= 4) {
    reasons.push(`${harderCount} van de 10 casussen worden waarschijnlijk moeilijker dan in het huidige proces.`);
  }
  if (likelyWorseCount >= 3) {
    reasons.push(`${likelyWorseCount} van de 10 casussen lijken slechter uit te komen dan de huidige praktijk.`);
  }
  if (checklist.score && Number(checklist.score) < 7) {
    reasons.push("De checklist menselijke maat laat zien dat de ontwerpbasis nog niet overtuigend genoeg is.");
  }
  if (vignette.redesignCount > 0) {
    reasons.push("In de vignette-bespreking zijn concrete herontwerpsignalen gevonden.");
  }
  if (survey.score && Number(survey.score) < 60) {
    reasons.push("Het burgerperspectief wijst op frictie in begrijpelijkheid, bereikbaarheid of ervaren rechtvaardigheid.");
  }
  if (!residentFacing) {
    reasons.push("Omdat de tool vooral intern gebruikt wordt, moet expliciet getest worden wat inwoners er downstream van merken.");
  }
  if (reasons.length === 0) {
    reasons.push("De route zit relatief goed in elkaar, maar vraagt nog steeds actieve monitoring op menselijke maat.");
  }

  const steps = [];
  if (prohibited) {
    steps.push("Bevries het huidige ontwerp direct en organiseer eerst een juridische en ethische red-team review.");
    steps.push("Herontwerp de toepassing zodat verboden technieken volledig uit scope verdwijnen en leg dat besluit vast.");
  }

  if (profile.stage === "explore") {
    steps.push("Begin met een scherp afgebakende use case en schrijf expliciet op welk publiek probleem wel en niet opgelost wordt.");
  }
  if (profile.stage === "pilot") {
    steps.push("Pauzeer opschaling en definieer voor de pilot duidelijke grenzen, een rollback-trigger en verantwoordelijke beslissers.");
  }
  if (profile.stage === "live") {
    steps.push("Voer binnen 30 dagen een compliance- en mensimpactscan uit op het live proces voordat nieuwe functies worden toegevoegd.");
  }

  steps.push(
    "Vorm een vaste AI-governancecel met proceseigenaar, jurist, privacyexpert, security, inkoop en iemand uit de uitvoeringspraktijk."
  );
  steps.push(
    "Classificeer de toepassing formeel onder de AI Act en leg vast waarom deze verboden, high-risk kandidaat of lager risico is."
  );

  if (prohibited) {
    steps.push("Laat na herontwerp opnieuw formeel classificeren voordat een pilot of aanbesteding hervat wordt.");
  } else if (highRiskCandidate) {
    steps.push(
      "Behandel de toepassing voorlopig als high-risk kandidaat en bereid documentatie, risicobeheer, menselijk toezicht en monitoring voor."
    );
    steps.push("Plan de implementatie expliciet terug vanaf 2 augustus 2026, wanneer het grootste deel van de AI Act van toepassing wordt.");
  } else {
    steps.push("Houd de toepassing in een beperkte-risico route met duidelijke transparantie, kwaliteitscontrole en fallback.");
  }

  if (personalData) {
    steps.push("Werk grondslag, dataminimalisatie, bewaartermijnen, beveiliging en waar nodig een DPIA concreet uit.");
  } else {
    steps.push("Bewaar discipline op dataminimalisatie en voorkom dat later alsnog ongemerkt persoonsgegevens binnenstromen.");
  }

  if (profile.automation === "fully") {
    steps.push("Bouw verplichte menselijke review, bezwaar- en herstelroutes in voordat AI-output een betekenisvol besluit kan bepalen.");
  } else if (profile.automation === "human_loop") {
    steps.push("Maak override-bevoegdheden expliciet en volg actief hoe vaak medewerkers de AI-output corrigeren.");
  } else {
    steps.push("Borg technisch en organisatorisch dat de AI alleen ondersteunend gebruikt wordt en niet alsnog besluitvormend wordt.");
  }

  if (vendorDependency) {
    steps.push("Neem auditrechten, logtoegang, wijzigingsmeldingen, incident-SLA's en subprocessor-transparantie standaard op in contracten.");
  }
  if (procurementGap) {
    steps.push("Ontwikkel eerst een AI-inkoopset met technische vragenlijst, juridische clausules en security-eisen.");
  }

  steps.push("Maak een expliciet charter voor menselijke maat met principes rond waardigheid, toegankelijkheid, proportionaliteit en geen doodlopende kanalen.");

  if (checklist.weakPoints.length > 0) {
    steps.push(`Werk deze checklistonderdelen eerst uit: ${checklist.weakPoints.slice(0, 3).join(", ")}.`);
  }

  steps.push("Voer de 10 moeilijkste gebruikerscasussen systematisch uit tegenover de huidige werkwijze en documenteer verschillen.");

  if (residentFacing) {
    steps.push("Houd altijd meerdere kanalen open voor inwoners en garandeer direct menselijk contact in kwetsbare of vastgelopen situaties.");
  } else if (staffFacing) {
    steps.push("Toets expliciet of interne tijdwinst niet ongemerkt leidt tot slechtere dienstverlening voor inwoners.");
  }

  if (fallbackNone) {
    steps.push("Definieer een same-day fallback-SLA en maak voor inwoners en medewerkers zichtbaar hoe escalatie naar een mens werkt.");
  }

  if (lowStressCoverage || mediumStressCoverage) {
    steps.push("Breid de stresstest uit tot alle 10 worst-case profielen voordat opschaling overwogen wordt.");
  } else if (highStressCoverage) {
    steps.push("Gebruik de bestaande stresstest als formele go/no-go drempel in governance en inkoop.");
  }

  if (vignette.redesignCount > 0) {
    steps.push("Zet de herontwerpsignalen uit de vignettes om in concrete ontwerpacties en koppel er eigenaarschap aan.");
  }

  if (measurementGap) {
    steps.push("Richt kwartaalmetingen in voor beter/slechter/sneller/makkelijker, gesplitst naar inwoners en uitvoerende medewerkers.");
  } else {
    steps.push("Publiceer periodiek hoe menselijke maat zich ontwikkelt en welke correcties zijn doorgevoerd bij verslechtering.");
  }

  if (survey.lowSignals.length > 0 && survey.score !== null) {
    steps.push(`Gebruik burgerinterviews extra op deze punten: ${survey.lowSignals.slice(0, 3).join(", ")}.`);
  }

  steps.push("Train beleidsmakers, ontwerpers, uitvoerders en inkopers in AI-geletterdheid en herkenning van menselijk-maat-risico's.");
  steps.push("Schrijf een begrijpelijke publieke uitleg over doel, data, menselijke controle en klacht- of bezwaarroute.");
  steps.push("Reserveer expliciet ruimte voor de latere LLM- en chatbotmodules, maar voer die pas in met backend, validatie en privacywaarborgen.");

  const title = prohibited
    ? "Uitkomst: stop en herontwerp voor verdere inzet"
    : highRiskCandidate
      ? "Uitkomst: high-risk kandidaat met verzwaarde waarborgen"
      : "Uitkomst: route voor beperkte of matige risico's";

  const intro = prohibited
    ? "Deze route legt eerst de nadruk op risico-inperking en herontwerp, daarna pas op eventuele doorontwikkeling."
    : "Deze route combineert AI Act-verplichtingen met menselijke maat, uitvoering en burgerperspectief.";

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
  const highRiskCount = rows.filter((row) => row.worseRisk.label === "Hoog").length;
  const harderCount = rows.filter((row) => row.easier.label === "Moeilijker").length;
  const worseCount = rows.filter((row) => row.better.label === "Slechter").length;
  const quickCount = rows.filter((row) => row.quicker.label === "Sneller").length;

  return {
    rows,
    summary: `${highRiskCount}/10 hoog slechter-risico, ${harderCount}/10 moeilijker, ${worseCount}/10 waarschijnlijk slechter en ${quickCount}/10 sneller dan de huidige baseline. Prioriteer altijd de casussen met hoog risico of grotere moeite.`,
  };
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
  } else {
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
  } else {
    betterScore -= 1;
    easierScore -= 1;
    worseRiskScore += 2;
  }

  if (profile.measurement === "robust") {
    betterScore += 1;
    worseRiskScore -= 1;
  } else if (profile.measurement === "partial") {
    worseRiskScore += 1;
  } else {
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

  if (profile.rightsImpact !== "no") {
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
  if (persona.plainLanguage && profile.stressCoverage !== "high") {
    easierScore -= 1;
  }
  if (persona.digital) {
    quickerScore -= 1;
    if (fallback !== "immediate") {
      worseRiskScore += 1;
    }
  }
  if (persona.accessibility && profile.stressCoverage !== "high") {
    easierScore -= 1;
    worseRiskScore += 1;
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
  if (persona.complex && profile.automation === "fully") {
    worseRiskScore += 1;
    easierScore -= 1;
  }
  if (persona.translation && fallback === "none") {
    easierScore -= 1;
    worseRiskScore += 1;
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
    return makeStatus("Beter", "good");
  }
  if (score === 1) {
    return makeStatus("Beperkt beter", "warn");
  }
  if (score === 0) {
    return makeStatus("Gelijk", "neutral");
  }
  return makeStatus("Slechter", "bad");
}

function mapWorseRisk(score) {
  if (score >= 5) {
    return makeStatus("Hoog", "bad");
  }
  if (score >= 3) {
    return makeStatus("Middel", "warn");
  }
  return makeStatus("Laag", "good");
}

function mapQuicker(score) {
  if (score >= 2) {
    return makeStatus("Sneller", "good");
  }
  if (score === 1) {
    return makeStatus("Beperkt sneller", "warn");
  }
  if (score === 0) {
    return makeStatus("Gelijk", "neutral");
  }
  return makeStatus("Trager", "bad");
}

function mapEasier(score) {
  if (score >= 2) {
    return makeStatus("Makkelijker", "good");
  }
  if (score === 1) {
    return makeStatus("Beperkt makkelijker", "warn");
  }
  if (score === 0) {
    return makeStatus("Gelijk", "neutral");
  }
  return makeStatus("Moeilijker", "bad");
}

function makeStatus(label, className) {
  return { label, className };
}

function toMarkdown(model, profile) {
  const routeLines = state.order
    .map((id) => `- Laag ${QUESTIONS[id].layer} (${QUESTIONS[id].short}): ${ANSWER_LOOKUP[id][state.answers[id]]}`)
    .join("\n");

  const reasonLines = model.reasons.map((reason) => `- ${reason}`).join("\n");
  const stepLines = model.steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const humanRows = model.humanRows
    .map(
      (row) =>
        `| ${row.caseLabel} | ${row.better.label} | ${row.worseRisk.label} | ${row.quicker.label} | ${row.easier.label} | ${row.watchpoint} |`
    )
    .join("\n");

  const checklist = getChecklistSummary();
  const vignette = getVignetteSummary();
  const survey = getSurveySummary();

  const checklistLines = CHECKLIST_CRITERIA.map((criterion) => {
    const value = state.checklistAnswers[criterion.id];
    const option = CHECKLIST_OPTIONS.find((item) => item.value === value);
    return `- ${criterion.title}: ${option ? option.label : "Niet ingevuld"}`;
  }).join("\n");

  const vignetteLines = VIGNETTES.map((item) => {
    const status = VIGNETTE_STATUS_OPTIONS.find((option) => option.value === state.vignetteStates[item.id]);
    const note = state.vignetteNotes[item.id].trim();
    return `- ${item.title}: ${status ? status.label : "Nog niet besproken"}${note ? ` | Notitie: ${note}` : ""}`;
  }).join("\n");

  const surveyLines = SURVEY_QUESTIONS.map((question) => {
    const value = state.surveyAnswers[question.id];
    const option = SURVEY_OPTIONS.find((item) => item.value === value);
    return `- ${question.title}: ${option ? option.label : "Niet ingevuld"}`;
  }).join("\n");

  return `# Menselijke Maat AI Verkenner rapport

## Route-uitkomst
${model.title}

${model.intro}

## Gekozen route
${routeLines}

## Waarom deze route
${reasonLines}

## Stappenplan
${stepLines}

## Menselijke maat stress test
| Casus | Beter | Slechter risico | Sneller | Makkelijker | Aandachtspunt |
| --- | --- | --- | --- | --- | --- |
${humanRows}

${model.humanSummary}

## Checklist menselijke maat
${checklist.text}

${checklistLines}

## Vignette-bespreking
${vignette.text}

${vignetteLines}

## Burgerperspectief
${survey.text}

${surveyLines}

## Placeholder-modules
- LLM-documentassessment: backend, validatie, logging en menselijke review nodig.
- Chatbot-interview: backend, consent, opslagbeleid en escalatie naar een mens nodig.

## Bronnen
- Projectcontext: https://www.instituutgak.nl
- AI Act: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Europese Commissie: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj

Gegenereerd op: ${new Date().toLocaleString("nl-NL")}
Profielstatus: ${ANSWER_LOOKUP.stage[profile.stage]}
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
  anchor.download = "menselijke-maat-ai-verkenner-rapport.md";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

init();
