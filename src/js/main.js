import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { initAnimations } from './animations.js';
import { initFormValidation } from './form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP & AOS Animations
  initAnimations();

  // Initialize Contact Form Validation
  initFormValidation();

  // Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar-sir');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Language Switcher Visual Toggle
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Smooth scroll for nav links & close mobile menu on click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-hero-info, .btn-cotizar');
  const navbarCollapse = document.getElementById('sirNavbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close Bootstrap collapse on mobile if open
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });
});
