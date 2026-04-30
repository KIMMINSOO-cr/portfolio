/* ============================================
   KIM MIN SOO PORTFOLIO — script.js
   ============================================ */

'use strict';

// ─── DOM Ready ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initScrollTop();
  initActiveNavLink();
  initTypingEffect();
});

// ─── Navbar Scroll Effect ────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const openMenu = () => {
    toggle.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-label', '메뉴 닫기');
  };

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-label', '메뉴 열기');
  };

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}

// ─── Scroll Reveal Animation ─────────────────────────────────────────────────
function initScrollReveal() {
  // Add reveal class to target elements
  const targets = [
    '.section-header',
    '.about-grid',
    '.skill-category',
    '.project-card',
    '.timeline-item',
    '.contact-card',
  ];

  targets.forEach((selector, selectorIdx) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      el.classList.add('reveal');
      if (idx > 0) {
        el.classList.add(`reveal-delay-${Math.min(idx, 3)}`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Scroll to Top Button ────────────────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: '-80px 0px 0px 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}

// ─── Typing Effect for Hero Description ─────────────────────────────────────
function initTypingEffect() {
  const desc = document.querySelector('.hero-desc');
  if (!desc) return;

  const text = desc.textContent.trim();
  desc.textContent = '';
  desc.style.opacity = '1';

  let i = 0;
  const speed = 30; // ms per character

  // Delay start
  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        desc.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  }, 800);
}

// ─── Smooth Scroll for anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
