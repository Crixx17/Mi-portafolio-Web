# Mi-portafolio-Web

Portafolio personal de **Cristofer Luciano**, estudiante de Ingeniería en Sistemas y desarrollador web. Sitio estático de una sola página, sin frameworks ni dependencias de compilación.

## Vista previa

Incluye hero con foto de perfil y estado, secciones de sobre mí, experiencia, proyectos, habilidades y contacto, además de menú móvil accesible, barra de progreso de lectura, animaciones al hacer scroll y botón para volver arriba.

## Estructura

```
.
├── index.html          Estructura semántica y metadatos (SEO / Open Graph)
├── style.css           Sistema de diseño, componentes y responsive
├── app.js              Menú, año dinámico, progreso, reveals y navegación activa
├── favicon.svg         Icono del sitio
├── Foto_de_perfil.jpeg Foto original (960 × 1280)
└── avatar-300.jpg      Avatar optimizado y recortado (300 × 300) usado en la web
```

## Cómo verlo

Opción más simple: abre `index.html` en el navegador.

Si prefieres servirlo por HTTP (recomendado):

```bash
# Con Node.js
npx serve .

# O con Python
python -m http.server 8000
```

Luego visita `http://localhost:3000` (serve) o `http://localhost:8000` (Python).

## Personalización

- **Datos personales:** textos, enlaces y contacto están en `index.html`.
- **Colores y medidas:** variables en `:root` al inicio de `style.css`.
- **Animaciones:** se desactivan automáticamente con `prefers-reduced-motion`.
- **Metadatos sociales:** actualiza `og:url` y `og:image` en `index.html` con tu dominio real.

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub.
2. En *Settings → Pages*, selecciona **Deploy from a branch** → `main` → `/ (root)`.
3. El sitio quedará en `https://<usuario>.github.io/<repositorio>/`.

## Buenas prácticas aplicadas

- HTML5 semántico, `lang="es"`, encabezados jerárquicos y enlace *skip*.
- `target="_blank"` siempre acompañado de `rel="noopener noreferrer"`.
- Menú con `aria-expanded`, `aria-controls`, cierre con `Escape` y clic fuera.
- Soporte para movimiento reducido y detección de `IntersectionObserver`.
- Favicon, `meta description`, Open Graph, Twitter Cards y `preconnect`.
- Imagen optimizada con `width`/`height` para evitar saltos de layout.
- Contacto accionable mediante `mailto:` y `tel:`.
