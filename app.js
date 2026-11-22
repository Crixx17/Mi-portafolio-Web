/**
 * Lógica del Portafolio — Cristofer Luciano
 * ES6+ · Menú accesible · Progreso de scroll · Reveals con detección de soporte
 */

(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sectionsToTrack = ['about', 'experience', 'projects', 'skills', 'contact'];

    document.addEventListener('DOMContentLoaded', () => {
        // El fallback del <head> se cancela cuando este script se ejecuta correctamente.
        clearTimeout(window.__revealFallback);

        console.log(
            '%c¡Hola, reclutador o colega dev! 👋 Bienvenido al portafolio de Cristofer Luciano.',
            'color: #38bdf8; font-size: 14px; font-weight: bold; background: #1e293b; padding: 6px 10px; border-radius: 4px;'
        );

        const header = document.getElementById('site-header');
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = Array.from(document.querySelectorAll('#nav-menu a'));
        const backToTop = document.getElementById('back-to-top');
        const progressBar = document.getElementById('scroll-progress');

        /* ---------- 1. Menú móvil accesible ---------- */
        const setMenu = (open) => {
            if (!menuToggle || !navMenu) return;

            navMenu.classList.toggle('is-open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
            menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');

            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !open);
                icon.classList.toggle('fa-xmark', open);
            }
        };

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const willOpen = !navMenu.classList.contains('is-open');
                setMenu(willOpen);
                // Al abrir, llevamos el foco al primer enlace para navegar con teclado.
                if (willOpen && navLinks.length) navLinks[0].focus();
            });

            // Cerrar al elegir un enlace
            navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

            // Cerrar con Escape y devolver el foco al botón
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
                    setMenu(false);
                    menuToggle.focus();
                }
            });

            // Cerrar al hacer clic fuera
            document.addEventListener('click', (event) => {
                if (!navMenu.classList.contains('is-open')) return;
                if (navMenu.contains(event.target) || menuToggle.contains(event.target)) return;
                setMenu(false);
            });

            // Cerrar al volver a escritorio (evita estado "abierto" oculto)
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) setMenu(false);
            });
        }

        /* ---------- 2. Año del footer ---------- */
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        /* ---------- 3. Estado de scroll (barra de progreso, header, botón) ---------- */
        let scrollTicking = false;

        const updateScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const percent = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0;

            if (progressBar) progressBar.style.width = `${percent}%`;
            if (header) header.classList.toggle('is-scrolled', scrollTop > 20);
            if (backToTop) backToTop.classList.toggle('is-visible', scrollTop > 600);

            scrollTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(updateScroll);
        }, { passive: true });

        window.addEventListener('resize', updateScroll);
        updateScroll();

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: reduceMotion.matches ? 'auto' : 'smooth'
                });
            });
        }

        /* ---------- 4. Animación de aparición (con fallback) ---------- */
        const animatedElements = Array.from(document.querySelectorAll('.reveal'));

        if ('IntersectionObserver' in window && !reduceMotion.matches && animatedElements.length) {
            animatedElements.forEach((element, index) => {
                element.style.setProperty('--delay', `${(index % 6) * 70}ms`);
            });

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            animatedElements.forEach((element) => revealObserver.observe(element));
        } else {
            // Sin soporte o con movimiento reducido: mostramos todo de inmediato.
            document.documentElement.classList.remove('js');
        }

        /* ---------- 5. Enlace activo del menú según la sección visible ---------- */
        if ('IntersectionObserver' in window && navLinks.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((link) => {
                        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                        link.classList.toggle('is-active', isActive);
                        if (isActive) {
                            link.setAttribute('aria-current', 'location');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

            sectionsToTrack.forEach((id) => {
                const section = document.getElementById(id);
                if (section) sectionObserver.observe(section);
            });
        }
    });
})();
