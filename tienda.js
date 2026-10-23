/* ============================================================
   WARHOLA GIN · TIENDA (precios y contacto)
   Este es el ÚNICO archivo que hay que tocar para cambiar precios,
   agregar un gin a la tienda o cambiar el número de WhatsApp.

   - whatsapp: número con código de país, sin + ni espacios.
     Para Argentina (celular): 54 + 9 + código de área sin 0 + número sin 15.
     Ejemplo: "5491122334455". Si queda vacío, el pedido se copia para pegarlo.
   - instagram: tu usuario sin @ (opcional). Se usa si no hay WhatsApp.
   - productos: precio en pesos (sin puntos) y formato (opcional).
     Si un gin no tiene precio, aparece el botón "Consultar precio".
   - orden: el orden en que se ven los gins en la tienda.
   ============================================================ */
window.WARHOLA_TIENDA={
 whatsapp:"5491156444379",
 instagram:"warholagin",
 aviso:"Beber con moderación. Prohibida su venta a menores de 18 años.",
 envios:"Coordinamos el envío y la forma de pago por mensaje.",
 orden:["rose-cucumber-almond","orange","coke","superstar","play","bloody"],
 productos:{
  "rose-cucumber-almond":{precio:75000,formato:"1125 ml"},
  "orange":{precio:48000},
  "coke":{precio:48000,formato:"750 ml"},
  "superstar":{precio:40000,formato:"500 ml"},
  "play":{precio:72000,formato:"900 ml · cantimplora"},
  "bloody":{}
 }
};
