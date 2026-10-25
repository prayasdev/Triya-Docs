// Triya Pro Interactive Demo & Visual Showcase Engine

// --- Screenshot Data for Lightbox & Showcase ---
const screenshotsData = [
  {
    src: "assets/images/Screenshot_20261025_123405.jpg",
    tag: "Live Tournament",
    title: "Live Tournament Action (Swagbucks LIVE)",
    desc: "Actual in-game round with 19,363 active contestants. Triya Pro's floating HUD seamlessly highlights the winning answer in emerald green with sub-second turnaround."
  },
  {
    src: "assets/images/Screenshot_20261025_123141.jpg",
    tag: "Home Dashboard",
    title: "1-Tap Assistant Activation",
    desc: "Clean Material You interface with quick master toggle and instant game profile selection pill. Zero background battery consumption when inactive."
  },
  {
    src: "assets/images/Screenshot_20261025_123230.jpg",
    tag: "Validation Suite",
    title: "Pre-Tournament Quick Test",
    desc: "Integrated offline test bench allowing contestants to verify OCR bounding boxes, answer verification, and floating HUD styling before entering live tournaments."
  },
  {
    src: "assets/images/Screenshot_20261025_123259.jpg",
    tag: "ROI Profiles",
    title: "Universal ROI Profile Selector",
    desc: "Fast switching between tailored screen coordinates for Swagbucks LIVE, Loco, HQ Trivia, or custom pub quiz tournaments."
  },
  {
    src: "assets/images/Screenshot_20261025_123240.jpg",
    tag: "System Settings",
    title: "Appearance & System Controls",
    desc: "Configure dark theme styling, foreground notification drawer quick-toggles, display-over-other-apps permissions, and connection timeouts."
  },
  {
    src: "assets/images/Screenshot_20261025_123246.jpg",
    tag: "Tuning & Filters",
    title: "Smart Filters & Strategy Settings",
    desc: "Customize negative word detection lists (NOT, NEVER, EXCEPT), common ignore words, and fine-tune game profile ROI regions."
  },
  {
    src: "assets/images/Screenshot_20261025_123149.jpg",
    tag: "Navigation",
    title: "Quick Access Drawer",
    desc: "Rapid access to Quick Test, Preferences, Diagnostic Logs, User Guide, and Frequently Asked Questions directly from the home screen."
  },
  {
    src: "assets/images/Screenshot_20261025_123138.jpg",
    tag: "On-Device",
    title: "Native Android Experience",
    desc: "Lightweight standalone Android app with minimal storage requirements (<65MB RAM) that operates without disrupting existing game apps."
  }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function closeLightboxOnBackdrop(e) {
  if (e.target.id === "lightboxModal" || e.target.classList.contains("lightbox-content")) {
    closeLightbox();
  }
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + screenshotsData.length) % screenshotsData.length;
  updateLightbox();
}

function updateLightbox() {
  const data = screenshotsData[currentLightboxIndex];
  if (!data) return;

  const imgEl = document.getElementById("lightboxImg");
  const badgeEl = document.getElementById("lightboxBadge");
  const titleEl = document.getElementById("lightboxTitle");
  const descEl = document.getElementById("lightboxDesc");
  const counterEl = document.getElementById("lightboxCounter");

  if (imgEl) imgEl.src = data.src;
  if (badgeEl) badgeEl.textContent = data.tag;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${screenshotsData.length}`;
}

// Keyboard controls for lightbox
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("lightboxModal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigateLightbox(-1);
  if (e.key === "ArrowRight") navigateLightbox(1);
});

// Category Filter Tabs
function filterGallery(category) {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => tab.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  const items = document.querySelectorAll(".gallery-item");
  items.forEach(item => {
    const itemCat = item.getAttribute("data-category");
    if (category === "all" || itemCat === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// --- Interactive HUD Demo Simulator ---
const sampleScenarios = [
  {
    question: "What was the nickname for Disney's original core animators?",
    isNegative: false,
    negationWord: "",
    duration: "1.0s",
    options: [
      { text: "Disney's Nine Old Men", c1: "20", c2: "8", s1: "20.8", s2: "0.1", frac: 1.0, isWinner: true },
      { text: "The Swiss Family Robinson", c1: "0", c2: "0", s1: "0.0", s2: "0.1", frac: 0.15, isWinner: false },
      { text: "The Funky Bunch", c1: "0", c2: "0", s1: "0.0", s2: "0.0", frac: 0.10, isWinner: false }
    ]
  },
  {
    question: "Which chemical element has the symbol Fe?",
    isNegative: false,
    negationWord: "",
    duration: "1.1s",
    options: [
      { text: "Fluorine", c1: "2", c2: "8", s1: "2.0", s2: "8.0", frac: 0.18, isWinner: false },
      { text: "Iron", c1: "36", c2: "71", s1: "36.0", s2: "71.0", frac: 1.0, isWinner: true },
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
  if (!demoContainer) return;
  demoContainer.innerHTML = `
    <div class="sim-overlay idle-state" onclick="triggerScan()">
      <span style="font-size: 15px;">⚡</span>
      <span style="font-size: 13.5px; font-weight: 700; color: #ffffff;">Tap to Scan</span>
    </div>
  `;
}

function renderScanningState() {
  if (!demoContainer) return;
  demoContainer.innerHTML = `
    <div class="sim-overlay analyzing-state">
      <div class="sim-spinner"></div>
      <span style="font-size: 13.5px; font-weight: 700;">Scanning...</span>
    </div>
  `;
}

function renderResultState() {
  if (!demoContainer) return;
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
  }, 850);
}

// Initial Render
renderResultState();
