const movies = [
  {
    id: 1,
    title: "The Last Horizon",
    year: 2026,
    genre: "Sci-Fi",
    rating: "8.8",
    duration: "2h 28m",
    poster: "https://unsplash.com",
    desc: "When a deep-space relay goes silent, an estranged crew must navigate an uncharted nebula to save Earth's final colony ship."
  },
  {
    id: 2,
    title: "Midnight in Kyoto",
    year: 2025,
    genre: "Thriller",
    rating: "8.3",
    duration: "1h 58m",
    poster: "https://unsplash.com",
    desc: "A retired cryptographer is pulled back into the shadows after intercepting a broadcast hidden inside Tokyo's transit network."
  },
  {
    id: 3,
    title: "Crimson Peak Valley",
    year: 2026,
    genre: "Drama",
    rating: "8.5",
    duration: "2h 12m",
    poster: "https://unsplash.com",
    desc: "Two rival timber families in the Pacific Northwest face an environmental crisis that threatens their town's survival."
  },
  {
    id: 4,
    title: "Velocity Protocol",
    year: 2025,
    genre: "Action",
    rating: "7.9",
    duration: "2h 05m",
    poster: "https://unsplash.com",
    desc: "An underground getaway driver has ninety minutes to cross a locked-down metropolis with a whistleblower in the passenger seat."
  },
  {
    id: 5,
    title: "Echoes of Glass",
    year: 2024,
    genre: "Mystery",
    rating: "8.1",
    duration: "1h 54m",
    poster: "https://unsplash.com",
    desc: "A forensic architect discovers a concealed room inside a historic conservatory that reopens a forty-year-old disappearance."
  },
  {
    id: 6,
    title: "Solaris Drift",
    year: 2026,
    genre: "Sci-Fi",
    rating: "8.6",
    duration: "2h 19m",
    poster: "https://unsplash.com",
    desc: "A solo harvester aboard a solar station begins receiving messages from an orbital mirror that shouldn't exist."
  },
  {
    id: 7,
    title: "Iron & Ash",
    year: 2025,
    genre: "Action",
    rating: "8.0",
    duration: "2h 10m",
    poster: "https://unsplash.com",
    desc: "In a storm-battered coastal fortress, a small garrison defends a vital lighthouse against a mercenary blockade."
  },
  {
    id: 8,
    title: "Paper Lanterns",
    year: 2024,
    genre: "Drama",
    rating: "8.7",
    duration: "2h 01m",
    poster: "https://unsplash.com",
    desc: "Three generations of a family bakery reunite over one summer festival to decide the future of their ancestral shop."
  }
];

let activeGenre = "All";
let searchQuery = "";

const genres = ["All", ...new Set(movies.map(m => m.genre))];
const filterContainer = document.getElementById("genreFilters");
const grid = document.getElementById("movieGrid");
const modalBackdrop = document.getElementById("modalBackdrop");

function renderFilters() {
  filterContainer.innerHTML = genres.map(g => `
    <button class="filter-btn ${g === activeGenre ? 'active' : ''}" data-genre="${g}">${g}</button>
  `).join("");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeGenre = btn.dataset.genre;
      renderFilters();
      renderMovies();
    });
  });
}

function renderMovies() {
  const filtered = movies.filter(m => {
    const matchesGenre = activeGenre === "All" || m.genre === activeGenre;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted);">No movies found matching your search.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(m => `
    <div class="card" data-id="${m.id}">
      <img class="poster" src="${m.poster}" alt="${m.title}" loading="lazy" />
      <div class="card-body">
        <div class="card-title">${m.title}</div>
        <div class="card-meta">
          <span>${m.year} &bull; ${m.genre}</span>
          <span class="rating">&#9733; ${m.rating}</span>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => openModal(Number(card.dataset.id)));
  });
}

function openModal(id) {
  const m = movies.find(item => item.id === id);
  if (!m) return;

  document.getElementById("modalPoster").src = m.poster;
  document.getElementById("modalTitle").textContent = m.title;
  document.getElementById("modalMeta").textContent = `${m.year} • ${m.genre} • ${m.duration} • ★ ${m.rating}`;
  document.getElementById("modalDesc").textContent = m.desc;
  modalBackdrop.classList.add("open");
}

function closeModal() {
  modalBackdrop.classList.remove("open");
}

document.getElementById("featuredBtn").addEventListener("click", () => openModal(1));
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("watchlistBtn").addEventListener("click", () => alert("Added to your watchlist!"));

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderMovies();
});

renderFilters();
renderMovies();
