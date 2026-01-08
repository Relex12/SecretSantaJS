const state = {
  users: [],
  drawCompleted: false,
  mode: "local",
  options: { excludeSelf: true }
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
    const div = document.createElement("div");
    div.className = "user";

    const title = document.createElement("strong");
    title.textContent = `${user.prenom} ${user.nom}`;
    div.appendChild(title);

    const select = document.createElement("select");
    select.multiple = true;

    state.users.forEach(other => {
      if (other.id === user.id) return;
      const opt = document.createElement("option");
      opt.value = other.id;
      opt.textContent = `${other.prenom} ${other.nom}`;
      opt.selected = user.exclusions.includes(other.id);
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      user.exclusions = Array.from(select.selectedOptions).map(o => o.value);
      if (state.options.excludeSelf && !user.exclusions.includes(user.id)) {
        user.exclusions.push(user.id);
      }
    });

    div.appendChild(document.createElement("br"));
    div.appendChild(select);
    usersList.appendChild(div);
  });
}

/* ---------- Add user ---------- */

form.addEventListener("submit", e => {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();

  const user = {
    id: uuid(),
    prenom,
    nom,
    mail: null,
    exclusions: [],
    assignedTo: null
  };

  if (state.options.excludeSelf) {
    user.exclusions.push(user.id);
  }

  state.users.push(user);
  renderUsers();
  form.reset();
});

/* ---------- Solvability ---------- */

function isSolvable(users) {
  const targets = users.map(u => u.id);

  function backtrack(i, remaining) {
    if (i === users.length) return true;
    const u = users[i];
    for (const t of remaining) {
      if (!u.exclusions.includes(t)) {
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
      remaining.filter(t => !u.exclusions.includes(t))
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
  cardsDiv.className = "cards";

  state.users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-face";
    front.textContent = `${user.prenom} ${user.nom}`;

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const target = state.users.find(u => u.id === user.assignedTo);
    back.textContent = `🎁 → ${target.prenom} ${target.nom}`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
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
  cardsSection.classList.remove("hidden");
  renderCards();
});
