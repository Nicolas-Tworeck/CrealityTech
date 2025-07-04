// Global Variables
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
let isMenuOpen = false

// Initialize EmailJS
;(() => {
  // emailjs.init("YOUR_PUBLIC_KEY") // Substitua pela sua chave pública do EmailJS
})()

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }

  // Close mobile menu if open
  if (isMenuOpen) {
    toggleMobileMenu()
  }

  // Update active nav item
  updateActiveNavItem(sectionId)
}

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Update Active Navigation Item
function updateActiveNavItem(activeSection) {
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.dataset.section === activeSection) {
      item.classList.add("active")
    }
  })
}

// Track Active Section on Scroll
function trackActiveSection() {
  const sections = ["inicio", "servicos", "sobre", "contato"]
  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const sectionTop = element.offsetTop
      const sectionBottom = sectionTop + element.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        updateActiveNavItem(section)
        break
      }
    }
  }
}

// Mobile Menu Toggle melhorado
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  const hamburgers = document.querySelectorAll(".hamburger")
  const body = document.body

  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    mobileMenu.classList.add("active")
    body.style.overflow = "hidden" // Previne scroll quando menu está aberto

    // Anima hamburger para X
    hamburgers.forEach((hamburger, index) => {
      if (index === 0) hamburger.style.transform = "rotate(45deg) translate(6px, 6px)"
      if (index === 1) hamburger.style.opacity = "0"
      if (index === 2) hamburger.style.transform = "rotate(-45deg) translate(6px, -6px)"
    })
  } else {
    mobileMenu.classList.remove("active")
    body.style.overflow = "" // Restaura scroll

    // Restaura hamburger
    hamburgers.forEach((hamburger) => {
      hamburger.style.transform = ""
      hamburger.style.opacity = ""
    })
  }
}

// Carrossel 3D Functions
function updateSlidePositions() {
  slides.forEach((slide, index) => {
    const position = getSlidePosition(index)

    // Remove todas as classes
    slide.classList.remove("active", "next", "prev", "hidden")

    // Adiciona a classe apropriada baseada na posição
    if (position === 0) {
      slide.classList.add("active")
    } else if (position === 1 || position === -2) {
      slide.classList.add("next")
    } else if (position === -1 || position === 2) {
      slide.classList.add("prev")
    } else {
      slide.classList.add("hidden")
    }
  })

  // Atualiza os dots
  updateDots()
}

function getSlidePosition(index) {
  const totalSlides = slides.length
  const diff = index - currentSlide

  // Normalizar a diferença para estar entre -1 e 1
  let normalizedDiff = diff
  if (Math.abs(diff) > totalSlides / 2) {
    normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides
  }

  return normalizedDiff
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  updateSlidePositions()
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  updateSlidePositions()
}

function goToSlide(index) {
  currentSlide = index
  updateSlidePositions()
}

// Contact Form Submission melhorado
function submitForm(event) {
  event.preventDefault()

  const submitBtn = event.target.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const btnSuccess = submitBtn.querySelector(".btn-success")

  // Mostrar loading
  if (btnText && btnLoading) {
    btnText.style.opacity = "0"
    btnLoading.style.opacity = "1"
    submitBtn.disabled = true
  }

  const formData = new FormData(event.target)
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  }

  // Criar link mailto com todas as informações
  const subject = encodeURIComponent("Novo contato do site - " + data.firstName + " " + data.lastName)
  const body = encodeURIComponent(
    `Nome: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Empresa: ${data.company || "Não informado"}\n` +
      `Mensagem: ${data.message}`,
  )

  const mailtoLink = `mailto:contato@crealitytech.com.br?subject=${subject}&body=${body}`

  // Simular envio
  setTimeout(() => {
    if (btnLoading && btnSuccess) {
      // Mostrar sucesso
      btnLoading.style.opacity = "0"
      btnSuccess.style.opacity = "1"

      // Abrir cliente de email
      window.location.href = mailtoLink

      // Resetar após 3 segundos
      setTimeout(() => {
        btnSuccess.style.opacity = "0"
        btnText.style.opacity = "1"
        submitBtn.disabled = false
        event.target.reset()
      }, 3000)
    } else {
      // Fallback se elementos não existirem
      window.location.href = mailtoLink
      submitBtn.disabled = false
      event.target.reset()
    }
  }, 1500)
}

// Header Scroll Effect melhorado
function initHeaderScrollEffect() {
  const header = document.querySelector(".header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.background = "rgba(10, 10, 10, 0.95)"
      header.style.boxShadow = "0 8px 32px rgba(8, 67, 255, 0.2)"
      header.style.borderBottom = "1px solid rgba(8, 67, 255, 0.5)"
    } else {
      header.style.background = "rgba(10, 10, 10, 0.9)"
      header.style.boxShadow = "none"
      header.style.borderBottom = "1px solid rgba(8, 67, 255, 0.3)"
    }

    lastScrollY = currentScrollY
  })
}

// Initialize Parallax Effect melhorado
function initParallaxEffect() {
  const blobs = document.querySelectorAll(".bg-blob")
  const particles = document.querySelectorAll(".particle")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    blobs.forEach((blob, index) => {
      const speed = 0.1 + index * 0.05
      blob.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })

    particles.forEach((particle, index) => {
      const speed = 0.05 + index * 0.02
      particle.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Efeito Tilt para cards
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// Animação de contagem para números
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.dataset.count)
          let current = 0
          const increment = target / 50
          const duration = 2000 // 2 segundos
          const stepTime = duration / 50

          // Mostrar o elemento primeiro
          counter.style.opacity = "1"
          counter.style.transform = "translateY(0)"

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            counter.textContent = Math.floor(current)
          }, stepTime)

          observer.unobserve(counter)
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  counters.forEach((counter) => {
    // Configurar estado inicial
    counter.style.opacity = "0"
    counter.style.transform = "translateY(30px)"
    counter.style.transition = "all 0.6s ease-out"
    counter.textContent = "0" // Começar com 0
    observer.observe(counter)
  })
}

// Efeito ripple nos botões
function initRippleEffect() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const ripple = document.createElement("div")
      ripple.classList.add("btn-ripple")

      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Intersection Observer para animações
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".service-card, .achievement-item, .about-stat, .contact-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s ease-out"
    observer.observe(element)
  })
}

// Add Click Handlers for Slide Images
function initSlideClickHandlers() {
  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (index !== currentSlide) {
        goToSlide(index)
      }
    })
  })
}

// Keyboard Navigation
function initKeyboardNavigation() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide()
    } else if (event.key === "ArrowRight") {
      nextSlide()
    } else if (event.key === "Escape" && isMenuOpen) {
      toggleMobileMenu()
    }
  })
}

// Touch/Swipe Support for Mobile
function initTouchSupport() {
  let startX = 0
  let endX = 0

  const carouselContainer = document.querySelector(".carousel-container")

  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX
    })

    carouselContainer.addEventListener("touchend", (event) => {
      endX = event.changedTouches[0].clientX
      handleSwipe()
    })
  }

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }
}

// Fechar menu mobile ao clicar fora
function initOutsideClickClose() {
  document.addEventListener("click", (event) => {
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

    if (isMenuOpen && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      toggleMobileMenu()
    }
  })
}

// Adicione também esta função para garantir que os números sejam animados quando a página carregar
function initHeroStats() {
  // Aguardar um pouco para garantir que o DOM está totalmente carregado
  setTimeout(() => {
    animateCounters()
  }, 500)
}

// Adicionar esta função para animar os números do about stats
function animateAboutStats() {
  // Selecionar especificamente os números do about stats
  const aboutStatNumbers = document.querySelectorAll(".about-stat .stat-number")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target
          const originalText = statNumber.textContent.trim()

          // Verificar se é um número ou texto
          if (originalText === "Alta") {
            // Para "Alta", apenas animar a opacidade
            statNumber.style.opacity = "1"
            statNumber.style.transform = "translateY(0)"
          } else {
            // Para números, fazer a animação de contagem
            const target = Number.parseInt(originalText) || 0
            let current = 0
            const increment = target / 60
            const duration = 2000
            const stepTime = duration / 60

            // Configurar estado inicial
            statNumber.style.opacity = "1"
            statNumber.style.transform = "translateY(0)"
            statNumber.textContent = "0"

            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              statNumber.textContent = Math.floor(current)
            }, stepTime)
          }

          observer.unobserve(statNumber)
        }
      })
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  aboutStatNumbers.forEach((statNumber) => {
    // Configurar estado inicial
    statNumber.style.opacity = "0"
    statNumber.style.transform = "translateY(30px)"
    statNumber.style.transition = "all 0.6s ease-out"
    observer.observe(statNumber)
  })
}

// Adicionar funções para os botões de contato
function openWhatsApp() {
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da CrealityTech.Solutions")
  window.open(`https://wa.me/5542984033886?text=${message}`, "_blank")
}

function openEmail() {
  const subject = encodeURIComponent("Interesse nos serviços da CrealityTech.Solutions")
  window.location.href = `mailto:contato@crealitytech.com.br?subject=${subject}`
}

function openInstagram() {
  window.open("https://instagram.com/creality__tech", "_blank")
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScrollEffect()
  initParallaxEffect()
  initTiltEffect()
  initRippleEffect()
  initScrollAnimations()
  animateCounters()
  animateAboutStats() // Adicionar esta linha
  initSlideClickHandlers()
  initKeyboardNavigation()
  initTouchSupport()
  initOutsideClickClose()
  initHeroStats()

  window.addEventListener("scroll", trackActiveSection)
  updateSlidePositions()

  const mobileNavItems = document.querySelectorAll(".nav-item-mobile")
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      toggleMobileMenu()
    })
  })

  // Preload images
  const imageUrls = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-06-28%20110650-tREz8t7YR2Sm07DjRhYFo6o5Qq95nB.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-06-28%20110710-da69QqfHOFNSI065C4vYLSgkch8qpt.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-06-28%20110633-4mFzG29qLaNGvwU38VDX3LWCmDx4QJ.png",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })

  // Ensure carousel images are visible
  const images = document.querySelectorAll(".slide img")
  images.forEach((img) => {
    img.style.opacity = "1"
    img.style.transition = "opacity 0.3s ease"
  })

  // Adicionar event listeners para os botões de contato
  const whatsappBtn = document.querySelector('.contact-item[data-contact="whatsapp"]')
  const emailBtn = document.querySelector('.contact-item[data-contact="email"]')
  const instagramBtn = document.querySelector('.contact-item[data-contact="instagram"]')

  if (whatsappBtn) whatsappBtn.addEventListener("click", openWhatsApp)
  if (emailBtn) emailBtn.addEventListener("click", openEmail)
  if (instagramBtn) instagramBtn.addEventListener("click", openInstagram)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && isMenuOpen) {
    toggleMobileMenu()
  }
})

// Performance optimization
window.addEventListener("load", () => {
  // Remove loading states
  document.body.classList.add("loaded")
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
