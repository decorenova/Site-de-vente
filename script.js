// === Menu Burger Responsive ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('open');
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
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Déclencher l’animation au scroll (quand visible)
window.addEventListener('scroll', () => {
  const aboutSection = document.querySelector('#apropos');
  const sectionTop = aboutSection.offsetTop;
  const sectionHeight = aboutSection.offsetHeight;
  const scrollY = window.scrollY + window.innerHeight;

  if (!started && scrollY >= sectionTop + sectionHeight / 4) {
    animateCounters();
    started = true;
  }
});

// === Formulaire de contact ===
const form = document.getElementById('contact-form');
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

  // Simule un envoi (tu peux brancher à un backend ici)
  setTimeout(() => {
    message.textContent = 'Merci pour votre message !';
    message.style.color = 'green';
    form.reset();
  }, 500);
});




        // Récupérer les éléments du DOM
        const modal = document.getElementById('myModal');
        const modalIframe = document.getElementById('modalIframe');
        const closeBtn = document.querySelector('.close-button');
        const links = document.querySelectorAll('.open-modal-link');

        // Gérer le clic sur le lien
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Empêche le lien de s'ouvrir normalement
                const urlToLoad = event.target.getAttribute('data-url'); // Récupère l'URL du lien

                if (urlToLoad) {
                    modalIframe.src = urlToLoad; // Charge l'URL dans l'iframe
                    modal.style.display = 'flex'; // Affiche la fenêtre modale
                }
            });
        });

        // Gérer la fermeture de la fenêtre
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // Cache la fenêtre modale
            modalIframe.src = ''; // Réinitialise l'iframe pour éviter la lecture audio/vidéo en arrière-plan
        });

        // Fermer la fenêtre si on clique à l'extérieur
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                modalIframe.src = '';
            }
        });