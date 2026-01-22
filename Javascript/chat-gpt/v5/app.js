const state = {
  users: [],
  drawCompleted: false,
  mode: "local",
};

const usersList = document.getElementById("users-list");
const form = document.getElementById("add-user-form");
const drawButton = document.getElementById("draw-button");
const errorP = document.getElementById("error");
const cardsSection = document.getElementById("cards-section");
const cardsDiv = document.getElementById("cards");

function uuid() {
  return crypto.randomUUID();
}

/* ---------- UI ---------- */

function renderUsers() {
  usersList.innerHTML = "";

  state.users.forEach(user => {
    // Création de la carte
    const card = document.createElement("div");
    card.className = "user-card";

    // Nom du participant
    const title = document.createElement("strong");
    title.textContent = user.nom;
    card.appendChild(title);

    // Liste des exclusions (checkboxes)
    const list = document.createElement("div");
    list.className = "exclusions-list";

    state.users.forEach(other => {
      if (other.id === user.id) return;

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = other.id;
      checkbox.checked = user.exclusions.includes(other.id);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!user.exclusions.includes(other.id)) {
            user.exclusions.push(other.id);
          }
        } else {
          user.exclusions = user.exclusions.filter(id => id !== other.id);
        }
      });

      label.appendChild(checkbox);
      label.append(" " + other.nom);

      list.appendChild(label);
    });

    card.appendChild(list);
    usersList.appendChild(card);
  });
}


/* ---------- Add user ---------- */

form.addEventListener("submit", e => {
  e.preventDefault();

  const nomInput = document.getElementById("nom");
  const nom = nomInput.value.trim();

  // Vérification de doublon (insensible à la casse)
  if (state.users.some(u => u.nom.toLowerCase() === nom.toLowerCase())) {
    errorP.textContent = "Ce nom est déjà utilisé.";
    nomInput.focus();        // Focus sur le champ
    nomInput.select();       // Sélectionne tout le texte pour le remplacer facilement
    return;                  // Bloque l'ajout
  }

  const user = {
    id: uuid(),
    nom,
    exclusions: [],
    assignedTo: null
  };

  state.users.push(user);
  renderUsers();
  form.reset();
  errorP.textContent = "";   // Efface le message d'erreur si tout est OK
  nomInput.focus();          // Remet le focus pour ajouter un autre utilisateur rapidement
});

/* ---------- Solvability ---------- */

function isSolvable(users) {
  const targets = users.map(u => u.id);

  function backtrack(i, remaining) {
    if (i === users.length) return true;
    const u = users[i];
    for (const t of remaining) {
      if (!u.exclusions.includes(t) && t !== u.id) {
        if (backtrack(i + 1, remaining.filter(x => x !== t))) {
          return true;
        }
      }
    }
    return false;
  }

  return backtrack(0, targets);
}

/* ---------- Draw ---------- */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function draw() {
  const users = shuffle(state.users);
  const targets = state.users.map(u => u.id);

  function backtrack(i, remaining) {
    if (i === users.length) return true;

    const u = users[i];
    const possible = shuffle(
      remaining.filter(t => !u.exclusions.includes(t) && t !== u.id)
    );

    for (const t of possible) {
      u.assignedTo = t;
      if (backtrack(i + 1, remaining.filter(x => x !== t))) {
        return true;
      }
    }

    u.assignedTo = null;
    return false;
  }

  return backtrack(0, targets);
}

/* ---------- Cards ---------- */

function renderCards() {
  cardsDiv.innerHTML = "";
  cardsDiv.className = "d-flex flex-wrap flex-justify-center";

  state.users.forEach(user => {
    const card = document.createElement("div");
    card.className = "santa-card m-2 clickable";

    const inner = document.createElement("div");
    inner.className = "santa-card-inner";

    const front = document.createElement("div");
    front.className =
      "santa-card-face santa-card-front border box-shadow d-flex flex-items-center flex-justify-center";
    front.textContent = `${user.nom}`;

    const back = document.createElement("div");
    back.className =
      "santa-card-face santa-card-back border box-shadow d-flex flex-items-center flex-justify-center";

    const target = state.users.find(u => u.id === user.assignedTo);
    back.textContent = `🎁 → ${target.nom}`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });

    cardsDiv.appendChild(card);
  });
}

/* ---------- Draw button ---------- */

drawButton.addEventListener("click", () => {
  errorP.textContent = "";

  if (state.users.length < 2) {
    errorP.textContent = "Il faut au moins deux participants.";
    return;
  }

  if (!isSolvable(state.users)) {
    errorP.textContent = "Aucun tirage possible avec ces exclusions.";
    return;
  }

  draw();
  state.drawCompleted = true;
  cardsSection.classList.remove("d-none");
  renderCards();
});
