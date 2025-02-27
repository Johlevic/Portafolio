// Constantes y elementos del DOM
const DOM = {
    menuToggle: document.getElementById('menu-toggle'),
    closeMenuButton: document.getElementById('close-menu'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('overlay'),
    menuLinks: document.querySelectorAll('.menu-link'),
    backToTopButton: document.getElementById('back-to-top'),
    header: document.getElementById('header'),
    iconsContainer: document.getElementById('icons-container'),
    showMoreButton: document.getElementById('show-more-btn'),
    typedText: document.getElementById('typed-text'),
    pageTransition: document.getElementById('page-transition'),
    welcomeScreen: document.getElementById('welcome-screen'),
    particlesCanvas: document.getElementById('particles')
};

// Configuración de Swiper
const swiperConfig = {
    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    loop: true,
    grabCursor: true
};

// Inicialización de Swiper
const swiper = new Swiper('.projects-carousel', swiperConfig);

// Funciones del menú
function openMenu() {
    DOM.sidebar.classList.remove('-translate-x-full');
    DOM.overlay.classList.remove('hidden');
    DOM.overlay.classList.add('opacity-100');
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    DOM.sidebar.classList.add('-translate-x-full');
    DOM.overlay.classList.add('hidden');
    DOM.overlay.classList.remove('opacity-100');
    document.body.style.overflow = "";
}

// Eventos del menú
DOM.menuToggle.addEventListener('click', openMenu);
DOM.closeMenuButton.addEventListener('click', closeMenu);
DOM.overlay.addEventListener('click', closeMenu);

DOM.menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) closeMenu();
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
    DOM.backToTopButton.classList.toggle('active', window.scrollY > 300);
});

DOM.backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Header dinámico
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    DOM.header.classList.toggle('header-hidden', scrollTop > lastScrollTop);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Comportamiento de "Ver más"
DOM.showMoreButton.addEventListener('click', () => {
    const hiddenIcons = Array.from(DOM.iconsContainer.children).slice(4);
    const isHidden = hiddenIcons[0].classList.contains('opacity-0');

    hiddenIcons.forEach(icon => {
        icon.classList.toggle('opacity-0', !isHidden);
        icon.classList.toggle('max-h-0', !isHidden);
        icon.classList.toggle('opacity-100', isHidden);
        icon.classList.toggle('max-h-[10rem]', isHidden);
    });

    DOM.showMoreButton.textContent = isHidden ? 'Ver menos' : 'Ver más';
});

// Efecto de escritura
function typeEffect(text, element, speed = 80) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                DOM.pageTransition.style.transition = "transform 1s ease-in-out";
                DOM.pageTransition.style.transform = "scaleX(1)";
                setTimeout(() => {
                    DOM.welcomeScreen.style.display = "none";
                    DOM.pageTransition.style.transform = "scaleX(0)";
                }, 1000);
            }, 1000);
        }
    }
    type();
}

// Animación de partículas
class Particle {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles(canvas, particlesArray) {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle(canvas));
    }
}

function animateParticles(canvas, ctx, particlesArray) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update(canvas);
        p.draw(ctx);
    });
    requestAnimationFrame(() => animateParticles(canvas, ctx, particlesArray));
}

// Inicialización
window.onload = () => {
    const particlesArray = [];
    const ctx = DOM.particlesCanvas.getContext('2d');
    DOM.particlesCanvas.width = window.innerWidth;
    DOM.particlesCanvas.height = window.innerHeight;

    initParticles(DOM.particlesCanvas, particlesArray);
    animateParticles(DOM.particlesCanvas, ctx, particlesArray);
    typeEffect("¡Bienvenido a mi portafolio! 🚀", DOM.typedText);

    window.addEventListener("resize", () => {
        DOM.particlesCanvas.width = window.innerWidth;
        DOM.particlesCanvas.height = window.innerHeight;
    });
};