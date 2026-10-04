/**
 * Lógica del Portafolio - Cristofer Luciano
 * Patrón moderno ES6+ con Intersection Observer y gestión de menú móvil.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mensaje de bienvenida en consola (Toque profesional de desarrollo)
    console.log(
        "%c¡Hola, reclutador o colega dev! 👋 Bienvenido al portafolio de Cristofer Luciano.",
        "color: #38bdf8; font-size: 14px; font-weight: bold; background: #1e293b; padding: 6px 10px; border-radius: 4px;"
    );

    // 2. Funcionalidad de menú hamburguesa móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            // Alternar icono de barras a equis
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar el menú automáticamente al hacer clic en cualquier enlace
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Sincronización automática del año en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Animación de aparición fluida al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });
});