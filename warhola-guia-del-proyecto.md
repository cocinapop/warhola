# Warhola · Guía del proyecto (v35, para retomar en un chat nuevo)

## Qué es
App web estática (sin servidor propio) en GitHub Pages: https://cocinapop.github.io/warhola/
Hoy es una marca de destilados con 12 productos: 10 gins, un vodka y un licor. Catas guiadas por producto, laboratorio "Armá tu gin" (126 botánicos con foto), biblioteca de catas, tienda con pedido por WhatsApp/Instagram, panel secreto, QR, contador de visitas (Supabase) y música de Spotify por producto.

## Tipos de producto
- **Gin** (tipo por defecto): cata de 7 actos con rueda de notas, acordes y pirámide. Motor en `index.html`.
- **Vodka** (`tipo:"vodka"`): ficha propia dibujada por `vodka.js` (The Story, personaje, The Spirit, Tasting Experience, Serving, Discover More).
- **Licor** (`tipo:"licor"`): ficha propia dibujada por `licor.js` (The Story, Dos cisnes, Three Notes, Tasting, Serving, Discover More). Reutiliza los estilos de `vodka.js`, que debe cargarse antes.

## Estructura del repositorio
- `index.html` : motor de la app. Número de versión en `var VER="..."` (se cambia a mano; sirve para comprobar que se subió).
- `vodka.js`, `licor.js` : módulos de las fichas de vodka y licor. No confundir `vodka.js` de la raíz (módulo) con `ediciones/vodka.js` (datos).
- `laboratorio.js` : laboratorio y base de 126 botánicos (`b(...)`) con sus compuestos (`CMP`).
- `tienda.js` : precios, stock, WhatsApp, Instagram, Supabase (clave pública). IMPORTANTE: la versión viva tiene los precios cargados a mano; no reemplazarla con una copia vieja.
- `manifest.json` + `img/icons/` : ícono para instalar la app.
- `ediciones/indice.js` : lista de productos + glosario global.
- `ediciones/<id>.js` : datos de cada producto. Un id que empieza con guion bajo queda oculto de la portada (sirve para borradores).
- `img/<id>/` : fotos de cada producto. `img/botanicos/<id>.webp` : una foto por botánico (256 px).
- `qr/` : un QR por producto (`qr/<id>.png`, apunta a `?edition=<id>&src=qr`), el de la tienda, el de la portada y `warhola-qr-imprimir.pdf` (14 códigos).
- `supabase-tienda.sql` : tablas de precios, stock y visitas.

## Productos cargados
Gins: bloody, rose-cucumber-almond, superstar, orange, play, coke, hop, pure-soap, velvet, teddy.
Vodka: `vodka` (Warhola Vodka · Vera Orlova, 40%, 750 ml, de papa, filtrado en frío).
Licor: `swan` (Warhola Swan, 33,5%, 750 ml, $60.000, color ámbar, muy aromático con almendra y naranja, final dulce y sedoso; cisne blanco = naranja/triple sec, cisne negro = almendra/amaretto, puente = nibs de cacao en infusión en frío).

## Cómo se suma un producto nuevo
1. Gin: copiar una edición existente como molde. Vodka o licor: copiar `ediciones/vodka.js` o `ediciones/swan.js` (ajustar textos, datos y fotos).
2. Poner las fotos en `img/<id>/` (hero, bottle, etc. según el molde).
3. Agregar `{id:"<id>"}` en `ediciones/indice.js`.
4. Tienda (en tu `tienda.js`): agregar el id al final de `orden` y una línea en `productos`, por ejemplo `"swan":{precio:60000,formato:"750 ml",disponible:true}`. En Supabase, correr el insert del producto (tabla `tienda_productos`).
5. Música: `"musica":{"titulo":"...","spotify":"https://open.spotify.com/playlist/<id>"}` en el archivo del producto. La playlist tiene que ser pública.
6. QR: generar `qr/<id>.png` (URL `https://cocinapop.github.io/warhola/?edition=<id>&src=qr`) y rehacer el PDF. Si falta el PNG, el panel da error 404.
7. Subir a GitHub SOLO lo que cambió, con las carpetas en su lugar, en tandas de menos de 100 archivos.

## Cómo se suma un botánico nuevo
1. Línea `b("id","Nombre","icono","familia","tono","Rol",intensidad,"compuestos","#color","aroma","flags","dato")` en `laboratorio.js`. Los compuestos tienen que existir en `CMP`.
2. Foto `img/botanicos/<id>.webp` (cuadrada, fondo blanco, 256 px).
3. Si se usa en una cata de gin, poner su id en el campo `"foto"` de la nota.

## Cómo se hicieron las fotos de botánicos
Hojas de 12 generadas en Google Flow (fotos de estudio, fondo blanco, sin texto), recortadas como mosaico cuadrado. Los prompts están en `prompts-botanicos-flow.md` y `prompts-faltantes-flow.md`.

## Cosas a tener en cuenta
- Los textos de cata y las historias (Vera Orlova, Swan) son borradores redactados con el autor; revisarlos con el producto real.
- Los cócteles de Swan están marcados "Sugerencia a probar" (`prueba:true`): no están validados.
- La ficha de Swan no cuenta la anécdota de la película: la historia va desde los dos cisnes.
- La receta de Warhola Royal es confidencial: no incluirla en textos públicos.
- Las etiquetas de las fotos deben coincidir con la graduación real.
- El panel secreto: 5 toques al logo "W". Con Supabase se ingresa con email y contraseña.
- Las claves privadas (service_role) NUNCA van en la app.

## Pendientes
- Perfil de degustación real (vista, nariz, boca, final) del vodka, para reemplazar las opciones genéricas. El de Swan ya está cargado.
- Foto de la botella real y etiqueta definitiva del vodka.
- Warhola Royal (Irish cream): primer paso, recibir historia, fotos y datos.
- Foto del botánico en la ficha "i" y en el gráfico de relaciones del laboratorio (hoy con ícono).
- Pack degustación, calendario de publicaciones y reels.
