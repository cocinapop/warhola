/* WARHOLA · Edición Vodka (datos). Se abre con index.html?edition=_vodka
   BORRADOR (borrador:true): el guion bajo la oculta de la portada. Todo lo que dice null está PENDIENTE
   de completar con el producto real o con el texto definitivo. No se inventa nada técnico ni narrativo.
   Cuando esté listo: poner borrador:false, renombrar el archivo y el id a "vodka" (también en indice.js).
   Estructura: los módulos de la ficha (portada, historia, Vera, espíritu, degustación, servicio, descubrir más)
   los dibuja vodka.js con estos datos. */
window.WARHOLA_EDICIONES=window.WARHOLA_EDICIONES||{};
window.WARHOLA_EDICIONES["_vodka"]={
 "id": "_vodka",
 "tipo": "vodka",
 "borrador": true,
 "marca": "Warhola Vodka",
 "nombre": "Warhola Vodka · Vera Orlova",
 "sub": "Vodka · Vera Orlova",
 "tagline": "Una bebida. Un personaje. Un universo por descubrir.",
 "lema": "WARHOLA no formula bebidas. Compone experiencias que se descubren y se disfrutan.",
 "accent": "#c8401f",
 "imgBase": "img/vodka/",
 "imagenes": { "hero": "hero.jpg", "bottle": "bottle.jpg", "label": "label.jpg" },
 "tema": {
  "dark": {
   "--bg": "#0b0d16", "--card": "#131622", "--card2": "#1a1e2e", "--line": "#2d3350",
   "--ink": "#f4ecdc", "--mute": "#a7a2b2", "--ac": "#c8401f", "--acs": "rgba(200,64,31,.24)",
   "--gold": "#d9a441", "--golds": "rgba(217,164,65,.14)", "--green": "#7fa58a",
   "--bgimg": "radial-gradient(ellipse at 50% -8%,rgba(200,64,31,.22),transparent 58%)", "--bgsz": "auto"
  },
  "light": {
   "--bg": "#f7f0e2", "--card": "#fffaf0", "--card2": "#f0e4cd", "--line": "#dccaa4",
   "--ink": "#1b1712", "--mute": "#5b4e3d", "--ac": "#a8321a", "--acs": "rgba(168,50,26,.10)",
   "--gold": "#8a5f14", "--golds": "rgba(138,95,20,.12)", "--green": "#3f6a48",
   "--bgimg": "radial-gradient(ellipse at 50% -8%,rgba(200,64,31,.12),transparent 58%)", "--bgsz": "auto"
  }
 },
 /* Campos que index.html necesita para arrancar (el vodka no usa rueda de notas ni acordes de gin) */
 "familias": [], "notas": [], "acordes": [], "piramide": [], "ejes": [],
 "serve": { "garnish": [], "proporciones": [] }, "glosario": {},
 /* ===== Contenido propio del vodka ===== */
 "vodka": {
  "personaje": "Vera Orlova",
  /* Rasgos de identidad del brief (confirmados) */
  "identidad": ["Misterio", "Sensualidad", "Elegancia", "Fineza", "Inteligencia", "Independencia", "Presencia magnética"],
  /* TEXTOS DEFINITIVOS: PENDIENTES (los entrega el autor). No inventar. */
  "historia": { "intro": null, "ampliada": null, "personaje": null, "firma": null },
  "universo": { "personalidad": null, "visual": null },
  /* Información técnica: [rótulo, valor]. null = pendiente. */
  "datos": [
   ["Tipo", "Vodka artesanal"],
   ["Graduación", "40% alc./vol."],
   ["Materia prima", "Papa"],
   ["Filtrado", "En frío, congelándolo"],
   ["Tamaño", null],
   ["Precio", null]
  ],
  /* Perfil sensorial: solo la dirección buscada. El resto, PENDIENTE de degustación real. */
  "perfil": {
   "direccion": "Floral y mineral, delicado y elegante. Es la dirección buscada: se confirma con la degustación del producto real.",
   "vista": null, "nariz": null, "boca": null, "final": null
  },
  /* Servicio: PENDIENTE */
  "servicio": { "temperatura": null, "copa": null, "solo": null, "combinaciones": null, "cocteles": [] },
  "guarda": "guarda.jpg",
  "galerias": {
   "story": ["taller1.jpg", "taller2.jpg", "taller3.jpg", "taller4.jpg"],
   "vera": ["retrato1.jpg", "retrato2.jpg", "retrato3.jpg", "retrato4.jpg"],
   "mas": ["huevo1.jpg", "huevo2.jpg", "huevo3.jpg", "huevo4.jpg"]
  },
  "alts": {
   "story": "Escena de Vera Orlova en su taller",
   "vera": "Retrato de Vera Orlova",
   "mas": "Huevo ornamental"
  }
 }
};
