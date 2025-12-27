const buttons = document.querySelectorAll('.menu-button');
const mainContainer = document.querySelector('.main-container');

const hamburgerMenu = document.querySelector('.hamburger-menu');
const drawerMenu = document.querySelector('.drawer-menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.getElementById('closeBtn');
const header = document.querySelector('.header');

const menus = {
    studio: [
        { text: 'NK studio', url: 'https://www.novaklar.com', target: '_blank' }
    ],
    catalogos: [
        { text: 'Gaming', url: 'gaming.html', target: '_self' },
        { text: 'Software', url: 'software.html', target: '_self' },
        { text: 'Streaming', url: 'streaming.html', target: '_self' }
    ],
    elementos: [
        { text: 'Ranking', url: 'ranking.html', target: '_self' },
        { text: 'Catalogo', url: 'catalogo.html', target: '_self' },
        { text: 'Publicidad', url: 'https://photos.app.goo.gl/5dSreR3BwDKUeaTHA', target: '_blank' }
    ]
};

let activeButton = null;

function updateActiveButton(button) {
    if (!button) return;

    const menuType = button.getAttribute('data-menu');
    
    if (menuType === 'studio') {
        const studioUrl = menus.studio[0].url;
        const studioTarget = menus.studio[0].target;
        
        if (studioTarget === '_blank') {
            window.open(studioUrl, '_blank');
        } else {
            window.location.href = studioUrl;
        }
        return;
    }

    const isSameButton = button === activeButton;

    closeAllSubmenus();

    if (isSameButton) {
        activeButton = null;
        return;
    }

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

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

function handleHeaderScroll() {
    const mainContainer = document.querySelector('.main-container');

    if (!mainContainer) {
        header.classList.add('scrolled');
        return;
    }

    const puntoDeCambio = mainContainer.offsetTop + mainContainer.offsetHeight;
    const margenDeActivacion = 50;

    if (window.scrollY > puntoDeCambio - margenDeActivacion) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

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

function init(){
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            updateActiveButton(button);
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.buttons-section')) {
            closeAllSubmenus();
            activeButton = null;
        }
    });

    hamburgerMenu.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.drawer-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    if (counterSection) {
        observer.observe(counterSection);
    }
}

init();
