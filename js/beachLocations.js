// Destinations data
const destinations = [
  {
    id: 1,
    title: "Ahungalla",
    description: "Relax on Ahungalla’s golden shores, known for peaceful sunsets, palm-fringed beaches, and serene coastal charm—an ideal escape on Sri Lanka’s southern coast.",
    image: "img/beach locations/ahungalla.jpg",
    category: "beach",
    price: "$1,299",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Arugam Bay",
    description: "Famous for its world-class surf and laid-back vibe, Arugam Bay offers golden beaches, scenic waves, and a vibrant coastal culture on Sri Lanka’s eastern shoreline.",
    image: "img/beach locations/arugambay.jpeg",
    category: "beach",
    price: "$1,899",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Batticaloa",
    description: "Discover Batticaloa’s serene lagoons, quiet beaches, and colonial charm—perfect for nature lovers, cultural explorers, and peaceful getaways on Sri Lanka’s east coast.",
    image: "img/beach locations/batticalo.jpeg",
    category: "beach",
    price: "$1,599",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Bentota",
    description: "Bentota blends golden beaches, river safaris, and luxury resorts—ideal for water sports, relaxation, and scenic beauty on Sri Lanka’s southwest coast.",
    image: "img/beach locations/bentota.jpeg",
    category: "beach",
    price: "$2,499",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Beruwala",
    description: "Beruwala offers tranquil beaches, rich heritage, and vibrant coastal life—perfect for a relaxing getaway on Sri Lanka’s southwest coast.",
    image: "img/beach locations/beruwala.jpeg",
    category: "beach",
    price: "$1,199",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Chilaw",
    description: "Chilaw is a coastal town known for peaceful beaches, coconut groves, and cultural landmarks—offering a quiet escape on Sri Lanka’s west coast.",
    image: "img/beach locations/chilaw.jpeg",
    category: "beach",
    price: "$999",
    rating: 4.5,
  },
  {
    id: 7,
    title: "Dikwella",
    description: "Dikwella features wide sandy beaches, gentle surf, and local charm—ideal for peaceful retreats and exploring southern Sri Lanka’s coastal beauty.",
    image: "img/beach locations/dikwella.jpeg",
    category: "beach",
    price: "$899",
    rating: 4.8,
  },
  {
    id: 8,
    title: "Kalkuda",
    description: "Kalkuda is a quiet coastal gem with calm turquoise waters and unspoiled beaches—perfect for a peaceful escape on Sri Lanka’s eastern shoreline.",
    image: "img/beach locations/kalkuda.jpeg",
    category: "beach",
    price: "$1,799",
    rating: 4.7,
  },
  {
    id: 9,
    title: "Kaluthara",
    description: "Kalutara is a serene beach town known for its golden sands, gentle waves, and lush greenery—ideal for a relaxing retreat along Sri Lanka’s southwestern coast.",
    image: "img/beach locations/Kaluthara.jpeg",
    category: "beach",
    price: "$1,399",
    rating: 4.6,
  },
  {
    id: 10,
    title: "Koggala",
    description: "Koggala is a tranquil coastal haven with pristine beaches and clear blue waters—perfect for unwinding and soaking in the natural beauty of Sri Lanka’s southern shore.",
    image: "img/beach locations/koggala.jpeg",
    category: "beach",
    price: "$1,699",
    rating: 4.8,
  },
  {
    id: 11,
    title: "Matara",
    description: "Matara is a vibrant coastal city with beautiful sandy beaches and rich cultural heritage—an ideal spot to experience Sri Lanka’s southern charm and seaside tranquility.",
    image: "img/beach locations/matara.jpeg",
    category: "beach",
    price: "$1,999",
    rating: 4.9,
  },
  {
    id: 12,
    title: "Mirissa",
    description: "Mirissa is a laid-back beach town famous for its golden sands, crystal-clear waters, and vibrant whale-watching scene—perfect for a relaxing getaway on Sri Lanka’s southern coast.",
    image: "img/beach locations/mirissa.jpg",
    category: "beach",
    price: "$1,299",
    rating: 4.8,
  },
  {
    id: 13,
    title: "Negombo",
    description: "Negombo is a lively coastal city with bustling beaches, vibrant fishing harbors, and rich colonial history—offering a perfect blend of culture and seaside relaxation on Sri Lanka’s west coast.",
    image: "img/beach locations/Negombo.jpg",
    category: "beach",
    price: "$1,299",
    rating: 4.8,
  },
  {
    id: 12,
    title: "Pasikuda",
    description: "Pasikuda is a peaceful coastal paradise with shallow, turquoise lagoons and soft sandy beaches—ideal for a calm and scenic escape on Sri Lanka’s eastern shore.",
    image: "img/beach locations/pasikuda.jpeg",
    category: "beach",
    price: "$1,299",
    rating: 4.8,
  },
]

// State management
let currentFilter = "all"
let displayedCards = 6
let filteredDestinations = [...destinations]

// DOM elements
const cardsGrid = document.getElementById("cardsGrid")
const filterButtons = document.querySelectorAll(".filter-btn")
const loadMoreBtn = document.getElementById("loadMoreBtn")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCards()
  setupEventListeners()
})

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category
      setActiveFilter(this)
      filterDestinations(category)
    })
  })

  // Load more button
  loadMoreBtn.addEventListener("click", loadMoreCards)

  // Card hover effects
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".destination-card")) {
      e.target.closest(".destination-card").style.transform = "translateY(-10px)"
    }
  })

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".destination-card")) {
      e.target.closest(".destination-card").style.transform = "translateY(0)"
    }
  })
}

// Set active filter button
function setActiveFilter(activeBtn) {
  filterButtons.forEach((btn) => btn.classList.remove("active"))
  activeBtn.classList.add("active")
}

// Filter destinations by category
function filterDestinations(category) {
  currentFilter = category
  displayedCards = 6

  // Add fade out animation to existing cards
  const existingCards = document.querySelectorAll(".destination-card")
  existingCards.forEach((card) => {
    card.classList.add("card-fade-out")
  })

  // Wait for fade out animation to complete
  setTimeout(() => {
    if (category === "all") {
      filteredDestinations = [...destinations]
    } else {
      filteredDestinations = destinations.filter((dest) => dest.category === category)
    }
    renderCards()
  }, 300)
}

// Render destination cards
function renderCards() {
  const cardsToShow = filteredDestinations.slice(0, displayedCards)

  cardsGrid.innerHTML = ""

  cardsToShow.forEach((destination, index) => {
    const card = createCard(destination)
    cardsGrid.appendChild(card)

    // Stagger animation
    setTimeout(() => {
      card.style.animationDelay = `${index * 0.1}s`
    }, 50)
  })

  // Update load more button
  updateLoadMoreButton()
}

// Create individual card element
function createCard(destination) {
  const card = document.createElement("div")
  card.className = "destination-card"
  card.innerHTML = `
        <img src="${destination.image}" alt="${destination.title}" class="card-image">
        <div class="card-content">
            <span class="card-category">${destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}</span>
            <h3 class="card-title">${destination.title}</h3>
            <p class="card-description">${destination.description}</p>
           <!-- <div class="card-footer">
                <span class="card-price">${destination.price}</span>-->
                <div class="card-rating">
                    ${generateStars(destination.rating)}
                    <span>${destination.rating}</span>
                </div>
            <!--</div>-->
        </div>
    `

  // Add click event for card interaction
  card.addEventListener("click", () => {
    showDestinationDetails(destination)
  })

  return card
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="star">★</span>'
  }

  if (hasHalfStar) {
    stars += '<span class="star">☆</span>'
  }

  return stars
}

// Load more cards
function loadMoreCards() {
  displayedCards += 6

  // Add loading state
  loadMoreBtn.textContent = "Loading..."
  loadMoreBtn.disabled = true

  // Simulate loading delay
  setTimeout(() => {
    renderCards()
    loadMoreBtn.textContent = "Load More Destinations"
    loadMoreBtn.disabled = false
  }, 800)
}

// Update load more button visibility
function updateLoadMoreButton() {
  if (displayedCards >= filteredDestinations.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "inline-block"
  }
}

// Show destination details (placeholder function)
function showDestinationDetails(destination) {
  alert(
    `You clicked on ${destination.title}!\n\nPrice: ${destination.price}\nRating: ${destination.rating}/5\n\n${destination.description}\n\nThis would typically open a detailed view or booking page.`,
  )
}

// Add some dynamic effects
function addDynamicEffects() {
  // Random card highlighting
  setInterval(() => {
    const cards = document.querySelectorAll(".destination-card")
    if (cards.length > 0) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)]
      randomCard.style.boxShadow = "0 20px 40px rgba(255, 215, 0, 0.5)"

      setTimeout(() => {
        randomCard.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
      }, 2000)
    }
  }, 10000)
}

// Initialize dynamic effects
setTimeout(addDynamicEffects, 2000)

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll-based animations
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".destination-card")
  const windowHeight = window.innerHeight

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top

    if (cardTop < windowHeight - 100) {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }
  })
})
