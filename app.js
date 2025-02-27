    // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenuButton = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

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

    // Cerrar el menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) { // Solo en móviles
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
  const backToTopButton = document.getElementById('back-to-top');

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
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
          // Scroll hacia abajo
          header.classList.add('header-hidden');
      } else {
          // Scroll hacia arriba
          header.classList.remove('header-hidden');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para evitar valores negativos
  });


   // JavaScript para manejar el comportamiento de "Ver más"
   const iconsContainer = document.getElementById('icons-container');
   const showMoreButton = document.getElementById('show-more-btn');

   // Agregar evento al botón
   showMoreButton.addEventListener('click', () => {
       // Obtener todos los íconos ocultos
       const hiddenIcons = Array.from(iconsContainer.children).slice(4);

       if (hiddenIcons[0].classList.contains('opacity-0')) {
           // Mostrar los íconos ocultos con transición
           hiddenIcons.forEach(icon => {
               icon.classList.remove('opacity-0', 'max-h-0');
               icon.classList.add('opacity-100', 'max-h-[10rem]');
           });

           // Cambiar el texto del botón a "Ver menos"
           showMoreButton.textContent = 'Ver menos';
       } else {
           // Ocultar los íconos adicionales nuevamente con transición
           hiddenIcons.forEach(icon => {
               icon.classList.remove('opacity-100', 'max-h-[10rem]');
               icon.classList.add('opacity-0', 'max-h-0');
           });

           // Cambiar el texto del botón a "Ver más"
           showMoreButton.textContent = 'Ver más';
       }
   });

   const swiper = new Swiper('.projects-carousel', {
    // Responsive breakpoints
    breakpoints: {
        // Móviles (0px y más)
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // Tablets (640px y más)
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // Escritorios (1024px y más)
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    // Paginación
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // Navegación
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Efecto de deslizamiento
    loop: true,
    grabCursor: true,
});

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

// Crear partículas
function initParticles() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

// Animar partículas
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Redimensionar canvas
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
