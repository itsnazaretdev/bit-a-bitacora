# cuaderno — blog de reflexiones

Blog hecho con Astro para ir escribiendo pequeñas reflexiones sobre lo que
vas aprendiendo en programación. Cada entrada es un archivo Markdown normal
y corriente: no hay TypeScript ni configuración extra de por medio.

## Poner en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Escribir una entrada nueva

Crea un archivo `.md` dentro de `src/pages/blog/`, por ejemplo
`src/pages/blog/mi-nueva-entrada.md`, con esta cabecera:

```md
---
layout: ../../layouts/PostLayout.astro
title: "Título de la entrada"
date: 2026-08-27
tag: java   # java | web | bbdd | reflexion | general
description: "Una frase corta para la vista previa (opcional)"
---

Aquí el contenido en Markdown normal: párrafos, listas, bloques de código...
```

La línea `layout: ../../layouts/PostLayout.astro` es la clave: le dice a Astro
que envuelva este Markdown con esa plantilla, que es la que pone el título, la
fecha y la etiqueta de color arriba del todo. Sin esa línea, el archivo se
vería como Markdown "en crudo", sin estilos.

El campo `tag` decide el color de la "washi tape" de la tarjeta en el índice.
Si quieres añadir una categoría nueva, solo tienes que:
1. Escribir el nombre que quieras en `tag:` (no hay lista cerrada de opciones).
2. Añadir su color en `src/styles/global.css` (busca las clases `.tag-*` y
   copia el patrón de una que ya exista).

Si quieres dejar una entrada a medias sin publicarla, añade `draft: true` en
la cabecera; no aparecerá en el índice hasta que lo quites.

## Cómo aparece una entrada en el índice

`src/pages/index.astro` usa `Astro.glob('./blog/*.md')`, que simplemente le
pide a Astro "dame todos los archivos .md de esta carpeta". Con eso en un
array normal, se ordenan por fecha y se pintan como tarjetas.

## Estructura

```
src/
  layouts/
    Layout.astro     -> esqueleto HTML general (head, fuentes, footer)
    PostLayout.astro -> plantilla de una entrada individual
  pages/
    index.astro       -> listado de entradas (lee todo lo que hay en blog/)
    blog/*.md          -> tus entradas, una por archivo
  styles/
    global.css        -> toda la paleta de color y estilos
```

## Desplegar

`npm run build` genera el sitio estático en `dist/`. Puedes subirlo a
Netlify, Vercel o GitHub Pages igual que hiciste (o harás) con el portfolio.
Recuerda actualizar `site` en `astro.config.mjs` con tu dominio real.
