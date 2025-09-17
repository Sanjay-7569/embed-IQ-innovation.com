// EMBED IQ INNOVATION - Main JS Logic
// All features, all logic, functions separated and commented

// ----------------------
// 1. Responsive Navbar Toggle
// ----------------------
function initNavbarToggle() {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  navToggle.addEventListener('click', function () {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
}

// ----------------------
// 2. Dropdown Menus (Services & Projects)
// ----------------------
function initDropdownMenus() {
  document.querySelectorAll('.has-dropdown').forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.has-dropdown.open').forEach(d => {
          if (d !== drop) d.classList.remove('open');
        });
        drop.classList.toggle('open');
        toggle.setAttribute('aria-expanded', drop.classList.contains('open'));
      });
    }
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.has-dropdown.open').forEach(drop => {
      drop.classList.remove('open');
      drop.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  });
}

// ----------------------
// 3. Project Search (Client-Side Filter)
// ----------------------
function initProjectSearch() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  if (searchForm && searchInput && gallery) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const term = searchInput.value.trim().toLowerCase();
      filterProjects(term);
    });
  }
  function filterProjects(term) {
    Array.from(gallery.children).forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const tags = card.querySelector('.tags')?.textContent.toLowerCase() || '';
      card.style.display = (!term || title.includes(term) || tags.includes(term)) ? '' : 'none';
    });
  }
}

// ----------------------
// 4. Projects Category Filter (Dropdown)
// ----------------------
function initProjectsDropdownFilter() {
  const gallery = document.getElementById('gallery');
  const projectDropdownLinks = document.querySelectorAll('[data-filter]');
  projectDropdownLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const cat = link.getAttribute('data-filter');
      filterByCategory(cat);
      projectDropdownLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  function filterByCategory(cat) {
    if (!gallery) return;
    Array.from(gallery.children).forEach(card => {
      const category = card.getAttribute('data-category');
      card.style.display = (cat === 'all' || category === cat) ? '' : 'none';
    });
  }
}

// ----------------------
// 5. Lightbox Gallery Modal
// ----------------------
function initLightbox() {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let projectImages = [];
  let currentImageIndex = 0;

  function updateProjectImages() {
    projectImages = Array.from(gallery.querySelectorAll('.project-card img'));
  }
  function showLightbox(idx) {
    if (!projectImages[idx]) return;
    lightboxImg.src = projectImages[idx].src;
    lightboxImg.alt = projectImages[idx].alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    currentImageIndex = idx;
  }
  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (gallery && lightbox && lightboxImg && lightboxClose && lightboxPrev && lightboxNext) {
    updateProjectImages();
    gallery.querySelectorAll('[data-lightbox]').forEach((btn, idx) => {
      btn.addEventListener('click', function () {
        updateProjectImages();
        showLightbox(idx);
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener('click', function () {
      if (currentImageIndex > 0) showLightbox(currentImageIndex - 1);
    });
    lightboxNext.addEventListener('click', function () {
      if (currentImageIndex < projectImages.length - 1) showLightbox(currentImageIndex + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
    });
  }
}

// ----------------------
// 6. Contact Form Validation & Submission
// ----------------------
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    contactForm.querySelectorAll('.form-field').forEach(field => {
      const input = field.querySelector('input, textarea');
      const errorSpan = field.querySelector('.error');
      if (!input.checkValidity()) {
        valid = false;
        errorSpan.textContent = input.validationMessage;
        input.classList.add('invalid');
      } else {
        errorSpan.textContent = '';
        input.classList.remove('invalid');
      }
    });
    if (valid) {
      // Simulate sending, show success message, clear form
      contactForm.reset();
      alert('Thank you! We’ll get back within 1 business day.');
    }
  });
}

// ----------------------
// 7. Back to Top Button
// ----------------------
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 320) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----------------------
// 8. Footer Year (Dynamic)
// ----------------------
function setFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ----------------------
// 9. Accessibility: Keyboard Focus
// ----------------------
function enhanceAccessibility() {
  document.querySelectorAll('button, a, input, textarea').forEach(el => {
    el.addEventListener('keyup', function (e) {
      if (e.key === 'Tab') el.classList.add('tabbed');
    });
    el.addEventListener('blur', function () {
      el.classList.remove('tabbed');
    });
  });
}

// ----------------------
// 10. Smooth Scroll for Anchor Links
// ----------------------
function initSmoothScroll() {
  document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        }
        // Close mobile nav after click
        const nav = document.getElementById('primaryNav');
        const navToggle = document.getElementById('navToggle');
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  });
}

// ----------------------
// 11. Animate Cards on Scroll (Fade-in)
// ----------------------
function animateCardsOnScroll() {
  const observerOptions = { threshold: 0.1 };
  const fadeInElements = document.querySelectorAll('.card, .project-card, .why-card, .stats, .contact-form');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  fadeInElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(32px)';
    observer.observe(el);
  });
}

// ----------------------
// 12. Page Initialization
// ----------------------
function initEmbedIQSite() {
  initNavbarToggle();
  initDropdownMenus();
  initProjectSearch();
  initProjectsDropdownFilter();
  initLightbox();
  initContactForm();
  initBackToTop();
  setFooterYear();
  enhanceAccessibility();
  initSmoothScroll();
  animateCardsOnScroll();
}

// ----------------------
// 13. DOM Ready
// ----------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmbedIQSite);
} else {
  initEmbedIQSite();
}
