  // Menú en móvil: Mostrar y ocultar
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenuButton = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');

  menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
  });

  closeMenuButton.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
  });

  // Cerrar el menú lateral al hacer clic en una opción (solo en móviles)
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth < 768) { // Solo en dispositivos móviles
              sidebar.classList.add('-translate-x-full');
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