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
// LIGHTMODE TOGGLE
// ========================================

const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("light-mode");

    if (document.documentElement.classList.contains("light-mode")) {
      themeToggle.textContent = "Dark Mode";
    } else {
      themeToggle.textContent = "Light Mode";
    }
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
          element.style.filter = "drop-shadow(0 0 25px #7ce8ff) drop-shadow(0 0 50px #7ce8ff)";
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
      updateScroll("Eliksirer", "Lav dine egne eliksirer og udforsk urter, krydderier og magiske ingredienser. Du kan deltage i workshops og købe ingredienser med hjem.");
    });

    // ========================================
    // TAROTKORT
    // ========================================

    kort?.addEventListener("click", () => {
      updateScroll("Tarotkort", "Få læst tarotkort og lær om symbolik og fortolkning. Der vil både være oplæg og mulighed for selv at prøve kræfter med kortene.");
    });

    // ========================================
    // KRYSTALKUGLE
    // ========================================

    krystal?.addEventListener("click", () => {
      updateScroll("Krystalkugle", "Oplev spændende foredrag om krystallers symbolik, energi og anvendelse. Der vil også være mulighed for at købe krystaller.");
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
          krystal.style.filter = "drop-shadow(0 0 25px #7ce8ff) drop-shadow(0 0 50px #7ce8ff)";
        }

        updateScroll("Lyset er slukket", "Mørket sænker sig over den mystiske markedsplads, og krystalkuglen begynder at udsende et svagt magisk skær.");
      } else {
        flamme.style.opacity = "1";

        svgContainer.style.filter = "";

        if (krystal) {
          krystal.style.filter = "";
        }

        updateScroll("Lyset er tændt", "Lysestagen spreder igen sit varme skær over markedspladsen.");
      }

      lysTaendt = !lysTaendt;
    });
  });
}

// ==========================================
// FORM PAGE
// ==========================================

const form = document.querySelector("#quiz-form");

if (form) {
  // QUESTION 3: LIMIT CHECKBOXES TO 2

  const checkboxes = document.querySelectorAll('input[name="question3"]');

  const errorMessage = document.querySelector("#question3-error");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selected = document.querySelectorAll('input[name="question3"]:checked');

      if (selected.length > 2) {
        checkbox.checked = false;
        errorMessage.textContent = "Du kan højst vælge to svar.";
      } else {
        errorMessage.textContent = "";
      }
    });
  });

  // FORM SUBMISSION

  // FORM SUBMISSION AND VALIDATION

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the values from the form
    const name = document.querySelector("#name").value.trim();
    const question1 = document.querySelector('input[name="question1"]:checked');
    const question2 = document.querySelector("#question2").value;
    const question3 = document.querySelectorAll('input[name="question3"]:checked');
    const question4 = document.querySelector('input[name="question4"]:checked');
    const question5 = document.querySelector("#question5").value;

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });

    let isValid = true;

    // Check the name
    if (name === "") {
      document.querySelector("#name-error").textContent = "Skriv dit navn.";
      isValid = false;
    }

    // Check question 1
    if (!question1) {
      document.querySelector("#question1-error").textContent = "Vælg én mulighed.";
      isValid = false;
    }

    // Check question 2
    if (question2 === "") {
      document.querySelector("#question2-error").textContent = "Vælg én ingrediens.";
      isValid = false;
    }

    // Check question 3
    if (question3.length === 0) {
      document.querySelector("#question3-error").textContent = "Vælg mindst ét svar.";
      isValid = false;
    } else if (question3.length > 2) {
      document.querySelector("#question3-error").textContent = "Du kan højst vælge to svar.";
      isValid = false;
    }

    // Check question 4
    if (!question4) {
      document.querySelector("#question4-error").textContent = "Vælg én mulighed.";
      isValid = false;
    }

    // Check question 5
    if (question5 === "") {
      document.querySelector("#question5-error").textContent = "Vælg én genstand.";
      isValid = false;
    }

    // Stop if the form is not valid
    if (!isValid) {
      return;
    }

    // Calculate the total score
    let totalScore = 0;

    totalScore += Number(question1.value);
    totalScore += Number(question2);
    totalScore += Number(question4.value);
    totalScore += Number(question5);

    question3.forEach((checkbox) => {
      totalScore += Number(checkbox.value);
    });

    // Save name and score
    sessionStorage.setItem("visitorName", name);
    sessionStorage.setItem("totalScore", totalScore);

    // Go to the results page
    window.location.href = "./opsamling.html";
  });
}

// ==========================================
// RESULTS PAGE
// ==========================================
const visitorName = document.querySelector("#visitor-name");
const resultTitle = document.querySelector("#result-title");
const resultIntro = document.querySelector("#result-intro");
const resultDescription = document.querySelector("#result-description");
const resultTraits = document.querySelector("#result-traits");

if (resultTitle) {
  // Retrieve saved information

  const name = sessionStorage.getItem("visitorName");
  const score = Number(sessionStorage.getItem("totalScore"));

  // Check if the visitor has completed the quiz

  if (name === null || sessionStorage.getItem("totalScore") === null) {
    resultTitle.textContent = "Intet resultat fundet";
    resultIntro.textContent = "Du skal først gennemføre quizzen.";
    resultDescription.textContent = "";
  } else {
    // Companion descriptions

    let companion;

    if (score >= 101) {
      companion = {
        name: "Katten",
        description: "Du er en selvstændig sjæl med en stærk intuition og en naturlig tiltrækning til det mystiske. Du lægger mærke til detaljer, som andre ofte overser, og du foretrækker at følge din egen vej frem for at gøre, hvad alle andre gør. Ligesom katten rummer du både nysgerrighed og mystik. Du ved, hvornår du skal udforske verden, og hvornår du skal trække dig tilbage og lytte til din egen indre stemme.",
        traits: ["Selvstændig og fri", "Intuitiv og opmærksom", "Mystisk og nysgerrig"],
      };
    } else if (score >= 51) {
      companion = {
        name: "Kragen",
        description: "Du har et skarpt sind og en naturlig evne til at se sammenhænge, som andre måske overser. Du er opfindsom, videbegærlig og elsker at opdage nye ting. Ligesom kragen samler du på oplevelser, viden og små hemmeligheder fra verden omkring dig. Du tænker gerne ud af boksen og finder ofte kreative løsninger, når andre har givet op.",
        traits: ["Vis og opfindsom", "Observant og nysgerrig", "Kreativ og eventyrlysten"],
      };
    } else {
      companion = {
        name: "Kaninen",
        description: "Du har et varmt hjerte og en nysgerrighed, der får dig til at opdage skønheden i selv de mindste ting. Du er opmærksom på dine omgivelser og har en særlig evne til at mærke stemninger omkring dig. Ligesom kaninen møder du verden med forsigtighed, men også med en stor lyst til at udforske. Din rolige og venlige natur gør dig til en værdsat følgesvend.",
        traits: ["Blid og omsorgsfuld", "Nysgerrig og opmærksom", "Rolig og betænksom"],
      };
    }

    // Display the result

    // Display the result
    visitorName.textContent = name;
    resultTitle.textContent = companion.name;
    resultIntro.textContent = companion.intro;
    resultDescription.textContent = companion.description;

    // Display companion image
    const companionImages = {
      Katten: "#kat-image",
      Kragen: "#krage-image",
      Kaninen: "#kanin-image",
    };

    const selectedImage = document.querySelector(companionImages[companion.name]);

    console.log("Description:", companion.description);
    console.log("Selected image:", selectedImage);

    if (selectedImage) {
      selectedImage.style.display = "block";
    }

    // Display personality traits
    resultTraits.innerHTML = "";

    companion.traits.forEach((trait) => {
      const listItem = document.createElement("li");
      listItem.textContent = trait;
      resultTraits.appendChild(listItem);
    });
  }
}
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

fadeElements.forEach((element) => {
  observer.observe(element);
});