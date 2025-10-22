/* ========================================== 
   The Grille - JavaScript Functionality
   Author: [Your Name]
   Date: October 2025
   Description: Interactive features for movie review website
   ========================================== */

// ==================== HAMBURGER MENU FUNCTION ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("show");
  overlay.classList.toggle("show");
});

// Close when clicking overlay or a link
overlay.addEventListener("click", closeMenu);
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
}


// ==================== HERO CAROUSEL ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const heroSection = document.querySelector('.hero-section');

function changeSlide(direction) {
  if (slides.length === 0) return;

  // Remove active from current
  slides[currentSlide].classList.remove('active');

  // Update index
  currentSlide = (currentSlide + direction + slides.length) % slides.length;

  // Add active to new one
  slides[currentSlide].classList.add('active');

  // Update hero click behavior dynamically
  const targetLink = slides[currentSlide].getAttribute('data-link');
  if (targetLink) {
    heroSection.onclick = () => {
      window.location.href = targetLink;
    };
  }
}

// Initialize hero click and auto-advance
if (slides.length > 0) {
  // Set up initial link
  const initialLink = slides[0].getAttribute('data-link');
  if (initialLink) {
    heroSection.onclick = () => {
      window.location.href = initialLink;
    };
  }

  // Auto-advance every 5 seconds
  setInterval(() => changeSlide(1), 5000);
}

// ==================== JAVASCRIPT REQUIREMENT 1: ARRAY ====================
// Movie database array
const movieDatabase = [
  { title: 'Fight Club', rating: 5, year: 1999, genre: 'Drama' },
  { title: 'Inception', rating: 5, year: 2010, genre: 'Sci-Fi' },
  { title: 'The Dark Knight', rating: 5, year: 2008, genre: 'Action' },
  { title: 'Scarface', rating: 4, year: 1983, genre: 'Crime' },
  { title: 'John Wick', rating: 5, year: 2014, genre: 'Action' },
  { title: 'American Psycho', rating: 4, year: 2000, genre: 'Thriller' },
  { title: 'Equalizer', rating: 3, year: 2014, genre: 'Action' },
  { title: 'Good Will Hunting', rating: 5, year: 1997, genre: 'Drama' }
];

// Calculate average rating using array methods
function calculateAverageRating() {
  if (movieDatabase.length === 0) return 0;

  const totalRating = movieDatabase.reduce((sum, movie) => sum + movie.rating, 0);
  const average = totalRating / movieDatabase.length;
  return average.toFixed(1);
}

// Get top rated movies
function getTopRatedMovies(minRating = 4) {
  return movieDatabase.filter(movie => movie.rating >= minRating);
}

// Sort movies by year
function sortMoviesByYear(ascending = true) {
  return [...movieDatabase].sort((a, b) => {
    return ascending ? a.year - b.year : b.year - a.year;
  });
}

// ==================== JAVASCRIPT REQUIREMENT 2: LOOP ====================
// Display movie statistics in console
function displayMovieStats() {
  console.log('=== MOVIE STATISTICS ===');

  // Loop through all movies
  for (let i = 0; i < movieDatabase.length; i++) {
    const movie = movieDatabase[i];
    console.log(`${i + 1}. ${movie.title} (${movie.year}) - Rating: ${'★'.repeat(movie.rating)}`);
  }

  // Alternative: forEach loop
  movieDatabase.forEach((movie, index) => {
    console.log(`Movie #${index + 1}: ${movie.title} - ${movie.genre}`);
  });

  // While loop example - count high-rated movies
  let count = 0;
  let index = 0;
  while (index < movieDatabase.length) {
    if (movieDatabase[index].rating >= 5) {
      count++;
    }
    index++;
  }
  console.log(`Total 5-star movies: ${count}`);
}

// ==================== JAVASCRIPT REQUIREMENT 3: CONDITIONS ====================

// Check if movie is recent
function isRecentMovie(year) {
  const currentYear = new Date().getFullYear();
  return (currentYear - year) <= 5 ? 'Recent Release' : 'Classic Film';
}

// Genre-based recommendations
function getGenreRecommendation(genre) {
  const genreDescriptions = {
    'Drama': 'Perfect for emotional storytelling',
    'Action': 'High-octane thrills await!',
    'Sci-Fi': 'Mind-bending concepts',
    'Thriller': 'Edge-of-your-seat suspense',
    'Crime': 'Gritty and intense',
    'Comedy': 'Guaranteed laughs'
  };

  return genreDescriptions[genre] || 'Great entertainment value';
}

// ==================== JAVASCRIPT REQUIREMENT 4: OBJECT & METHODS ====================
// Movie Review Object with Methods
const MovieReviews = {
  reviews: [],

  // Add a new review
  addReview: function (movieTitle, userName, rating, comment) {
    const review = {
      id: this.reviews.length + 1,
      movie: movieTitle,
      user: userName,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString(),
      likes: 0
    };
    this.reviews.push(review);
    return review;
  },

  // Get all reviews for a specific movie
  getMovieReviews: function (movieTitle) {
    return this.reviews.filter(review =>
      review.movie.toLowerCase() === movieTitle.toLowerCase()
    );
  },

  // Calculate average rating for a movie
  getAverageRating: function (movieTitle) {
    const movieReviews = this.getMovieReviews(movieTitle);
    if (movieReviews.length === 0) return 0;

    const total = movieReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / movieReviews.length).toFixed(1);
  },

  // Like a review
  likeReview: function (reviewId) {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.likes++;
      return true;
    }
    return false;
  },

  // Get most liked reviews
  getTopReviews: function (limit = 5) {
    return [...this.reviews]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  },

  // Display all reviews
  displayAllReviews: function () {
    console.log('=== ALL MOVIE REVIEWS ===');
    this.reviews.forEach(review => {
      console.log(`${review.movie} - ${review.user}: ${review.rating}/5 stars`);
      console.log(`"${review.comment}"`);
      console.log(`Likes: ${review.likes} | Date: ${review.date}\n`);
    });
  }
};

// User Profile Object
const UserProfile = {
  name: '',
  watchlist: [],
  favorites: [],

  addToWatchlist: function (movie) {
    if (!this.watchlist.includes(movie)) {
      this.watchlist.push(movie);
      console.log(`Added "${movie}" to watchlist`);
    }
  },

  addToFavorites: function (movie) {
    if (!this.favorites.includes(movie)) {
      this.favorites.push(movie);
      console.log(`Added "${movie}" to favorites`);
    }
  },

  getWatchlist: function () {
    return this.watchlist;
  },

  getFavorites: function () {
    return this.favorites;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const moviesPerPage = 4;
  let currentPage = 1;
  let filteredMovies = [];

  const allMovies = Array.from(document.querySelectorAll(".movie-card2"));
  const movieCount = document.getElementById("movieCount");
  const pageNumbers = document.getElementById("pageNumbers");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const paginationContainer = document.getElementById("paginationContainer");
  const categoryButtons = document.querySelectorAll(".category");
  const searchInput = document.getElementById("searchInput");

  // ✅ Apply category + search filters
  function applyFilters() {
    const activeGenreBtn = document.querySelector(".category.active");
    const activeGenre = activeGenreBtn ? activeGenreBtn.dataset.genre.toLowerCase() : "all";
    const searchTerm = searchInput?.value.toLowerCase() || "";

    filteredMovies = allMovies.filter(card => {
      const title = card.querySelector(".movie-title2").textContent.toLowerCase();
      const genre = card.dataset.genre?.toLowerCase() || "all";
      const matchesSearch = title.includes(searchTerm);
      const matchesGenre = activeGenre === "all" || genre === activeGenre;
      return matchesSearch && matchesGenre;
    });

    // ✅ Always show all when “All” clicked
    if (activeGenre === "all") filteredMovies = [...allMovies];

    // ✅ Hide pagination when filtering (unless showing all)
    paginationContainer.style.display =
      activeGenre === "all" && filteredMovies.length > moviesPerPage ? "flex" : "none";

    currentPage = 1;
    showPage(currentPage);
  }

  // ✅ Show movies per page
  function showPage(page) {
    const totalPages = Math.max(1, Math.ceil(filteredMovies.length / moviesPerPage));
    currentPage = Math.min(Math.max(page, 1), totalPages);

    allMovies.forEach(card => (card.style.display = "none"));

    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    filteredMovies.slice(start, end).forEach(card => (card.style.display = "block"));

    renderPageNumbers(totalPages);
    updateNavButtons(totalPages);
    updateMovieCount();
  }

  // ✅ Render pagination
  function renderPageNumbers(totalPages) {
    pageNumbers.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.textContent = i;
      btn.addEventListener("click", () => showPage(i));
      pageNumbers.appendChild(btn);
    }
  }

  // ✅ Update prev/next
  function updateNavButtons(totalPages) {
    prevPageBtn.style.visibility = currentPage > 1 ? "visible" : "hidden";
    nextPageBtn.style.visibility = currentPage < totalPages ? "visible" : "hidden";
  }

  // ✅ Update movie counter
  function updateMovieCount() {
    const total = filteredMovies.length;
    movieCount.textContent = `${total} Movie${total !== 1 ? "s" : ""} Found`;
  }

  // ✅ Event: Category click
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  // ✅ Event: Search
  searchInput?.addEventListener("input", applyFilters);

  // ✅ Event: Prev/Next buttons
  prevPageBtn.addEventListener("click", () => showPage(currentPage - 1));
  nextPageBtn.addEventListener("click", () => showPage(currentPage + 1));

  // ✅ Initialize
  filteredMovies = [...allMovies];
  showPage(currentPage);
});
// ==================== MOVIE SEARCH FILTER ====================
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
      const title = card.querySelector('.movie-title');
      if (title) {
        const titleText = title.textContent.toLowerCase();
        card.style.display = titleText.includes(searchTerm) ? 'block' : 'none';
      }
    });
  });
}
// Search functionality
document.getElementById('searchInput').addEventListener('input', function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card2');

  movieCards.forEach(card => {
    const title = card.querySelector('.movie-title2').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// ==================== PAGINATION + CATEGORY FILTER ====================
document.addEventListener("DOMContentLoaded", () => {
  const moviesPerPage = 4;
  let currentPage = 1;
  let filteredMovies = [];

  const allMovies = Array.from(document.querySelectorAll(".movie-card2"));
  const movieCount = document.getElementById("movieCount");
  const pageNumbers = document.getElementById("pageNumbers");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const paginationContainer = document.getElementById("paginationContainer");
  const categoryButtons = document.querySelectorAll(".category");
  const searchInput = document.getElementById("searchInput");

  // ✅ Apply category + search filters
  function applyFilters() {
    const activeGenreBtn = document.querySelector(".category.active");
    const activeGenre = activeGenreBtn ? activeGenreBtn.dataset.genre.toLowerCase() : "all";
    const searchTerm = searchInput?.value.toLowerCase() || "";

    filteredMovies = allMovies.filter(card => {
      const title = card.querySelector(".movie-title2").textContent.toLowerCase();
      const genre = card.dataset.genre?.toLowerCase() || "all";
      const matchesSearch = title.includes(searchTerm);
      const matchesGenre = activeGenre === "all" || genre === activeGenre;
      return matchesSearch && matchesGenre;
    });

    // Hide pagination when filtering (unless showing all)
    if (paginationContainer) {
      paginationContainer.style.display = (activeGenre === "all" && filteredMovies.length > moviesPerPage)
        ? "flex"
        : "none";
    }

    currentPage = 1;
    showPage(currentPage);
  }

  // ✅ Show movies per page
  function showPage(page) {
    const totalPages = Math.max(1, Math.ceil(filteredMovies.length / moviesPerPage));
    currentPage = Math.min(Math.max(page, 1), totalPages);

    allMovies.forEach(card => (card.style.display = "none"));

    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    filteredMovies.slice(start, end).forEach(card => (card.style.display = "block"));

    renderPageNumbers(totalPages);
    updateNavButtons(totalPages);
    updateMovieCount();
  }

  // ✅ Render pagination numbers
  function renderPageNumbers(totalPages) {
    pageNumbers.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.textContent = i;
      btn.addEventListener("click", () => showPage(i));
      pageNumbers.appendChild(btn);
    }
  }

  // ✅ Prev/Next visibility
  function updateNavButtons(totalPages) {
    prevPageBtn.style.visibility = currentPage > 1 ? "visible" : "hidden";
    nextPageBtn.style.visibility = currentPage < totalPages ? "visible" : "hidden";
  }

  // ✅ Update movie counter
  function updateMovieCount() {
    const total = filteredMovies.length;
    movieCount.textContent = `${total} Movie${total !== 1 ? "s" : ""} Found`;
  }

  // ✅ Event: Category click
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  // ✅ Event: Search
  searchInput?.addEventListener("input", applyFilters);

  // ✅ Event: Prev/Next buttons
  prevPageBtn.addEventListener("click", () => showPage(currentPage - 1));
  nextPageBtn.addEventListener("click", () => showPage(currentPage + 1));

  // ✅ Initialize
  filteredMovies = [...allMovies];
  showPage(currentPage);
});


// ==================== UTILITY FUNCTIONS ====================
// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Show notification
function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // You can enhance this with actual UI notifications
}

// Format rating display
function formatRating(rating) {
  const maxStars = 5;
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(maxStars - rating);
  return filledStars + emptyStars;
}

// ==================== INITIALIZATION ====================
// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('🎬 The Grille - Website Loaded Successfully!');
  console.log('Average Rating:', calculateAverageRating());

  // Display statistics in console
  displayMovieStats();

  // Add some sample reviews
  MovieReviews.addReview('Fight Club', 'CinemaFan92', 5, 'Absolute masterpiece! Mind-blowing ending.');
  MovieReviews.addReview('Inception', 'MovieBuff', 5, 'Christopher Nolan at his best!');
  MovieReviews.addReview('Fight Club', 'JohnDoe', 5, 'One of the greatest films ever made.');

  // Display reviews
  console.log('\n=== Sample Reviews ===');
  MovieReviews.displayAllReviews();

  // Add smooth scrolling to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });

  // Add animation to movie cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all movie cards
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// ==================== EXPORT FUNCTIONS FOR TESTING ====================
// These functions can be called from HTML or other scripts
window.MovieReviews = MovieReviews;
window.UserProfile = UserProfile;
window.calculateAverageRating = calculateAverageRating;
window.getTopRatedMovies = getTopRatedMovies;
window.getRecommendation = getRecommendation;

