const menuData = [
  {
    categoria: "Maialino",
    items: [
      { nome: "Panino salsiccia sarda", 
        prezzo: "7€",
        img:"img/panino_salsiccia_sarda.jpg",
        desc: "Salsiccia sarda artigianale.",
        allergeni:["glutine"]
      },
      { nome: "Panino sardo farcito con verdure", 
        prezzo: "8€",
        img:"img/salsiccia_Farcito.jpeg",
        desc:"Panino con salsiccia sarda + verdure (peperoni,zucchine e cipolla).",
        allergeni:["glutine"]
      },
      { nome: "Panino Porchetta di maialino", 
        prezzo: "12€",
        img:"img/porchetta.jpeg",
        allergeni:["glutine"]
      },
      { nome: "Panino Porchetta farcito con verdure", 
        prezzo: "15€",
        img:"img/porchettaFarcita.jpeg",
        allergeni:["glutine"]
      }
    ]
  },
  {
    categoria: "Agnello",
    items: [
      { nome: "Bocconcini impanati",
        prezzo: "10€",
        img:"img/bocconcini_agnello.jpeg",
        desc:"Panino con bocconcini di agnello impanati.",
        allergeni: ["glutine", "uova"]
      },
      { nome: "Bocconcini con verdure", 
        prezzo: "12€",
        img:"img/bocconcini_verdure.jpeg",
        desc:"Panino con bocconcini di agnello e verdure.",
        allergeni: ["glutine", "uova"]
      }
    ]
  },
  {
    categoria: "Cavallo",
    items: [
      { nome: "Filetto + pecorino", prezzo: "12€",
        img:"img/cavallo_pecorino.jpeg",
        desc:"Panino con filetto di cavallo e scaglie di pecorino.",
        allergeni: ["glutine", "latte"]
      },
      { nome: "Filetto + verdure", prezzo: "15€",
        img:"img/filetto_verdure.jpeg",
        desc:"Panino con filetto di cavallo e verdure.",
        allergeni: ["glutine", "latte"]
      }
    ]
  },
  {
    categoria: "Piatti",
    items: [
      { nome: "Maialino forno legna", prezzo: "10€",
        img:"img/maialino.jpeg",
        allergeni: ["glutine"]
      },
      { nome: "Maialino con patate", prezzo: "12€",
        img:"img/maialino_patate.jpeg",
        allergeni: ["glutine"]
      },
      { nome: "Bocconcini di Agnello con pane carasau", prezzo: "14€",
        img:"img/bocconcini_piatto.jpeg",
        allergeni: ["glutine"]
      },
      { nome: "Bocconcini di Agnello con verdure", prezzo: "16€",
        img:"img/bocconcini_piatto_verdure.jpeg",
        allergeni: ["glutine"]
      },
      { nome: "Ciuffetti - SOLO IL VENERDI'", prezzo: "15€",
        desc:"Panino farcito con: ciuffetti di calamaro al pomodoro, aglio, prezzemolo, peperoncino*. Farcitura con zucchine, peperoni e cipolla.",
        img:"img/ciuffetti.jpeg",
        allergeni: ["glutine", "molluschi"]
      },
      { nome: "Cavallo e pecorino in pane carasau", prezzo: "17€",
        img:"img/cavallo_piatto.jpeg",
        desc:"Carne di cavallo in pane carasau (con verdure 19€).",
        allergeni: ["glutine", "latte"]
      }
    ]
  }
];

const allergeniInfo = {
  glutine:      { label: "Glutine",          emoji: "🌾" },
  crostacei:    { label: "Crostacei",        emoji: "🦐" },
  uova:         { label: "Uova",             emoji: "🥚" },
  pesce:        { label: "Pesce",            emoji: "🐟" },
  arachidi:     { label: "Arachidi",         emoji: "🥜" },
  soia:         { label: "Soia",             emoji: "🫘" },
  latte:        { label: "Latte",            emoji: "🥛" },
  fruttaGuscio: { label: "Frutta a guscio",  emoji: "🌰" },
  sedano:       { label: "Sedano",           emoji: "🥬" },
  senape:       { label: "Senape",           emoji: "🟡" },
  sesamo:       { label: "Sesamo",           emoji: "🫙" },
  solfiti:      { label: "Solfiti",          emoji: "🍷" },
  lupini:       { label: "Lupini",           emoji: "🟤" },
  molluschi:    { label: "Molluschi",        emoji: "🐚" },
};

const menuContainer = document.getElementById("menu");
const filtersContainer = document.getElementById("filters");

function toggleAllergeni(btn) {
  const panel = btn.closest(".card-body").querySelector(".allergeni-panel");
  const isOpen = panel.classList.contains("open");
  panel.classList.toggle("open", !isOpen);
  btn.textContent = isOpen ? "🌿 Allergeni" : "✕ Chiudi";
}

function renderMenu(filter = "Tutti") {
  menuContainer.innerHTML = "";

  menuData.forEach(cat => {
    if (filter !== "Tutti" && cat.categoria !== filter) return;

    cat.items.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6";

      const allergeniBadges = item.allergeni && item.allergeni.length > 0
        ? item.allergeni.map(a => `
            <span class="allergene-badge">
              ${allergeniInfo[a]?.emoji || ""} ${allergeniInfo[a]?.label || a}
            </span>`).join("")
        : `<span class="nessun-allergene">Nessun allergene dichiarato</span>`;

      col.innerHTML = `
        <div class="menu-card">
          <img src="${item.img}" class="card-img-top">
          <div class="card-body">
            <h5 class="item-name">${item.nome}</h5>
            <p class="item-desc">${item.desc || ""}</p>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="item-price">${item.prezzo}</span>
              <div class="d-flex align-items-center gap-2">
                <button class="btn-allergeni">🌿 Allergeni</button>
                <span class="badge bg-warning text-dark">🔥</span>
              </div>
            </div>

            <div class="allergeni-panel">
              ${allergeniBadges}
            </div>
          </div>
        </div>
      `;

      // addEventListener agganciato direttamente all'elemento appena creato
      const btn = col.querySelector(".btn-allergeni");
      const panel = col.querySelector(".allergeni-panel");

      btn.addEventListener("click", () => {
        const isOpen = panel.classList.contains("open");
        panel.classList.toggle("open", !isOpen);
        btn.textContent = isOpen ? "🌿 Allergeni" : "✕ Chiudi";
      });

      menuContainer.appendChild(col);
    });
  });
}

function createFilters() {
  const categorie = ["Tutti", ...menuData.map(c => c.categoria)];

  categorie.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.add("filter-btn");

    btn.onclick = () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(cat);
    };

    filtersContainer.appendChild(btn);
  });

  filtersContainer.firstChild.classList.add("active");
}

createFilters();
renderMenu();