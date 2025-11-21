// ===== BOTONES FUNCTIONALITY =====
const buttons = document.querySelectorAll('.menu-button');
const mainContainer = document.querySelector('.main-container');

// Elementos del menú hamburguesa
const hamburgerMenu = document.querySelector('.hamburger-menu');
const drawerMenu = document.querySelector('.drawer-menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.getElementById('closeBtn');
const header = document.querySelector('.header');

// Menús actualizados
const menus = {
    studio: [
        { text: 'NK studio', url: 'https://www.novaklar.com', target: '_blank' }
    ],
    catalogos: [
        { text: 'Apps', url: 'apps.html', target: '_self' },
        { text: 'Adobe', url: 'adobe.html', target: '_self' },
        { text: 'Gaming', url: 'gaming.html', target: '_self' },
        { text: 'Streaming', url: 'streaming.html', target: '_self' }
    ],
    elementos: [
        { text: 'App', url: 'App.html', target: '_self' },
        { text: 'Ranking', url: 'ranking.html', target: '_self' },
        { text: 'Catalogo', url: 'catalogo.html', target: '_self' },
        { text: 'Publicidad', url: 'https://photos.app.goo.gl/5dSreR3BwDKUeaTHA', target: '_blank' }
    ]
};

let activeButton = null;

// ===== FUNCIONES DE LOS BOTONES =====
function updateActiveButton(button) {
    if (!button) return;

    const menuType = button.getAttribute('data-menu');
    
    // CASO ESPECIAL: Si es el botón Studio, redirigir directamente
    if (menuType === 'studio') {
        // Redirigir a la URL del primer elemento del menú studio
        const studioUrl = menus.studio[0].url;
        const studioTarget = menus.studio[0].target;
        
        if (studioTarget === '_blank') {
            window.open(studioUrl, '_blank');
        } else {
            window.location.href = studioUrl;
        }
        return; // Salir temprano, no procesar como submenú
    }

    const isSameButton = button === activeButton;

    // Cerrar todos los submenús primero
    closeAllSubmenus();

    // Si es el mismo botón, solo cerrar
    if (isSameButton) {
        activeButton = null;
        return;
    }

    // Remover clase active de todos los botones
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Agregar clase active al botón clickeado
    button.classList.add('active');

    const key = button.getAttribute('data-menu');
    const submenu = button.parentNode.querySelector('.submenu-container');

    renderSubmenu(key, submenu);
    showSubmenu(submenu);

    activeButton = button;
}

function renderSubmenu(key, submenu) {
    const list = menus[key] || [];
    if (list.length === 0) {
        return;
    }

    // Si la lista ya existe, la vaciamos
    if (submenu.querySelector('.submenu')) {
        submenu.querySelector('.submenu').innerHTML = '';
    } else {
        submenu.innerHTML = '<div class="submenu"></div>';
    }

    const submenuList = submenu.querySelector('.submenu');

    list.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.target = item.target;
        link.textContent = item.text;
        submenuList.appendChild(link);
    });
}

function showSubmenu(submenu) {
    submenu.classList.add('active');
}

function closeAllSubmenus() {
    const allSubmenus = document.querySelectorAll('.submenu-container');
    allSubmenus.forEach(submenu => {
        submenu.classList.remove('active');
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
}

// ===== MENÚ HAMBURGUESA =====
function toggleMenu() {
    hamburgerMenu.classList.toggle('active');
    drawerMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawerMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    hamburgerMenu.classList.remove('active');
    drawerMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== HEADER SCROLL (FUNCIÓN ACTUALIZADA) =====
function handleHeaderScroll() {
    // Referencia al contenedor principal (sección azul)
    const mainContainer = document.querySelector('.main-container');

    if (!mainContainer) {
        // Si no existe la sección azul, el header siempre debe estar 'scrolled'
        header.classList.add('scrolled');
        return;
    }

    // Cálculo del punto de cambio: Dónde termina la sección azul.
    // Esto es la distancia desde el top del documento hasta el final del mainContainer.
    const puntoDeCambio = mainContainer.offsetTop + mainContainer.offsetHeight;

    // Usamos window.scrollY para ver la posición de desplazamiento actual.
    // Margen de activación (para que el cambio ocurra 50px antes de que la sección azul desaparezca)
    const margenDeActivacion = 50;

    if (window.scrollY > puntoDeCambio - margenDeActivacion) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== CONTADORES =====
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
                counter.innerText = '0';
                animateCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// ===== INICIALIZACIÓN =====
function init(){
    // Event listeners para los botones
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            updateActiveButton(button);
        });
    });

    // Función de cierre al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.buttons-section')) {
            closeAllSubmenus();
            activeButton = null;
        }
    });

    // Event listeners para el menú hamburguesa
    hamburgerMenu.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.drawer-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Event listener para el scroll del header
    window.addEventListener('scroll', handleHeaderScroll);

    // Ejecutar la función una vez al cargar la página (para recargas o si la página ya está en scroll)
    handleHeaderScroll();

    // Counter observer
    if (counterSection) {
        observer.observe(counterSection);
    }
}

// Initialize everything
init();
