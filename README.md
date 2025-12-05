## Prueba Técnica para Desarrollador Front-End React

## Parte 1 tecnica:

## Características Implementadas

- **Configuración:** Proyecto inicializado con Vite y React + TypeScript.
- **Consumo de API:** Servicio tipado (`userService.ts`) para obtener usuarios de JSONPlaceholder.
- **Listado y Detalle:** Dos rutas separadas (`/` y `/users/:id`) para el listado y el detalle, utilizando `react-router`.
- **Búsqueda:** Filtrado por nombre en el Front-End.
- **Estilos:** Uso de Material UI (MUI) para un diseño profesional y responsive.
- **Seguridad:** Implementación de una función de sanitización (`sanitizeInput`) para el campo de búsqueda para prevenir ataques.
- **Paginación:** Se implementó paginación para mostrar 5 usuarios por página en el listado.

## Cómo Ejecutar el Proyecto Localmente

1.  **Clonar el repositorio:**
2.  **Instalar dependencias:**

```
npm install
```

3.  **Ejecutar el servidor de desarrollo:**

```
npm run dev
```

El proyecto estará disponible en `http://localhost:5173` (o el puerto que te indique Vite).

## Parte 2 Teorica

## 1. Angular y React:

¿Qué es React y cuál es su propósito principal en el desarrollo web?
R: React es una biblioteca de JavaScript de código abierto para construir interfaces de usuario (UI).

Su propósito principal es permitir a los desarrolladores crear interfaces de usuario interactivas y eficientes utilizando un enfoque basado en componentes. React se encarga de actualizar y renderizar eficientemente solo los componentes que han cambiado, gracias al concepto del Virtual DOM.

¿Qué es un componente en React y cómo se crea uno?
R: Una pieza de código independiente y reutilizable que encapsula UI y lógica. Se crea principalmente como una función de JavaScript que devuelve código JSX.

¿Cuál es la diferencia entre ngOnInit() y constructor() en Angular?
R: El constructor() es para inyección de dependencias (DI) e inicialización simple.

## 2. HTML5:

¿Cuáles son algunas de las nuevas características introducidas en HTML5?
R: Semántica: Nuevas etiquetas (<header>, <article>, <nav>). Multimedia: Etiquetas <audio> y <video> nativas. Almacenamiento: localStorage y sessionStorage. Gráficos: <canvas> y mejor soporte para SVG.

Describe la diferencia entre las etiquetas <div> y <span>.
R: <article> es para contenido independiente y autosuficiente (ej. un post de blog). <section> es para agrupación temática de contenido dentro de un documento o artículo.

¿Qué son los atributos data- en HTML5 y para qué se utilizan?
R: Atributos personalizados para almacenar datos privados directamente en el HTML. Se utilizan para vincular datos de la interfaz de usuario que serán manipulados por JavaScript.

## 3. CSS/Sass:

¿Qué es Sass y cuál es su ventaja sobre CSS convencional?
R: Es un preprocesador de CSS que se compila a CSS plano. Su ventaja es que añade características de programación (variables, anidamiento, mixins) que hacen el código más modular, mantenible y escalable.

Explica la diferencia entre @import y @use en Sass.
R: @import (obsoleto) vierte todo al ámbito global. @use (moderno) carga módulos una sola vez y los requiere acceder a través de un espacio de nombres (namespace) para evitar colisiones.

¿Qué es BEM y cómo puede mejorar la estructura y mantenimiento del código CSS?
R: BEM es una metodología de nomenclatura para hacer que las clases de CSS sean modulares y predecibles. Mejora la estructura porque indica inmediatamente la relación y el contexto en la UI.

## 4. JavaScript / TypeScript:

¿Cuál es la diferencia entre JavaScript y TypeScript?
R: JS es un lenguaje dinámico y débilmente tipado. TS es un superconjunto de JS que es estático y fuertemente tipado. TS compila a JS y permite la detección de errores en tiempo de compilación.

¿Qué son los tipos en TypeScript y cómo pueden mejorar el desarrollo de aplicaciones web?
R: Son anotaciones (: string, : number) que definen el tipo de datos esperado. Mejoran el desarrollo ofreciendo detección temprana de errores, mejor legibilidad y excelente autocompletado (IntelliSense) en el editor.

Explica cómo se declara una variable en JavaScript y en TypeScript.
R: JS: Se usan var, let, o const (ej. let nombre = "Roger";). TS: Se usa la misma sintaxis, pero se puede añadir una anotación de tipo (ej. let nombre: string = "Roger";).

## 5. Sistema de Gestión de Paquetes (npm):

¿Qué es npm y cuál es su función en el desarrollo de aplicaciones web?
R: NPM es el gestor de paquetes por defecto para el ecosistema de JavaScript. Su función es permitir la instalación, gestión y publicación de dependencias y librerías de código abierto en un proyecto.

Describe el proceso para instalar un paquete npm en un proyecto.
R: 1. Asegurarse de tener package.json. 2. Ejecutar npm install nombre-del-paquete. 3. El paquete se guarda en la carpeta node_modules/ y su referencia se añade a package.json.

## 6. Integración e Implementación de APIs y WebSocket :

Explica qué es una API y cómo se utiliza en el desarrollo web.
R: Es un conjunto de reglas que permite que el frontend y el backend se comuniquen. Se usa para que el cliente solicite o envíe datos al servidor (ej. APIs REST).

¿Qué es JSON y cuál es su relación con las APIs REST?
R:Es un formato de texto ligero para el intercambio de datos. Es el formato estándar que las APIs REST utilizan para enviar y recibir datos.

Describe el proceso para realizar una solicitud GET a una API REST utilizando JavaScript/TypeScript.
R: Se usa la API fetch para enviar una solicitud. Se maneja la Promise devuelta, se verifica la respuesta (response.ok), y se llama a response.json() para parsear los datos: fetch(url).then(res => res.json()).then(data => ...)

Descripbe como integrarias un WebSocket
R: 1. Crear una nueva instancia de new WebSocket(url_wss). 2. Usar el handler socket.onmessage para recibir y procesar los datos en tiempo real. 3. Usar socket.onopen y socket.send(data) para la comunicación.

## 7. Patrón MVC:

Define el patrón de diseño Modelo-Vista-Controlador (MVC) y explica sus componentes.
R: Patrón de diseño que separa la interfaz de usuario de la lógica de negocio. Modelo: Datos y lógica de negocio. Vista: Interfaz de usuario y presentación. Controlador: Intermediario que recibe la entrada de la Vista y coordina al Modelo.

¿Cuál es la ventaja de utilizar el patrón MVC en el desarrollo de aplicaciones web?
R: Separación de Preocupaciones que facilita la modularidad, la reutilización de código (especialmente del Modelo) y la mantenibilidad (los cambios en la UI no afectan la lógica).

## 8. Desarrollo de Pruebas Unitarias e Integración (Jasmine y Karma):

¿Qué son las pruebas unitarias y por qué son importantes en el desarrollo de software?
R: Pruebas que verifican el correcto funcionamiento de la unidad más pequeña de código de forma aislada (función o clase). Son importantes para la detección temprana de errores y para garantizar la seguridad durante la refactorización.

Explica la diferencia entre las pruebas unitarias y las pruebas de integración.
R: Unitarias: Prueban una sola unidad de código aislada (usando mocks para dependencias). Integración: Prueban cómo múltiples unidades o componentes interactúan y fluyen juntos.

Describe cómo se configura y ejecuta un conjunto de pruebas Jasmine utilizando Karma en un proyecto Angular.
R: Jasmine es el framework para escribir las pruebas (describe, it). Karma es el ejecutor que carga las pruebas en un navegador. Se configuran automáticamente con Angular CLI, y se ejecutan con el comando ng test.

¿Qué tan comodo te sentirias trabajando con Angular?
R: Motivado y con confianza. Aunque carezco de experiencia directa con Angular, mi conocimiento en TypeScript, componentes, patrones MVC y pruebas unitarias/integración proporciona una base sólida para adoptar el framework rápidamente.
