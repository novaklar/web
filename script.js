// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.body;

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Función para el nuevo panel de botones
function toggleMenu(event, menuId) {
    event.preventDefault();
    const menu = document.getElementById(menuId);
    const hero = document.querySelector('.hero');
    const allMenus = document.querySelectorAll('.menu-desplegable');
    
    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('active');
        }
    });
    
    menu.classList.toggle('active');
    
    const anyMenuOpen = Array.from(allMenus).some(m => m.classList.contains('active'));
    hero.style.paddingBottom = anyMenuOpen ? '40px' : '30px';
}

// Counter Animation - Versión mejorada
const counters = document.querySelectorAll('.counter');
const counterSection = document.querySelector('.counters');

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 segundos para completar la animación
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * target);
        
        counter.innerText = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Formateo final para valores especiales
            if (target === 5000) {
                counter.innerText = '+' + target;
            } else if (target === 95) {
                counter.innerText = target + '%';
            } else {
                counter.innerText = target;
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Observador de intersección para activar contadores
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                counter.innerText = '0'; // Resetear a 0 antes de animar
                animateCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (counterSection) {
    observer.observe(counterSection);
}

// Cerrar menús desplegables al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.boton')) {
        document.querySelectorAll('.menu-desplegable').forEach(menu => {
            menu.classList.remove('active');
        });
        document.querySelector('.hero').style.paddingBottom = '30px';
    }
});
