// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinksContainer = document.querySelector('.nav-links ul'); // Contenedor de los li
const closeBtn = document.querySelector('.close-btn');

// Función para abrir/cerrar el menú
function toggleMenu() {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Ordenar elementos del menú por longitud de texto (DOMContentLoaded para asegurar carga)
document.addEventListener('DOMContentLoaded', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-links li'));
    
    // Ordenar de menor a mayor longitud de texto
    navItems.sort((a, b) => {
        return a.textContent.trim().length - b.textContent.trim().length;
    });
    
    // Reinsertar en el DOM en orden
    navItems.forEach(item => {
        navLinksContainer.appendChild(item);
    });
});

// Eventos para el menú móvil
burger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
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
const speed = 100;

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = Math.max(target / speed, 1);

    function update() {
        if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            setTimeout(update, 30);
        } else {
            counter.innerText = target;
            if (target === 5000) counter.innerText = '+' + target;
            if (target === 95) counter.innerText = target + '%';
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

if (document.querySelector('.counters')) {
    document.querySelector('.counters').style.opacity = '1';
    observer.observe(document.querySelector('.counters'));
}

// Popup Message
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.popup-message');
    if (popup) {
        popup.classList.add('active');
        setTimeout(() => popup.classList.remove('active'), 4000);
    }
});
