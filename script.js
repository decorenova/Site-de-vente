// === Menu Burger Responsive ===
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('open');
    console.log('Burger clicked!'); // Pour vérifier
  });

  // Fermer le menu quand on clique sur un lien
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('open');
      });
    });
  }
}
// Fermer le menu quand on clique sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('open');
  });
});

// === Navbar qui disparaît au scroll vers le bas et réapparaît au scroll vers le haut ===
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scroll vers le bas - cacher la navbar
    header.classList.add('hidden');
  } else {
    // Scroll vers le haut - afficher la navbar
    header.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
});

// === Compteurs animés ===
const counters = document.querySelectorAll('.number');
let started = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 200;

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Déclencher l'animation au scroll (quand visible)
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('#apropos');
  if (aboutSection) {
    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    if (!started && scrollY >= sectionTop + sectionHeight / 4) {
      animateCounters();
      started = true;
    }
  }
});

// === Formulaire de contact ===
const form = document.getElementById('contact-form');
if (form) {
  const message = document.getElementById('form-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const texte = form.message.value.trim();

    if (nom === '' || email === '' || texte === '') {
      message.textContent = 'Veuillez remplir tous les champs.';
      message.style.color = 'red';
      return;
    }

    setTimeout(() => {
      message.textContent = 'Merci pour votre message !';
      message.style.color = 'green';
      form.reset();
    }, 500);
  });
}

// === Modal ===
const modal = document.getElementById('myModal');
if (modal) {
  const modalIframe = document.getElementById('modalIframe');
  const closeBtn = document.querySelector('.close-button');
  const links = document.querySelectorAll('.open-modal-link');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const urlToLoad = event.target.getAttribute('data-url');

      if (urlToLoad) {
        modalIframe.src = urlToLoad;
        modal.style.display = 'flex';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalIframe.src = '';
    });
  }

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modalIframe.src = '';
    }
  });
}