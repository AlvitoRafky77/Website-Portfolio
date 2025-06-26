// =============================================
// Mobile Menu Toggle
// =============================================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// =============================================
// Active Nav Link on Scroll & Sticky Header
// =============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');

window.onscroll = () => {
    // Sticky Header
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    // Active link on scroll
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        };
    });

    // Close mobile menu when scrolling
    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

// =============================================
// Counter Animation on Scroll
// =============================================
const counterSection = document.querySelector('.counter-section');
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const startCounters = () => {
    if (hasAnimated) return;

    counters.forEach(counter => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');
        
        // Atur kecepatan berdasarkan nilai target agar durasi seragam
        const duration = 2000; // 2 detik
        const increment = target / (duration / 10);

        const updateCounter = () => {
            const c = +counter.innerText;
            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target; // Pastikan nilai akhir tepat
            }
        };
        updateCounter();
    });
    hasAnimated = true;
};

// Gunakan Intersection Observer untuk memicu animasi saat terlihat
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target); // Berhenti mengamati setelah animasi dimulai
        }
    });
}, {
    threshold: 0.5 // Mulai animasi saat 50% section terlihat
});

if (counterSection) {
    observer.observe(counterSection);
} 