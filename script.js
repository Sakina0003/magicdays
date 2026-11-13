// ========================================
// OPSAMLINGSSIDE
// ========================================

const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);
}

// ========================================
// BURGER MENU
// ========================================

const burger = document.querySelector(".burgerimg");
const menu = document.querySelector(".menu");
const closeBtn = document.querySelector(".close-btn");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.add("nav-active");
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("nav-active");
  });
}

// ========================================
// SKRIFTRULLE
// ========================================

const scrollObject = document.getElementById("scroll-svg");
const scrollContent = document.querySelector(".scroll-content");

let aabenRulle;
let lukketRulle;

scrollObject?.addEventListener("load", () => {
  const scrollDoc = scrollObject.contentDocument;

  aabenRulle = scrollDoc.getElementById("aabenrulle");
  lukketRulle = scrollDoc.getElementById("lukketrulle");

  // Start lukket
  if (aabenRulle) {
    aabenRulle.style.display = "none";
  }

  if (lukketRulle) {
    lukketRulle.style.display = "block";
  }
});

function openScroll() {
  if (aabenRulle) {
    aabenRulle.style.display = "block";
  }

  if (lukketRulle) {
    lukketRulle.style.display = "none";
  }

  if (scrollContent) {
    scrollContent.classList.add("visible");
  }
}

function closeScroll() {
  if (aabenRulle) {
    aabenRulle.style.display = "none";
  }

  if (lukketRulle) {
    lukketRulle.style.display = "block";
  }

  if (scrollContent) {
    scrollContent.classList.remove("visible");
  }
}

function updateScroll(title, text) {
  closeScroll();

  setTimeout(() => {
    document.getElementById("info-title").textContent = title;
    document.getElementById("info-text").textContent = text;

    openScroll();
  }, 250);
}
// ========================================
// SVG
// ========================================

const svgObject = document.getElementById("mystic-svg");

if (svgObject) {
  svgObject.addEventListener("load", () => {
    const svgDoc = svgObject.contentDocument;

    const flasker = svgDoc.getElementById("Flasker");
    const kort = svgDoc.getElementById("Kort");
    const krystal = svgDoc.getElementById("KrystalKugle");

    const flamme = svgDoc.getElementById("Lys-flamme_x2F_tændt");
    const lysestage = svgDoc.getElementById("Lyssestage");

    const titel = document.getElementById("info-title");
    const tekst = document.getElementById("info-text");

    const svgContainer = document.querySelector(".svg-container");

    // Hover-effekt
    [flasker, kort, krystal, lysestage].forEach((element) => {
      if (!element) return;

      element.style.cursor = "pointer";

      element.addEventListener("mouseenter", () => {
        element.style.filter = "brightness(1.15)";
      });

      element.addEventListener("mouseleave", () => {
        // Behold krystal-gløden når lyset er slukket
        if (element === krystal && !lysTaendt) {
          element.style.filter =
            "drop-shadow(0 0 25px #7ce8ff) drop-shadow(0 0 50px #7ce8ff)";
        } else {
          element.style.filter = "";
        }
      });
    });

    // ========================================
    // LYS
    // ========================================

    let lysTaendt = true;

    // ========================================
    // ELIKSIRER
    // ========================================

    flasker?.addEventListener("click", () => {
      updateScroll(
        "Eliksirer",
        "Lav dine egne eliksirer og udforsk urter, krydderier og magiske ingredienser. Du kan deltage i workshops og købe ingredienser med hjem.",
      );
    });

    // ========================================
    // TAROTKORT
    // ========================================

    kort?.addEventListener("click", () => {
      updateScroll(
        "Tarotkort",
        "Få læst tarotkort og lær om symbolik og fortolkning. Der vil både være oplæg og mulighed for selv at prøve kræfter med kortene.",
      );
    });

    // ========================================
    // KRYSTALKUGLE
    // ========================================

    krystal?.addEventListener("click", () => {
      updateScroll(
        "Krystalkugle",
        "Oplev spændende foredrag om krystallers symbolik, energi og anvendelse. Der vil også være mulighed for at købe krystaller.",
      );
    });

    // ========================================
    // LYSESTAGE
    // ========================================

    lysestage?.addEventListener("click", () => {
      if (!flamme) return;

      if (lysTaendt) {
        flamme.style.opacity = "0";

        svgContainer.style.filter = "brightness(0.65)";

        if (krystal) {
          krystal.style.filter =
            "drop-shadow(0 0 25px #7ce8ff) drop-shadow(0 0 50px #7ce8ff)";
        }

        updateScroll(
          "Lyset er slukket",
          "Mørket sænker sig over den mystiske markedsplads, og krystalkuglen begynder at udsende et svagt magisk skær.",
        );
      } else {
        flamme.style.opacity = "1";

        svgContainer.style.filter = "";

        if (krystal) {
          krystal.style.filter = "";
        }

        updateScroll(
          "Lyset er tændt",
          "Lysestagen spreder igen sit varme skær over markedspladsen.",
        );
      }

      lysTaendt = !lysTaendt;
    });
  });
}
