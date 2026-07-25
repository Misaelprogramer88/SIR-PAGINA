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

  // ── Language Switcher Navigation ──
  const langEs = document.getElementById('langEs');
  const langEn = document.getElementById('langEn');

  if (langEs && langEn) {
    let currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (!currentFile || currentFile === '/') currentFile = 'index.html';

    const isEnPage = document.documentElement.lang === 'en' || 
                     currentFile.includes('-en') || 
                     window.location.href.includes('-en');

    if (isEnPage) {
      langEn.classList.add('active');
      langEs.classList.remove('active');
    } else {
      langEs.classList.add('active');
      langEn.classList.remove('active');
    }

    langEs.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isEnPage) {
        let spanishFile = 'index.html';
        if (currentFile.includes('-en.html')) {
          spanishFile = currentFile.replace('-en.html', '.html');
        } else if (currentFile.endsWith('-en')) {
          spanishFile = currentFile.replace(/-en$/, '') + '.html';
        } else if (currentFile === 'index-en') {
          spanishFile = 'index.html';
        } else {
          spanishFile = 'index.html';
        }
        window.location.href = spanishFile;
      }
    });

    langEn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isEnPage) {
        let englishFile = 'index-en.html';
        if (currentFile.endsWith('.html') && !currentFile.includes('-en')) {
          englishFile = (currentFile === 'index.html') ? 'index-en.html' : currentFile.replace('.html', '-en.html');
        } else if (currentFile === 'index' || currentFile === 'index.html' || currentFile === '') {
          englishFile = 'index-en.html';
        } else if (!currentFile.includes('-en')) {
          englishFile = currentFile + '-en.html';
        }
        window.location.href = englishFile;
      }
    });
  }

  // ── Smooth scroll for nav links & close mobile menu on click ──
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-hero-info, .services-item, .btn-card-action');
  const navbarCollapse = document.getElementById('sirNavbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href) return;

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const isIndexPage = currentPage === '' || currentPage === 'index.html' || currentPage === 'index-en.html';

      // Internal section links (e.g. index.html#servicios, index.html#contacto, #contacto)
      if (href.includes('#') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me')) {
        const hash = href.substring(href.indexOf('#'));
        if (isIndexPage) {
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
      svcMenu.style.position = 'fixed';
      svcMenu.style.top  = (rect.bottom + 4) + 'px';
      svcMenu.style.left = left + 'px';
    }

    // Position immediately on page init
    positionMenu();

    let hideTimeout = null;

    function openMenu() {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      positionMenu();
      svcMenu.classList.add('is-open');
      svcDropdown.classList.add('is-open');
    }

    function closeMenuWithDelay() {
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        svcMenu.classList.remove('is-open');
        svcDropdown.classList.remove('is-open');
      }, 350);
    }

    // Show on hover with small delay on hide so users never battle to click a service
    svcDropdown.addEventListener('mouseenter', openMenu);
    svcDropdown.addEventListener('mouseleave', closeMenuWithDelay);
    svcMenu.addEventListener('mouseenter', openMenu);
    svcMenu.addEventListener('mouseleave', closeMenuWithDelay);

    window.addEventListener('resize', () => {
      positionMenu();
    });
    // Reposition on scroll so it follows the (fixed) navbar
    window.addEventListener('scroll', () => {
      positionMenu();
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
      const targetPage = href.split('#')[0];
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      if (targetPage && targetPage !== currentPage) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
          document.body.classList.remove('page-loaded');
          document.body.classList.add('page-exiting');
          setTimeout(() => {
            window.location.href = href;
          }, 280);
        });
      }
    }
  });
});

