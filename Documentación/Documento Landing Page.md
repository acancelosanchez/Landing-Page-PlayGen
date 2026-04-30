# Documento técnico de la Landing Page Play Generation

## Índice

1. Introducción
2. Objetivos del proyecto
3. Público objetivo
4. Tecnologías utilizadas
5. Estructura general del proyecto
6. Diseño y experiencia de usuario
7. Funcionalidades implementadas
   1. Base de datos y back-end
   2. Ticker horizontal
   3. Contadores animados
   4. Sticky Stack Cards
   5. Menú desplegable responsive
   6. Hero visual animado
8. Accesibilidad y usabilidad
9. Seguridad y tratamiento de datos
10. Pruebas y validación
11. Posibles mejoras futuras
12. Conclusión

## 1. Introducción

El presente documento describe el desarrollo de una landing page para Play Generation, una empresa orientada a la organización de eventos gaming, esports y tecnología. La finalidad principal del proyecto es presentar la marca de forma atractiva, comunicar sus servicios y próximos eventos, y ofrecer una experiencia visual coherente con el sector del entretenimiento digital.

La página combina contenido informativo, recursos visuales dinámicos e interacciones desarrolladas con HTML, CSS, JavaScript y Node.js. Aunque se trata de una landing page, el proyecto incorpora funcionalidades propias de una aplicación web sencilla, como un sistema de registro e inicio de sesión conectado a un back-end local.

## 2. Objetivos del proyecto

El objetivo general del proyecto es crear una landing page moderna, responsive y funcional que represente la identidad de Play Generation y facilite la navegación del usuario por la información más relevante.

Los objetivos específicos son:

- Diseñar una interfaz visual llamativa y relacionada con el mundo gaming.
- Organizar la información en secciones claras: presentación, eventos, servicios, partners, contacto y footer.
- Implementar animaciones que mejoren la experiencia sin dificultar la lectura.
- Incorporar un menú responsive para facilitar el uso en distintos dispositivos.
- Añadir un back-end básico para registrar e identificar usuarios.
- Aplicar buenas prácticas de estructura, semántica y separación entre HTML, CSS y JavaScript.

## 3. Público objetivo

La landing page está dirigida principalmente a personas interesadas en videojuegos, esports, cultura digital y eventos tecnológicos. También está orientada a marcas colaboradoras, instituciones, patrocinadores y usuarios que buscan información sobre próximos eventos organizados por Play Generation.

El diseño utiliza una estética visual energética, con colores contrastados, tipografías de carácter tecnológico, animaciones y referencias al lenguaje visual de los videojuegos. Esta elección busca conectar con un público joven y digital, pero manteniendo una estructura clara para que también resulte útil a empresas o entidades colaboradoras.

## 4. Tecnologías utilizadas

Las tecnologías empleadas en el proyecto son:

- **HTML5**: define la estructura semántica de la página y sus secciones principales.
- **CSS3**: gestiona el diseño visual, la adaptación responsive, las animaciones y los efectos gráficos.
- **JavaScript**: controla las interacciones del usuario, las animaciones dinámicas, el menú desplegable, los contadores y la comunicación con el back-end.
- **Node.js**: permite ejecutar el servidor del proyecto.
- **Express**: framework utilizado para servir la página y crear las rutas del sistema de registro e inicio de sesión.
- **CORS**: dependencia utilizada para permitir peticiones HTTP entre cliente y servidor en el entorno local.
- **JSON**: formato utilizado como almacenamiento local de credenciales.

## 5. Estructura general del proyecto

El proyecto está organizado en varios archivos y carpetas principales:

- `index.html`: contiene la estructura principal de la landing page.
- `Style.css`: incluye los estilos visuales, animaciones, media queries y diseño responsive.
- `Animation.js`: gestiona la lógica de interacción y animaciones del lado del cliente.
- `server.js`: contiene el servidor Express y las rutas del back-end.
- `data/credentials.json`: archivo utilizado como base de datos local para guardar usuarios registrados.
- `Img/`: carpeta que almacena imágenes, logotipos y recursos visuales.
- `package.json`: define la configuración del proyecto, scripts y dependencias.

Esta separación permite mantener una organización clara entre contenido, presentación, comportamiento y servidor.

## 6. Diseño y experiencia de usuario

La landing page presenta una estética inspirada en el sector gaming y tecnológico. El diseño utiliza una combinación de colores oscuros, tonos neón, efectos de resplandor, tipografías llamativas y elementos animados. El objetivo es generar una primera impresión potente desde el hero y mantener el interés del usuario durante el recorrido por la página.

La experiencia de usuario se construye mediante una navegación por secciones, llamadas a la acción claras y bloques visuales diferenciados. Los botones principales permiten acceder a los próximos eventos, conocer la historia de la empresa o visitar páginas externas de contacto y experiencia Play.

La página también incorpora adaptación responsive, de forma que el contenido pueda visualizarse correctamente en pantallas de escritorio y dispositivos móviles. El menú desplegable facilita la navegación cuando el espacio horizontal es reducido.

## 7. Funcionalidades implementadas

En este apartado se describen las funcionalidades principales del proyecto, denominadas en el desarrollo como **misfuncionalidades**.

### 7.1. Base de datos y back-end

El proyecto cuenta con un back-end desarrollado con Node.js y Express. Su función principal es servir la landing page y gestionar un sistema básico de registro e inicio de sesión de usuarios.

El servidor se encuentra en el archivo `server.js`. En él se configuran las siguientes responsabilidades:

- Servir archivos estáticos del proyecto.
- Crear automáticamente la carpeta `data` si no existe.
- Crear el archivo `credentials.json` si todavía no está disponible.
- Leer y escribir usuarios registrados en formato JSON.
- Validar que el correo y la contraseña tengan un formato correcto.
- Registrar nuevos usuarios mediante la ruta `/api/register`.
- Validar credenciales existentes mediante la ruta `/api/login`.

La base de datos utilizada es un archivo JSON local llamado `credentials.json`. Cada usuario registrado se guarda con un identificador único, correo electrónico, contraseña cifrada mediante hash SHA-256 y fechas de creación y actualización.

Aunque no se emplea un sistema gestor de bases de datos completo, esta solución resulta adecuada para un proyecto académico porque permite demostrar la comunicación entre front-end y back-end, la persistencia de datos y la gestión básica de usuarios.

### 7.2. Ticker horizontal

El ticker horizontal es una cinta animada que muestra mensajes breves relacionados con la marca, sus eventos y colaboradores. Aparece después de la sección hero y funciona como un recurso visual para reforzar conceptos clave como gaming, esports, torneos, tecnología, partners y ciudades.

Su estructura se define en `index.html` mediante los elementos `.ticker-wrap`, `.ticker` y `.ticker-item`. La animación se implementa en `Style.css` mediante `@keyframes ticker`, desplazando horizontalmente el contenido en bucle.

Esta funcionalidad aporta dinamismo a la landing page y permite comunicar datos de forma rápida sin ocupar una sección completa. Además, al duplicar los elementos del ticker, se consigue una sensación de movimiento continuo.

### 7.3. Contadores animados

La sección "Quiénes somos" incluye varias estadísticas de la empresa, como el número de eventos organizados, años de experiencia, ciudades alcanzadas y marcas colaboradoras. Estas cifras se muestran mediante tarjetas estadísticas.

La funcionalidad de contadores animados se encuentra en `Animation.js`. El script detecta cuándo la sección de estadísticas entra en pantalla utilizando `IntersectionObserver`. Cuando esto ocurre, cada número se incrementa progresivamente desde cero hasta su valor final.

Esta técnica mejora la presentación de los datos, ya que convierte cifras estáticas en una interacción visual más atractiva. Además, la animación solo se ejecuta una vez, lo que evita repeticiones innecesarias y mejora la experiencia del usuario.

### 7.4. Sticky Stack Cards

La sección de servicios utiliza un sistema de tarjetas apiladas conocido como Sticky Stack Cards. Cada tarjeta representa una experiencia relacionada con los eventos de Play Generation, como festivales, tecnología, influencers, áreas temáticas o competiciones.

Esta funcionalidad se implementa principalmente con CSS. Las tarjetas `.service-stack-card` utilizan `position: sticky` y una posición superior definida mediante `top`. Al hacer scroll, las tarjetas permanecen fijadas temporalmente y se van superponiendo de forma visual, creando una sensación de recorrido progresivo.

El efecto permite presentar varias experiencias de manera ordenada y dinámica. En lugar de mostrar todas las tarjetas como bloques independientes sin relación, el comportamiento sticky refuerza la idea de una secuencia visual y mantiene el interés del usuario durante la navegación.

### 7.5. Menú desplegable responsive

La landing page incluye un menú desplegable accesible desde un botón tipo hamburguesa. Este menú contiene enlaces internos a las secciones principales de la página: Nosotros, Eventos, Servicios, Partners y Contacto.

El comportamiento del menú se controla desde `Animation.js`. Al pulsar el botón, se añade o elimina la clase `menu-open`, que modifica la visibilidad del menú mediante CSS. También se actualiza el atributo `aria-expanded`, mejorando la accesibilidad para tecnologías de asistencia.

El menú puede cerrarse de varias formas:

- Pulsando de nuevo el botón.
- Haciendo clic fuera del menú.
- Pulsando la tecla `Escape`.
- Seleccionando cualquiera de los enlaces internos.

Esta funcionalidad mejora la navegación en pantallas pequeñas y evita que el usuario tenga que recorrer manualmente toda la página para encontrar una sección concreta.

### 7.6. Hero visual animado

El hero es la primera sección visible de la landing page y cumple una función fundamental: captar la atención del usuario y presentar la identidad de Play Generation.

Esta sección incluye varios elementos visuales:

- Fondo con cuadrícula de estilo tecnológico.
- Efecto de resplandor central.
- Partículas flotantes con formas inspiradas en piezas retro.
- Logo principal de Play Generation.
- Título con efecto glitch aplicado al texto "PLAY".
- Botones de llamada a la acción.
- Indicador visual de scroll.

Las partículas se generan dinámicamente desde `Animation.js`. El script crea elementos con formas, colores, tamaños, duraciones y posiciones aleatorias, aportando variedad al fondo animado. Por su parte, los efectos de cuadrícula, glow y glitch se definen en `Style.css` mediante estilos y animaciones CSS.

El hero visual animado refuerza la temática gaming y consigue que la landing page tenga una identidad clara desde el primer contacto.

## 8. Accesibilidad y usabilidad

El proyecto incluye algunos elementos orientados a mejorar la accesibilidad y la usabilidad:

- Uso de enlaces internos para navegar entre secciones.
- Botones con atributos `aria-expanded` y `aria-controls` en los menús desplegables.
- Cierre del menú mediante tecla `Escape`.
- Uso de `aria-live` en mensajes de estado del formulario de identificación.
- Formularios con campos `required`, tipo `email` y longitud mínima de contraseña.
- Texto alternativo en imágenes principales.

Estos aspectos facilitan la interacción de distintos tipos de usuarios. No obstante, sería recomendable revisar todos los contrastes de color, corregir los problemas de codificación de caracteres y comprobar la navegación completa mediante teclado.

## 9. Seguridad y tratamiento de datos

El sistema de registro e inicio de sesión aplica una validación básica de los datos recibidos. El servidor comprueba que el correo tenga un formato correcto y que la contraseña tenga al menos cuatro caracteres.

Las contraseñas no se guardan en texto plano, sino como hash SHA-256. Esto supone una mejora frente al almacenamiento directo de la contraseña. Sin embargo, para un entorno real sería necesario reforzar esta parte utilizando técnicas más seguras, como bcrypt, salts individuales, sesiones de usuario, tokens de autenticación y conexión HTTPS.

El archivo `credentials.json` funciona como base de datos local, por lo que es útil para una práctica académica, pero no sería adecuado como sistema definitivo en producción. En un proyecto profesional se debería utilizar una base de datos real, como MySQL, PostgreSQL o MongoDB.

## 10. Pruebas y validación

Para validar el funcionamiento de la landing page se pueden realizar las siguientes pruebas manuales:

- Comprobar que la página carga correctamente desde el servidor local.
- Verificar que el menú desplegable se abre y se cierra correctamente.
- Confirmar que los enlaces del menú desplazan al usuario a la sección correspondiente.
- Revisar que el ticker horizontal se desplaza de forma continua.
- Comprobar que los contadores se animan al llegar a la sección de estadísticas.
- Verificar el comportamiento sticky de las tarjetas de servicios durante el scroll.
- Probar el formulario de registro con datos válidos e inválidos.
- Probar el inicio de sesión con usuarios existentes, inexistentes y contraseñas incorrectas.
- Revisar la visualización en distintos tamaños de pantalla.

El archivo `package.json` incluye un script de prueba informativo, pero actualmente no existen pruebas automáticas configuradas. Como mejora futura, podrían añadirse tests para validar las rutas del servidor y pruebas de interfaz con herramientas específicas.

## 11. Posibles mejoras futuras

Aunque el proyecto cumple los objetivos principales, se pueden plantear varias mejoras:

- Corregir los problemas de codificación de caracteres para que tildes y símbolos se visualicen correctamente.
- Sustituir el archivo JSON por una base de datos real.
- Mejorar la seguridad del sistema de autenticación mediante bcrypt y sesiones.
- Añadir cierre de sesión para el usuario identificado.
- Incorporar validaciones más completas en el formulario.
- Añadir pruebas automáticas para el back-end.
- Optimizar imágenes para mejorar el rendimiento de carga.
- Revisar la accesibilidad con herramientas de auditoría.
- Añadir estados activos en el menú según la sección visible.

Estas mejoras permitirían transformar la landing page en una aplicación web más robusta, segura y preparada para un entorno real.

## 12. Conclusión

La landing page de Play Generation combina diseño visual, estructura informativa e interacciones dinámicas para crear una experiencia acorde con el sector gaming y tecnológico. El proyecto no se limita a presentar contenido estático, sino que incorpora funcionalidades relevantes como un back-end con base de datos local, animaciones visuales, contadores dinámicos, tarjetas sticky y navegación responsive.

Desde el punto de vista académico, el trabajo demuestra el uso coordinado de HTML, CSS, JavaScript, Node.js y Express. También permite comprender la separación entre front-end y back-end, la manipulación del DOM, el uso de eventos, la persistencia de datos y la importancia de la experiencia de usuario en una landing page profesional.

En conjunto, el proyecto constituye una base sólida para una presentación de grado superior, ya que integra diseño, desarrollo web y funcionalidad real dentro de una propuesta coherente con la identidad de Play Generation.
