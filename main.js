/* ============================================================
   NSHEMIIRE SHAWN PATRICK — Portfolio JavaScript
   ============================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(11,17,32,0.97)';
    } else {
      navbar.style.background = 'rgba(11,17,32,0.85)';
    }
  });
}

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Scroll fade-in ── */
const fadeEls = document.querySelectorAll(
  '.skill-block, .project-card, .timeline-item, .asp-card, .stat-card, .contact-item'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ── Active nav link highlighting ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = '#00C9A7';
      a.setAttribute('aria-current', 'page');
    } else {
      a.style.color = '';
      a.removeAttribute('aria-current');
    }
  });
};
window.addEventListener('scroll', highlightNav);

/* ── Skill bar animation on scroll ── */
const bars = document.querySelectorAll('.fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

/* ── Initialize EmailJS ── */
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your EmailJS public key

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const name    = (document.getElementById('name') || {}).value?.trim() || '';
    const email   = (document.getElementById('email') || {}).value?.trim() || '';
    const message = (document.getElementById('message') || {}).value?.trim() || '';

    if (!name || !email || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email.', 'error');
      return;
    }

    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }

    emailjs.send('SERVICE_ID_HERE', 'TEMPLATE_ID_HERE', {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'YOUR_GMAIL@gmail.com'
    }).then(() => {
      showToast('Message sent! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      if (btn) {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    }).catch((error) => {
      console.error('EmailJS error:', error);
      showToast('Failed to send message. Try again later.', 'error');
      if (btn) {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    });
  });
}

/* ── Toast notification helper ── */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 24px;
    padding: 14px 22px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 9999;
    animation: slideUp 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    background: ${type === 'success' ? '#00C9A7' : '#FF5757'};
    color: ${type === 'success' ? '#0B1120' : '#fff'};
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ── Inject toast keyframe ── */
const activeImageCard = document.getElementById('activeImageCard');
if (activeImageCard) {
  const overlayText = activeImageCard.querySelector('.image-overlay span');
  const setActive = (active) => {
    activeImageCard.classList.toggle('active', active);
    activeImageCard.setAttribute('aria-pressed', String(active));
    overlayText.textContent = active ? 'Active image' : 'Tap to activate';
  };

  activeImageCard.addEventListener('click', () => {
    setActive(!activeImageCard.classList.contains('active'));
  });

  activeImageCard.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActive(!activeImageCard.classList.contains('active'));
    }
  });
}

const style = document.createElement('style');
style.textContent = `@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`;
document.head.appendChild(style);
