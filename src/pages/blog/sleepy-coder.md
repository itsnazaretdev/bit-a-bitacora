---
layout: ../../layouts/PostLayout.astro
title: "Sleepy Coder: cuando un proyecto se convierte en otro"
date: 2026-10-27
tag: proyecto
description: "Quería hacer una extensión para entender proyectos y acabé con un asistente de código local. Y lo que aprendí cuando la IA no hacía lo que yo esperaba."
---

## De dónde salió

Hace unos meses empecé **Codemapper**, lo que habría sido mi segunda extensión en VS Code, para visualizar en un diagrama cómo se relacionan las clases de un proyecto, en aquel entonces estaba a tope con Java haciendo mi primera aplicación de escritorio 'Mi biblioteca', me llamaba mucho la atención la cantidad de clases que podía tener un proyecto y pensé en cómo ver visualmente esas conexiones para coger al vuelo cómo era por dentro. La idea me gustaba, pero pronto me di cuenta de que una extensión me limitaba mucho: la interfaz tiene que encajar dentro del editor y no podía hacer gran cosa a nivel visual, que es de lo que más me divierte.

Entonces llegó el tercer reto del Hacktoberfest 2026 y empecé otro proyecto. Sin buscarlo, acabó siendo lo que yo quería con codemapper, pero en una web propia donde podía diseñar la interfaz como quisiera. Así nació **Sleepy Coder**.

![Proceso de creación de Sleepy Coder](/img/sleepy.png)


## Qué es

Sleepy Coder es un asistente de código que funciona **en local**. Le das la carpeta de un proyecto y:

1. **Lo analiza**: detecta el lenguaje, el stack y si usa Git.
2. **Busca tareas** de dos formas:
   - Con **reglas**: TODOs pendientes, falta de README o LICENSE, imágenes sin `alt`, más de un `<h1>`, páginas sin `<title>` o meta description, enlaces vacíos, `target="_blank"` inseguro, `console.log` olvidados...
   - Con **IA**: Gemma 3 (4B), un modelo pequeño que corre en mi ordenador con Ollama, propone ideas de mejora.
3. **Te explica cómo arreglar cada tarea**: en qué archivo y línea está el problema y qué código podrías poner.

El frontend está hecho con Astro, el backend con Fastify y los datos se guardan en SQLite. Nada sale de tu equipo.

## Lo que cambió por el camino

Mi idea inicial abarcaba más: un **agente** que arreglara las tareas él solo, en una rama aparte, y comprobara que todo seguía funcionando.

Lo construí, y la parte de seguridad funcionaba bien. El problema era el modelo: al editar, Gemma reformateaba el archivo en vez de arreglarlo, borraba contenido o se inventaba el texto que tenía que buscar. Un modelo de 4B no da para tanto.

Así que cambié el enfoque:

- **La IA guía y yo aplico.** Las reglas localizan el problema exacto, Gemma explica cómo arreglarlo, yo hago el cambio y con un botón de *Check again* la regla vuelve a comprobar si está resuelto.
- El agente automático se quedó como **función experimental**, escondida.

## Lo que aprendí

Lo probé con mis propios proyectos (mi galería de fondos CSS, mi portfolio, e incluso Sleepy Coder) y ahí vi la diferencia:

- **Las reglas son fiables.** Si dicen que una imagen no tiene `alt`, es verdad. Aun así, encontré un falso positivo: detectaba `console.log` dentro de comentarios de documentación.
- **La IA da ideas, no verdades.** Gemma me sugirió arreglar unas meta descriptions vacías en un proyecto donde no estaban vacías. Por eso en la app todas las tareas de IA llevan la etiqueta *"AI idea · verify it"*.

La lección que saco de este proyecto es que la IA es un gran apoyo que tenemos los desarrolladores, pero al final, sigue siendo muy necesaria la crítica y decisión humana para guiarla.

Y también que está bien que un proyecto cambie. Empecé con una idea, terminé con otra, y la segunda es mejor.

Puedes ojear el repo del proyecto aquí: [GitHub](https://github.com/itsnazaretdev/sleepy-coder)