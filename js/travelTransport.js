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
    form.addEventListener("submit", handleFormSubmission)
  })
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

// Handle form submission with loading state
function handleFormSubmission(e) {
  const form = e.target
  const submitBtn = form.querySelector(".mini-btn")
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.textContent = "Searching..."
  submitBtn.disabled = true

  // Add loading animation
  submitBtn.style.background = "linear-gradient(135deg, #666 0%, #999 100%)"

  // Re-enable button after a delay in case of errors
  setTimeout(() => {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.style.background = ""
  }, 10000)
}

// Form validation
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

// Add smooth animations
document.querySelectorAll(".transport-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`
  card.classList.add("fade-in")
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .mini-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`
document.head.appendChild(style)
