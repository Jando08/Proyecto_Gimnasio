document.addEventListener('DOMContentLoaded', () => {
    // Elementos del Menú Móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Elementos del Modal de Inicio de Sesión
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn'); // Botón en versión de escritorio
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); // Botón en versión móvil
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Elementos del Modal de Registro
    const registerModal = document.getElementById('registerModal');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const closeRegisterModalBtn = document.getElementById('closeRegisterModalBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const heroRegisterBtn = document.getElementById('heroRegisterBtn'); // Botón principal (Hero)

    // Elementos del Formulario
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');

    // Función para alternar la visibilidad del menú móvil
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
    }

    // Configuración de eventos para el menú móvil
    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);

        // Cierra el menú móvil al hacer clic en un enlace de navegación
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Función para abrir el modal de inicio de sesión
    function openModal(e) {
        if(e) e.preventDefault();
        loginModal.classList.add('active');
        resetErrors(); // Reinicia los mensajes de error al abrir el modal
    }

    // Función para cerrar el modal de inicio de sesión
    function closeModal() {
        loginModal.classList.remove('active');
    }

    // Configuración de eventos para el modal de inicio de sesión
    if (openLoginBtn && closeModalBtn && loginModal) {
        openLoginBtn.addEventListener('click', openModal);
        if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', openModal);
        
        closeModalBtn.addEventListener('click', closeModal);

        // Cierra el modal si se hace clic en el fondo oscuro (fuera del contenido)
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // --- Lógica del Modal de Registro ---
    // Función para abrir el modal de registro
    function openRegisterModal(e) {
        if(e) e.preventDefault();
        closeModal(); // Cierra el modal de inicio de sesión si estuviera abierto
        registerModal.classList.add('active');
    }

    // Función para cerrar el modal de registro
    function closeRegisterModal() {
        registerModal.classList.remove('active');
    }

    // Configuración de eventos para el modal de registro
    if(openRegisterBtn && closeRegisterModalBtn && registerModal) {
        openRegisterBtn.addEventListener('click', openRegisterModal);
        closeRegisterModalBtn.addEventListener('click', closeRegisterModal);
        
        // Cierra el modal de registro si se hace clic en el fondo oscuro
        registerModal.addEventListener('click', (e) => {
            if (e.target === registerModal) {
                closeRegisterModal();
            }
        });

        // Botón para volver al inicio de sesión desde el formulario de registro
        if(backToLoginBtn) {
            backToLoginBtn.addEventListener('click', (e) => {
                if(e) e.preventDefault();
                closeRegisterModal();
                openModal();
            });
        }
        
        // Permite abrir el registro desde el botón de la sección principal (hero)
        if(heroRegisterBtn) {
            heroRegisterBtn.addEventListener('click', openRegisterModal);
        }
    }

    // Función para reiniciar (ocultar) los mensajes de error del formulario
    function resetErrors() {
        userError.style.display = 'none';
        passError.style.display = 'none';
        usernameInput.style.borderColor = 'rgba(255,255,255,0.1)';
        passwordInput.style.borderColor = 'rgba(255,255,255,0.1)';
    }

    // Validación del formulario de inicio de sesión antes de enviarlo
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            let isValid = true;
            resetErrors();

            // Muestra error si el campo de usuario está vacío
            if (usernameInput.value.trim() === '') {
                userError.style.display = 'block';
                usernameInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            }

            // Muestra error si el campo de contraseña está vacío
            if (passwordInput.value.trim() === '') {
                passError.style.display = 'block';
                passwordInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            }

            // Evita que el formulario se envíe si hay errores de validación
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Configura el desplazamiento suave (smooth scroll) para todos los enlaces internos (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Configuración del IntersectionObserver para animaciones al hacer scroll hacia abajo
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Cuando un elemento entra en el área visible de la pantalla...
    if (entry.isIntersecting) {
      // ... se le añade la clase 'visible' para activar su animación CSS
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 }); // threshold define qué porcentaje del elemento debe verse (12%)

// Aplica este observador a todos los elementos HTML que tengan la clase 'fade-up'
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));