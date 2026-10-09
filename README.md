# Sistemas neumáticos

Presentación de 20 diapositivas para Sistemas Automatizados de Manufactura: válvulas, cilindros y actuadores neumáticos, con énfasis en el consumo del aire dentro de la máquina.

## Ver la presentación

Descarga y extrae todos los archivos en una misma carpeta. Abre `index.html` en Chrome o Edge. Funciona sin instalación ni conexión; los enlaces a las fuentes sí requieren internet.

- Flechas o espacio: cambiar de diapositiva.
- O: índice. F: pantalla completa.
- P: activar o pausar animaciones.
- A: avanzar un paso de la demostración actual.
- B: oscurecer o recuperar la pantalla.
- ?: ayuda e impresión a PDF estático.

Los botones de las diapositivas permiten controlar las demostraciones. Las animaciones son esquemas didácticos, no simulaciones físicas dimensionadas.

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Entrada y controles de la presentación. |
| `styles.css` | Diseño, adaptación a pantalla e impresión. |
| `slides.js` | Contenido, referencias y diagramas SVG. |
| `app.js` | Navegación, animaciones y demostraciones. |
| `config.js` | Datos de portada y caso de estudio. |
| `README.md` | Estas instrucciones. |
| `.nojekyll` | Indica que el sitio se publica como archivos estáticos. |

Esta copia no incluye guion, notas del expositor ni formulario de personalización. La versión del expositor se conserva por separado. No requiere bibliotecas externas ni una etapa de compilación.

## Completar tus datos y el caso

Edita `config.js` con un editor de texto y conserva las comillas y comas. El caso de estudio sigue pendiente; completa su contexto, necesidad, solución, resultado y fuente antes de compartir la versión final.

Si ya ingresaste datos en el formulario de la versión del expositor, esos datos pueden estar guardados únicamente en ese navegador. Allí usa **Mostrar configuración**, copia el texto y reemplaza el contenido de `config.js` en esta carpeta para incorporarlos a la versión pública.

Para modificar diapositivas, edita `slides.js`. Conserva las atribuciones y referencias de las fuentes.

## Subirla con tu cuenta personal de GitHub

1. Inicia sesión con tu cuenta personal y abre tu repositorio.
2. Sube **el contenido de esta carpeta**, no el ZIP ni la carpeta que lo contiene. `index.html` debe quedar en la raíz del repositorio.
3. Guarda los cambios. En **Settings → Pages**, selecciona **Deploy from a branch**, la rama donde subiste los archivos y **/(root)**. Guarda.
4. Cuando termine la publicación, comparte la dirección que aparezca en Pages.

Si ya publicaste la versión del expositor, reemplaza `index.html`, `app.js`, `slides.js`, `config.js` y `styles.css` por los de esta carpeta. Elimina de la versión actual del repositorio `GUION.md`, `LEEME.md`, `INSTRUCCIONES.html` y cualquier ZIP o archivo adicional que no quieras compartir. Subir archivos nuevos no elimina los anteriores. Las versiones anteriores pueden seguir accesibles en el historial de un repositorio público.

Un sitio web entrega sus archivos HTML, CSS y JavaScript al visitante: esta copia excluye el guion, pero no oculta el código de la presentación ni convierte el repositorio en privado.

Nada se ha publicado automáticamente: la carga y activación se hacen desde tu cuenta.
