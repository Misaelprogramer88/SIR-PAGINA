import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { initAnimations } from './animations.js';
import { initFormValidation } from './form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP & AOS Animations
  initAnimations();

  // Initialize Contact Form Validation
  initFormValidation();

  // ── Sticky Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar-sir');
  const contactSection = document.getElementById('contacto');

  // ── Parallax: hero video moves at 45% of scroll speed ──
  const heroVideo = document.querySelector('.hero-video');
  const PARALLAX_SPEED = 0.45; // higher = more movement (0 = none, 1 = locks to scroll)

  let ticking = false;
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Parallax
    if (heroVideo) {
      heroVideo.style.transform = `translateY(${scrollY * PARALLAX_SPEED}px)`;
    }

    // Navbar state
    let inContact = false;
    if (contactSection && scrollY >= (contactSection.offsetTop - 80)) {
      inContact = true;
    }
    if (inContact) {
      navbar.classList.remove('scrolled');
      navbar.classList.add('contact-mode');
    } else if (scrollY > 40) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('contact-mode');
    } else {
      navbar.classList.remove('scrolled', 'contact-mode');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
  handleScroll();

  // ── Language Switcher Visual Toggle ──
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Smooth scroll for nav links & close mobile menu on click ──
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-hero-info');
  const navbarCollapse = document.getElementById('sirNavbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.includes('#') && !href.startsWith('mailto:')) {
        const hash = href.substring(href.indexOf('#'));
        const targetSection = document.querySelector(hash);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth' });
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  const serviceItems = document.querySelectorAll('.services-item');
  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ── Services hover dropdown ──────────────────────────────────────────
  // Teleport the menu to <body> ONLY on desktop (>= 992px) so NO parent overflow clips it,
  // while keeping it inside the collapse menu on mobile devices
  const svcDropdown = document.querySelector('.services-dropdown');
  const svcMenu     = document.querySelector('.services-menu');

  if (svcDropdown && svcMenu && window.innerWidth >= 992) {
    // Move menu out of the navbar into body
    document.body.appendChild(svcMenu);

    function positionMenu() {
      const rect  = svcDropdown.getBoundingClientRect();
      const menuW = svcMenu.offsetWidth || 310;
      let   left  = rect.left + rect.width / 2 - menuW / 2;
      // Clamp to viewport
      left = Math.max(8, Math.min(left, window.innerWidth - menuW - 8));
      svcMenu.style.top  = (rect.bottom + window.scrollY + 4) + 'px';
      svcMenu.style.left = left + 'px';
    }

    // Show on hover (CSS handles opacity/transform; JS only positions)
    svcDropdown.addEventListener('mouseenter', () => {
      positionMenu();
      svcMenu.classList.add('is-open');
    });
    svcDropdown.addEventListener('mouseleave', () => {
      svcMenu.classList.remove('is-open');
    });
    svcMenu.addEventListener('mouseenter', () => {
      svcMenu.classList.add('is-open');
    });
    svcMenu.addEventListener('mouseleave', () => {
      svcMenu.classList.remove('is-open');
    });

    window.addEventListener('resize', () => {
      if (svcMenu.classList.contains('is-open')) positionMenu();
    });
    // Reposition on scroll so it follows the (fixed) navbar
    window.addEventListener('scroll', () => {
      if (svcMenu.classList.contains('is-open')) positionMenu();
    }, { passive: true });
  }
  // ────────────────────────────────────────────────────────────────────

  // ── Service Page Entry & Exit Animations ──
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('https://wa.me') &&
      !href.startsWith('javascript:') &&
      link.target !== '_blank'
    ) {
      link.addEventListener('click', (e) => {
        const currentPage = window.location.pathname.split('/').pop();
        if (href !== currentPage) {
          e.preventDefault();
          document.body.classList.remove('page-loaded');
          document.body.classList.add('page-exiting');
          setTimeout(() => {
            window.location.href = href;
          }, 320);
        }
      });
    }
  });
});

