// Elementos del DOM
const menuToggle = document.getElementById('menu-toggle');
const closeMenuButton = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.menu-link');
const backToTopButton = document.getElementById('back-to-top');
const header = document.getElementById('header');
const iconsContainer = document.getElementById('icons-container');
const showMoreButton = document.getElementById('show-more-btn');
const quickLinksToggle = document.getElementById('toggleQuickLinks');
const quickLinksNav = document.getElementById('quickLinksNav');
const quickLinksIcon = document.getElementById('quickLinksIcon');

// Estados
let isQuickLinksExpanded = false;

// Función para abrir el menú
function openMenu() {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    overlay.classList.add('opacity-100');
    document.body.style.overflow = "hidden"; // Desactiva el scroll
}

// Función para cerrar el menú
function closeMenu() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    overlay.classList.remove('opacity-100');
    document.body.style.overflow = ""; // Reactiva el scroll
}

// Eventos para abrir y cerrar el menú
menuToggle.addEventListener('click', openMenu);
closeMenuButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Cerrar el menú al hacer clic en un enlace (solo en móviles)
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            closeMenu();
        }
    });
});

// ScrollReveal para animaciones
document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().reveal('.fade-in', {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        interval: 200
    });
});

// Botón "Volver al inicio"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header dinámico
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.classList.add('header-hidden'); // Scroll hacia abajo
    } else {
        header.classList.remove('header-hidden'); // Scroll hacia arriba
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evitar valores negativos
});

// Comportamiento de "Ver más" en íconos
showMoreButton.addEventListener('click', () => {
    const hiddenIcons = Array.from(iconsContainer.children).slice(4);

    if (hiddenIcons[0].classList.contains('opacity-0')) {
        hiddenIcons.forEach(icon => {
            icon.classList.remove('opacity-0', 'max-h-0');
            icon.classList.add('opacity-100', 'max-h-[10rem]');
        });
        showMoreButton.textContent = 'Ver menos';
    } else {
        hiddenIcons.forEach(icon => {
            icon.classList.remove('opacity-100', 'max-h-[10rem]');
            icon.classList.add('opacity-0', 'max-h-0');
        });
        showMoreButton.textContent = 'Ver más';
    }
});

// Swiper para el carrusel de proyectos
const swiper = new Swiper('.projects-carousel', {
    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 3000, // Tiempo en milisegundos entre slides (3 segundos)
        disableOnInteraction: false, // Permite que el autoplay continúe después de interacciones del usuario
    },
});

// Efecto de escritura en el texto de bienvenida
const text = "¡Bienvenido a mi portafolio! 🚀";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById('typed-text').textContent += text[index];
        index++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(() => {
            document.getElementById('page-transition').style.transition = "transform 1s ease-in-out";
            document.getElementById('page-transition').style.transform = "scaleX(1)";
            setTimeout(() => {
                document.getElementById('welcome-screen').style.display = "none";
                document.getElementById('page-transition').style.transform = "scaleX(0)";
            }, 1000);
        }, 1000);
    }
}

// Animación de partículas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Iniciar animaciones
window.onload = () => {
    initParticles();
    animateParticles();
    setTimeout(typeEffect, 1000);
};

// Comportamiento de "Enlaces rápidos"
quickLinksToggle.addEventListener('click', () => {
    if (isQuickLinksExpanded) {
        quickLinksNav.style.maxHeight = '0';
        quickLinksIcon.classList.remove('fa-chevron-up');
        quickLinksIcon.classList.add('fa-chevron-down');
    } else {
        quickLinksNav.style.maxHeight = quickLinksNav.scrollHeight + 'px';
        quickLinksIcon.classList.remove('fa-chevron-down');
        quickLinksIcon.classList.add('fa-chevron-up');
    }
    isQuickLinksExpanded = !isQuickLinksExpanded;
});