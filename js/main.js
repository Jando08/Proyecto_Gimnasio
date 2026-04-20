document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Modal Elements
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn'); // Desktop
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); // Mobile
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Register Modal Elements
    const registerModal = document.getElementById('registerModal');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const closeRegisterModalBtn = document.getElementById('closeRegisterModalBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const heroRegisterBtn = document.getElementById('heroRegisterBtn'); // Hero button

    // Form Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');

    // --- Mobile Menu Logic ---
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
    }

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Login Modal Logic ---
    function openModal(e) {
        if(e) e.preventDefault();
        loginModal.classList.add('active');
        // Reset form errors on open
        resetErrors();
    }

    function closeModal() {
        loginModal.classList.remove('active');
    }

    if (openLoginBtn && closeModalBtn && loginModal) {
        openLoginBtn.addEventListener('click', openModal);
        if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', openModal);
        
        closeModalBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside of it
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // --- Register Modal Logic ---
    function openRegisterModal(e) {
        if(e) e.preventDefault();
        closeModal(); // Close login modal if open
        registerModal.classList.add('active');
    }

    function closeRegisterModal() {
        registerModal.classList.remove('active');
    }

    if(openRegisterBtn && closeRegisterModalBtn && registerModal) {
        openRegisterBtn.addEventListener('click', openRegisterModal);
        closeRegisterModalBtn.addEventListener('click', closeRegisterModal);
        
        // Close modal when clicking outside of it
        registerModal.addEventListener('click', (e) => {
            if (e.target === registerModal) {
                closeRegisterModal();
            }
        });

        // Switch back to Login Modal
        if(backToLoginBtn) {
            backToLoginBtn.addEventListener('click', (e) => {
                if(e) e.preventDefault();
                closeRegisterModal();
                openModal();
            });
        }
        
        // Hero button triggers register directly
        if(heroRegisterBtn) {
            heroRegisterBtn.addEventListener('click', openRegisterModal);
        }
    }

    // --- Form Validation Logic ---
    function resetErrors() {
        userError.style.display = 'none';
        passError.style.display = 'none';
        usernameInput.style.borderColor = 'rgba(255,255,255,0.1)';
        passwordInput.style.borderColor = 'rgba(255,255,255,0.1)';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            let isValid = true;
            resetErrors();

            // Validate Username
            if (usernameInput.value.trim() === '') {
                userError.style.display = 'block';
                usernameInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            }

            // Validate Password
            if (passwordInput.value.trim() === '') {
                passError.style.display = 'block';
                passwordInput.style.borderColor = 'var(--error-color)';
                isValid = false;
            }

            // If not valid, prevent submission
            // Note: Since this is purely frontend for now and the user handles backend,
            // we will let it submit IF valid. The form logic targets '../php/login.php'
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Add smooth scrolling for desktop navbar links
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
