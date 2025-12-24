const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const filterButtons = document.querySelectorAll('.chip');
const menuCards = document.querySelectorAll('.menu-card');
const form = document.getElementById('reserveForm');
const formMessage = document.getElementById('formMessage');

function toggleNav() {
  nav.classList.toggle('open');
}

function closeNav() {
  nav.classList.remove('open');
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

nav?.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'A') {
    closeNav();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (evt) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    menuCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || filter === category;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

function validateForm(data) {
  const errors = [];
  if (!data.name.trim()) errors.push('Name is required.');
  if (!data.email.trim() || !data.email.includes('@')) errors.push('Valid email required.');
  if (!data.date) errors.push('Date is required.');
  if (!data.time) errors.push('Time is required.');
  if (data.guests < 1) errors.push('Guests must be at least 1.');
  return errors;
}

form?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formMessage.textContent = '';

  const formData = new FormData(form);
  const payload = {
    name: formData.get('name') || '',
    email: formData.get('email') || '',
    date: formData.get('date') || '',
    time: formData.get('time') || '',
    guests: Number(formData.get('guests') || 0),
    notes: formData.get('notes') || '',
  };

  const errors = validateForm(payload);
  if (errors.length) {
    formMessage.textContent = errors.join(' ');
    formMessage.style.color = '#f56262';
    return;
  }

  formMessage.style.color = '#6ce0c7';
  formMessage.textContent = 'Request received! We will confirm by email within the hour.';
  form.reset();
});

const fadeItems = document.querySelectorAll('.menu-card, .story, .reserve-card, .contact-card, .contact-map');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeItems.forEach((item) => observer.observe(item));
