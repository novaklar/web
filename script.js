// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Panel Dropdown Functionality - Versión mejorada
document.addEventListener('DOMContentLoaded', function() {
    const panelButtons = document.querySelectorAll('.panel-btn');
    const allDropdowns = document.querySelectorAll('.panel-dropdown-menu');
    const heroSection = document.querySelector('.hero');

    // Pre-configurar los dropdowns para evitar el flicker
    allDropdowns.forEach(dropdown => {
        // Aplicar estilos iniciales para evitar el flicker
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.transition = 'opacity 0.3s ease';
    });

    // Función para cerrar todos los dropdowns
    function closeAllDropdowns() {
        allDropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            setTimeout(() => {
                dropdown.style.display = 'none';
                dropdown.classList.remove('active');
                dropdown.parentElement.classList.remove('active');
            }, 300); // Coincide con la duración de la transición
        });
        if (heroSection) {
            heroSection.classList.remove('expanded');
        }
    }

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.panel-dropdown')) {
            closeAllDropdowns();
        }
    });

    // Manejar clic en botones
    if (panelButtons.length) {
        panelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = button.nextElementSibling;
                const parentDropdown = button.parentElement;
                
                // Si ya está activo, cerrarlo
                if (dropdown.classList.contains('active')) {
                    closeAllDropdowns();
                    return;
                }
                
                // Cerrar otros dropdowns primero
                closeAllDropdowns();
                
                // Abrir el actual con transición suave
                setTimeout(() => {
                    dropdown.style.display = 'block';
                    setTimeout(() => {
                        dropdown.style.opacity = '1';
                        dropdown.classList.add('active');
                        parentDropdown.classList.add('active');
                        if (heroSection) heroSection.classList.add('expanded');
                    }, 10);
                }, 300);
            });
        });
    }

    // Cerrar al hacer clic en enlaces del menú
    const dropdownLinks = document.querySelectorAll('.panel-dropdown-menu a');
    if (dropdownLinks.length) {
        dropdownLinks.forEach(item => {
            item.addEventListener('click', () => {
                closeAllDropdowns();
            });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterSection = document.querySelector('.counters');

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
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

    // Observador para contadores
    if (counterSection && counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        counter.innerText = '0';
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterSection);
    }

    // Popup Message
    const popup = document.querySelector('.popup-message');
    
    if (popup) {
        popup.classList.add('active');
        
        setTimeout(() => {
            popup.classList.remove('active');
        }, 4000);
    }
});
