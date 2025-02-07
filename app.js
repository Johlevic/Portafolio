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