import gsap from 'gsap';
import AOS from 'aos';

export function initAnimations() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 900,
    once: false,
    easing: 'ease-out-quad',
    offset: 120,
    mirror: true
  });

  // GSAP Hero Animations
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

  heroTimeline
    .fromTo('#hero-title', 
      { opacity: 0, y: 50, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, delay: 0.2 }
    )
    .fromTo('#hero-subtitle', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0 }, 
      '-=0.6'
    )
    .fromTo('#hero-desc', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0 }, 
      '-=0.6'
    )
    .fromTo('#hero-btn', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, ease: 'back.out(1.7)' }, 
      '-=0.4'
    );

  // Parallax Scroll Effect for Hero Section
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-video-wrapper');

    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
      heroContent.style.opacity = `${1 - (scrollY / window.innerHeight) * 1.2}`;
    }

    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  });
}
