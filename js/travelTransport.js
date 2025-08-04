// DOM elements
const tabButtons = document.querySelectorAll(".tab-btn")
const bookingSections = document.querySelectorAll(".booking-section")

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  setMinDates()
})

// Setup event listeners
function setupEventListeners() {
  // Transport forms
  const transportForms = document.querySelectorAll(".mini-form")
  transportForms.forEach((form) => {
    form.addEventListener("submit", handleTransportBooking)
  })

  // Trip type change
  document.getElementById("tripType").addEventListener("change", handleTripTypeChange)
}

// Set minimum dates to today
function setMinDates() {
  const today = new Date().toISOString().split("T")[0]
  const dateInputs = document.querySelectorAll('input[type="date"]')
  dateInputs.forEach((input) => {
    input.min = today
  })

  // Set minimum datetime for transfer time
  const datetimeInputs = document.querySelectorAll('input[type="datetime-local"]')
  const now = new Date()
  const minDateTime = now.toISOString().slice(0, 16)
  datetimeInputs.forEach((input) => {
    input.min = minDateTime
  })
}

// Handle trip type change
function handleTripTypeChange(e) {
  const returnDateGroup = document.getElementById("returnDate").parentElement
  if (e.target.value === "oneway") {
    returnDateGroup.style.display = "none"
  } else {
    returnDateGroup.style.display = "block"
  }
}

// Sample transport data for suggestions
const transportData = {
  cars: [
    {
      id: 1,
      name: "Economy Car",
      model: "Toyota Corolla",
      price: "$35/day",
      features: ["Manual", "AC", "4 Seats", "Fuel Efficient"],
      image: "/placeholder.svg?height=150&width=200",
      rating: 4.2,
      availability: "Available",
    },
    {
      id: 2,
      name: "SUV",
      model: "Honda CR-V",
      price: "$65/day",
      features: ["Automatic", "AC", "7 Seats", "GPS"],
      image: "/placeholder.svg?height=150&width=200",
      rating: 4.5,
      availability: "Available",
    },
    {
      id: 3,
      name: "Luxury Car",
      model: "BMW 3 Series",
      price: "$120/day",
      features: ["Automatic", "Leather", "Premium Sound", "GPS"],
      image: "/placeholder.svg?height=150&width=200",
      rating: 4.8,
      availability: "Limited",
    },
  ],
  buses: [
    {
      id: 1,
      operator: "Express Lines",
      departure: "08:30 AM",
      arrival: "02:45 PM",
      duration: "6h 15m",
      price: "$25",
      type: "AC Sleeper",
      rating: 4.3,
      seats: "12 seats available",
    },
    {
      id: 2,
      operator: "Comfort Travel",
      departure: "11:00 AM",
      arrival: "05:30 PM",
      duration: "6h 30m",
      price: "$22",
      type: "AC Semi-Sleeper",
      rating: 4.1,
      seats: "8 seats available",
    },
    {
      id: 3,
      operator: "Premium Coach",
      departure: "09:15 PM",
      arrival: "05:00 AM",
      duration: "7h 45m",
      price: "$35",
      type: "Luxury AC",
      rating: 4.6,
      seats: "5 seats available",
    },
  ],
  trains: [
    {
      id: 1,
      name: "Express Train 12345",
      departure: "06:45 AM",
      arrival: "11:30 AM",
      duration: "4h 45m",
      price: "$18",
      class: "2nd AC",
      rating: 4.4,
      availability: "Available",
    },
    {
      id: 2,
      name: "Superfast 67890",
      departure: "02:15 PM",
      arrival: "06:45 PM",
      duration: "4h 30m",
      price: "$25",
      class: "1st AC",
      rating: 4.7,
      availability: "Waiting List",
    },
    {
      id: 3,
      name: "Mail Express 11223",
      departure: "10:30 PM",
      arrival: "04:15 AM",
      duration: "5h 45m",
      price: "$15",
      class: "Sleeper",
      rating: 4.0,
      availability: "Available",
    },
  ],
  transfers: [
    {
      id: 1,
      type: "Standard Sedan",
      price: "$45",
      duration: "45 minutes",
      features: ["AC", "4 Passengers", "Professional Driver"],
      rating: 4.3,
      availability: "Available",
    },
    {
      id: 2,
      type: "Premium SUV",
      price: "$75",
      duration: "45 minutes",
      features: ["Luxury Interior", "6 Passengers", "Complimentary Water"],
      rating: 4.7,
      availability: "Available",
    },
    {
      id: 3,
      type: "Shared Shuttle",
      price: "$15",
      duration: "60-90 minutes",
      features: ["Shared Ride", "8 Passengers", "Multiple Stops"],
      rating: 4.0,
      availability: "Available",
    },
  ],
}

// Handle transport booking with suggestions
function handleTransportBooking(e) {
  e.preventDefault()

  const form = e.target
  const submitBtn = form.querySelector(".mini-btn")
  const originalText = submitBtn.textContent
  const formData = new FormData(form)
  const searchData = Object.fromEntries(formData)

  // Determine transport type based on button text
  let transportType = ""
  if (originalText.includes("Cars")) {
    transportType = "cars"
  } else if (originalText.includes("Buses")) {
    transportType = "buses"
  } else if (originalText.includes("Trains")) {
    transportType = "trains"
  } else if (originalText.includes("Transfer")) {
    transportType = "transfers"
  }

  submitBtn.textContent = "Searching..."
  submitBtn.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    showTransportSuggestions(transportType, searchData, form)
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

// Show transport suggestions in popup modal
function showTransportSuggestions(transportType, searchData, form) {
  // Create modal overlay
  const modalOverlay = document.createElement("div")
  modalOverlay.className = "modal-overlay"
  modalOverlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="modal-title">Available ${getTransportTypeTitle(transportType)}</h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="search-info">
          <p><strong>Search Details:</strong></p>
          <div class="search-details">
            ${formatSearchDetails(searchData, transportType)}
          </div>
        </div>
        <div class="suggestions-list" id="suggestionsList">
          <!-- Suggestions will be populated here -->
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn secondary" onclick="closeModal()">Close</button>
        <button class="modal-btn primary" onclick="showMoreOptions()">Show More Options</button>
      </div>
    </div>
  `

  // Add modal to body
  document.body.appendChild(modalOverlay)

  // Populate suggestions
  const suggestionsList = modalOverlay.querySelector("#suggestionsList")
  const suggestions = transportData[transportType] || []

  suggestions.forEach((item, index) => {
    const suggestionItem = createPopupSuggestionItem(transportType, item, searchData, index)
    suggestionsList.appendChild(suggestionItem)
  })

  // Show modal with animation
  setTimeout(() => {
    modalOverlay.classList.add("show")
  }, 10)

  // Add escape key listener
  document.addEventListener("keydown", handleEscapeKey)
}

// Format search details for display
function formatSearchDetails(searchData, transportType) {
  let details = ""

  switch (transportType) {
    case "cars":
      details = `
        <span>📍 Pickup: ${searchData[0] || "Not specified"}</span>
        <span>📅 From: ${searchData[1] || "Not specified"}</span>
        <span>📅 To: ${searchData[2] || "Not specified"}</span>
      `
      break
    case "buses":
      details = `
        <span>🚌 From: ${searchData[0] || "Not specified"}</span>
        <span>🚌 To: ${searchData[1] || "Not specified"}</span>
        <span>📅 Date: ${searchData[2] || "Not specified"}</span>
      `
      break
    case "trains":
      details = `
        <span>🚂 From: ${searchData[0] || "Not specified"}</span>
        <span>🚂 To: ${searchData[1] || "Not specified"}</span>
        <span>📅 Date: ${searchData[2] || "Not specified"}</span>
      `
      break
    case "transfers":
      details = `
        <span>🚕 Service: ${searchData[0] || "Not specified"}</span>
        <span>📍 Address: ${searchData[1] || "Not specified"}</span>
        <span>📅 Time: ${searchData[2] || "Not specified"}</span>
      `
      break
  }

  return details
}

// Create popup suggestion item
function createPopupSuggestionItem(transportType, item, searchData, index) {
  const suggestionItem = document.createElement("div")
  suggestionItem.className = "suggestion-item"

  switch (transportType) {
    case "cars":
      suggestionItem.innerHTML = createPopupCarItem(item, index)
      break
    case "buses":
      suggestionItem.innerHTML = createPopupBusItem(item, index)
      break
    case "trains":
      suggestionItem.innerHTML = createPopupTrainItem(item, index)
      break
    case "transfers":
      suggestionItem.innerHTML = createPopupTransferItem(item, index)
      break
  }

  return suggestionItem
}

// Create popup car item
function createPopupCarItem(car, index) {
  return `
    <div class="suggestion-row">
      <div class="suggestion-number">${index + 1}</div>
      <div class="suggestion-details">
        <div class="suggestion-main">
          <strong>${car.name} - ${car.model}</strong>
          <span class="suggestion-price">${car.price}</span>
        </div>
        <div class="suggestion-sub">
          Features: ${car.features.join(", ")} | Rating: ${"★".repeat(Math.floor(car.rating))} ${car.rating}
        </div>
        <div class="suggestion-status ${car.availability.toLowerCase()}">${car.availability}</div>
      </div>
      <div class="suggestion-actions">
        <button class="select-btn" onclick="selectOption('car', '${car.id}', '${car.name}')">Select</button>
      </div>
    </div>
  `
}

// Create popup bus item
function createPopupBusItem(bus, index) {
  return `
    <div class="suggestion-row">
      <div class="suggestion-number">${index + 1}</div>
      <div class="suggestion-details">
        <div class="suggestion-main">
          <strong>${bus.operator} (${bus.type})</strong>
          <span class="suggestion-price">${bus.price}</span>
        </div>
        <div class="suggestion-sub">
          ${bus.departure} → ${bus.arrival} (${bus.duration}) | Rating: ${"★".repeat(Math.floor(bus.rating))} ${bus.rating}
        </div>
        <div class="suggestion-seats">${bus.seats}</div>
      </div>
      <div class="suggestion-actions">
        <button class="select-btn" onclick="selectOption('bus', '${bus.id}', '${bus.operator}')">Select</button>
      </div>
    </div>
  `
}

// Create popup train item
function createPopupTrainItem(train, index) {
  return `
    <div class="suggestion-row">
      <div class="suggestion-number">${index + 1}</div>
      <div class="suggestion-details">
        <div class="suggestion-main">
          <strong>${train.name} (${train.class})</strong>
          <span class="suggestion-price">${train.price}</span>
        </div>
        <div class="suggestion-sub">
          ${train.departure} → ${train.arrival} (${train.duration}) | Rating: ${"★".repeat(Math.floor(train.rating))} ${train.rating}
        </div>
        <div class="suggestion-status ${train.availability.toLowerCase().replace(" ", "-")}">${train.availability}</div>
      </div>
      <div class="suggestion-actions">
        <button class="select-btn" onclick="selectOption('train', '${train.id}', '${train.name}')">Select</button>
      </div>
    </div>
  `
}

// Create popup transfer item
function createPopupTransferItem(transfer, index) {
  return `
    <div class="suggestion-row">
      <div class="suggestion-number">${index + 1}</div>
      <div class="suggestion-details">
        <div class="suggestion-main">
          <strong>${transfer.type}</strong>
          <span class="suggestion-price">${transfer.price}</span>
        </div>
        <div class="suggestion-sub">
          Duration: ${transfer.duration} | Features: ${transfer.features.join(", ")} | Rating: ${"★".repeat(Math.floor(transfer.rating))} ${transfer.rating}
        </div>
        <div class="suggestion-status ${transfer.availability.toLowerCase()}">${transfer.availability}</div>
      </div>
      <div class="suggestion-actions">
        <button class="select-btn" onclick="selectOption('transfer', '${transfer.id}', '${transfer.type}')">Select</button>
      </div>
    </div>
  `
}

// Close modal function
function closeModal() {
  const modal = document.querySelector(".modal-overlay")
  if (modal) {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.remove()
      document.removeEventListener("keydown", handleEscapeKey)
    }, 300)
  }
}

// Handle escape key
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeModal()
  }
}

// Select option function
function selectOption(type, id, name) {
  const confirmed = confirm(`You selected: ${name}\n\nWould you like to proceed with booking?`)

  if (confirmed) {
    closeModal()
    alert(`Booking initiated for ${name}!\n\nBooking ID: BK${Date.now()}\nRedirecting to payment page...`)
  }
}

// Show more options function
function showMoreOptions() {
  alert("Loading more options...\n\nThis would typically load additional results from the server.")
}

// Get transport type title for display
function getTransportTypeTitle(transportType) {
  const titles = {
    cars: "Car Rentals",
    buses: "Bus Tickets",
    trains: "Train Tickets",
    transfers: "Airport Transfers",
  }
  return titles[transportType] || "Options"
}

// Create suggestion card with improved design
function createSuggestionCard(transportType, item, searchData, index) {
  const card = document.createElement("div")
  card.className = "suggestion-card"
  card.style.animationDelay = `${index * 0.1}s`

  switch (transportType) {
    case "cars":
      card.innerHTML = createImprovedCarCard(item, searchData)
      break
    case "buses":
      card.innerHTML = createImprovedBusCard(item, searchData)
      break
    case "trains":
      card.innerHTML = createImprovedTrainCard(item, searchData)
      break
    case "transfers":
      card.innerHTML = createImprovedTransferCard(item, searchData)
      break
  }

  return card
}

// Create improved car rental card
function createImprovedCarCard(car, searchData) {
  return `
    <div class="card-header">
      <div class="card-badge ${car.availability.toLowerCase()}">${car.availability}</div>
      <div class="card-rating">
        <span class="rating-stars">${"★".repeat(Math.floor(car.rating))}</span>
        <span class="rating-number">${car.rating}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-image-section">
        <img src="${car.image}" alt="${car.model}" class="card-image">
        <div class="image-overlay">
          <span class="vehicle-type">${car.name}</span>
        </div>
      </div>
      <div class="card-content">
        <h4 class="card-title">${car.model}</h4>
        <div class="card-features">
          ${car.features.map((feature) => `<span class="feature-pill">${feature}</span>`).join("")}
        </div>
        <div class="card-details">
          <div class="detail-item">
            <span class="detail-label">Daily Rate:</span>
            <span class="detail-value">${car.price}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="price-section">
        <span class="price-amount">${car.price}</span>
        <span class="price-period">per day</span>
      </div>
      <button class="book-button" onclick="bookTransport('car', '${car.id}', '${car.name}')">
        <span class="button-text">Book Now</span>
        <span class="button-icon">→</span>
      </button>
    </div>
  `
}

// Create improved bus ticket card
function createImprovedBusCard(bus, searchData) {
  return `
    <div class="card-header">
      <div class="card-badge available">Available</div>
      <div class="card-rating">
        <span class="rating-stars">${"★".repeat(Math.floor(bus.rating))}</span>
        <span class="rating-number">${bus.rating}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="transport-icon-large">🚌</div>
      <div class="card-content">
        <h4 class="card-title">${bus.operator}</h4>
        <div class="bus-type">${bus.type}</div>
        <div class="journey-info">
          <div class="time-row">
            <div class="time-point">
              <span class="time">${bus.departure}</span>
              <span class="label">Departure</span>
            </div>
            <div class="journey-line">
              <div class="duration-badge">${bus.duration}</div>
            </div>
            <div class="time-point">
              <span class="time">${bus.arrival}</span>
              <span class="label">Arrival</span>
            </div>
          </div>
        </div>
        <div class="seats-available">${bus.seats}</div>
      </div>
    </div>
    <div class="card-footer">
      <div class="price-section">
        <span class="price-amount">${bus.price}</span>
        <span class="price-period">per person</span>
      </div>
      <button class="book-button" onclick="bookTransport('bus', '${bus.id}', '${bus.operator}')">
        <span class="button-text">Book Seat</span>
        <span class="button-icon">→</span>
      </button>
    </div>
  `
}

// Create improved train ticket card
function createImprovedTrainCard(train, searchData) {
  return `
    <div class="card-header">
      <div class="card-badge ${train.availability.toLowerCase().replace(" ", "-")}">${train.availability}</div>
      <div class="card-rating">
        <span class="rating-stars">${"★".repeat(Math.floor(train.rating))}</span>
        <span class="rating-number">${train.rating}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="transport-icon-large">🚂</div>
      <div class="card-content">
        <h4 class="card-title">${train.name}</h4>
        <div class="train-class">${train.class}</div>
        <div class="journey-info">
          <div class="time-row">
            <div class="time-point">
              <span class="time">${train.departure}</span>
              <span class="label">Departure</span>
            </div>
            <div class="journey-line">
              <div class="duration-badge">${train.duration}</div>
            </div>
            <div class="time-point">
              <span class="time">${train.arrival}</span>
              <span class="label">Arrival</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="price-section">
        <span class="price-amount">${train.price}</span>
        <span class="price-period">per person</span>
      </div>
      <button class="book-button" onclick="bookTransport('train', '${train.id}', '${train.name}')">
        <span class="button-text">Book Ticket</span>
        <span class="button-icon">→</span>
      </button>
    </div>
  `
}

// Create improved transfer card
function createImprovedTransferCard(transfer, searchData) {
  return `
    <div class="card-header">
      <div class="card-badge ${transfer.availability.toLowerCase()}">${transfer.availability}</div>
      <div class="card-rating">
        <span class="rating-stars">${"★".repeat(Math.floor(transfer.rating))}</span>
        <span class="rating-number">${transfer.rating}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="transport-icon-large">🚕</div>
      <div class="card-content">
        <h4 class="card-title">${transfer.type}</h4>
        <div class="transfer-duration">Duration: ${transfer.duration}</div>
        <div class="card-features">
          ${transfer.features.map((feature) => `<span class="feature-pill">${feature}</span>`).join("")}
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="price-section">
        <span class="price-amount">${transfer.price}</span>
        <span class="price-period">total</span>
      </div>
      <button class="book-button" onclick="bookTransport('transfer', '${transfer.id}', '${transfer.type}')">
        <span class="button-text">Book Transfer</span>
        <span class="button-icon">→</span>
      </button>
    </div>
  `
}

// Sort results function
function sortResults(transportType, sortBy) {
  const resultsGrid = document.getElementById(`resultsGrid-${transportType}`)
  if (!resultsGrid) return

  const cards = Array.from(resultsGrid.children)
  const suggestions = transportData[transportType]

  // Sort the data
  const sortedSuggestions = [...suggestions]
  switch (sortBy) {
    case "price":
      sortedSuggestions.sort((a, b) => {
        const priceA = Number.parseFloat(a.price.replace(/[$,]/g, ""))
        const priceB = Number.parseFloat(b.price.replace(/[$,]/g, ""))
        return priceA - priceB
      })
      break
    case "rating":
      sortedSuggestions.sort((a, b) => b.rating - a.rating)
      break
    case "time":
      // Sort by departure time for buses/trains, or alphabetically for others
      if (transportType === "buses" || transportType === "trains") {
        sortedSuggestions.sort((a, b) => {
          const timeA = a.departure || "00:00"
          const timeB = b.departure || "00:00"
          return timeA.localeCompare(timeB)
        })
      }
      break
  }

  // Clear and repopulate
  resultsGrid.innerHTML = ""
  sortedSuggestions.forEach((item, index) => {
    const card = createSuggestionCard(transportType, item, {}, index)
    resultsGrid.appendChild(card)
  })

  // Re-animate cards
  setTimeout(() => {
    const newCards = resultsGrid.querySelectorAll(".suggestion-card")
    newCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-in")
      }, index * 50)
    })
  }, 100)
}

// Book transport function
function bookTransport(type, id, name) {
  const confirmed = confirm(`Book ${name}?\n\nThis will redirect you to the secure booking page.`)

  if (confirmed) {
    // Simulate booking process
    alert(
      `Booking confirmed for ${name}!\n\nBooking ID: BK${Date.now()}\nYou will receive confirmation details via email.`,
    )
  }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Form validation helpers
function validateDates(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const today = new Date()

  if (start < today) {
    alert("Start date cannot be in the past")
    return false
  }

  if (end <= start) {
    alert("End date must be after start date")
    return false
  }

  return true
}

// Add real-time form validation
document.addEventListener("input", (e) => {
  if (e.target.type === "date") {
    const form = e.target.closest("form")
    if (form) {
      const startDate = form.querySelector('input[type="date"]')
      const endDate = form.querySelectorAll('input[type="date"]')[1]

      if (startDate && endDate && startDate.value && endDate.value) {
        if (new Date(endDate.value) <= new Date(startDate.value)) {
          endDate.setCustomValidity("End date must be after start date")
        } else {
          endDate.setCustomValidity("")
        }
      }
    }
  }
})

// Form submission handling with loading state
document.querySelectorAll(".mini-form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    const submitBtn = this.querySelector(".mini-btn")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Searching..."
    submitBtn.disabled = true

    // Re-enable button after a delay in case of errors
    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 10000)
  })
})
