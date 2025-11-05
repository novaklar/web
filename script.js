// ===== SLIDER FUNCTIONALITY =====
const slider = document.getElementById('slider');
const wrapper = document.querySelector('.slider-wrap');
let items = Array.from(slider.querySelectorAll('.menu-item'));
const submenu = document.getElementById('submenu');

// Elementos del menú hamburguesa
const hamburgerMenu = document.querySelector('.hamburger-menu');
const drawerMenu = document.querySelector('.drawer-menu');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

// Menús actualizados - CONECTADOS CORRECTAMENTE
const menus = {
    studio: [  // Cambiado de 'estudio' a 'studio'
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
        { text: 'Publicidad', url: 'https://photos.app.goo.gl/5dSreR3BwDKUeaTHA', target: '_blank' },
        { text: 'Catalogo Clientes', url: 'catalogo.html', target: '_self' }
    ]
};

const ITEM_RATIO = 0.62;
let isScrolling = false;
let scrollTimeout;

function layoutItems(){
    const sliderW = slider.clientWidth;
    const itemW = Math.round(sliderW * ITEM_RATIO);
    items.forEach(it => it.style.flexBasis = itemW + 'px');
    
    const sidePad = Math.round((sliderW - itemW) / 2);
    slider.style.paddingLeft = sidePad + 'px';
    slider.style.paddingRight = sidePad + 'px';
    
    updateActivePosition(true);
}

function nearestToCenter(){
    const center = slider.scrollLeft + slider.clientWidth / 2;
    return items.reduce((closest, it) => {
        const itCenter = it.offsetLeft + it.offsetWidth / 2;
        const dist = Math.abs(center - itCenter);
        return dist < closest.dist ? { el: it, dist } : closest;
    }, { el: null, dist: Infinity }).el;
}

let lastActive = null;
function updateActive(){
    const active = nearestToCenter();
    if(!active || active === lastActive) return;

    items.forEach(it => it.classList.remove('active'));
    active.classList.add('active');
    items.forEach(it => { 
        if(it !== active) {
            it.classList.add('inactive');
        } else {
            it.classList.remove('inactive');
        }
    });

    const key = active.getAttribute('data-menu');
    renderSubmenu(key);
    animateSubmenuTo(active);
    lastActive = active;
}

function renderSubmenu(key){
    const list = menus[key] || [];
    submenu.innerHTML = '<div class="submenu">' + 
        list.map(item => 
            `<a href="${item.url}" target="${item.target}">${item.text}</a>`
        ).join('') + 
        '</div>';
    submenu.classList.add('show');
}

function centerItem(item, behavior = 'smooth'){
    const targetScroll = item.offsetLeft - (slider.clientWidth / 2) + (item.offsetWidth / 2);
    slider.scrollTo({ left: Math.round(targetScroll), behavior });
}

function handleScroll(){
    if (!isScrolling) {
        isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        const active = nearestToCenter();
        if (active) {
            centerItem(active, 'smooth');
        }
    }, 150);
    
    updateActive();
    updateActivePosition();
}

let animFrame;
function animateSubmenuTo(target){
    cancelAnimationFrame(animFrame);
    const wrapRect = wrapper.getBoundingClientRect();
    const startLeft = parseFloat(submenu.style.left || 0);
    const startWidth = parseFloat(submenu.style.width || 0);
    const startTop = parseFloat(submenu.style.top || 0);

    const targetRect = target.getBoundingClientRect();
    const endLeft = Math.round(targetRect.left - wrapRect.left);
    const endWidth = Math.round(targetRect.width);
    const endTop = Math.round(targetRect.bottom - wrapRect.top + 12);

    const duration = 220;
    const startTime = performance.now();

    function animate(now){
        const t = Math.min(1, (now - startTime) / duration);
        const ease = t<0.5 ? 2*t*t : -1+(4-2*t)*t;
        submenu.style.left = startLeft + (endLeft - startLeft) * ease + 'px';
        submenu.style.width = startWidth + (endWidth - startWidth) * ease + 'px';
        submenu.style.top = startTop + (endTop - startTop) * ease + 'px';
        if(t < 1) animFrame = requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function updateActivePosition(skipAnim=false){
    const active = document.querySelector('.menu-item.active') || items[1];
    if(!active) return;
    const wrapRect = wrapper.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    const left = Math.round(rect.left - wrapRect.left);
    const top = Math.round(rect.bottom - wrapRect.top + 12);
    if(skipAnim){
        submenu.style.left = left + 'px';
        submenu.style.width = rect.width + 'px';
        submenu.style.top = top + 'px';
    } else animateSubmenuTo(active);
}

function debounce(fn, ms=80){
    let t; return (...args) => { clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
}

// ===== HAMBURGER MENU FUNCTIONALITY =====
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

// ===== HEADER SCROLL FUNCTIONALITY =====
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== COUNTER ANIMATION =====
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

// ===== INITIALIZATION =====
function init(){
    // Slider initialization
    layoutItems();
    const def = items.find(it => it.dataset.menu === 'catalogos') || items[1];
    centerItem(def, 'auto');
    setTimeout(()=>updateActive(), 60);
    
    // Event listeners para el menú hamburguesa
    hamburgerMenu.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al hacer clic en un enlace
    drawerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Event listener para el scroll del header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Counter observer
    if (counterSection) {
        observer.observe(counterSection);
    }
}

// ===== EVENT LISTENERS =====
slider.addEventListener('scroll', handleScroll);

slider.addEventListener('click', e=>{
    const it = e.target.closest('.menu-item');
    if(it) centerItem(it, 'smooth');
});

window.addEventListener('resize', debounce(()=>{
    layoutItems();
    const active = document.querySelector('.menu-item.active') || items[1];
    if(active) centerItem(active, 'auto');
}, 120));

new ResizeObserver(()=>layoutItems()).observe(slider);

// Initialize everything
init();
