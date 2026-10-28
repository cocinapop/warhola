/* ============================================================
   WARHOLA GIN · TIENDA (precios, stock y contacto)
   Este es el ÚNICO archivo que define la tienda. Se puede editar a mano
   o desde el panel secreto de la app (tocá 5 veces el logo "W" de arriba,
   poné la clave, cambiá los datos y tocá "Copiar tienda.js").

   - whatsapp: número con código de país, sin + ni espacios.
     Argentina (celular): 54 + 9 + código de área sin 0 + número sin 15.
   - instagram: usuario sin @. Se usa para el botón "Pedir por Instagram".
   - clave: clave del panel. OJO: este archivo es público, así que la clave
     solo evita curiosos: no sirve como seguridad real. No uses una clave
     que uses en otro lado.
   - productos: precio en pesos (sin puntos), formato (opcional),
     disponible (true o false) y stock (opcional): cuántas botellas hay.
     Con stock, nadie puede pedir más de lo que hay, y con stock 0 aparece
     "Sin stock". Si no ponés stock, no hay límite. Si no hay precio, aparece
     "Consultar".
   - orden: el orden en que se ven los gins en la tienda.
   - supabase (opcional): conecta la tienda a tu base en Supabase para
     cambiar precios y stock desde el panel de la app, sin tocar GitHub.
     Completar url (Project URL) y anonKey (la clave "anon" o "publishable",
     NUNCA la service_role). Mirá supabase-tienda.sql para armar la tabla.
     Si Supabase no responde, la tienda usa los precios de este archivo.
   ============================================================ */
window.WARHOLA_TIENDA={
 whatsapp:"5491156444379",
 instagram:"warholagin",
 clave:"1979",
 supabase:{url:"https://ruxwzrjqqzrvscicrvao.supabase.co",anonKey:"sb_publishable_uvrtD_CuNjkSEY6cw2Y8YQ_Oo9Ii5Y1"},
 aviso:"Beber con moderación. Prohibida su venta a menores de 18 años.",
 envios:"Coordinamos el envío y la forma de pago por mensaje.",
 orden:["rose-cucumber-almond","play","orange","coke","bloody","superstar","hop","pure-soap"],
 productos:{
  "rose-cucumber-almond":{precio:75000,formato:"1125 ml",disponible:true},
  "play":{precio:75000,formato:"900 ml · cantimplora",disponible:true},
  "orange":{precio:48000,disponible:true},
  "coke":{precio:48000,formato:"750 ml",disponible:true},
  "bloody":{precio:53000,disponible:true},
  "superstar":{precio:40000,formato:"500 ml",disponible:true},
  "hop":{precio:48000,formato:"750 ml",stock:6,disponible:true},
  "pure-soap":{formato:"Dispenser 600 ml · Refill 500 ml",disponible:true}
 }
};
