// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');  // Cambiado toggle a active para coincidir con CSS
});

// Panel Dropdown Functionality
const panelButtons = document.querySelectorAll('.panel-btn');
const allDropdowns = document.querySelectorAll('.panel-dropdown-menu');

document.addEventListener('click', (e) => {
    if (!e.target.closest('.panel-dropdown')) {
        allDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

panelButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = button.nextElementSibling;
        allDropdowns.forEach(item => {
            if (item !== dropdown) {
                item.style.display = 'none';
            }
        });
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});

document.querySelectorAll('.panel-dropdown-menu a').forEach(item => {
    item.addEventListener('click', () => {
        item.closest('.panel-dropdown-menu').style.display = 'none';
    });
});

// Counter Animation (más lento y fluido)
const counters = document.querySelectorAll('.counter');
const speed = 100; // cuanto más alto, más lento

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = Math.max(target / speed, 1); // mínimo de 1 para evitar congelamiento

    function update() {
        if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            setTimeout(update, 30); // más tiempo entre cada paso
        } else {
            counter.innerText = target;
            if (target === 5000) {
                counter.innerText = '+' + target;
            }
            if (target === 95) {
                counter.innerText = target + '%';
            }
        }
    }

    update();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.counters').style.opacity = '1';
observer.observe(document.querySelector('.counters'));
window.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup-message');
  
  // Mostrar el mensaje
  popup.classList.add('active');
  
  // Después de 4 segundos, ocultarlo
  setTimeout(() => {
    popup.classList.remove('active');
  }, 4000);
});

