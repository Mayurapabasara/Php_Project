// Room data
const rooms = [
  {
    id: 1,
    name: "Junior Suite",
    price: 100,
    image: "/placeholder.svg?height=300&width=400",
    beds: 3,
    baths: 2,
    description:
      "Elegant junior suite with modern amenities and stunning city views. Perfect for couples or small families.",
  },
  {
    id: 2,
    name: "Executive Suite",
    price: 150,
    image: "/placeholder.svg?height=300&width=400",
    beds: 3,
    baths: 2,
    description: "Spacious executive suite featuring premium furnishings and exclusive access to executive lounge.",
  },
  {
    id: 3,
    name: "Super Deluxe",
    price: 200,
    image: "/placeholder.svg?height=300&width=400",
    beds: 4,
    baths: 3,
    description: "Our finest accommodation with panoramic views, separate living area, and premium amenities.",
  },
  {
    id: 4,
    name: "Presidential Suite",
    price: 350,
    image: "/placeholder.svg?height=300&width=400",
    beds: 5,
    baths: 4,
    description: "Ultimate luxury with private terrace, butler service, and exclusive dining area.",
  },
  {
    id: 5,
    name: "Ocean View Suite",
    price: 180,
    image: "/placeholder.svg?height=300&width=400",
    beds: 3,
    baths: 2,
    description: "Breathtaking ocean views with private balcony and premium coastal-inspired decor.",
  },
  {
    id: 6,
    name: "Garden Villa",
    price: 220,
    image: "/placeholder.svg?height=300&width=400",
    beds: 4,
    baths: 3,
    description: "Private villa surrounded by lush gardens with outdoor dining area and spa facilities.",
  },
]

// DOM Elements
const spinner = document.getElementById("spinner")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")
const backToTop = document.getElementById("backToTop")
const roomsGrid = document.getElementById("roomsGrid")
const bookingForm = document.getElementById("bookingForm")
const newsletterForm = document.getElementById("newsletterForm")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Hide spinner after page load
  setTimeout(() => {
    spinner.classList.remove("show")
  }, 500)

  // Render rooms
  renderRooms()

  // Initialize event listeners
  initializeEventListeners()

  // Initialize animations
  initializeAnimations()

  // Set minimum date for booking form
  setMinimumDates()
})

// Mobile menu toggle
function initializeEventListeners() {
  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Booking form submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleBookingSubmission()
  })

  // Newsletter form submission
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleNewsletterSubmission()
  })

  // Smooth scrolling for anchor links
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

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape") {
      mobileMenuBtn.classList.remove("active")
      navMenu.classList.remove("active")
    }

    // Enter key on focused buttons
    if (e.key === "Enter" && e.target.classList.contains("btn")) {
      e.target.click()
    }
  })

  // Touch support for mobile devices
  let touchStartY = 0
  let touchEndY = 0

  document.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY
  })

  document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY
    handleSwipe(touchStartY, touchEndY)
  })
}

// Render rooms function
function renderRooms() {
  if (!roomsGrid) return

  roomsGrid.innerHTML = rooms
    .map(
      (room) => `
        <div class="room-card fade-in">
            <div class="room-image-container">
                <img src="${room.image}" alt="${room.name}" class="room-image">
                <div class="room-price">$${room.price}/Night</div>
            </div>
            <div class="room-content">
                <div class="room-header">
                    <h5 class="room-name">${room.name}</h5>
                    <div class="room-rating">
                        ${generateStars(5)}
                    </div>
                </div>
                <div class="room-amenities">
                    <div class="amenity">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M2 4v16"/>
                            <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                            <path d="M2 17h20"/>
                            <path d="M6 8v9"/>
                        </svg>
                        <span>${room.beds} Bed</span>
                    </div>
                    <div class="amenity">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                            <line x1="10" x2="8" y1="5" y2="7"/>
                            <line x1="2" x2="22" y1="12" y2="12"/>
                            <line x1="7" x2="7" y1="19" y2="21"/>
                            <line x1="17" x2="17" y1="19" y2="21"/>
                        </svg>
                        <span>${room.baths} Bath</span>
                    </div>
                    <div class="amenity">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                            <path d="M12 20h9"/>
                        </svg>
                        <span>Wifi</span>
                    </div>
                </div>
                <p class="room-description">${room.description}</p>
                <div class="room-actions">
                    <button class="btn btn-outline" onclick="viewRoomDetails(${room.id})">View Detail</button>
                    <button class="btn btn-solid" onclick="bookRoom(${room.id})">Book Now</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Generate star rating
function generateStars(count) {
  return Array(count)
    .fill()
    .map(
      () => `
        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
    `,
    )
    .join("")
}

// Set minimum dates for booking form
function setMinimumDates() {
  const today = new Date().toISOString().split("T")[0]
  const checkinInput = document.getElementById("checkin")
  const checkoutInput = document.getElementById("checkout")

  if (checkinInput) {
    checkinInput.min = today
    checkinInput.addEventListener("change", function () {
      if (checkoutInput) {
        checkoutInput.min = this.value
      }
    })
  }
}

// Handle booking form submission
function handleBookingSubmission() {
  const formData = new FormData(bookingForm)
  const checkin = document.getElementById("checkin").value
  const checkout = document.getElementById("checkout").value
  const adults = document.getElementById("adults").value
  const children = document.getElementById("children").value

  if (!checkin || !checkout) {
    showNotification("Please select check-in and check-out dates", "error")
    return
  }

  if (new Date(checkin) >= new Date(checkout)) {
    showNotification("Check-out date must be after check-in date", "error")
    return
  }

  // Simulate booking search
  showNotification("Searching for available rooms...", "info")

  setTimeout(() => {
    showNotification("Search completed! Showing available rooms below.", "success")
    // You could filter rooms based on criteria here
    renderRooms()
  }, 1500)
}

// Handle newsletter subscription
function handleNewsletterSubmission() {
  const email = newsletterForm.querySelector('input[type="email"]').value

  if (!email) {
    showNotification("Please enter your email address", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate newsletter subscription
  showNotification("Subscribing to newsletter...", "info")

  setTimeout(() => {
    showNotification("Thank you for subscribing to our newsletter!", "success")
    newsletterForm.reset()
  }, 1000)
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Room booking function
function bookRoom(roomId) {
  const room = rooms.find((r) => r.id === roomId)
  if (room) {
    showNotification(`Booking ${room.name} for $${room.price}/night...`, "info")

    setTimeout(() => {
      showNotification("Booking request submitted! We will contact you shortly.", "success")
    }, 1000)
  }
}

// View room details function
function viewRoomDetails(roomId) {
  const room = rooms.find((r) => r.id === roomId)
  if (room) {
    showNotification(`Loading details for ${room.name}...`, "info")
    // In a real application, this would navigate to a detailed room page
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `

  // Add notification styles
  const style = document.createElement("style")
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-info {
            background: #dbeafe;
            color: #1e40af;
            border-left: 4px solid #3b82f6;
        }
        
        .notification-success {
            background: #dcfce7;
            color: #166534;
            border-left: 4px solid #22c55e;
        }
        
        .notification-error {
            background: #fef2f2;
            color: #dc2626;
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .notification-close .icon {
            width: 1rem;
            height: 1rem;
        }
    `

  if (!document.querySelector("style[data-notification-styles]")) {
    style.setAttribute("data-notification-styles", "true")
    document.head.appendChild(style)
  }

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Initialize animations on scroll
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".room-card, .testimonial-card, .section-header").forEach((el) => {
    observer.observe(el)
  })
}

// Lazy loading for images
function initializeLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Search and filter functionality
function filterRooms(criteria) {
  let filteredRooms = [...rooms]

  if (criteria.maxPrice) {
    filteredRooms = filteredRooms.filter((room) => room.price <= criteria.maxPrice)
  }

  if (criteria.minBeds) {
    filteredRooms = filteredRooms.filter((room) => room.beds >= criteria.minBeds)
  }

  if (criteria.minBaths) {
    filteredRooms = filteredRooms.filter((room) => room.baths >= criteria.minBaths)
  }

  return filteredRooms
}

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Utility function to format dates
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize search with debouncing
const debouncedSearch = debounce((searchTerm) => {
  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Update rooms display with filtered results
  roomsGrid.innerHTML = filteredRooms
    .map(
      (room) => `
        <!-- Room card HTML would go here -->
    `,
    )
    .join("")
}, 300)

function handleSwipe(touchStartY, touchEndY) {
  const swipeThreshold = 50
  const diff = touchStartY - touchEndY

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could hide header or show more content
    } else {
      // Swipe down - could show header or refresh
    }
  }
}
