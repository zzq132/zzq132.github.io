// DOM Elements
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const header = document.querySelector("header")
const skillBars = document.querySelectorAll(".skill-progress-bar")
const contactForm = document.getElementById("contact-form")

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")

  // Save preference to localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-mode")
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  header.classList.toggle("mobile-menu-active")

  // Animate hamburger to X
  const bars = mobileMenuBtn.querySelectorAll(".bar")
  bars.forEach((bar) => {
    bar.classList.toggle("animate")
  })
})

// Close mobile menu when clicking a nav link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("mobile-menu-active")

    // Reset hamburger animation
    const bars = mobileMenuBtn.querySelectorAll(".bar")
    bars.forEach((bar) => {
      bar.classList.remove("animate")
    })
  })
})

// Animate skill bars on scroll
function animateSkillBars() {
  const skillsSection = document.querySelector(".skills")
  const sectionPosition = skillsSection.getBoundingClientRect().top
  const screenPosition = window.innerHeight / 1.3

  if (sectionPosition < screenPosition) {
    skillBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
    window.removeEventListener("scroll", animateSkillBars)
  }
}

window.addEventListener("scroll", animateSkillBars)

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for header height
        behavior: "smooth",
      })
    }
  })
})

// Add animation to hamburger menu
document.querySelector(".mobile-menu-btn").addEventListener("click", function () {
  const bars = this.querySelectorAll(".bar")

  if (header.classList.contains("mobile-menu-active")) {
    bars[0].style.transform = "rotate(45deg) translate(5px, 6px)"
    bars[1].style.opacity = "0"
    bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)"
  } else {
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  }
})

// Add scroll reveal animation
const revealElements = document.querySelectorAll(".project-card, .contact-form, .skills-category")

function checkReveal() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Set initial state for reveal elements
revealElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

window.addEventListener("scroll", checkReveal)
window.addEventListener("load", checkReveal)

