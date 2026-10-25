// Triya Pro Interactive HUD Demo Engine
const sampleScenarios = [
  {
    question: "Which chemical element has the symbol Fe?",
    isNegative: false,
    negationWord: "",
    duration: "1.1s",
    options: [
      { text: "Fluorine", c1: "2", c2: "8", s1: "2.0", s2: "8.0", frac: 0.18, isWinner: false },
      { text: "Iron", c1: "142", c2: "380", s1: "142.0", s2: "380.0", frac: 1.0, isWinner: true },
      { text: "Francium", c1: "1", c2: "4", s1: "1.0", s2: "4.0", frac: 0.14, isWinner: false }
    ]
  },
  {
    question: "Which of these is NOT a primary color of light?",
    isNegative: true,
    negationWord: "NOT",
    duration: "0.9s",
    options: [
      { text: "Red", c1: "88", c2: "194", s1: "88.0", s2: "194.0", frac: 0.32, isWinner: false },
      { text: "Yellow", c1: "4", c2: "12", s1: "4.0", s2: "12.0", frac: 1.0, isWinner: true },
      { text: "Blue", c1: "95", c2: "210", s1: "95.0", s2: "210.0", frac: 0.35, isWinner: false }
    ]
  },
  {
    question: "What is the capital city of Australia?",
    isNegative: false,
    negationWord: "",
    duration: "1.0s",
    options: [
      { text: "Sydney", c1: "34", c2: "78", s1: "34.0", s2: "78.0", frac: 0.28, isWinner: false },
      { text: "Melbourne", c1: "19", c2: "45", s1: "19.0", s2: "45.0", frac: 0.21, isWinner: false },
      { text: "Canberra", c1: "164", c2: "410", s1: "164.0", s2: "410.0", frac: 1.0, isWinner: true }
    ]
  }
];

let currentScenarioIndex = 0;
let hudState = "IDLE"; // IDLE, SCANNING, RESULT

const demoContainer = document.getElementById("hudContainer");

function renderIdleState() {
  demoContainer.innerHTML = `
    <div class="sim-overlay idle-state" onclick="triggerScan()">
      <span style="font-size: 15px;">⚡</span>
      <span style="font-size: 13.5px; font-weight: 700; color: #ffffff;">Tap to Scan</span>
    </div>
  `;
}

function renderScanningState() {
  demoContainer.innerHTML = `
    <div class="sim-overlay analyzing-state">
      <div class="sim-spinner"></div>
      <span style="font-size: 13.5px; font-weight: 700;">Scanning...</span>
    </div>
  `;
}

function renderResultState() {
  const scenario = sampleScenarios[currentScenarioIndex];
  let questionHtml = scenario.question;
  if (scenario.isNegative && scenario.negationWord) {
    questionHtml = scenario.question.replace(
      scenario.negationWord,
      `<span class="negation-word">${scenario.negationWord}</span>`
    );
  }

  let optionsHtml = scenario.options.map((opt, idx) => {
    const winnerClass = opt.isWinner ? "winner" : "runner-up";
    const textWinnerClass = opt.isWinner ? "winner-text" : "";
    const score1WinnerClass = opt.isWinner ? "winner-score" : "";
    const score2WinnerClass = opt.isWinner ? "winner-score" : "";
    const widthPct = Math.round(opt.frac * 100);

    return `
      <div class="sim-row">
        <div class="sim-bar ${winnerClass}" style="width: ${widthPct}%;"></div>
        <div class="sim-row-content">
          <div class="sim-opt-text ${textWinnerClass}">
            <span>${idx + 1}. ${opt.text}</span>
            <span class="sim-word-count">${opt.c1}|${opt.c2}</span>
          </div>
          <div class="sim-scores">
            <span class="sim-score-1 ${score1WinnerClass}">${opt.s1}</span>
            <span class="sim-score-2 ${score2WinnerClass}">${opt.s2}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  demoContainer.innerHTML = `
    <div class="sim-overlay" onclick="triggerScan()" style="cursor: pointer;" title="Tap to scan next question">
      <div class="sim-card-header">
        <div class="sim-question">${questionHtml}</div>
        <div class="sim-duration">${scenario.duration}</div>
      </div>
      <div class="sim-options">
        ${optionsHtml}
      </div>
    </div>
  `;
}

function triggerScan() {
  if (hudState === "SCANNING") return;
  
  hudState = "SCANNING";
  renderScanningState();

  setTimeout(() => {
    hudState = "RESULT";
    renderResultState();
    currentScenarioIndex = (currentScenarioIndex + 1) % sampleScenarios.length;
  }, 950);
}

// Initial Render
renderResultState();
