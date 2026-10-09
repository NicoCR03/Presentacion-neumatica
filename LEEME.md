# Presentación: sistemas neumáticos

Presentación web de 20 diapositivas en español. Duración orientativa: **12 minutos y 25 segundos**, incluido un minuto reservado para el caso de estudio. Haz un ensayo para comprobar tu ritmo.

## Verla ahora, sin instalar nada

1. Si descargaste el ZIP, usa **Extraer todo**. No abras la presentación dentro del ZIP.
2. Abre la carpeta y haz doble clic en **index.html**. Usa una versión reciente de Chrome, Edge o Firefox.
3. Pulsa **Pantalla completa** o la tecla **F**. En un navegador que no lo permita desde un archivo local, utiliza **F11**.
4. Avanza con **→** o **Espacio**. Retrocede con **←**.

No necesita conexión, servidor, PowerPoint ni instalar dependencias. Los enlaces a fuentes sí necesitan internet. Mantén juntos index.html, styles.css, slides.js, app.js y config.js.

## Controles

| Control | Acción |
|---|---|
| Flechas / Espacio | Cambiar de diapositiva |
| Número de diapositiva / O | Índice para saltar a cualquier diapositiva |
| A | Siguiente paso en la demostración actual, cuando tiene estados |
| P / botón de animación | Pausar o activar animaciones |
| N / Notas | Ver u ocultar el guion de esa diapositiva |
| F | Pantalla completa |
| B | Pantalla negra; B o Escape para volver |
| Inicio / Fin | Primera / última diapositiva |
| ? | Ayuda y opción de imprimir |

Las notas aparecen **en la misma ventana**, no en una pantalla privada. Ciérralas antes de proyectar. Puedes usar GUION.md en otro dispositivo. Si tu navegador tiene configurada la reducción de movimiento, las animaciones comienzan pausadas; puedes activarlas con P. En teléfono puedes deslizar a izquierda o derecha y conviene girarlo horizontalmente; la presentación está diseñada para proyección 16:9.

## Demostraciones que conviene ensayar

- **4:** Reposo, Avance, Retorno o Reproducir ciclo. Colores y rótulos distinguen alimentación y descarga.
- **7:** Cambia entre las dos posiciones de las válvulas 3/2 y 5/2. Cada cuadro se muestra separado para facilitar la lectura; no es un símbolo normalizado completo.
- **8:** Da la orden y retírala. La monoestable vuelve; la biestable conserva la posición. Reinicia con Orden contraria.
- **11:** Mueve presión y diámetro para comparar la fuerza teórica. El botón restablece 6 bar y 20 mm. No sustituye un dimensionamiento real.
- **12:** Observa los movimientos de giro y de la pinza.
- **13:** Compara Lento, Normal y Rápido. El cambio de velocidad es ilustrativo, no una simulación física.
- **14:** Energiza la bobina y retira la orden.

Los recorridos y mecanismos son esquemas propios, sin escala. Las fuentes técnicas están enlazadas en cada diapositiva pertinente y en la 20. No hay imágenes de empresas ni resultados industriales inventados.

## Completar tus datos y el caso de estudio

1. Pulsa **Personalizar** en la barra inferior.
2. Completa nombre, fecha y los campos del caso. La diapositiva 18 se reserva para el caso que tú buscarás. Las diapositivas 1 y 20 también se actualizan.
3. **Guardar y volver** conserva los cambios en ese navegador. Si el navegador bloquea el almacenamiento, seguirán visibles durante la sesión.
4. Para compartirlos, publicarlos o moverlos a otro equipo, vuelve a Personalizar y pulsa **Mostrar configuración**.
5. El contenido quedará seleccionado. Cópialo con **Ctrl+C**.
6. En el Explorador, haz clic derecho en **config.js → Abrir con → Bloc de notas**. Reemplaza todo su contenido por el texto copiado y guarda con **Ctrl+S**. No cambies el nombre del archivo. Este procedimiento evita depender de las descargas del navegador.
7. Abre la presentación en una ventana privada para comprobar que el archivo contiene los datos nuevos. Si el navegador original muestra una versión anterior, usa **Restaurar archivo original** dentro de Personalizar para cargar el config.js actual.

También puedes editar directamente config.js con un editor de texto. Para el caso, utiliza una fuente verificable y no agregues cifras de mejora si no aparecen en ella. Los límites de caracteres ayudan a mantener la diapositiva legible.

## Publicarla tú desde tu cuenta personal de GitHub

**No se ha creado ningún repositorio ni se ha publicado esta presentación.** Este procedimiento usa únicamente el navegador; no utiliza las credenciales de Git instaladas en el equipo.

1. Entra a [GitHub](https://github.com/) con tu **cuenta personal**. Puedes utilizar un perfil independiente del navegador.
2. Elige **New repository**. En **Owner**, selecciona explícitamente tu usuario personal, **no Baulatek**.
3. Usa un nombre como `presentacion-neumatica`. Para GitHub Free, elige un repositorio **Public** y créalo. El contenido publicado será accesible por internet.
4. Elige **Add file → Upload files** (en un repositorio vacío también aparece el enlace para subir archivos).
5. Sube a la raíz estos cinco archivos: **index.html, styles.css, slides.js, app.js y config.js**. Sube también **INSTRUCCIONES.html** para que funcione el enlace de ayuda. Puedes añadir LEEME.md y GUION.md. Sube los archivos extraídos, **no el ZIP ni una carpeta que los deje un nivel más abajo**.
6. Confirma con **Commit changes** en la rama `main`.
7. En **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**. Elige **main** y **/(root)**, y pulsa **Save**.
8. Espera la publicación y utiliza **Visit site** en esa misma sección. La dirección tendrá la forma `https://TU-USUARIO.github.io/presentacion-neumatica/`.

La configuración de Pages sigue la [documentación oficial de publicación desde una rama](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). La disponibilidad según el plan y el archivo de entrada se explican en [crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Para la carga, consulta [añadir archivos a un repositorio](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

El archivo oculto `.nojekyll` incluido es opcional para esta presentación. Puedes subirlo si utilizas Git; con estos nombres de archivo la publicación estática también funciona sin él.

## Actualizar después de publicar

Sube nuevamente el archivo que modificaste usando tu cuenta personal. Por ejemplo, para agregar el caso, reemplaza config.js y confirma los cambios. Espera la nueva publicación y recarga la página. Los cambios guardados solo en Personalizar no actualizan el repositorio: primero hay que copiar la configuración al archivo config.js y subirlo.

## PDF de respaldo

Abre **? → Imprimir / guardar PDF estático**, selecciona Guardar como PDF y activa gráficos de fondo. Desactiva encabezados y pies del navegador. La hoja de impresión está preparada en 16:9, una diapositiva por página. Si el navegador fuerza papel convencional, elige horizontal y ajustar a página. Revisa la vista previa. El PDF conserva el contenido visible y pierde animaciones y controles.

## Archivos

| Archivo | Función |
|---|---|
| index.html | Abrir la presentación |
| styles.css | Diseño, tamaño y reglas de impresión |
| slides.js | Contenido, guion, fuentes y esquemas |
| app.js | Navegación, cálculos y animaciones |
| config.js | Datos personales y caso de estudio |
| GUION.md | Guion completo de exposición y tiempos |
| INSTRUCCIONES.html | Este instructivo en formato fácil de abrir |
| LEEME.md | Instrucciones en Markdown |

## Si algo no funciona

- **Pantalla vacía:** comprueba que extrajiste todos los archivos y que scripts y estilos están junto a index.html. No renombres los cinco archivos principales.
- **No se anima:** pulsa Activar animación. El ciclo del cilindro inicia con sus botones, no automáticamente al pasar de diapositiva.
- **GitHub muestra 404:** confirma la rama y carpeta en Pages, que index.html está en la raíz y que el despliegue terminó. La publicación puede tardar varios minutos.
- **No aparecen tus cambios en otro equipo:** copia la configuración a config.js y guarda el archivo antes de copiar o subir la carpeta.
- **Las notas salen en el proyector:** pulsa N para cerrarlas. No hay una ventana privada de presentador.

Preparado el 8 de octubre de 2026. Antes de exponer, completa la portada y el caso de estudio y ensaya una vez con el equipo de proyección.
