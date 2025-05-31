// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
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

// Popup Message
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.popup-message');
    
    if (popup) {
        // Mostrar el mensaje
        popup.classList.add('active');
        
        // Después de 4 segundos, ocultarlo
        setTimeout(() => {
            popup.classList.remove('active');
        }, 4000);
    }
});
