// =====================
// App JS — Blog IA (Dark)
// =====================

// Load partials
(function () {
  async function loadPartial(url, containerId) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      const html = await response.text();
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
      }
    } catch (error) {
      console.error('Error loading partial:', error);
    }
  }

  // Load partials when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    loadPartial('partials/header.html', 'header-container');
    loadPartial('partials/footer.html', 'footer-container');
  });
})();

// Mobile burger
(function () {
  const burger = document.getElementById('burger');
  const navbar = document.getElementById('navbar');
  if (burger && navbar) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      navbar.classList.toggle('nav-open');
    });
  }
})();

// Smooth scroll for internal anchors
(function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        const navbar = document.getElementById('navbar');
        const burger = document.getElementById('burger');
        if (navbar && navbar.classList.contains('nav-open')) {
          navbar.classList.remove('nav-open');
          burger?.setAttribute('aria-expanded', 'false');
        }
        // set active state
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
})();

// Simple filter demo for posts (client-side)
(function () {
  const chips = document.querySelectorAll('.filters .chip');
  const grid = document.getElementById('post-grid');
  if (!chips.length || !grid) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-filter');
      grid.querySelectorAll('.card').forEach(card => {
        const k = card.getAttribute('data-cat') || 'all';
        card.style.display = (cat === 'all' || k === cat) ? '' : 'none';
      });
    });
  });
})();

// Fake submit handlers (no backend)
(function () {
  const nlForm = document.getElementById('newsletter-form');
  const nlEmail = document.getElementById('nl-email');
  nlForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nlEmail.value || !nlEmail.value.includes('@')) {
      alert('Merci de saisir un email valide.');
      nlEmail.focus();
      return;
    }
    alert('Inscription enregistrée (démo).');
    nlEmail.value = '';
  });

  const contactForm = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  const errorBox = document.getElementById('contact-error');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple demo validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    if (!name.value || !email.value || !email.value.includes('@')) {
      errorBox?.classList.remove('visually-hidden');
      success?.classList.add('visually-hidden');
      return;
    }
    errorBox?.classList.add('visually-hidden');
    success?.classList.remove('visually-hidden');
    contactForm.reset();
  });
})();
