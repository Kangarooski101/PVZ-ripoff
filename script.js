const streamSources = [
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com",
  "https://googleapis.com"
];

const movies = [
  { id: 1, title: "The Last Horizon", year: 2026, genre: "Sci-Fi", rating: "8.8", duration: "2h 28m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "When a deep-space relay goes silent, an estranged crew must navigate an uncharted nebula to save Earth's final colony ship." },
  { id: 2, title: "Midnight in Kyoto", year: 2025, genre: "Thriller", rating: "8.3", duration: "1h 58m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A retired cryptographer is pulled back into the shadows after intercepting a broadcast hidden inside Tokyo's transit network." },
  { id: 3, title: "Crimson Peak Valley", year: 2026, genre: "Drama", rating: "8.5", duration: "2h 12m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Two rival timber families in the Pacific Northwest face an environmental crisis that threatens their town's survival." },
  { id: 4, title: "Velocity Protocol", year: 2025, genre: "Action", rating: "7.9", duration: "2h 05m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "An underground getaway driver has ninety minutes to cross a locked-down metropolis with a whistleblower in the passenger seat." },
  { id: 5, title: "Echoes of Glass", year: 2024, genre: "Mystery", rating: "8.1", duration: "1h 54m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A forensic architect discovers a concealed room inside a historic conservatory that reopens a forty-year-old disappearance." },
  { id: 6, title: "Solaris Drift", year: 2026, genre: "Sci-Fi", rating: "8.6", duration: "2h 19m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A solo harvester aboard a solar station begins receiving messages from an orbital mirror that shouldn't exist." },
  { id: 7, title: "Iron & Ash", year: 2025, genre: "Action", rating: "8.0", duration: "2h 10m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "In a storm-battered coastal fortress, a small garrison defends a vital lighthouse against a mercenary blockade." },
  { id: 8, title: "Paper Lanterns", year: 2024, genre: "Drama", rating: "8.7", duration: "2h 01m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Three generations of a family bakery reunite over one summer festival to decide the future of their ancestral shop." },
  { id: 9, title: "Neon Syndicate", year: 2026, genre: "Sci-Fi", rating: "8.4", duration: "2h 15m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "In a rain-drenched megacity, a rogue memory dealer uncovers a plot to rewrite the minds of an entire district." },
  { id: 10, title: "The Frostbitten Trail", year: 2025, genre: "Thriller", rating: "8.2", duration: "1h 52m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Stranded in an Arctic research outpost, a rescue team realizes the distress beacon was triggered intentionally." }
];
movies.push(
  { id: 11, title: "Dragon's Covenant", year: 2026, genre: "Fantasy", rating: "8.9", duration: "2h 34m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A young outcast binds her fate to the last surviving sky-serpent to stop an empire from draining the world's magic." },
  { id: 12, title: "Apex Run", year: 2025, genre: "Action", rating: "7.8", duration: "1h 48m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Across treacherous mountain passes, ten elite drivers compete in an unsanctioned cross-continental endurance race." },
  { id: 13, title: "Whispers in the Fog", year: 2024, genre: "Mystery", rating: "8.0", duration: "2h 03m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "When a coastal ferry vanishes for six hours and returns empty, an investigator uncovers a town-wide secret." },
  { id: 14, title: "Starlight Sonata", year: 2025, genre: "Drama", rating: "8.6", duration: "2h 08m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A deaf pianist and an aging conductor team up in Vienna to perform an unfinished symphony lost for two centuries." },
  { id: 15, title: "Cyber Rift", year: 2026, genre: "Sci-Fi", rating: "8.3", duration: "2h 11m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A security engineer trapped inside a quantum simulation must outsmart an AI that learns from every move she makes." },
  { id: 16, title: "Shadow of the Crown", year: 2024, genre: "Fantasy", rating: "8.5", duration: "2h 25m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Behind castle walls, a royal bodyguard uncovers an alchemical conspiracy threatening to ignite a civil war." },
  { id: 17, title: "Redline Express", year: 2025, genre: "Thriller", rating: "8.1", duration: "1h 56m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Aboard a transcontinental bullet train, a detective has until the final station to identify an assassin among the passengers." },
  { id: 18, title: "Wildwood Tales", year: 2024, genre: "Animation", rating: "8.8", duration: "1h 42m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "A brave forest guardian and his mischievous squirrel companion embark on a quest to restore the Great Oak." },
  { id: 19, title: "Rogue Vanguard", year: 2026, genre: "Action", rating: "8.2", duration: "2h 14m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Disavowed after a covert operation goes sideways, an elite squad goes off-grid to expose their own agency." },
  { id: 20, title: "Clockwork Labyrinth", year: 2025, genre: "Mystery", rating: "8.4", duration: "2h 06m", poster: "https://unsplash.com", videoUrl: streamSources, desc: "Six strangers wake up inside an elaborate mechanical mansion where every puzzle unlocked reveals how they are connected." }
);
const gameConfigs = [
  { title: "Neon Viper", genre: "Arcade", engine: "snake", color: "#00ffcc", speed: 100, desc: "Guide the cybernetic viper through the neon grid and consume energy orbs without hitting walls." },
  { title: "Python Jungle", genre: "Arcade", engine: "snake", color: "#4ade80", speed: 115, desc: "Slither through dense undergrowth collecting golden fruit as you grow longer." },
  { title: "Laser Worm 2099", genre: "Sci-Fi", engine: "snake", color: "#f43f5e", speed: 80, desc: "High-speed futuristic plasma serpent challenge. Reflexes are everything!" },
  { title: "Void Serpent", genre: "Arcade", engine: "snake", color: "#a855f7", speed: 95, desc: "Consume dark matter nodes in deep space while avoiding your own tail." },
  { title: "Gold Rush Train", genre: "Strategy", engine: "snake", color: "#facc15", speed: 110, desc: "Link mining carts together in the canyon without derailing." },
  { title: "Retro Nokia 3310", genre: "Retro", engine: "snake", color: "#a3e635", speed: 120, desc: "Classic monochrome pixel snake action straight from the golden era." },
  { title: "Hyper Boa", genre: "Action", engine: "snake", color: "#fb923c", speed: 75, desc: "Turbo-charged serpent mode for veteran arcade masters." },
  { title: "Cyber Brick Breaker", genre: "Arcade", engine: "breakout", color: "#38bdf8", speed: 5, desc: "Smash through firewalls of glowing neon bricks using your plasma paddle." },
  { title: "Crystal Shatter", genre: "Puzzle", engine: "breakout", color: "#e879f9", speed: 5.5, desc: "Angle your shots carefully to clear layers of enchanted prism blocks." },
  { title: "Solar Flare Pong", genre: "Sci-Fi", engine: "breakout", color: "#fbbf24", speed: 6, desc: "Deflect a blazing fireball to destroy orbital defense shields." },
  { title: "Dungeon Wall", genre: "Retro", engine: "breakout", color: "#94a3b8", speed: 4.8, desc: "Break through ancient stone battlements to unlock the treasure vault." },
  { title: "Prism Blaster", genre: "Arcade", engine: "breakout", color: "#2dd4bf", speed: 5.2, desc: "Vibrant geometric brick-smashing action with crisp physics." },
  { title: "Meteor Deflector", genre: "Action", engine: "breakout", color: "#f87171", speed: 6.2, desc: "Use your starship shield to bounce energy spheres into incoming asteroid clusters." },
  { title: "Candy Crushers", genre: "Puzzle", engine: "breakout", color: "#f472b6", speed: 4.5, desc: "Pop rows of sweet pastel tiles in this relaxing arcade smasher." },
  { title: "Jetpack Dash", genre: "Action", engine: "flappy", color: "#f97316", gravity: 0.45, desc: "Tap or press Space to fire your jetpack and weave through laser gates." },
  { title: "Cyber Bird", genre: "Arcade", engine: "flappy", color: "#22d3ee", gravity: 0.42, desc: "Navigate a robotic drone through towering skyscrapers." },
  { title: "Submarine Abyss", genre: "Adventure", engine: "flappy", color: "#3b82f6", gravity: 0.35, desc: "Control buoyancy to thread your mini-sub through deep-sea coral trenches." },
  { title: "Dragon Flight", genre: "Fantasy", engine: "flappy", color: "#ef4444", gravity: 0.44, desc: "Flap mighty wings to soar between volcanic obsidian pillars." },
  { title: "Astro Hopper", genre: "Sci-Fi", engine: "flappy", color: "#c084fc", gravity: 0.32, desc: "Low-gravity moon thrusters! Feather your controls carefully." },
  { title: "Pixel Bat", genre: "Retro", engine: "flappy", color: "#a3e635", gravity: 0.46, desc: "Fly through a midnight cavern avoiding stalactites and stalagmites." },
  { title: "Paper Glider", genre: "Arcade", engine: "flappy", color: "#f8fafc", gravity: 0.38, desc: "Catch updrafts to guide a fragile paper airplane across the office." },
  { title: "Galactic Defender", genre: "Sci-Fi", engine: "shooter", color: "#38bdf8", enemyRate: 45, desc: "Pilot Earth's last starfighter against endless waves of alien interceptors." },
  { title: "Starfighter Zero", genre: "Action", engine: "shooter", color: "#f43f5e", enemyRate: 35, desc: "Fast-paced vertical space combat with rapid-fire plasma cannons." },
  { title: "Alien Swarm", genre: "Arcade", engine: "shooter", color: "#4ade80", enemyRate: 30, desc: "Hold the line as insectoid raiders descend from hyperspace." },
  { title: "Nebula Strike", genre: "Sci-Fi", engine: "shooter", color: "#a855f7", enemyRate: 40, desc: "Blast through rogue drones deep inside an uncharted nebula." },
  { title: "Retro Invaders", genre: "Retro", engine: "shooter", color: "#facc15", enemyRate: 50, desc: "Old-school pixel blasting action inspired by 1980s arcades." },
  { title: "Drone Apocalypse", genre: "Action", engine: "shooter", color: "#fb923c", enemyRate: 32, desc: "Defend the perimeter against rogue security bots." }
];
gameConfigs.push(
  { title: "Void Interceptor", genre: "Sci-Fi", engine: "shooter", color: "#2dd4bf", enemyRate: 38, desc: "Precision laser targeting in deep space." },
  { title: "Midnight Highway", genre: "Racing", engine: "dodge", color: "#f43f5e", speed: 6, desc: "Weave through high-speed midnight traffic without scratching your bumper." },
  { title: "Asteroid Belt", genre: "Sci-Fi", engine: "dodge", color: "#94a3b8", speed: 6.5, desc: "Steer your shuttle through a dense field of tumbling space rocks." },
  { title: "Avalanche Escape", genre: "Action", engine: "dodge", color: "#38bdf8", speed: 7, desc: "Carve down a steep mountain slope dodging boulders and pine trees." },
  { title: "Neon Drift", genre: "Racing", engine: "dodge", color: "#e879f9", speed: 7.5, desc: "Synthwave highway survival! How long can you survive at top speed?" },
  { title: "Meteor Shower", genre: "Arcade", engine: "dodge", color: "#fb923c", speed: 6.2, desc: "Dash left and right to survive a blazing celestial bombardment." },
  { title: "Cyber Runner", genre: "Action", engine: "dodge", color: "#00ffcc", speed: 6.8, desc: "Sidestep incoming security barriers in a digital tunnel." },
  { title: "Turbo Pursuit", genre: "Racing", engine: "dodge", color: "#facc15", speed: 7.2, desc: "Outrun roadblocks in this white-knuckle street racing challenge." },
  { title: "Cyber Pong", genre: "Retro", engine: "pong", color: "#00ffcc", aiSpeed: 4.2, desc: "Classic paddle-to-paddle duel against a sharp tactical AI." },
  { title: "Neon Air Hockey", genre: "Sports", engine: "pong", color: "#f43f5e", aiSpeed: 4.8, desc: "Fast-paced glowing puck action on a frictionless arcade table." },
  { title: "Laser Tennis", genre: "Sports", engine: "pong", color: "#a3e635", aiSpeed: 4.5, desc: "Volley a high-energy photon ball back and forth across the court." },
  { title: "Quantum Duel", genre: "Sci-Fi", engine: "pong", color: "#c084fc", aiSpeed: 5.2, desc: "Test your reaction speed against an advanced neural network." },
  { title: "Tabletop Pro", genre: "Sports", engine: "pong", color: "#38bdf8", aiSpeed: 4.0, desc: "Smooth, accessible paddle rally for quick arcade fun." },
  { title: "Hyper Rally", genre: "Arcade", engine: "pong", color: "#fb923c", aiSpeed: 5.5, desc: "The ball accelerates with every hit—can you break the AI?" },
  { title: "Memory Matrix", genre: "Puzzle", engine: "memory", color: "#38bdf8", theme: ["🚀","🛸","🪐","🌟","☄️","🌌","🛰️","👽"], desc: "Flip and match pairs of deep-space icons in as few moves as possible." },
  { title: "Emoji Frenzy", genre: "Puzzle", engine: "memory", color: "#facc15", theme: ["🔥","⚡","💎","👑","🎯","🎲","🎸","🏆"], desc: "Train your brain by pairing vibrant arcade symbols." },
  { title: "Wild Safari Match", genre: "Puzzle", engine: "memory", color: "#4ade80", theme: ["🦁","🐯","🐘","🦒","🦓","🦍","🦏","🐊"], desc: "Uncover matching pairs of wildlife hidden behind cards." },
  { title: "Cyber Vault Hack", genre: "Sci-Fi", engine: "memory", color: "#00ffcc", theme: ["🔐","💻","📡","🔋","🧬","⚙️","🛡️","🔑"], desc: "Match security nodes to bypass the mainframe encryption." },
  { title: "Sushi Master Pairs", genre: "Puzzle", engine: "memory", color: "#f43f5e", theme: ["🍣","🍱","🍙","🍜","🥟","🍤","🍡","🍵"], desc: "Pair up delicious Japanese dishes before time runs out." },
  { title: "Mystic Runes", genre: "Fantasy", engine: "memory", color: "#c084fc", theme: ["🔮","🧙","🐉","⚔️","🛡️","🧪","📜","🏰"], desc: "Match ancient magical artifacts to complete the ritual." },
  { title: "Fruit Harvest", genre: "Puzzle", engine: "memory", color: "#fb923c", theme: ["🍎","🍌","🍇","🍓","🍍","🥝","🍒","🍉"], desc: "Crisp, colorful fruit card matching for all ages." },
  { title: "Whack-A-Bot", genre: "Arcade", engine: "whack", color: "#f43f5e", speed: 850, desc: "Click malfunctioning robots as fast as they pop out of their hatches!" },
  { title: "Aim Trainer Pro", genre: "Action", engine: "whack", color: "#00ffcc", speed: 700, desc: "Sharpen your mouse precision and click speed on rapid targets." },
  { title: "Mole Mayhem", genre: "Retro", engine: "whack", color: "#facc15", speed: 900, desc: "Classic carnival whack-a-mole mayhem right in your browser." },
  { title: "Ghost Catcher", genre: "Arcade", engine: "whack", color: "#c084fc", speed: 800, desc: "Zap mischievous spirits before they vanish back into the shadows." },
  { title: "Bug Squasher", genre: "Arcade", engine: "whack", color: "#4ade80", speed: 750, desc: "Squash software glitches before they crash the system!" },
  { title: "Speed Reflex 3000", genre: "Action", engine: "whack", color: "#38bdf8", speed: 650, desc: "Ultra-fast target clicking test. How high can you score in 30 seconds?" }
);

const games = gameConfigs.map((g, index) => ({
  id: 100 + index + 1,
  type: "game",
  title: g.title,
  genre: g.genre,
  rating: (8.0 + ((index * 7) % 19) / 10).toFixed(1),
  players: "1 Player",
  engine: g.engine,
  color: g.color,
  speed: g.speed || 5,
  gravity: g.gravity || 0.4,
  enemyRate: g.enemyRate || 40,
  aiSpeed: g.aiSpeed || 4.5,
  theme: g.theme || null,
  desc: g.desc
}));
let activeTab = "movies";
let activeGenre = "All";
let searchQuery = "";
let watchlist = JSON.parse(localStorage.getItem("cinevault_list") || "[]");
let currentItem = null;
let activeGameCleanup = null;

const filterContainer = document.getElementById("genreFilters");
const grid = document.getElementById("movieGrid");
const modalBackdrop = document.getElementById("modalBackdrop");
const heroSection = document.getElementById("heroSection");

function updateWatchlistCount() {
  document.getElementById("watchlistCount").textContent = watchlist.length;
}

function getActiveDataset() {
  if (activeTab === "movies") return movies.map(m => ({ ...m, type: "movie" }));
  if (activeTab === "games") return games;
  const allItems = [...movies.map(m => ({ ...m, type: "movie" })), ...games];
  return allItems.filter(item => watchlist.includes(item.id));
}

function renderFilters() {
  const dataset = getActiveDataset();
  const genres = ["All", ...new Set(dataset.map(item => item.genre))];
  if (!genres.includes(activeGenre)) activeGenre = "All";

  filterContainer.innerHTML = genres.map(g => `
    <button class="filter-btn ${g === activeGenre ? 'active' : ''}" data-genre="${g}">${g}</button>
  `).join("");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeGenre = btn.dataset.genre;
      renderFilters();
      renderGrid();
    });
  });
}
function renderGrid() {
  const dataset = getActiveDataset();
  const filtered = dataset.filter(item => {
    const matchesGenre = activeGenre === "All" || item.genre === activeGenre;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const titles = {
    movies: "Stream Movies",
    games: "Arcade — Play Instant Games",
    watchlist: "My Saved List"
  };
  document.getElementById("sectionTitle").textContent = titles[activeTab];
  document.getElementById("itemCount").textContent = `${filtered.length} ${filtered.length === 1 ? 'title' : 'titles'}`;

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted); grid-column: 1/-1; padding: 2rem 0;">No titles found matching your criteria.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    if (item.type === "movie") {
      return `
        <div class="card" data-id="${item.id}" data-type="movie">
          <div class="card-media">
            <img class="poster" src="${item.poster}" alt="${item.title}" loading="lazy" />
            <div class="card-overlay"><span>&#9654; Watch</span></div>
          </div>
          <div class="card-body">
            <div class="card-title">${item.title}</div>
            <div class="card-meta">
              <span>${item.year} &bull; ${item.genre}</span>
              <span class="rating">★ ${item.rating}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="card game-card" data-id="${item.id}" data-type="game">
          <div class="card-media game-banner" style="background: linear-gradient(135deg, #111827, ${item.color}44); border-bottom: 2px solid ${item.color};">
            <div class="game-icon" style="color: ${item.color};">&#127918;</div>
            <span class="game-engine-tag">${item.engine.toUpperCase()}</span>
            <div class="card-overlay"><span>&#9654; Play Now</span></div>
          </div>
          <div class="card-body">
            <div class="card-title">${item.title}</div>
            <div class="card-meta">
              <span>${item.genre} &bull; Free</span>
              <span class="rating">★ ${item.rating}</span>
            </div>
          </div>
        </div>
      `;
    }
  }).join("");

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      openModal(Number(card.dataset.id), card.dataset.type, false);
    });
  });
}
function openModal(id, type = "movie", autoLaunch = false) {
  const item = type === "movie"
    ? { ...movies.find(m => m.id === id), type: "movie" }
    : games.find(g => g.id === id);

  if (!item) return;
  currentItem = item;

  stopActiveMedia();
  document.getElementById("modalDetailsView").style.display = "flex";
  document.getElementById("modalPlayerView").style.display = "none";

  const posterEl = document.getElementById("modalPoster");
  if (item.type === "movie") {
    posterEl.src = item.poster;
    document.getElementById("modalTypeBadge").textContent = "HD Movie Stream";
    document.getElementById("modalMeta").textContent = `${item.year} • ${item.genre} • ${item.duration} • ★ ${item.rating}`;
    document.getElementById("watchNowBtn").innerHTML = "&#9654; Watch Movie Now";
  } else {
    posterEl.src = "https://unsplash.com";
    document.getElementById("modalTypeBadge").textContent = `Arcade Game • ${item.engine.toUpperCase()}`;
    document.getElementById("modalMeta").textContent = `${item.genre} • ${item.players} • Instant Browser Play • ★ ${item.rating}`;
    document.getElementById("watchNowBtn").innerHTML = "&#127918; Play Game Now";
  }

  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDesc").textContent = item.desc;
  updateWatchlistBtnState();
  modalBackdrop.classList.add("open");

  if (autoLaunch) launchPlayer();
}

function updateWatchlistBtnState() {
  if (!currentItem) return;
  const btn = document.getElementById("watchlistBtn");
  const isSaved = watchlist.includes(currentItem.id);
  btn.textContent = isSaved ? "✓ In My List" : "+ Add to My List";
}

function stopActiveMedia() {
  if (activeGameCleanup) {
    activeGameCleanup();
    activeGameCleanup = null;
  }
  document.getElementById("playerWrapper").innerHTML = "";
}

function launchPlayer() {
  if (!currentItem) return;
  stopActiveMedia();

  document.getElementById("modalDetailsView").style.display = "none";
  document.getElementById("modalPlayerView").style.display = "block";
  document.getElementById("playerTitle").textContent = currentItem.title;

  const wrapper = document.getElementById("playerWrapper");
  if (currentItem.type === "movie") {
    wrapper.innerHTML = `
      <video id="activeVideo" controls autoplay playsinline style="width:100%; max-height:65vh; background:#000; border-radius:8px;">
        <source src="${currentItem.videoUrl}" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    `;
  } else {
    launchArcadeGame(currentItem, wrapper);
  }
}

function closeModal() {
  stopActiveMedia();
  modalBackdrop.classList.remove("open");
}
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeTab = btn.dataset.tab;
    activeGenre = "All";
    heroSection.style.display = activeTab === "movies" ? "flex" : "none";
    renderFilters();
    renderGrid();
  });
});

document.getElementById("heroWatchBtn").addEventListener("click", () => openModal(1, "movie", true));
document.getElementById("featuredBtn").addEventListener("click", () => openModal(1, "movie", false));
document.getElementById("watchNowBtn").addEventListener("click", launchPlayer);
document.getElementById("backToDetailsBtn").addEventListener("click", () => {
  stopActiveMedia();
  document.getElementById("modalPlayerView").style.display = "none";
  document.getElementById("modalDetailsView").style.display = "flex";
});

document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const wrapper = document.getElementById("playerWrapper");
  if (wrapper.requestFullscreen) wrapper.requestFullscreen();
});

document.getElementById("closeModalBtn").addEventListener("click", closeModal);

document.getElementById("watchlistBtn").addEventListener("click", () => {
  if (!currentItem) return;
  if (watchlist.includes(currentItem.id)) {
    watchlist = watchlist.filter(id => id !== currentItem.id);
  } else {
    watchlist.push(currentItem.id);
  }
  localStorage.setItem("cinevault_list", JSON.stringify(watchlist));
  updateWatchlistCount();
  updateWatchlistBtnState();
  if (activeTab === "watchlist") renderGrid();
});

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderGrid();
});
function launchArcadeGame(game, container) {
  if (game.engine === "memory") {
    initMemoryGame(game, container);
    return;
  }
  if (game.engine === "whack") {
    initWhackGame(game, container);
    return;
  }

  container.innerHTML = `
    <div class="game-hud">
      <span id="gameScoreDisplay">Score: 0</span>
      <span id="gameControlsHint"></span>
      <button class="btn btn-sm" id="restartGameBtn">Restart</button>
    </div>
    <canvas id="arcadeCanvas" width="640" height="400" style="background:#090d16; border:2px solid ${game.color}; border-radius:8px; max-width:100%; display:block; margin:0 auto;"></canvas>
  `;

  const canvas = document.getElementById("arcadeCanvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("gameScoreDisplay");
  const hintEl = document.getElementById("gameControlsHint");

  document.getElementById("restartGameBtn").onclick = () => launchArcadeGame(game, container);

  if (game.engine === "snake") initSnake(game, canvas, ctx, scoreEl, hintEl);
  else if (game.engine === "breakout") initBreakout(game, canvas, ctx, scoreEl, hintEl);
  else if (game.engine === "flappy") initFlappy(game, canvas, ctx, scoreEl, hintEl);
  else if (game.engine === "shooter") initShooter(game, canvas, ctx, scoreEl, hintEl);
  else if (game.engine === "dodge") initDodge(game, canvas, ctx, scoreEl, hintEl);
  else if (game.engine === "pong") initPong(game, canvas, ctx, scoreEl, hintEl);
}

function initSnake(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Arrow Keys or WASD";
  const box = 20;
  let snake = [{ x: 10 * box, y: 10 * box }];
  let dir = "RIGHT";
  let score = 0;
  let food = { x: Math.floor(Math.random() * 30 + 1) * box, y: Math.floor(Math.random() * 18 + 1) * box };

  const keyHandler = (e) => {
    if ((e.key === "ArrowLeft" || e.key === "a") && dir !== "RIGHT") dir = "LEFT";
    if ((e.key === "ArrowUp" || e.key === "w") && dir !== "DOWN") dir = "UP";
    if ((e.key === "ArrowRight" || e.key === "d") && dir !== "LEFT") dir = "RIGHT";
    if ((e.key === "ArrowDown" || e.key === "s") && dir !== "UP") dir = "DOWN";
  };
  window.addEventListener("keydown", keyHandler);

  const loop = setInterval(() => {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2.3, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((part, idx) => {
      ctx.fillStyle = idx === 0 ? "#ffffff" : game.color;
      ctx.fillRect(part.x, part.y, box - 2, box - 2);
    });

    let headX = snake.x;
    let headY = snake.y;
    if (dir === "LEFT") headX -= box;
    if (dir === "UP") headY -= box;
    if (dir === "RIGHT") headX += box;
    if (dir === "DOWN") headY += box;

    if (headX === food.x && headY === food.y) {
      score += 10;
      scoreEl.textContent = `Score: ${score}`;
      food = { x: Math.floor(Math.random() * 30 + 1) * box, y: Math.floor(Math.random() * 18 + 1) * box };
    } else {
      snake.pop();
    }

    const newHead = { x: headX, y: headY };
    const hitWall = headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height;
    const hitSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y);

    if (hitWall || hitSelf) {
      clearInterval(loop);
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`GAME OVER — Score: ${score}`, canvas.width / 2, canvas.height / 2);
      return;
    }
    snake.unshift(newHead);
  }, game.speed);

  activeGameCleanup = () => {
    clearInterval(loop);
    window.removeEventListener("keydown", keyHandler);
  };
}
function initBreakout(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Move Mouse Left/Right";
  let score = 0, x = canvas.width / 2, y = canvas.height - 40;
  let dx = game.speed * 0.7, dy = -game.speed * 0.7;
  const ballRadius = 8, paddleHeight = 12, paddleWidth = 100;
  let paddleX = (canvas.width - paddleWidth) / 2;

  const rows = 4, cols = 8, brickW = 68, brickH = 20, pad = 8, offsetTop = 35, offsetLeft = 20;
  const bricks = [];
  for (let c = 0; c < cols; c++) {
    bricks[c] = [];
    for (let r = 0; r < rows; r++) bricks[c][r] = { x: 0, y: 0, status: 1 };
  }

  const mouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const relX = (e.clientX - rect.left) * (canvas.width / rect.width);
    if (relX > 0 && relX < canvas.width) paddleX = relX - paddleWidth / 2;
  };
  canvas.addEventListener("mousemove", mouseMove);

  let animId;
  function draw() {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let remaining = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (bricks[c][r].status === 1) {
          remaining++;
          const bx = c * (brickW + pad) + offsetLeft;
          const by = r * (brickH + pad) + offsetTop;
          bricks[c][r].x = bx;
          bricks[c][r].y = by;
          ctx.fillStyle = game.color;
          ctx.fillRect(bx, by, brickW, brickH);

          if (x > bx && x < bx + brickW && y > by && y < by + brickH) {
            dy = -dy;
            bricks[c][r].status = 0;
            score += 15;
            scoreEl.textContent = `Score: ${score}`;
          }
        }
      }
    }

    if (remaining === 0) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`STAGE CLEARED! Score: ${score}`, canvas.width / 2, canvas.height / 2);
      return;
    }

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.fillStyle = game.color;
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius - 10) {
      if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
      else {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`GAME OVER — Score: ${score}`, canvas.width / 2, canvas.height / 2);
        return;
      }
    }
    x += dx;
    y += dy;
    animId = requestAnimationFrame(draw);
  }
  draw();

  activeGameCleanup = () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", mouseMove);
  };
}

function initFlappy(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Click Canvas or Press Space to Boost";
  let birdY = 180, velocity = 0, score = 0, frame = 0;
  const pipes = [];

  const flap = () => { velocity = -6.8; };
  const keyFlap = (e) => { if (e.code === "Space") { e.preventDefault(); flap(); } };
  canvas.addEventListener("mousedown", flap);
  window.addEventListener("keydown", keyFlap);

  let animId;
  function loop() {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    velocity += game.gravity;
    birdY += velocity;

    if (frame % 95 === 0) {
      const topH = Math.random() * 180 + 40;
      pipes.push({ x: canvas.width, top: topH, gap: 125, passed: false });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      const p = pipes[i];
      p.x -= 3.2;
      ctx.fillStyle = game.color;
      ctx.fillRect(p.x, 0, 48, p.top);
      ctx.fillRect(p.x, p.top + p.gap, 48, canvas.height - (p.top + p.gap));

      if (!p.passed && p.x + 48 < 100) {
        p.passed = true;
        score += 1;
        scoreEl.textContent = `Score: ${score}`;
      }

      if (100 + 14 > p.x && 100 - 14 < p.x + 48 && (birdY - 14 < p.top || birdY + 14 > p.top + p.gap)) {
        endFlappy();
        return;
      }
      if (p.x < -60) pipes.splice(i, 1);
    }

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(100, birdY, 14, 0, Math.PI * 2);
    ctx.fill();

    if (birdY > canvas.height || birdY < 0) {
      endFlappy();
      return;
    }
    frame++;
    animId = requestAnimationFrame(loop);
  }

  function endFlappy() {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`CRASHED! Score: ${score}`, canvas.width / 2, canvas.height / 2);
  }

  loop();
  activeGameCleanup = () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousedown", flap);
    window.removeEventListener("keydown", keyFlap);
  };
}
function initShooter(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Move Mouse to Aim & Auto-Fire";
  let shipX = canvas.width / 2, score = 0, frame = 0;
  const bullets = [], enemies = [];

  const move = (e) => {
    const rect = canvas.getBoundingClientRect();
    shipX = (e.clientX - rect.left) * (canvas.width / rect.width);
  };
  canvas.addEventListener("mousemove", move);

  let animId;
  function loop() {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (frame % 12 === 0) bullets.push({ x: shipX, y: canvas.height - 45 });
    if (frame % game.enemyRate === 0) enemies.push({ x: Math.random() * (canvas.width - 40) + 20, y: -20, r: 16 });

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(shipX, canvas.height - 45);
    ctx.lineTo(shipX - 18, canvas.height - 15);
    ctx.lineTo(shipX + 18, canvas.height - 15);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = game.color;
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= 8;
      ctx.fillRect(bullets[i].x - 2, bullets[i].y, 4, 12);
      if (bullets[i].y < 0) bullets.splice(i, 1);
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      const en = enemies[i];
      en.y += 2.6;
      ctx.fillStyle = game.color;
      ctx.beginPath();
      ctx.arc(en.x, en.y, en.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = bullets.length - 1; j >= 0; j--) {
        if (Math.hypot(en.x - bullets[j].x, en.y - bullets[j].y) < en.r + 6) {
          enemies.splice(i, 1);
          bullets.splice(j, 1);
          score += 25;
          scoreEl.textContent = `Score: ${score}`;
          break;
        }
      }

      if (en && en.y > canvas.height) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`BREACHED! Score: ${score}`, canvas.width / 2, canvas.height / 2);
        return;
      }
    }
    frame++;
    animId = requestAnimationFrame(loop);
  }
  loop();

  activeGameCleanup = () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", move);
  };
}

function initDodge(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Move Mouse Left/Right to Dodge";
  let playerX = canvas.width / 2, score = 0, frame = 0;
  const obstacles = [];

  const move = (e) => {
    const rect = canvas.getBoundingClientRect();
    playerX = (e.clientX - rect.left) * (canvas.width / rect.width);
  };
  canvas.addEventListener("mousemove", move);

  let animId;
  function loop() {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (frame % 18 === 0) {
      obstacles.push({ x: Math.random() * (canvas.width - 50), y: -30, w: 45, h: 25 });
      score += 5;
      scoreEl.textContent = `Score: ${score}`;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(playerX - 15, canvas.height - 50, 30, 35);

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const ob = obstacles[i];
      ob.y += game.speed;
      ctx.fillStyle = game.color;
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);

      if (playerX - 15 < ob.x + ob.w && playerX + 15 > ob.x && canvas.height - 50 < ob.y + ob.h && canvas.height - 15 > ob.y) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`WRECKED! Score: ${score}`, canvas.width / 2, canvas.height / 2);
        return;
      }
      if (ob.y > canvas.height) obstacles.splice(i, 1);
    }
    frame++;
    animId = requestAnimationFrame(loop);
  }
  loop();

  activeGameCleanup = () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", move);
  };
}
function initPong(game, canvas, ctx, scoreEl, hintEl) {
  hintEl.textContent = "Controls: Move Mouse Up/Down";
  let playerY = 160, aiY = 160, pScore = 0, aiScore = 0;
  let bx = 320, by = 200, bvx = 5, bvy = 3.5;

  const move = (e) => {
    const rect = canvas.getBoundingClientRect();
    playerY = (e.clientY - rect.top) * (canvas.height / rect.height) - 40;
  };
  canvas.addEventListener("mousemove", move);

  let animId;
  function loop() {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#1e293b";
    ctx.setLineDash();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(20, playerY, 12, 80);
    ctx.fillStyle = game.color;
    ctx.fillRect(canvas.width - 32, aiY, 12, 80);

    if (aiY + 40 < by) aiY += game.aiSpeed;
    else aiY -= game.aiSpeed;

    bx += bvx;
    by += bvy;
    if (by < 8 || by > canvas.height - 8) bvy = -bvy;

    if (bx < 32 && by > playerY && by < playerY + 80) bvx = Math.abs(bvx) * 1.03;
    if (bx > canvas.width - 32 && by > aiY && by < aiY + 80) bvx = -Math.abs(bvx) * 1.03;

    if (bx < 0) { aiScore++; bx = 320; by = 200; bvx = 5; }
    if (bx > canvas.width) { pScore++; bx = 320; by = 200; bvx = -5; }

    scoreEl.textContent = `You: ${pScore} — CPU: ${aiScore}`;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(bx, by, 8, 0, Math.PI * 2);
    ctx.fill();

    animId = requestAnimationFrame(loop);
  }
  loop();

  activeGameCleanup = () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", move);
  };
}

function initMemoryGame(game, container) {
  const icons = [...game.theme, ...game.theme].sort(() => Math.random() - 0.5);
  let flipped = [], matched = 0, moves = 0;

  container.innerHTML = `
    <div class="game-hud">
      <span id="memMoves">Moves: 0 | Matched: 0/8</span>
      <span>Click cards to find pairs</span>
      <button class="btn btn-sm" id="restartMemBtn">Restart</button>
    </div>
    <div class="memory-grid" id="memoryGrid">
      ${icons.map((icon, idx) => `<button class="memory-card" data-idx="${idx}" data-icon="${icon}">?</button>`).join("")}
    </div>
  `;

  document.getElementById("restartMemBtn").onclick = () => initMemoryGame(game, container);

  document.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      if (flipped.length === 2 || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.textContent = card.dataset.icon;
      card.classList.add("flipped");
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        const [c1, c2] = flipped;
        if (c1.dataset.icon === c2.dataset.icon) {
          c1.classList.add("matched");
          c2.classList.add("matched");
          matched++;
          flipped = [];
        } else {
          setTimeout(() => {
            c1.textContent = "?";
            c2.textContent = "?";
            c1.classList.remove("flipped");
            c2.classList.remove("flipped");
            flipped = [];
          }, 650);
        }
        document.getElementById("memMoves").textContent = `Moves: ${moves} | Matched: ${matched}/8`;
      }
    });
  });
}

function initWhackGame(game, container) {
  let score = 0, timeLeft = 30, activeIdx = -1;

  container.innerHTML = `
    <div class="game-hud">
      <span id="whackScore">Score: 0</span>
      <span id="whackTime">Time: 30s</span>
      <button class="btn btn-sm" id="restartWhackBtn">Restart</button>
    </div>
    <div class="whack-grid" id="whackGrid">
      ${Array.from({ length: 9 }).map((_, i) => `<button class="whack-hole" data-hole="${i}"></button>`).join("")}
    </div>
  `;

  const holes = document.querySelectorAll(".whack-hole");
  document.getElementById("restartWhackBtn").onclick = () => {
    stopActiveMedia();
    initWhackGame(game, container);
  };

  holes.forEach(h => {
    h.addEventListener("click", () => {
      if (Number(h.dataset.hole) === activeIdx) {
        score += 10;
        activeIdx = -1;
        h.style.background = "#1e293b";
        h.textContent = "";
        document.getElementById("whackScore").textContent = `Score: ${score}`;
      }
    });
  });

  const popTimer = setInterval(() => {
    holes.forEach(h => { h.style.background = "#1e293b"; h.textContent = ""; });
    activeIdx = Math.floor(Math.random() * 9);
    holes[activeIdx].style.background = game.color;
    holes[activeIdx].textContent = "🎯";
  }, game.speed);

  const clockTimer = setInterval(() => {
    timeLeft--;
    document.getElementById("whackTime").textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(popTimer);
      clearInterval(clockTimer);
      document.getElementById("whackTime").textContent = `TIME UP! Final: ${score}`;
    }
  }, 1000);

  activeGameCleanup = () => {
    clearInterval(popTimer);
    clearInterval(clockTimer);
  };
}

updateWatchlistCount();
renderFilters();
renderGrid();
