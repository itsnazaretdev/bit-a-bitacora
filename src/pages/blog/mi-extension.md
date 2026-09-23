---
layout: ../../layouts/PostLayout.astro
title: "Mi primera extensión para VS Code: Contrast Checker"
date: 2026-09-23
tag: accesibilidad
description : "Cómo pasé de una lluvia de ideas con la IA a crear mi primera extensión de VS Code."
---

Es la primera vez que creo una extensión para VS Code, y quiero contar cómo surgió y cómo funciona por dentro.

![Proceso de creación de la extensión](/img/extension.png)

### De dónde salió la idea

No empecé queriendo hacer una extensión. Quería crear una herramienta que nos ayudara a los programadores a hacer alguna tarea de forma más sencilla. Haciendo una lluvia de ideas con la IA, una me llamó mucho la atención, además de tener un gran peso en la tecnología: **la accesibilidad**.

Ahí me hizo clic. ¿Cuántas veces me había pasado un buen rato intentando que los colores encajaran en pantalla? Sobre todo el contraste, que tiene que ser el necesario pensando en las personas con problemas de visión. Porque si a mí a veces me cuesta diferenciar las letras, ¿cómo será para ellos?

### De web a extensión

Primero pensé en hacerla web, que es lo que mejor manejo ahora mismo. Pero iba a estar saltando entre el programa y la web, y yo quería algo lo más cómodo posible. Entonces se me encendió la bombilla: ¿y por qué no algo que pueda usar en el mismo editor, sin salir de ahí?

Y llegó la siguiente pregunta: **¿cómo se hace una extensión?** Me puse a investigar y a apoyarme en la IA. Era algo totalmente nuevo, pero con muchas ganas de hacerlo realidad.

Así que, ¿qué hace? Es una extensión que verifica, en el propio editor, que dos colores pasen los 4 niveles de WCAG, la guía de accesibilidad para el contenido web. Seleccionas dos colores, haces clic derecho en "Check Accessibility Contrast" y el resultado aparece en el panel Output. De momento acepta hex, rgb y hsl.

Así se ve el resultado (comparando `#767676` con `#ffffff`):

```
=========================================
📊 CONTRAST REPORT: #767676 vs #ffffff
=========================================
Ratio: 4.54:1

[🎉 PASS] AA Normal Text (Needs 4.5:1)
[❌ FAIL] AAA Normal Text (Needs 7.0:1)
[🎉 PASS] AA Large Text (Needs 3.0:1)
[🎉 PASS] AAA Large Text (Needs 4.5:1)
=========================================
```

## Cómo funciona por dentro

Lo primero es seleccionar dos colores. La primera vez que usas el comando con clic derecho, VS Code despierta la extensión con `activate`, que deja el comando preparado. Ese comando es el que va llamando a las demás funciones:

1. **`extractColors`** saca los colores de lo que seleccionaste.
2. **`parseColorToRGB`** los traduce a rojo, verde y azul. Pueden venir en formatos distintos, incluso puedes comparar un hex con un hsl, así que hay que normalizarlos a un "mismo idioma".
3. **`calculateLuminance`** mide la luz de cada color con un número entre 0 y 1. Nuestros ojos no perciben igual de brillante un verde que un azul, y esta función lo tiene en cuenta.
4. **`calculateContrastRatio`** compara los dos números y calcula cuánto más claro es un color que otro. Va de 1 (son iguales) a 21 (el máximo, negro sobre blanco).
5. Por último, el comando muestra los 4 casos en el panel Output con **PASS** o **FAIL**.

#### Por curiosidad: la anatomía de una extensión

Funciona con dos piezas:

- **`package.json`**, la ficha de la extensión: dice qué es y qué aparece en el menú del clic derecho.
- **`extension.js`**, que hace todo lo que he contado arriba.

Se conectan mediante `contrast-checker.calculateContrast`, que hace de puente: uno lo pone en el menú y el otro sabe qué hacer cuando lo pulsas.

### Y ahora, ¿qué?

De momento no entiende variables CSS ni clases de Tailwind, sería un gran reto futuro, esos son los siguientes pasos que tengo en mente. El código está en [GitHub](https://github.com/itsnazaretdev/contrastExtension).

Me ha sorprendido lo poco que necesita una extensión para funcionar, en el sentido de la palabra "poco", me refiero a pocos archivos. Estamos acostumbrados a hacer proyectos con muchas carpetas y muchos archivos, por ejemplo, **Astro**, que es lo que conozco ahora mismo. Si comparamos en lo esencial, la extensión solo necesita dos archivos para funcionar, mientras que Astro necesita algunos más: layouts, páginas, componentes, configuración...
 
También me ha sorprendido poder añadir al menú del clic derecho lo que necesites para arrancar la extensión, esa pequeña modificación de interfaz.
 
Y he aprendido el proceso interno de esta extensión en concreto: la normalización de formatos. El concepto de normalización solo lo había tocado en BBDD, y aquí tiene otro color totalmente distinto, pero me resulta increíble, porque de nada sirve poner a hablar a una persona española y a un alemán si no existe un idioma común, como puede ser el inglés. Ahí entonces sí se entenderán.