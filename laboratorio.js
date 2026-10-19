/* ============================================================
   WARHOLA GIN · LABORATORIO "ARMÁ TU GIN"  (módulo v2)
   100% virtual: no explica cómo destilar, solo cómo se diseña el
   perfil aromático de un gin. Botánicos de uso culinario común.
   · Para sumar un botánico: agregá una línea  b("id","Nombre","icono","familia",
     "s|c|f","Rol",intensidad 1-3,"compuesto1 compuesto2","#color","aroma","flags","dato")
     flags: d = domina, f = fijador, o = rico en aceites.
   · Familias: res cit fru sem esp con mar ver flo her rai dul
   · Compuestos: ver CMP. Son orientativos y didácticos: verificalos con
     una fuente (FooDB, The Good Scents Company) o con un experto.
   ============================================================ */
(function(){
var CMP={pineno:["α-pineno","pino y resina"],sabineno:["sabineno","amaderado y especiado"],limoneno:["limoneno","cítrico dulce (cáscaras)"],linalool:["linalool","floral y cítrico suave"],cineol:["1,8-cineol","fresco, alcanfor"],citral:["citral","limón brillante"],geraniol:["geraniol","rosa y geranio"],cariofileno:["β-cariofileno","pimienta, madera"],eugenol:["eugenol","clavo, cálido"],cinamaldehido:["cinamaldehído","canela"],anetol:["anetol","anís y regaliz"],mentol:["mentol","frío mentolado"],hexenal:["hexenal","verde de hoja cortada"],pirazina:["pirazinas","verde de pimiento o tostado"],sedanolido:["sedanólido","apio"],benzaldehido:["benzaldehído","almendra, cereza"],vainillina:["vainillina","vainilla"],irona:["irona","violeta, polvo"],glicirricina:["glicirricina","dulzor profundo"],timol:["timol","tomillo, medicinal"],isotiocianato:["isotiocianatos","picor de mostaza y rábano"],lactonas:["lactonas almizcleñas","almizcle, tierra"],nootkatona:["nootkatona","pomelo amargo"],ionona:["β-ionona","violeta, fruta roja"],capsaicina:["capsaicina","calor (es sensación, no aroma)"],nonadienal:["nonadienal","pepino"],acetatobornilo:["acetato de bornilo","aguja de abeto"],cedrol:["cedrol","cedro, madera"],sesquiterpenos:["sesquiterpenos","balsámico y amaderado"],guayacol:["guayacol","ahumado, tostado"],gamalact:["γ-lactonas","durazno, coco"],esteres:["ésteres frutales","fruta madura"],damascenona:["β-damascenona","manzana cocida, rosa"],furaneol:["furaneol","caramelo, frutilla"],cetonaframb:["cetona de frambuesa","frambuesa"],oxidorosa:["óxido de rosa","rosa y lichi"],tioles:["tioles","maracuyá, pomelo"],terpineno:["γ-terpineno","cítrico aromático"],terpinoleno:["terpinoleno","mango, resina dulce"],metilantranilato:["antranilato de metilo","mandarina, uva"],acetatolinalilo:["acetato de linalilo","bergamota, lavanda"],carvona:["carvona","menta dulce, alcaravea"],cuminal:["cuminaldehído","comino"],carvacrol:["carvacrol","orégano"],estragol:["estragol","albahaca, estragón"],mirceno:["mirceno","resinoso y herbal"],humuleno:["humuleno","lúpulo, amaderado"],bisabolol:["bisabolol","manzanilla, miel"],indol:["indol","jazmín, animálico suave"],acetatobencilo:["acetato de bencilo","jazmín, frutal"],feniletanol:["feniletanol","rosa y miel"],safranal:["safranal","azafrán, heno"],miristicina:["miristicina","nuez moscada"],fenchona:["fenchona","hinojo, alcanfor"],gingerol:["gingerol","picor del jengibre"],zingibereno:["zingibereno","jengibre"],sanshool:["sanshool","hormigueo (sensación)"],piperina:["piperina","picor de la pimienta"],azufrados:["compuestos azufrados","ajo, cebolla"],glutamato:["glutamato","umami"],dms:["dimetilsulfuro (DMS)","brisa marina"],bromofenol:["bromofenoles","yodo, mar"],geosmina:["geosmina","tierra mojada"],decenal:["(E)-2-decenal","cilantro"],furfuriltiol:["furfuriltiol","café tostado"],isoamilo:["acetato de isoamilo","banana y pera"]};
var NB={capsaicina:1,sanshool:1,piperina:1,gingerol:1};
var TN={s:"Salida",c:"Corazón",f:"Fondo"};
var FN={res:"Resinas y maderas",cit:"Cítricos",fru:"Frutales",sem:"Semillas",esp:"Especias",con:"Condimentos",mar:"Mar",ver:"Verdes y huerta",flo:"Florales",her:"Hierbas e infusiones",rai:"Raíces",dul:"Dulces y tostados"};
var BOT=[],B={};
function b(id,n,i,f,t,r,w,c,col,a,fl,x){var o={id:id,n:n,i:i,f:f,t:t,r:r,in:w,c:c?c.split(" "):[],col:col,a:a,x:x||"",d:/d/.test(fl||""),fix:/f/.test(fl||""),oil:/o/.test(fl||"")};BOT.push(o);B[id]=o}
b("enebro","Enebro","pino","res","c","Esqueleto",3,"pineno sabineno limoneno","#6f8f6a","pino, resina, bosque","o","La baya que define al gin. En normativas como la europea, el enebro debe ser el sabor predominante.");
b("cedro","Cedro","madera","res","f","Madera",2,"cedrol sesquiterpenos","#8a5a3a","madera seca, lápiz recién sacado");
b("abeto","Abeto","pino","res","s","Resina",2,"pineno acetatobornilo","#4f7a5a","aguja de pino, bosque helado","o");
b("incienso","Incienso (olíbano)","gota","res","c","Resina",2,"pineno limoneno","#d9c9a0","resina balsámica, cítrica y seca","","Resina aromática muy usada en perfumería: abre y aclara.");
b("mirra","Mirra","gota","res","f","Resina",2,"sesquiterpenos","#9a6a4a","balsámica, cálida, algo amarga","f");
b("palosanto","Palo santo","madera","res","c","Madera",2,"limoneno","#c8a060","madera dulce, cítrica y resinosa");
b("roble","Roble tostado","madera","res","f","Madera",2,"vainillina guayacol","#7a4a2a","vainilla, coco, tostado");
b("limon","Cáscara de limón","citrico","cit","s","Cítrico",3,"limoneno citral","#f2dc5d","cítrico brillante y fresco","o","La cáscara concentra aceites esenciales; el citral le da su nota a limón.");
b("naranja","Cáscara de naranja","citrico","cit","s","Cítrico",2,"limoneno","#f09a2c","cítrico dulce y redondo","o","Mucho limoneno: un cítrico más dulce y amable que el limón.");
b("pomelo","Pomelo","citrico","cit","s","Cítrico",2,"limoneno nootkatona tioles","#f08a7a","cítrico amargo y jugoso","o","La nootkatona aporta su amargor aromático característico.");
b("lima","Lima","citrico","cit","s","Cítrico",3,"limoneno terpineno","#c5e063","lima verde, ácida y punzante","o");
b("mandarina","Mandarina","citrico","cit","s","Cítrico",2,"limoneno terpineno metilantranilato","#f5a640","dulce, jugosa, apenas floral","o");
b("bergamota","Bergamota","citrico","cit","s","Cítrico",3,"limoneno acetatolinalilo linalool","#c7c64a","cítrico floral, como el té Earl Grey","o");
b("yuzu","Yuzu","citrico","cit","s","Cítrico",3,"limoneno terpineno","#e8d44a","cítrico aromático entre pomelo y mandarina","o");
b("manzana","Manzana verde","fruta","fru","s","Frutal",2,"esteres hexenal","#b5d95a","manzana verde, ácida y crujiente");
b("pera","Pera","fruta","fru","c","Frutal",2,"esteres","#d6d06a","pera madura, jugosa");
b("membrillo","Membrillo","fruta","fru","c","Frutal",2,"esteres damascenona","#e0c25a","perfume frutal denso");
b("durazno","Durazno","fruta","fru","c","Frutal",2,"gamalact esteres","#f5b27a","durazno maduro, cremoso");
b("damasco","Damasco","fruta","fru","c","Frutal",2,"gamalact ionona","#f2a65a","damasco, dulce y floral");
b("banana","Banana","fruta","fru","c","Frutal",2,"isoamilo esteres","#f2dc6b","banana madura, dulce y cremosa");
b("frutilla","Frutilla","cereza","fru","s","Frutal",2,"furaneol esteres","#e0405a","frutilla, caramelo suave");
b("frambuesa","Frambuesa","cereza","fru","c","Frutal",2,"cetonaframb ionona","#c2305a","frambuesa, floral y ácida");
b("moscatel","Uva moscatel","uva","fru","c","Frutal",2,"linalool geraniol","#c9d46a","uva perfumada, floral","","La uva moscatel es rica en monoterpenos: linalool y geraniol.");
b("uvatinta","Piel de uva tinta","uva","fru","f","Frutal",2,"damascenona esteres","#6a2a4a","fruta oscura, algo tánica");
b("higo","Higo","fruta","fru","c","Frutal",2,"benzaldehido gamalact","#8a4a5a","higo maduro, dulce y verde");
b("maracuya","Maracuyá","fruta","fru","s","Frutal",3,"esteres tioles","#f2c230","tropical, ácido, intenso","","Aroma tropical con tioles y ésteres. Se cita que comparte notas con el pimiento amarillo: dato por verificar, por eso no se marca como puente.");
b("mango","Mango","fruta","fru","c","Frutal",2,"terpinoleno esteres","#f2a830","mango, resina dulce y tropical");
b("anana","Ananá","fruta","fru","s","Frutal",2,"esteres","#f2d24a","ananá, ácido y jugoso");
b("lichi","Lichi","fruta","fru","c","Frutal",2,"oxidorosa geraniol","#f0c8c8","rosa y fruta fresca");
b("coriandro","Coriandro","semilla","sem","c","Esqueleto",2,"linalool pineno","#d9b75e","cítrico seco, floral suave, especia","","Su semilla es rica en linalool: cítrico seco con un toque floral.");
b("cardamomo","Cardamomo","vaina","sem","c","Especia",2,"cineol","#8fb58a","fresco, eucalipto, especiado","","El cineol le da un frescor especiado, casi mentolado.");
b("comino","Comino","semilla","sem","c","Semilla",2,"cuminal","#a07a3a","cálido, terroso, especiado");
b("anisestrellado","Anís estrellado","estrella","sem","c","Semilla (potente)",3,"anetol","#7a4a2a","anís intenso, dulzor fresco","do","El anetol es potente y puede enturbiar el trago al diluirlo.");
b("hinojosemilla","Semilla de hinojo","espiga","sem","c","Semilla (potente)",3,"anetol fenchona","#c9d49a","anís suave, dulce y fresco","do");
b("mostaza","Semilla de mostaza","semilla","sem","c","Semilla",2,"isotiocianato","#d8c030","picor que sube a la nariz");
b("sesamo","Sésamo tostado","semilla","sem","f","Tostado",2,"pirazina guayacol","#c0a070","tostado, nuez, cremoso");
b("cubeba","Pimienta cubeba","pimienta","sem","c","Especia",3,"pineno cineol","#6a7a4a","pimienta, eucalipto, cítrico");
b("paraiso","Granos del paraíso","pimienta","sem","c","Especia",2,"cariofileno gingerol","#a0603a","pimienta cítrica y floral");
b("canela","Canela","canela","esp","f","Especia (potente)",3,"cinamaldehido","#b5651d","calidez dulce, madera","d","Potente: en poca cantidad abriga, en mucha tapa todo.");
b("clavo","Clavo de olor","clavo","esp","f","Especia (potente)",3,"eugenol cariofileno","#6b3a1e","clavo, cálido, medicinal","d","El eugenol es dominante: usalo con cuidado.");
b("pimienta","Pimienta negra","pimienta","esp","c","Especia",2,"cariofileno piperina","#6b6258","picante seco, leñoso","","El β-cariofileno da el aroma a pimienta; el picor lo da la piperina.");
b("pimientarosa","Pimienta rosa","pimienta","esp","s","Especia",2,"limoneno pineno","#e08a8a","dulce, resinosa y frutada");
b("sichuan","Pimienta de Sichuan","pimienta","esp","s","Especia",2,"sanshool linalool limoneno","#b05a3a","cítrica y floral, con hormigueo","","El sanshool no es aroma: produce un hormigueo en la boca.");
b("jengibre","Jengibre","raiz","esp","c","Especia",2,"zingibereno gingerol limoneno","#e0c070","fresco, picante, cítrico");
b("nuezmoscada","Nuez moscada","nuez","esp","f","Especia",2,"sabineno miristicina","#9a6a3a","cálida, dulce y resinosa");
b("azafran","Azafrán","espiga","esp","f","Especia",2,"safranal","#e05a20","heno, miel, metálico");
b("pimenton","Pimentón ahumado","pimiento","esp","f","Ahumado",2,"pirazina guayacol capsaicina","#b03a20","ahumado, dulce, pimiento");
b("ajo","Ajo","ajo","con","c","Condimento (potente)",3,"azufrados","#e8e0c0","ajo, pungente","d");
b("cebolla","Cebolla","cebolla","con","c","Condimento",1,"azufrados","#e0c0d0","dulce, azufrada, suave");
b("wasabi","Wasabi","hoja","con","s","Condimento",2,"isotiocianato","#8ab04a","picor que sube a la nariz");
b("aceituna","Aceituna verde","fruta","con","c","Condimento",2,"hexenal","#8a9a3a","verde, salmuera, amargo");
b("alcaparra","Alcaparra","sal","con","f","Salino",2,"isotiocianato","#7d8a4a","salmuera, picor de mostaza","","Sal y picor que se sienten más en la boca que en la nariz.");
b("tomateseco","Tomate seco","tomate","con","f","Umami",2,"glutamato ionona","#a02a2a","concentrado, dulce, umami","","El tomate seco concentra glutamato: umami que se siente en la boca.");
b("shiitake","Hongo shiitake","hongo","con","f","Umami",2,"glutamato","#8a6a4a","umami, sotobosque");
b("aji","Ají","pimiento","con","f","Calor",2,"capsaicina pirazina","#d02a20","calor y verde");
b("kombu","Alga kombu","alga","mar","f","Mar",2,"glutamato dms bromofenol","#3a5a4a","umami marino, iodado","","El kombu es riquísimo en glutamato (umami); el DMS evoca la brisa marina.");
b("nori","Alga nori","alga","mar","c","Mar",2,"dms glutamato","#2a4a3a","mar tostado");
b("dulse","Alga dulse","alga","mar","c","Mar",2,"dms","#7a3a4a","salina, ahumada");
b("salicornia","Salicornia","alga","mar","c","Mar",2,"hexenal","#6aa05a","verde salino, crujiente");
b("hinojomarino","Hinojo marino","hoja","mar","s","Mar",2,"pineno limoneno","#8ab06a","aire marino, resinoso");
b("salmarina","Flor de sal","sal","mar","f","Mar",1,"","#e8e8e8","salinidad pura: se siente en la boca","","La sal no se huele: se percibe en la lengua y realza todos los demás sabores.");
b("pepino","Pepino","pepino","ver","s","Vegetal",1,"nonadienal","#a9d6a0","fresco, acuoso, verde");
b("apio","Apio","apio","ver","c","Vegetal",2,"sedanolido limoneno","#9fc47a","verde, algo salino","","El sedanólido le da su aroma inconfundible.");
b("tomate","Tomate","tomate","ver","c","Vegetal",2,"hexenal ionona glutamato","#d0453b","jugoso, ácido, umami","","Aroma verde (hexenal) y, en la boca, umami por su glutamato.");
b("plantatomate","Planta de tomate","hoja","ver","s","Vegetal",2,"hexenal","#4f8a48","hoja verde frotada, punzante","","Los volátiles verdes de la hoja: el olor que queda en las manos.");
b("jalapeno","Jalapeño","llama","ver","f","Vegetal y calor",2,"pirazina capsaicina","#3d7a3a","verde, calor tibio","","La capsaicina es calor (sensación), no aroma; las pirazinas dan lo verde.");
b("pimientoverde","Pimiento verde","pimiento","ver","s","Vegetal",2,"pirazina hexenal","#5a9a3a","verde, punzante, fresco");
b("pimientoamarillo","Pimiento amarillo","pimiento","ver","c","Vegetal",2,"pirazina hexenal","#e0c030","dulce, verde, suave");
b("pimientoasado","Pimiento asado","pimiento","ver","f","Vegetal",2,"pirazina furaneol","#c0502a","dulce, ahumado, carnoso");
b("esparrago","Espárrago","hoja","ver","c","Vegetal",2,"azufrados pirazina","#8ab04a","verde, azufrado suave");
b("remolacha","Remolacha","raiz","ver","f","Vegetal",2,"geosmina","#8a1a4a","tierra mojada, dulce","","La geosmina es la molécula del olor a tierra mojada.");
b("rucula","Rúcula","hoja","ver","s","Vegetal",2,"isotiocianato hexenal","#5a8a3a","verde y picante");
b("hierbacortada","Pasto recién cortado","hoja","ver","s","Vegetal",1,"hexenal","#7ab04a","verde fresco");
b("rosa","Pétalos de rosa","flor","flo","c","Floral",2,"geraniol linalool feniletanol","#e58aa3","rosa, perfume suave","","Geraniol y linalool: el perfume clásico de la rosa.");
b("lavanda","Lavanda","espiga","flo","c","Floral (potente)",3,"linalool acetatolinalilo","#a58bd1","lavanda, jabón fino","d","Muy perfumada: en dosis altas se vuelve jabonosa.");
b("azahar","Flor de azahar","flor","flo","c","Floral",2,"linalool","#f3e6c8","flor blanca, dulce");
b("jazmin","Jazmín","flor","flo","c","Floral",2,"linalool acetatobencilo indol","#f5f0d8","jazmín cremoso");
b("tilo","Flores de tilo","flor","flo","c","Floral",1,"linalool","#e9e2b0","tilo, miel y flor seca","","Una infusión suave: aporta un floral cálido y un toque de miel.");
b("sauco","Flor de saúco","flor","flo","c","Floral",2,"linalool","#f5ecc0","moscatel, dulce y fresco");
b("manzanilla","Manzanilla","flor","flo","c","Floral",2,"bisabolol","#f0e0a0","miel, manzana, suave");
b("violeta","Violeta","flor","flo","f","Floral",2,"ionona","#9a7ab8","violeta, polvo");
b("osmanto","Osmanto","flor","flo","c","Floral",2,"gamalact ionona","#f0b060","durazno, albaricoque, té");
b("lupulo","Lúpulo","hoja","flo","c","Floral y herbal",2,"mirceno humuleno linalool","#a8c060","cítrico resinoso, herbal","","Aporta amargor aromático, resinoso y herbal; es el alma de la cerveza.");
b("hibisco","Hibisco","flor","flo","c","Floral",1,"","#b0204a","frutado ácido, color rubí","","Aporta sobre todo acidez y un color rubí intenso.");
b("romero","Romero","rama","her","s","Herbal",2,"cineol pineno","#5f8a62","resina verde, alcanfor","","Comparte pineno con el enebro: se funden muy bien.");
b("tomillo","Tomillo","rama","her","c","Herbal",2,"timol","#7a9a5a","hierba seca, cálida");
b("menta","Menta","hoja","her","s","Herbal (potente)",3,"mentol","#6fcf9b","frescor helado","d","El mentol refresca por sensación y no por aroma: cuidado, tapa.");
b("hierbabuena","Hierbabuena","hoja","her","s","Herbal",2,"mentol carvona","#8fdfa0","menta suave y dulce");
b("albahaca","Albahaca","hoja","her","s","Herbal",2,"linalool eugenol estragol","#4fa05a","anís verde, dulce, fresca");
b("oregano","Orégano","rama","her","c","Herbal",2,"carvacrol timol","#6a7a3a","hierba seca, cálida");
b("eneldo","Eneldo","rama","her","s","Herbal",2,"carvona limoneno","#9fc47a","anís, alcaravea, fresco");
b("laurel","Laurel","hoja","her","c","Herbal",2,"cineol eugenol linalool","#4a7a4a","balsámico, fresco, cálido");
b("cedron","Cedrón","hoja","her","s","Herbal",2,"citral limoneno","#cfe27a","limón herbal, dulce");
b("lemongrass","Lemongrass","hoja","her","s","Herbal",2,"citral","#d0e07a","limón verde, fresco");
b("cilantro","Cilantro (hoja)","hoja","her","s","Herbal",2,"decenal linalool","#5a9a4a","verde, cítrico, jabonoso");
b("teverde","Té verde","hoja","her","c","Infusión",2,"linalool hexenal","#8aa04a","verde, vegetal, astringente");
b("yerbamate","Yerba mate","hoja","her","f","Infusión",2,"pirazina","#6a7a3a","verde tostado, amargo y ahumado","","Una nota argentina: verde, tostada y ligeramente amarga.");
b("higuera","Hoja de higuera","hoja","her","c","Herbal",2,"hexenal gamalact","#6a8a4a","verde con coco, cálida");
b("angelica","Raíz de angélica","raiz","rai","f","Fijador",2,"pineno lactonas","#9a8a5a","tierra, almizcle, madera","f","Fijador clásico: ancla los aromas volátiles y los hace durar más.");
b("lirio","Raíz de lirio","flor","rai","f","Fijador",2,"irona","#8b7aa8","violeta, polvo, suavidad","f","Su irona da aroma de violeta y retiene los aromas más livianos.");
b("regaliz","Regaliz","raiz","rai","f","Fijador y dulzor",2,"glicirricina","#4a3828","dulzor profundo, cuerpo","f","La glicirricina es muy dulce pero no se huele: redondea y da cuerpo.");
b("genciana","Genciana","raiz","rai","f","Amargo",2,"","#c0a040","amargo terroso");
b("galanga","Galanga","raiz","rai","c","Raíz",2,"cineol zingibereno","#e0d0a0","pino, jengibre, cítrico");
b("almendra","Almendra","semilla","dul","f","Dulce",2,"benzaldehido","#d8c3a0","almendra amarga, mazapán","","El benzaldehído es el aroma típico de la almendra amarga.");
b("vainilla","Vainilla","vaina","dul","f","Dulce",2,"vainillina","#d9b88a","dulce, cremosa","","La vainillina redondea y suma un fondo dulce.");
b("cacao","Cacao","grano","dul","f","Tostado",2,"pirazina","#4a2a1a","chocolate amargo, tostado");
b("cafe","Café","grano","dul","f","Tostado",3,"pirazina furfuriltiol","#3a2418","café tostado, intenso","d");
b("avellana","Avellana","nuez","dul","f","Tostado",2,"pirazina","#b08a5a","tostada, cremosa");
b("coco","Coco","nuez","dul","f","Dulce",2,"gamalact","#f0f0e0","cremoso, dulce, lácteo");
b("miel","Miel","gota","dul","c","Dulce",2,"feniletanol","#e0b030","miel, floral, cera");
b("caramelo","Caramelo","gota","dul","f","Dulce",2,"furaneol","#c07a30","azúcar quemada");
var FM=[["all","Todos"]].concat(Object.keys(FN).map(function(k){return[k,FN[k]]}));
var STY=[
{id:"london",n:"London Dry",d:"El clásico seco: enebro al frente, cítricos que lo iluminan y raíces que lo sostienen. No lleva azúcar agregada.",abv:"40–47%"},
{id:"oldtom",n:"Old Tom",d:"Más redondo y suave, con un toque de dulzor (históricamente se endulzaba con azúcar o regaliz).",abv:"40–43%"},
{id:"autor",n:"De autor",d:"Mantiene el enebro como columna, pero se anima con botánicos propios: florales, vegetales, marinos o gastronómicos.",abv:"40–45%"}];
var BAS=[
{id:"cereal",n:"Cereal neutro",d:"La base más habitual: limpia y neutra, deja que hablen los botánicos.",b:1},
{id:"papa",n:"Papa",d:"Aporta una textura sedosa y una leve dulzura: se siente como cuerpo.",b:2},
{id:"uva",n:"Uva",d:"Suma notas frutales y florales muy sutiles a la base.",b:1},
{id:"malta",n:"Malta",d:"Al estilo genever: cuerpo maltoso y notas de cereal, más rústico.",b:3}];
var ABV={40:"El mínimo habitual en muchos mercados (en la UE el mínimo legal es 37,5%). Aromas más delicados y menos calor en boca.",43:"Un punto medio muy usado por los gins de autor: más proyección aromática sin quemar.",47:"Aromas más proyectados y mejor resistencia al hielo y la tónica, con más calor en boca.",50:"Intenso y muy aromático, con ardor notable. Pensado para coctelería.",57:"Alrededor de 57% se conoce como «navy strength»: máxima intensidad, para diluir y mezclar."};
var PRE=[
{n:"Cítrico fresco",d:"Un London Dry luminoso.",sty:"london",bas:"cereal",abv:43,dose:{enebro:3,coriandro:2,limon:3,pomelo:2,bergamota:1,angelica:1}},
{n:"Jardín floral",d:"Perfume y suavidad.",sty:"autor",bas:"uva",abv:40,dose:{enebro:3,coriandro:2,rosa:2,azahar:2,lavanda:1,lirio:1}},
{n:"Huerta",d:"Verdes y jugosos.",sty:"autor",bas:"papa",abv:43,dose:{enebro:3,coriandro:1,pepino:2,apio:2,tomate:1,hierbacortada:1,angelica:1}},
{n:"Brisa marina",d:"Sal, algas y cítrico.",sty:"autor",bas:"cereal",abv:43,dose:{enebro:3,coriandro:2,salicornia:2,hinojomarino:2,kombu:1,limon:2,salmarina:1,angelica:1}},
{n:"Trópico",d:"Fruta tropical con enebro.",sty:"autor",bas:"uva",abv:40,dose:{enebro:3,coriandro:2,maracuya:2,mango:2,anana:1,lima:2,angelica:1}},
{n:"Especias de invierno",d:"Cálido y abrigado.",sty:"oldtom",bas:"malta",abv:43,dose:{enebro:3,cardamomo:2,canela:1,pimienta:2,naranja:2,jengibre:1,regaliz:1}},
{n:"Fuego y humo",d:"Ahumado y tostado.",sty:"autor",bas:"papa",abv:47,dose:{enebro:3,coriandro:1,pimenton:2,roble:2,jalapeno:1,cacao:1}},
{n:"Inspirado en Rose Cucumber Almond",d:"Dosis ilustrativas.",sty:"autor",bas:"cereal",abv:40,dose:{enebro:3,coriandro:2,angelica:1,tilo:1,limon:1,lavanda:1,rosa:2,pepino:2,almendra:3}},
{n:"Inspirado en Bloody",d:"Dosis ilustrativas.",sty:"autor",bas:"papa",abv:43,dose:{enebro:3,coriandro:2,tomate:2,plantatomate:2,apio:2,jalapeno:1,alcaparra:1}}];
var ACR=[
["Bosque cítrico",["enebro","coriandro","limon"],3,"Resina, semilla y cáscara se funden en el corazón clásico del gin."],
["Cítrico brillante",["limon","naranja","pomelo","lima","yuzu","bergamota","mandarina"],3,"Varias cáscaras con limoneno: una luz cítrica que sube a la salida."],
["Puente de linalool",["coriandro","rosa","lavanda","azahar","jazmin","sauco","bergamota","moscatel"],3,"Comparten linalool: lo floral se une al coriandro en un solo perfume."],
["Raíz y polvo",["angelica","lirio","regaliz","violeta"],2,"Los fijadores se abrazan: tierra, violeta y madera en el fondo."],
["Especia cálida",["canela","clavo","cardamomo","pimienta","nuezmoscada","paraiso","jengibre"],3,"Calor y especia que abrigan el final del trago."],
["Resina verde",["enebro","romero","abeto","laurel"],2,"Comparten pineno y cineol: el bosque se vuelve herbal y luminoso."],
["Huerta fresca",["tomate","apio","pepino","plantatomate","hierbacortada","pimientoverde"],3,"Verdes y jugosos: una ensalada recién cortada en la copa."],
["Salinidad profunda",["tomateseco","alcaparra","tomate","shiitake","kombu","salmarina"],2,"Umami y sal: se sienten en la boca más que en la nariz."],
["Brisa marina",["kombu","nori","dulse","salicornia","hinojomarino","salmarina"],2,"Algas y sal evocan el aire del mar: yodo, umami y frescura."],
["Trópico",["maracuya","mango","anana","lichi"],2,"Ésteres y tioles: fruta tropical intensa y ácida."],
["Pomar",["manzana","pera","membrillo","durazno","damasco"],3,"Frutas de pulpa blanda: un perfume de huerto maduro."],
["Frutos rojos",["frutilla","frambuesa","uvatinta","moscatel","higo"],2,"Frutas rojas y oscuras con un toque floral."],
["Mediterráneo",["romero","tomillo","oregano","laurel"],3,"Hierbas secas y balsámicas, como un monte soleado."],
["Oriental",["jengibre","yuzu","sichuan","galanga","lemongrass","wasabi"],3,"Cítrico, picante y fresco con un hormigueo en la boca."],
["Fuego y humo",["pimenton","roble","pimientoasado","jalapeno","yerbamate","cafe"],2,"Notas de brasa, tostado y pimiento asado."],
["Postre",["vainilla","coco","caramelo","miel","almendra"],3,"Dulzor cremoso: como un postre que se evapora."],
["Tostado",["cacao","cafe","avellana","sesamo","yerbamate"],2,"Tostados y amargos: cacao, café y frutos secos."],
["Jardín de té",["teverde","manzanilla","osmanto","sauco","hibisco"],2,"Infusiones florales: té, miel y flor."],
["Jardín de verano",["pepino","hierbabuena","lima","menta","albahaca"],3,"Fresco y verde: una tarde de verano en un vaso."],
["Mary Tudor",["tomate","plantatomate","apio","jalapeno","alcaparra"],5,"Es la receta aromática de nuestra Edición Bloody."],
["Rosa, pepino y almendra",["rosa","pepino","almendra"],3,"Floral, fresco y dulce: es el corazón aromático de nuestra Edición Rose Cucumber Almond."]];
function fc(A,f){return A.ids.filter(function(i){return B[i].f==f}).length}
var MS=[
["clasico","Clásico perfecto","Armá un London Dry con armonía de 80 o más.",function(A){return L.sty=="london"&&A.score>=80}],
["marino","Brisa marina","Usá 2 o más botánicos del mar con armonía de 60 o más.",function(A){return fc(A,"mar")>=2&&A.score>=60}],
["citrico","Jardín cítrico","Combiná 3 cítricos y que el enebro siga liderando.",function(A){return fc(A,"cit")>=3&&A.top[0]=="enebro"}],
["huerta","Gin de huerta","Usá 3 o más verdes de huerta y un fijador.",function(A){return fc(A,"ver")>=3&&A.fix.length>0}],
["tropical","Trópico","Sumá 2 frutas tropicales (maracuyá, mango, ananá o lichi) con armonía de 55 o más.",function(A){return["maracuya","mango","anana","lichi"].filter(function(i){return A.w[i]}).length>=2&&A.score>=55}],
["especiero","Especiero","Usá 3 especias o semillas sin que dos potentes compitan.",function(A){return fc(A,"esp")+fc(A,"sem")>=3&&!A.clash}],
["puentes","Tejedor de moléculas","Lográ 6 o más puentes moleculares.",function(A){return A.br.length>=6}],
["familias","Siete familias","Combiná 7 familias distintas con armonía de 50 o más.",function(A){return Object.keys(A.fw).length>=7&&A.score>=50}],
["minimo","Minimalista","Hacé un gin de solo 3 o 4 botánicos con armonía de 75 o más.",function(A){return A.ids.length>=3&&A.ids.length<=4&&A.score>=75}],
["humo","Fuego y humo","Usá 2 o más ahumados o tostados (pimentón, roble, pimiento asado, café, yerba mate, jalapeño).",function(A){return["pimenton","roble","pimientoasado","cafe","yerbamate","jalapeno"].filter(function(i){return A.w[i]}).length>=2}]];
var IC={raiz:'<path d="M12 3c3 0 4 3 3 6l-3 12-3-12c-1-3 0-6 3-6z"/><path d="M9.5 8h5"/>',canela:'<rect x="4" y="8" width="16" height="8" rx="4"/><path d="M9 12a3 3 0 0 1 6 0"/>',clavo:'<circle cx="12" cy="6" r="3"/><path d="M12 9v12M9 4 7 2M15 4l2-2"/>',vaina:'<path d="M5 18C5 9 11 5 19 5c0 8-4 14-14 13z"/><path d="M7 16 17 7"/>',rama:'<path d="M12 21V4M12 8l-4-3M12 8l4-3M12 13l-5-3M12 13l5-3M12 18l-4-2M12 18l4-2"/>',espiga:'<path d="M12 21V8"/><ellipse cx="12" cy="6" rx="2" ry="3.2"/><ellipse cx="8.5" cy="10" rx="1.8" ry="2.8" transform="rotate(-25 8.5 10)"/><ellipse cx="15.5" cy="10" rx="1.8" ry="2.8" transform="rotate(25 15.5 10)"/>',semilla:'<path d="M12 3c4 4 5 9 0 18-5-9-4-14 0-18z"/><path d="M12 7v10"/>',pepino:'<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M8 11h.01M12 13h.01M16 11h.01"/>',fruta:'<path d="M12 7c-4-2-8 1-8 6s3 8 6 8c1 0 1.5-.5 2-.5s1 .5 2 .5c3 0 6-3 6-8s-4-8-8-6z"/><path d="M12 7c0-2 1-3 3-4"/>',cereza:'<circle cx="8" cy="17" r="4"/><circle cx="16" cy="16" r="4"/><path d="M8 13c0-5 3-8 6-10M16 12c0-4-1-7-2-9"/>',uva:'<circle cx="9" cy="10" r="3"/><circle cx="15" cy="10" r="3"/><circle cx="12" cy="15" r="3"/><circle cx="12" cy="20" r="1.6"/><path d="M12 7V3"/>',alga:'<path d="M8 21c-2-4 2-6 0-9s2-6 0-9M15 21c-2-4 2-6 0-9s2-6 0-9"/>',ajo:'<path d="M12 3c0 3-5 5-5 11a5 5 0 0 0 10 0c0-6-5-8-5-11z"/><path d="M12 7v12"/>',cebolla:'<path d="M12 3v3M5 14a7 7 0 0 0 14 0c0-3-3-5-7-8-4 3-7 5-7 8z"/>',hongo:'<path d="M4 12a8 7 0 0 1 16 0z"/><path d="M10 12v7h4v-7"/>',madera:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6"/>',estrella:'<path d="m12 3 2.5 6 6 .5-4.6 4 1.5 6.2L12 16.5 6.6 19.7l1.5-6.2L3.5 9.5l6-.5z"/>',pimiento:'<path d="M8 8c-3 2-3 8 0 11 2 2 6 2 8 0 3-3 3-9 0-11-1-1-2-1-4-1s-3 0-4 1z"/><path d="M12 7V4"/>',nuez:'<ellipse cx="12" cy="13" rx="7" ry="8"/><path d="M12 5v16M7 9c2 2 8 2 10 0"/>',grano:'<ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(25 12 12)"/><path d="M9 4c4 5-1 10 3 16"/>'};
var PR={};try{PR=JSON.parse(localStorage.getItem("warhola.lab.v1")||"{}")}catch(e){}PR.acc=PR.acc||[];PR.ms=PR.ms||[];
function prSave(){try{localStorage.setItem("warhola.lab.v1",JSON.stringify(PR))}catch(e){}}
var L={pre:0,st:0,sty:null,bas:"cereal",dose:{},abv:43,dil:0,fam:"all",q:"",sw:0,rev:0,name:"",seen:[],dr:null,sg:0,cv:0};
var norm=function(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")};
var RK=[[0,"Aprendiz"],[100,"Boticario"],[300,"Perfumista"],[600,"Maestro alquimista"]];
function pts(){return PR.acc.length*20+PR.ms.length*50}
function rank(){var p=pts(),r=RK[0][1];RK.forEach(function(k){if(p>=k[0])r=k[1]});return r}
function an(){var ids=Object.keys(L.dose).filter(function(k){return L.dose[k]>0&&B[k]}),w={},T=0,tier={s:0,c:0,f:0},oil=0,flo=0,dul=0,fix=[],dom=[],cm={},fw={},m=[],sc=0;
 ids.forEach(function(id){var q=B[id],x=q.in*L.dose[id];w[id]=x;T+=x;tier[q.t]+=x;fw[q.f]=(fw[q.f]||0)+x;if(q.oil)oil+=x;if(q.f=="flo")flo+=x;if(q.f=="dul"||id=="regaliz")dul+=x;if(q.fix)fix.push(id);if(q.d&&L.dose[id]>=2)dom.push(id);q.c.forEach(function(c){(cm[c]=cm[c]||[]).push(id)})});
 var top=ids.slice().sort(function(a,c){return w[c]-w[a]}),br=Object.keys(cm).filter(function(c){return cm[c].length>1&&!NB[c]});
 var base={ids:ids,w:w,T:T,tier:tier,fix:fix,br:br,cm:cm,fw:fw,oil:oil,flo:flo,dul:dul,top:top,clash:dom.length>=2};
 if(!T){base.score=0;base.m=[];base.label="Elegí botánicos para empezar";base.orig=0;return base}
 sc=50;
 if(w.enebro&&top[0]=="enebro"){sc+=12;m.push(["ok","El enebro lidera: tu gin tiene columna vertebral."])}else if(w.enebro){sc-=8;m.push(["warn","El enebro no es el protagonista. Para que sea gin, tiene que predominar."])}else{sc-=20;m.push(["warn","Sin enebro no es un gin. Sumalo como base."])}
 var gap=[];["s","c","f"].forEach(function(k){if(tier[k]/T>=.12)sc+=4;else gap.push(TN[k])});if(gap.length)m.push(["warn","Te falta presencia en: "+gap.join(" y ")+"."]);else m.push(["ok","Los tres tiempos de la pirámide están presentes."]);
 if(fix.length){sc+=8;m.push(["ok","Fijadores presentes ("+fix.map(function(i){return B[i].n.toLowerCase()}).join(", ")+"): anclan los aromas volátiles."])}else m.push(["warn","Sin fijador, los aromas más livianos se van rápido y el final dura poco."]);
 if(br.length){sc+=Math.min(10,br.length*2);m.push(["ok",br.length+" puente"+(br.length>1?"s":"")+" molecular"+(br.length>1?"es":"")+": ingredientes que comparten moléculas."])}
 if(dom.length>=2){sc-=12;m.push(["warn",B[dom[0]].n+" y "+B[dom[1]].n+" compiten: los dos son potentes y se tapan entre sí."])}else if(dom.length&&w[dom[0]]/T>.4){sc-=10;m.push(["warn",B[dom[0]].n+" domina más del 40% de la mezcla."])}
 var big=Object.keys(fw).sort(function(a,c){return fw[c]-fw[a]})[0];if(big!="res"&&fw[big]/T>.6){sc-=8;m.push(["warn","La familia «"+FN[big]+"» ocupa más del 60%: la mezcla se vuelve monótona."])}
 if((fw.mar||0)/T>.35){sc-=6;m.push(["warn","El mar pesa mucho: puede tapar al enebro."])}
 if(L.sty=="london"&&dul/T>.25){sc-=8;m.push(["warn","Un London Dry es seco: bajá los botánicos dulces."])}
 if(ids.length>11){sc-=(ids.length-11)*3;m.push(["warn","Demasiados botánicos: se genera ruido y se pierde definición."])}
 if(ids.length<4){sc=Math.min(sc,60);m.push(["warn","Un gin simple puede ser bellísimo, pero sumá matices para darle profundidad."])}
 sc=Math.max(0,Math.min(100,sc));base.score=sc;base.m=m;base.label=sc>=75?"Equilibrado y armónico":sc>=50?"Con carácter, ajustable":"Desbalanceado";
 base.orig=Math.min(100,Object.keys(fw).length*11+(fw.mar?8:0)+(fw.con?6:0)+(fw.fru?4:0)+br.length*2);return base}
function accs(A){return ACR.filter(function(a){return a[1].filter(function(i){return A.w[i]}).length>=a[2]})}
function meters(A){var a=L.abv,bs=BAS.filter(function(x){return x.id==L.bas})[0];return{pro:Math.round(Math.max(5,Math.min(100,35+(a-40)*3.5))),ard:Math.round(Math.max(0,Math.min(100,(a-37)*4.5*(1-.28*L.dil)))),cu:Math.round(Math.min(100,bs.b*20+(a-40)*1.5+(A.dul||0)*2)),hz:Math.round(Math.max(0,Math.min(100,((A.oil||0)*5+(A.cm&&A.cm.anetol?25:0))*(.2+L.dil*.3)-(a-40)*.8)))}}
function rec(A){if(!A.T)return"";var fl=A.flo/A.T,lo=40,hi=43;if(L.sty=="london"||A.oil/A.T>.4){lo=43;hi=47}if(fl>.35){lo=40;hi=43}return lo+"–"+hi+"%"}
function mix(A){var r=0,g=0,bl=0,t=0;A.ids.forEach(function(id){var c=B[id].col,x=A.w[id];r+=parseInt(c.substr(1,2),16)*x;g+=parseInt(c.substr(3,2),16)*x;bl+=parseInt(c.substr(5,2),16)*x;t+=x});return t?"rgb("+Math.round(r/t)+","+Math.round(g/t)+","+Math.round(bl/t)+")":"#caa055"}
function flask(A){var fr=Math.min(1,A.T/30),y=205-115*fr,col=mix(A),dr=L.dr&&B[L.dr]?'<circle class="dp" cx="100" cy="24" r="5" fill="'+B[L.dr].col+'" style="--ty:'+(y-26)+'px"/>':"",hz=meters(A).hz/160;L.dr=null;
 var bub=[0,1,2,3,4].map(function(i){return '<circle class="bb" cx="'+(70+i*16)+'" cy="195" r="'+(2+i%3)+'" style="animation-delay:'+i*.35+'s"/>'}).join("");
 return '<svg viewBox="0 0 200 230" class="flk'+(L.sw?" sw":"")+'" role="img" aria-label="Frasco del laboratorio"><defs><clipPath id="fc"><path d="M80 20h40v60l45 90a20 20 0 0 1-18 32H53a20 20 0 0 1-18-32l45-90z"/></clipPath></defs><g clip-path="url(#fc)">'+(A.T?'<g transform="translate(0,'+y+')"><path class="wv" fill="'+col+'" fill-opacity=".9" d="M-200 0q25 -7 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0v240h-400z"/></g><rect x="0" y="'+y+'" width="200" height="230" fill="#fff" opacity="'+hz+'"/>'+bub:"")+dr+'</g><path d="M80 20h40v60l45 90a20 20 0 0 1-18 32H53a20 20 0 0 1-18-32l45-90z" fill="none" stroke="#caa055" stroke-width="2.5"/><rect x="74" y="14" width="52" height="8" rx="3" fill="none" stroke="#caa055" stroke-width="2.5"/></svg>'}
function pill(A){return '<div class="lpill"><div><b>'+A.score+'</b><span>Armonía</span></div><div><b>'+A.orig+'</b><span>Originalidad</span></div><p>'+A.label+'</p></div>'}
function net(A){var ids=A.ids.filter(function(i){return B[i].c.some(function(c){return A.cm[c].length>1&&!NB[c]})}).slice(0,14),n=ids.length;if(n<2)return'';var cx=150,cy=125,R=95,P=function(i){var a=i/n*6.2832-1.5708;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]},pos={};ids.forEach(function(id,i){pos[id]=P(i)});var h='<svg viewBox="0 0 300 250" class="lnet">',hue=0;
 A.br.forEach(function(c){var m=A.cm[c].filter(function(i){return pos[i]}),col="hsl("+(hue+=47)%360+",65%,60%)";for(var i=0;i<m.length;i++)for(var j=i+1;j<m.length;j++)h+='<line x1="'+pos[m[i]][0]+'" y1="'+pos[m[i]][1]+'" x2="'+pos[m[j]][0]+'" y2="'+pos[m[j]][1]+'" stroke="'+col+'" stroke-width="2" opacity=".85"/>'});
 ids.forEach(function(id){var p=pos[id];h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="12" fill="var(--card)" stroke="#caa055"/>'+ico_s(B[id].i,p[0],p[1],"#caa055")+'<text x="'+p[0]+'" y="'+(p[1]+(p[1]>cy?25:-17))+'" text-anchor="middle" class="ln">'+esc(B[id].n.split(" ").slice(-1)[0])+'</text>'});return h+'</svg>'}
var AXF=[["Cítrico",["cit"]],["Frutal",["fru"]],["Floral",["flo"]],["Especiado",["esp","sem"]],["Verde",["ver","her"]],["Resinoso",["res","rai"]],["Dulce",["dul"]],["Salino",["mar","con"]]];
function famVals(A){return AXF.map(function(x){var s=0;x[1].forEach(function(f){s+=A.fw[f]||0});return Math.min(5,Math.round(s/A.T*12))})}
function famBar(A){var ks=Object.keys(A.fw).sort(function(a,c){return A.fw[c]-A.fw[a]});return '<div class="fbar">'+ks.map(function(k,i){return '<i style="flex:'+A.fw[k]+';background:hsl('+(i*53)%360+',45%,52%)" title="'+FN[k]+'"></i>'}).join("")+'</div><div class="mute" style="font-size:11.5px;line-height:1.7">'+ks.map(function(k,i){return '<span style="color:hsl('+(i*53)%360+',55%,62%)">●</span> '+FN[k]+' '+Math.round(A.fw[k]/A.T*100)+'%'}).join(" &nbsp; ")+'</div>'}
function sug(A){var out=[];BOT.forEach(function(q){if(A.w[q.id])return;var s=0,w=[],sh=[];q.c.forEach(function(c){if(NB[c])return;if(A.cm[c]&&A.cm[c].length){s+=2;sh.push(CMP[c][0])}});if(sh.length)w.push("comparte "+sh.slice(0,2).join(" y ")+" con tu mezcla");
 if(A.T&&A.tier[q.t]/A.T<.12){s+=3;w.push("llena el tiempo de "+TN[q.t].toLowerCase()+" de la pirámide")}
 if(q.fix&&!A.fix.length){s+=3;w.push("es un fijador que te falta")}
 if(q.d&&A.clash)s-=6;if(q.d&&A.ids.some(function(i){return B[i].d&&L.dose[i]>=2}))s-=4;
 if(A.T&&!fc(A,q.f)){s+=1;w.push("suma una familia nueva ("+FN[q.f].toLowerCase()+")")}
 ACR.forEach(function(a){if(a[1].indexOf(q.id)>=0){var h=a[1].filter(function(i){return A.w[i]}).length;if(h>0&&h+1==a[2]){s+=3;w.push("completa el acorde «"+a[0]+"»")}}});
 if(s>0)out.push({id:q.id,s:s,w:w.slice(0,2)})});return out.sort(function(a,c){return c.s-a.s}).slice(0,3)}
function grid(){var q=norm(L.q);return BOT.filter(function(x){return(L.fam=="all"||x.f==L.fam)&&(!q||norm(x.n+" "+x.a+" "+x.r+" "+FN[x.f]).indexOf(q)>=0)}).map(function(x){var d=L.dose[x.id]||0;return '<div class="bc'+(d?" on":"")+'"><button class="bi" data-a="labinfo" data-id="'+x.id+'" aria-label="Información de '+esc(x.n)+'">i</button><button class="bm" data-a="labdose" data-id="'+x.id+'">'+ico(x.i,26)+'<b>'+esc(x.n)+'</b><small>'+x.r+' · '+TN[x.t]+'</small><span class="dr">'+[1,2,3].map(function(k){return '<i class="'+(d>=k?"f":"")+'"></i>'}).join("")+'</span></button></div>'}).join("")||'<p class="mute" style="grid-column:1/3">No encontramos botánicos con esa búsqueda.</p>'}
function sgn(s){return '<span class="eyebrow">'+s+'</span>'}
function nextBtn(t,a,ok){return '<button class="btn'+(ok===0?" off":"")+'" data-a="'+a+'"><span>'+t+'</span><span>→</span></button>'}
function cGet(){try{return JSON.parse(localStorage.getItem("warhola.creaciones.v1")||"[]")}catch(e){return[]}}
function cSet(a){try{localStorage.setItem("warhola.creaciones.v1",JSON.stringify(a));return 1}catch(e){return 0}}
function view(){var A=an(),h='',st=L.st,stl=STY.filter(function(x){return x.id==L.sty})[0],steps=["Estilo","Base","Botánicos","Graduación","Mezcla"];
 h+='<div class="lst">'+steps.map(function(n,i){return '<button class="'+(i==st?"on":i<st?"dn":"")+'" data-a="labst" data-i="'+i+'">'+(i+1)+'<br>'+n+'</button>'}).join("")+'</div>';
 if(st==0){h+=sgn("Paso 1 · Elegí el estilo")+'<h2>Armá tu gin</h2><p>Un laboratorio virtual con '+BOT.length+' botánicos: elegí un estilo, sumá aromas, mirá cómo se funden y descubrí por qué un gin sabe como sabe.</p><div class="card g"><h3>El esqueleto de todo gin</h3><p style="margin:0"><b>Enebro</b> (resina y bosque) y <b>coriandro</b> (cítrico seco y floral) son la base de casi cualquier gin. Todo lo demás se construye alrededor.</p></div><div class="lstat"><div><b>'+PR.acc.length+'/'+ACR.length+'</b><span>Acordes</span></div><div><b>'+PR.ms.length+'/'+MS.length+'</b><span>Misiones</span></div><div><b>'+rank()+'</b><span>Rango</span></div></div>'+
  STY.map(function(x){return '<button class="opt'+(L.sty==x.id?" hit":"")+'" data-a="labsty" data-id="'+x.id+'"><b>'+x.n+'</b><small>'+x.d+' <i>Graduación habitual: '+x.abv+'.</i></small></button>'}).join("")+
  '<div class="rule"></div>'+sgn("O partí de una receta")+'<div class="pres">'+PRE.map(function(x,i){return '<button class="opt" data-a="labpre" data-i="'+i+'"><b>'+x.n+'</b><small>'+x.d+'</small></button>'}).join("")+'</div>'+
  '<div class="rule"></div>'+sgn("Misiones")+MS.map(function(m){var o=PR.ms.indexOf(m[0])>=0;return '<div class="ms'+(o?" ok":"")+'"><b>'+(o?"✓ ":"")+m[1]+'</b><small>'+m[2]+'</small></div>'}).join("");
  var C=cGet();if(C.length)h+='<div class="rule"></div>'+sgn("Mis creaciones")+C.map(function(c){return '<div class="card"><h3 style="margin:0 0 4px">'+esc(c.n)+'</h3><p class="mute" style="margin-bottom:8px">'+esc(c.sty)+' · '+c.abv+'% · armonía '+c.sc+'</p><div class="row"><button class="tb" data-a="labload" data-id="'+c.id+'">Abrir</button><button class="tb" data-a="labdel" data-id="'+c.id+'">Borrar</button></div></div>'}).join("");
  h+=nextBtn("Siguiente: la base","labnext",L.sty?1:0)+'<button class="btn sec" data-a="labx">‹ Volver a la cata</button>'}
 if(st==1){h+=sgn("Paso 2 · La base alcohólica")+'<h2>¿Sobre qué se construye?</h2><p>Antes de los botánicos hay un alcohol base. No aporta aromas fuertes, pero cambia la textura y el cuerpo.</p>'+BAS.map(function(x){return '<button class="opt'+(L.bas==x.id?" hit":"")+'" data-a="labbas" data-id="'+x.id+'"><b>'+x.n+'</b><small>'+x.d+'</small></button>'}).join("")+nextBtn("Siguiente: botánicos","labnext")+'<button class="btn sec" data-a="labprev">Volver</button>'}
 if(st==2){h+=sgn("Paso 3 · Los botánicos")+'<h2>Sumá aromas</h2><p>Tocá un botánico para agregarlo: cada toque suma una gota (hasta 3). Tocá la <b>i</b> para ver sus compuestos.</p>'+flask(A)+pill(A)+'<div class="fchips">'+FM.map(function(f){return '<button class="chip pk'+(L.fam==f[0]?" sel":"")+'" data-a="labfam" data-id="'+f[0]+'">'+f[1]+'</button>'}).join("")+'</div><input class="inp" id="lq" placeholder="Buscar botánico o aroma…" value="'+esc(L.q)+'" oninput="WARHOLA_LAB.q(this.value)"><div class="bgrid" id="bgrid">'+grid()+'</div>'+
  '<button class="btn sec" data-a="labsug">'+(L.sg?"Ocultar sugerencias":"Pedile una sugerencia al sommelier")+'</button>'+(L.sg?(A.T?sug(A).map(function(s){return '<div class="say fx"><b>'+esc(B[s.id].n)+'</b><br>'+esc(s.w.join(" y "))+'.<br><button class="lnk" data-a="labadd" data-id="'+s.id+'">+ Agregar a mi mezcla</button></div>'}).join(""):'<div class="tip">Sumá primero un botánico y te sugiero qué combina.</div>'):"")+
  (A.T?'<div class="tip">'+A.m.slice(0,2).map(function(x){return esc(x[1])}).join(" ")+'</div>':"")+nextBtn("Siguiente: graduación","labnext",A.T?1:0)+'<button class="btn sec" data-a="labprev">Volver</button>'}
 if(st==3){var M=meters(A),dl=["Sin diluir","+ hielo","+ tónica 1:2","+ tónica 1:3"];
  h+=sgn("Paso 4 · La graduación")+'<h2>¿Cuánto alcohol?</h2><p>Los aceites esenciales y terpenos de los botánicos se disuelven en alcohol, no en agua. <b>El alcohol es el vehículo</b> que los lleva a tu nariz. Más graduación proyecta más aroma, pero también quema más.</p>'+flask(A)+'<div class="grid4">'+[40,43,47,50,57].map(function(x){return '<button class="b2'+(L.abv==x?" on":"")+'" data-a="lababv" data-id="'+x+'">'+x+'%</button>'}).join("")+'</div><div class="tip">'+ABV[L.abv]+'</div>'+(A.T?'<p class="mute">Para tu mezcla, el laboratorio sugiere <b style="color:var(--gold)">'+rec(A)+'</b>.</p>':"")+
  sgn("Probá diluirlo")+'<div class="grid4" style="grid-template-columns:repeat(4,1fr)">'+dl.map(function(x,i){return '<button class="b2'+(L.dil==i?" on":"")+'" data-a="labdil" data-id="'+i+'">'+x+'</button>'}).join("")+'</div>'+[["Proyección aromática",M.pro],["Calor del alcohol",M.ard],["Cuerpo",M.cu],["Riesgo de enturbiarse",M.hz]].map(function(m){return '<div class="mt"><span>'+m[0]+'</span><div class="bar"><i style="width:'+m[1]+'%"></i></div></div>'}).join("")+'<p class="mute" style="font-size:12px">Estimación didáctica. Al diluir, los aceites pueden salir de solución y enturbiar el trago, sobre todo con anetol (hinojo, anís) o mucho cítrico.</p>'+nextBtn("Siguiente: mezclar","labnext")+'<button class="btn sec" data-a="labprev">Volver</button>'}
 if(st==4){var ac=accs(A),tn={s:[],c:[],f:[]};A.top.forEach(function(id){tn[B[id].t].push(id)});
  h+=sgn("Paso 5 · La mezcla")+'<h2>'+(L.rev?esc(L.name||"Tu gin"):"Mezclá y descubrí")+'</h2>'+flask(A)+(L.rev?pill(A):"");
  if(!L.rev)h+='<p>Es el momento de la alquimia: el laboratorio va a unir tus botánicos y a revelarte qué notas van a salir.</p><button class="btn" data-a="labmix"><span>Mezclar y revelar</span><span>✦</span></button><button class="btn sec" data-a="labprev">Volver</button>';
  else{h+='<div class="card g fx"><span class="eyebrow">Tu gin · '+(stl?stl.n:"")+' · '+L.abv+'% · '+A.ids.length+' botánicos</span><p style="margin:6px 0 0">'+A.label+'. '+esc(A.m[0][1])+'</p></div>'+sgn("Perfil aromático")+(window.radarSvg?radarSvg(famVals(A),null,0,{ejes:AXF.map(function(x){return[x[0],""]})}):"")+famBar(A)+
   '<span class="eyebrow" style="margin-top:16px">Pirámide olfativa</span><div class="pyr">'+["s","c","f"].map(function(k,i){var a=30*(1-i/3),bb=30*(1-(i+1)/3),pc=Math.round(A.tier[k]/A.T*100);return '<div class="tier f" style="clip-path:polygon('+a+'% 0,'+(100-a)+'% 0,'+(100-bb)+'% 100%,'+bb+'% 100%);height:98px"><b>'+TN[k]+' · '+pc+'%</b><span>'+(tn[k].slice(0,3).map(function(id){return esc(B[id].a.split(",")[0])}).join(" · ")||"—")+'</span></div>'}).join("")+'</div>'+
   '<div class="card"><span class="eyebrow">Fijadores</span><p style="margin:6px 0 0">'+(A.fix.length?A.fix.map(function(i){return '<b>'+esc(B[i].n)+'</b>: '+esc(B[i].x||B[i].a)}).join("<br>"):"No elegiste fijadores. Sumá angélica, lirio, regaliz o mirra para que los aromas duren más.")+'</p></div>';
   if(A.br.length)h+=sgn("Puentes moleculares")+net(A)+'<div class="mute" style="font-size:12.5px;line-height:1.7">'+A.br.map(function(c){return '<b>'+CMP[c][0]+'</b> ('+CMP[c][1]+'): '+A.cm[c].map(function(i){return esc(B[i].n)}).join(" ↔ ")}).join("<br>")+'</div>';
   var mols=Object.keys(A.cm).sort(function(a,c){return A.cm[c].length-A.cm[a].length}).slice(0,10);if(mols.length)h+='<span class="eyebrow" style="margin-top:14px">Moléculas de tu gin · tocá para saber más</span><div>'+mols.map(function(c){return '<button class="chip pk det" data-a="labmol" data-id="'+c+'">'+CMP[c][0]+'</button>'}).join("")+'</div>';
   h+='<span class="eyebrow" style="margin-top:14px">Acordes descubiertos · '+ac.length+'</span>'+(ac.length?ac.map(function(a){return '<div class="say fx"><b>'+a[0]+'</b><br>'+a[3]+'</div>'}).join(""):'<div class="tip">Todavía no se formó ningún acorde. Probá sumar botánicos que compartan moléculas.</div>')+
   '<div class="card"><span class="eyebrow">Diagnóstico</span>'+A.m.map(function(x){return '<p style="margin:6px 0 0;font-size:13.5px">'+(x[0]=="ok"?"✓ ":"△ ")+esc(x[1])+'</p>'}).join("")+'</div>'+
   '<div class="card"><span class="eyebrow">Graduación sugerida</span><p style="margin:6px 0 0">Para tu mezcla: <b style="color:var(--gold)">'+rec(A)+'</b>. Elegiste '+L.abv+'%: '+ABV[L.abv]+'</p></div>'+
   sgn("Ponele nombre")+'<input class="inp" id="lname" maxlength="24" placeholder="Nombre de tu gin" value="'+esc(L.name)+'" oninput="WARHOLA_LAB.name(this.value)"><button class="btn" data-a="labsave"><span>Guardar mi creación</span><span>▤</span></button><button class="btn sec" data-a="labcv">Crear la etiqueta de mi gin</button>'+(L.cv?'<canvas id="lcv" width="720" height="1000" class="cvs"></canvas><button class="btn sec" data-a="labsh">Compartir imagen</button><a class="btn sec" id="ldl" download="mi-gin-warhola.png" href="#" style="text-decoration:none">Descargar imagen</a>':"")+'<button class="btn sec" data-a="labmix">Mezclar otra vez</button><button class="btn sec" data-a="labst" data-i="2">Ajustar botánicos</button>'}}
 return h}
function etq(){var c=document.querySelector("#lcv");if(!c||!c.getContext)return;var A=an(),x=c.getContext("2d"),W=720,H=1000,G="#caa055",stl=STY.filter(function(s){return s.id==L.sty})[0],cut=function(t,n){return t.length>n?t.slice(0,n-1)+"…":t};
 var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#17110f");g.addColorStop(1,"#0a0807");x.fillStyle=g;x.fillRect(0,0,W,H);
 x.fillStyle=mix(A);x.globalAlpha=.9;x.beginPath();x.ellipse(W/2,H/2,300,420,0,0,7);x.fill();x.globalAlpha=1;x.fillStyle="rgba(250,244,230,.93)";x.beginPath();x.ellipse(W/2,H/2,280,400,0,0,7);x.fill();x.strokeStyle="#7a5a20";x.lineWidth=3;x.beginPath();x.ellipse(W/2,H/2,266,386,0,0,7);x.stroke();
 x.textAlign="center";x.fillStyle="#7a5a20";x.font="600 20px Georgia,serif";x.fillText("W A R H O L A   L A B",W/2,170);
 x.fillStyle="#1b1a18";x.font="italic 600 "+(cut(L.name||"Mi gin",14).length>9?58:76)+"px Georgia,serif";x.fillText(cut(L.name||"Mi gin",14),W/2,290);
 x.fillStyle="#7a5a20";x.font="600 22px Arial,sans-serif";x.fillText(((stl?stl.n:"Gin")+" · "+L.abv+"% VOL.").toUpperCase(),W/2,340);
 x.fillStyle="#7a5a20";x.fillRect(W/2-40,362,80,2);x.fillStyle="#1b1a18";x.font="20px Georgia,serif";
 A.top.slice(0,9).forEach(function(id,i){x.fillText(cut(B[id].n,24),W/2,408+i*34)});
 x.fillStyle="#7a5a20";x.font="600 20px Arial,sans-serif";x.fillText("ARMONÍA "+A.score+" · ORIGINALIDAD "+A.orig,W/2,760);x.font="italic 18px Georgia,serif";x.fillText("diseñado en el laboratorio virtual",W/2,800);
 var dl=document.querySelector("#ldl");if(dl){try{dl.href=c.toDataURL("image/png")}catch(e){}}}
function render_(k){window.render(k)}
function act(a,d,e){var S=window.S;
 if(a=="labgo"){S.labv=1;S.lib=0;L.st=0;render_();window.sc();return}
 if(a=="labx"){S.labv=0;render_();window.sc();return}
 if(a=="labst"){L.st=+d.i;L.rev=0;render_();window.sc();return}
 if(a=="labnext"){L.st++;L.rev=0;render_();window.sc();return}
 if(a=="labprev"){L.st=Math.max(0,L.st-1);L.rev=0;render_();window.sc();return}
 if(a=="labsty"){L.sty=d.id;L.dose=d.id=="oldtom"?{enebro:3,coriandro:2,naranja:2,regaliz:1}:d.id=="london"?{enebro:3,coriandro:2,limon:2,angelica:1}:{enebro:3,coriandro:1};L.abv=d.id=="london"?43:40;L.rev=0;window.vib();render_(1);return}
 if(a=="labpre"){var p=PRE[+d.i];L.sty=p.sty;L.bas=p.bas;L.abv=p.abv;L.dose=JSON.parse(JSON.stringify(p.dose));L.name=p.n;L.rev=0;L.pre=1;L.st=2;window.vib();render_();window.sc();return}
 if(a=="labbas"){L.bas=d.id;window.vib();render_(1);return}
 if(a=="labfam"){L.fam=d.id;render_(1);return}
 if(a=="labdose"){var c=L.dose[d.id]||0;L.dose[d.id]=c>=3?0:c+1;if(L.dose[d.id])L.dr=d.id;L.rev=0;L.pre=0;window.vib();render_(1);return}
 if(a=="labadd"){L.dose[d.id]=Math.max(1,L.dose[d.id]||0);L.dr=d.id;L.rev=0;L.pre=0;window.vib();render_(1);return}
 if(a=="labsug"){L.sg=L.sg?0:1;render_(1);return}
 if(a=="lababv"){L.abv=+d.id;render_(1);return}
 if(a=="labdil"){L.dil=+d.id;render_(1);return}
 if(a=="labinfo"){var q=B[d.id];document.querySelector("#glt").textContent=q.n;document.querySelector("#gld").textContent=(q.x?q.x+" ":"")+"Aroma: "+q.a+". Rol: "+q.r+". Aparece en el "+TN[q.t].toLowerCase()+" de la pirámide.";var pp=document.querySelector("#glp");pp.textContent=q.c.length?"Compuestos orientativos: "+q.c.map(function(k){return CMP[k][0]}).join(", ")+".":"Se percibe sobre todo en la boca, no en la nariz.";pp.style.display="block";document.querySelector("#gls").classList.add("open");return}
 if(a=="labmol"){var m=CMP[d.id],us=BOT.filter(function(z){return z.c.indexOf(d.id)>=0}).slice(0,8).map(function(z){return z.n}).join(", ");document.querySelector("#glt").textContent=m[0];document.querySelector("#gld").textContent="Aroma asociado: "+m[1]+".";var p2=document.querySelector("#glp");p2.textContent="Presente (de forma orientativa) en: "+us+".";p2.style.display="block";document.querySelector("#gls").classList.add("open");return}
 if(a=="labmix"){L.sw=1;L.rev=0;render_(1);setTimeout(function(){L.sw=0;L.rev=1;var A=an(),nw=accs(A).map(function(x){return x[0]}).filter(function(n){return PR.acc.indexOf(n)<0}),ms=MS.filter(function(m){return !L.pre&&PR.ms.indexOf(m[0])<0&&m[3](A)});if(nw.length)PR.acc=PR.acc.concat(nw);ms.forEach(function(m){PR.ms.push(m[0])});prSave();if(ms.length){window.toast("Misión cumplida: "+ms[0][1]);window.chime()}else if(nw.length){window.toast("Acorde nuevo: "+nw[0]);window.chime()}render_(1)},1800);return}
 if(a=="labsave"){var A2=an(),C=cGet(),st=STY.filter(function(x){return x.id==L.sty})[0];C.unshift({id:"c"+Date.now(),n:L.name||"Mi gin",sty:st?st.n:"",bas:L.bas,abv:L.abv,sc:A2.score,dose:JSON.parse(JSON.stringify(L.dose))});window.toast(cSet(C)?"Creación guardada":"No se pudo guardar");return}
 if(a=="labload"){var f=cGet().filter(function(x){return x.id==d.id})[0];if(f){L.dose=f.dose;L.bas=f.bas;L.abv=f.abv;L.name=f.n;var s2=STY.filter(function(x){return x.n==f.sty})[0];L.sty=s2?s2.id:"autor";L.st=4;L.rev=1;render_();window.sc()}return}
 if(a=="labdel"){if(confirm("¿Borrar esta creación?")){cSet(cGet().filter(function(x){return x.id!=d.id}));render_(1)}return}
 if(a=="labcv"){L.cv=1;render_(1);etq();setTimeout(function(){var c=document.querySelector("#lcv");if(c&&c.scrollIntoView)c.scrollIntoView({behavior:"smooth",block:"center"})},60);return}
 if(a=="labsh"){var cv=document.querySelector("#lcv");if(cv)cv.toBlob(function(bl){var fl=new File([bl],"mi-gin-warhola.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[fl]}))navigator.share({files:[fl],text:"Mi gin, diseñado en el laboratorio de Warhola"}).catch(function(){});else window.toast("Mantené apretada la imagen para guardarla")});return}}
var stl_=document.createElement("style");stl_.textContent=".lst{display:flex;gap:4px;margin-bottom:18px}.lst button{flex:1;background:none;border:0;border-top:2px solid var(--line);color:var(--mute);text-align:left;padding:6px 0 0;font-size:9px;letter-spacing:.1em;text-transform:uppercase;line-height:1.3}.lst .on{border-color:var(--gold);color:var(--ink);font-weight:600}.lst .dn{border-color:var(--gold)}"+
".flk{display:block;width:150px;height:auto;margin:6px auto}.wv{animation:wv 3s linear infinite}@keyframes wv{to{transform:translateX(-100px)}}.flk.sw .wv{animation-duration:.45s}.flk.sw{animation:wob .45s ease-in-out 4}@keyframes wob{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}.dp{animation:dp .9s ease-in forwards}@keyframes dp{from{transform:translateY(0);opacity:1}to{transform:translateY(var(--ty));opacity:0}}.bb{fill:none;stroke:#fff;opacity:0;animation:bb 2.4s ease-in infinite}@keyframes bb{0%{transform:translateY(0);opacity:0}20%{opacity:.7}100%{transform:translateY(-60px);opacity:0}}"+
".lpill{display:flex;align-items:center;gap:18px;justify-content:center;margin:2px 0 12px;flex-wrap:wrap}.lpill div{text-align:center}.lpill b{display:block;font-family:var(--serif);font-size:32px;color:var(--gold);line-height:1}.lpill span{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}.lpill p{flex-basis:100%;text-align:center;margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}"+
".fchips{margin:6px 0 10px;display:flex;flex-wrap:wrap;gap:4px}.bgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.bc{position:relative}.bm{width:100%;background:var(--card);border:1px solid var(--line);padding:12px 8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--ink);transition:.2s}.bc.on .bm{border-color:var(--gold);background:var(--golds)}.bm .ic{margin:0 0 4px;width:26px;height:26px}.bm b{font-family:var(--serif);font-size:16px;font-weight:600}.bm small{font-size:10.5px;color:var(--mute)}.dr{display:flex;gap:4px;margin-top:5px}.dr i{width:8px;height:8px;border-radius:50%;border:1px solid var(--gold)}.dr i.f{background:var(--gold)}.bi{position:absolute;top:5px;right:5px;z-index:2;width:20px;height:20px;border-radius:50%;border:1px solid var(--line);background:var(--bg);color:var(--gold);font:italic 600 12px var(--serif);padding:0}"+
".grid4{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:10px 0}.b2{background:var(--card);border:1px solid var(--line);color:var(--ink);padding:11px 2px;font-size:12px}.b2.on{border-color:var(--gold);background:var(--golds);color:var(--gold);font-weight:600}.mt{margin:8px 0}.mt span{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}.mt .bar{height:8px;background:var(--card);border:1px solid var(--line);margin-top:3px}.mt .bar i{display:block;height:100%;background:var(--gold);transition:width .5s}.lnet{width:100%;height:auto}.ln{font-size:10px;fill:var(--mute)}"+
".lstat{display:flex;gap:8px;margin:0 0 14px}.lstat div{flex:1;border:1px solid var(--line);padding:10px 6px;text-align:center;background:var(--card)}.lstat b{display:block;font-family:var(--serif);font-size:19px;color:var(--gold);line-height:1.1}.lstat span{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}.ms{border:1px solid var(--line);padding:9px 12px;margin-top:6px;background:var(--card)}.ms.ok{border-color:var(--gold);background:var(--golds)}.ms b{font-family:var(--serif);font-size:16px;display:block}.ms small{color:var(--mute);font-size:12px}.pres{display:grid;grid-template-columns:1fr 1fr;gap:8px}.pres .opt{margin:0}.fbar{display:flex;height:14px;border:1px solid var(--line);margin:8px 0}.fbar i{display:block;height:100%}";
document.head.appendChild(stl_);
window.WARHOLA_LAB={icons:IC,view:view,act:act,name:function(v){L.name=v},q:function(v){L.q=v;var g=document.querySelector("#bgrid");if(g)g.innerHTML=grid()}};
})();
