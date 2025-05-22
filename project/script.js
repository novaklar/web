// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle nav
    nav.classList.toggle('active');
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Panel Dropdown Functionality
const panelButtons = document.querySelectorAll('.panel-btn');
const allDropdowns = document.querySelectorAll('.panel-dropdown-menu');

// Close all dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.panel-dropdown')) {
        allDropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// Toggle dropdowns when clicking buttons
panelButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = button.nextElementSibling;
        
        // Close all other dropdowns
        allDropdowns.forEach(item => {
            if (item !== dropdown) {
                item.style.display = 'none';
            }
        });
        
        // Toggle current dropdown
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
        }
    });
});

// Close dropdowns when clicking on a menu item
document.querySelectorAll('.panel-dropdown-menu a').forEach(item => {
    item.addEventListener('click', () => {
        item.closest('.panel-dropdown-menu').style.display = 'none';
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
            // Add plus sign for the sales counter
            if (counter.getAttribute('data-target') === '5000') {
                counter.innerText = '+' + target;
            }
            // Add percentage for satisfaction counter
            if (counter.getAttribute('data-target') === '95') {
                counter.innerText = target + '%';
            }
        }
    });
}

// Start animation when counters are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.counters').style.opacity = '1';
observer.observe(document.querySelector('.counters'));