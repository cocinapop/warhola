/* ============================================================
   WARHOLA · MÓDULO "VODKA" (v1)
   Dibuja la ficha de un producto de tipo vodka (E.tipo=="vodka") con los datos de
   ediciones/<id>.js → objeto "vodka". Mismo patrón que laboratorio.js:
   expone view(), nav() y act(). No toca las ediciones de gin.
   Regla: lo que no está confirmado queda PENDIENTE (se ve solo en borrador:true).
   ============================================================ */
(function(){
var V={st:0,pick:{vista:[],nariz:[],boca:[],final:[]}};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
function EE(){return window.E||{}}
function D(){return EE().vodka||{}}
function draft(){return !!EE().borrador}
function pend(l){return draft()?'<span class="vpend">Pendiente · '+esc(l)+'</span>':""}
function txt(v,l){return v?'<p>'+esc(v)+'</p>':pend(l)}
function im(f,c,a){return f?'<img src="'+esc((EE().imgBase||"")+f)+'" alt="'+esc(a||"")+'" class="'+(c||"")+'" loading="lazy" onerror="this.style.display=\'none\'">':""}
function imp(f,c,a){return f?'<img src="'+esc(f)+'" alt="'+esc(a||"")+'" class="'+(c||"")+'" loading="lazy" onerror="this.style.display=\'none\'">':""}
function host(n){try{return typeof window[n]==="function"?window[n]():""}catch(e){return ""}}
function gal(k){var g=(D().galerias||{})[k]||[],a=(D().alts||{})[k]||"";return g.length?'<div class="gal vgal">'+g.map(function(f){return im(f,"",a)}).join("")+'</div>':""}
function guarda(){var g=D().guarda;return g?'<div class="vguarda">'+im(g,"","")+'</div>':""}
function sec(id,eyebrow,title,body){return '<section id="'+id+'" class="vsec"><span class="eyebrow">'+eyebrow+'</span><h2 class="serif">'+title+'</h2>'+body+'</section>'}

/* Opciones para que la persona marque lo que percibe. Son listas neutras: no describen el producto. */
var OPC={
 vista:["Transparente","Brillante","Límpido","Con lágrimas en la copa"],
 nariz:["Floral","Mineral","Cítrico","Herbal","Frutal","Especiado","Neutro","Alcohol presente"],
 boca:["Suave","Sedosa","Redonda","Ligera","Fresca","Cálida","Seca","Alcohol marcado"],
 final:["Corto","Medio","Largo","Limpio","Cálido","Fresco","Aromático"]
};
var PASOS=[
 {k:"pres",t:"Presentación",d:"Vas a recorrer una degustación guiada de Warhola Vodka. No hay respuestas correctas: se trata de descubrir, no de acertar. Buscá un momento tranquilo y servite con calma."},
 {k:"copa",t:"Preparación de la copa",d:"Usá una copa limpia y sin olores. Servite una medida pequeña y dejá que el vidrio descanse un instante en la mano."},
 {k:"vista",t:"Observación visual",d:"Inclinala sobre un fondo claro. Mirá cuánta luz atraviesa el líquido: la transparencia, el brillo y la limpidez. Después girala despacio y fijate en cómo se mueve."},
 {k:"nariz",t:"Exploración aromática",d:"Acercá la copa sin hundir la nariz y respirá suave, dos veces. Dejá que aparezcan familias antes que nombres: ¿algo floral?, ¿algo que recuerde a piedra o a agua fría? Marcá lo que reconozcas."},
 {k:"boca",t:"En boca",d:"Un sorbo pequeño. Dejalo recorrer toda la boca. Notá la entrada, la textura, el volumen y cómo cambia mientras está ahí. Marcá lo que sentís."},
 {k:"final",t:"El final",d:"Tragá y quedate quieto un momento. ¿Cuánto dura lo que queda? ¿Es limpio, cálido, aromático? Marcá lo que permanece."},
 {k:"cierre",t:"Cierre",d:""}
];

function portada(hasServe){
 var E=EE(),d=D();
 return (draft()?'<div class="vdraft"><b>Borrador</b> · Lo marcado como «Pendiente» se completa con el producto real y los textos definitivos. Esta ficha no aparece en la portada.</div>':"")
 +imp(E.imagenes&&E.imagenes.hero,"hero-img vhero","Vera Orlova, protagonista de Warhola Vodka")
 +'<div class="hero"><span class="badge s">Warhola Vodka</span><h1 class="serif">'+esc(d.personaje||"")+'</h1><p class="mute" style="max-width:340px;margin:0 auto">'+esc(E.lema||"")+'</p></div>'
 +'<div class="vidx">'+[["vs-story","The Story"],["vs-vera","Vera Orlova"],["vs-spirit","The Spirit"],["vs-taste","Degustación"],hasServe?["vs-serve","Servicio"]:null,["vs-more","Descubrí más"]].filter(Boolean).map(function(x){return '<button class="chip" data-a="vodgo" data-id="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>'
}
function story(){
 var h=(D().historia||{});
 return sec("vs-story","Capítulo 1","The Story",
  (h.intro?'<p class="vlead">'+esc(h.intro)+'</p>':pend("introducción breve"))
  +gal("story")
  +(h.ampliada?'<p>'+esc(h.ampliada)+'</p>':pend("historia ampliada"))
  +(h.firma?'<p class="vsign serif">'+esc(h.firma)+'</p>':pend("frase de cierre (firma narrativa)")))
}
function vera(){
 var d=D(),u=d.universo||{};
 return sec("vs-vera","Capítulo 2",esc(d.personaje||"Vera Orlova"),
  '<div class="vchips">'+(d.identidad||[]).map(function(x){return '<span class="chip">'+esc(x)+'</span>'}).join("")+'</div>'
  +(u.personalidad?'<p>'+esc(u.personalidad)+'</p>':pend("personalidad"))
  +gal("vera")
  +(u.visual?'<p>'+esc(u.visual)+'</p>':pend("universo visual")))
}
function spirit(){
 var d=D(),E=EE(),p=d.perfil||{};
 var rows=(d.datos||[]).filter(function(r){return r[1]||draft()}).map(function(r){return '<div class="vrow"><span>'+esc(r[0])+'</span><b>'+(r[1]?esc(r[1]):pend(r[0].toLowerCase()))+'</b></div>'}).join("");
 var ficha=["vista","nariz","boca","final"].map(function(k){var n={vista:"Vista",nariz:"Nariz",boca:"Boca",final:"Final"}[k];return '<div class="vrow"><span>'+n+'</span><b>'+(p[k]?esc(p[k]):pend("según degustación"))+'</b></div>'}).join("");
 return sec("vs-spirit","Capítulo 3","The Spirit",
  '<div class="vbot">'+imp(E.imagenes&&E.imagenes.bottle,"vbottle","Botella de Warhola Vodka")+imp(E.imagenes&&E.imagenes.label,"vlabel","Etiqueta de Warhola Vodka")+'</div>'
  +'<div class="card g">'+rows+'</div>'
  +'<div class="card"><span class="eyebrow">Perfil sensorial</span>'+(p.direccion?'<p style="margin-top:8px">'+esc(p.direccion)+'</p>':pend("dirección sensorial"))+ficha+'</div>')
}
function stepBody(i){
 var p=PASOS[i],d=D(),pf=d.perfil||{},sv=d.servicio||{};
 var h='<div class="card g"><span class="eyebrow">Paso '+(i+1)+' de '+PASOS.length+'</span><h3 class="serif">'+p.t+'</h3>';
 if(p.k=="cierre"){
  var any=false,sum=["vista","nariz","boca","final"].map(function(k){var a=V.pick[k];if(a.length)any=true;var n={vista:"Vista",nariz:"Nariz",boca:"Boca",final:"Final"}[k];return a.length?'<div class="vrow"><span>'+n+'</span><b>'+a.map(function(j){return esc(OPC[k][j])}).join(" · ")+'</b></div>':""}).join("");
  h+='<p>'+(any?"Esto es lo que encontraste en tu copa:":"Cada copa es una lectura distinta. Podés volver a cualquier paso y marcar lo que percibas.")+'</p>'+sum+'<p class="vsign serif" style="margin-top:14px">'+esc(EE().tagline||"")+'</p>';
 }else{
  h+='<p>'+esc(p.d)+'</p>';
  if(p.k=="copa")h+='<div class="vrow"><span>Temperatura</span><b>'+(sv.temperatura?esc(sv.temperatura):pend("temperatura recomendada"))+'</b></div><div class="vrow"><span>Copa</span><b>'+(sv.copa?esc(sv.copa):pend("tipo de copa"))+'</b></div>';
  if(OPC[p.k]){
   h+='<div class="vchips" style="margin-top:12px">'+OPC[p.k].map(function(o,j){var on=V.pick[p.k].indexOf(j)>=0;return '<button class="vc'+(on?" on":"")+'" data-a="vodpick" data-k="'+p.k+'" data-v="'+j+'">'+esc(o)+'</button>'}).join("")+'</div>';
   if(pf[p.k])h+='<p class="mute" style="margin-top:12px"><b>Lo que busca Warhola:</b> '+esc(pf[p.k])+'</p>';else h+=pend("perfil de referencia de "+p.t.toLowerCase());
  }
 }
 return h+'</div>';
}
function taste(){
 var i=V.st,dots=PASOS.map(function(p,j){return '<button class="'+(j<=i?"on":"")+'" data-a="vodst" data-id="'+j+'" aria-label="'+esc(p.t)+'"></button>'}).join("");
 return sec("vs-taste","Capítulo 4","Tasting Experience",
  '<div class="seg vseg">'+dots+'</div>'+stepBody(i)
  +'<div class="vnav">'+(i>0?'<button class="btn sec" data-a="vodprev"><span>← Anterior</span></button>':"")+(i<PASOS.length-1?'<button class="btn" data-a="vodnext"><span>Siguiente</span><span>→</span></button>':'<button class="btn" data-a="vodgo" data-id="vs-more"><span>Descubrí más</span><span>↓</span></button>')+'</div>')
}
function serve(){
 var s=D().servicio||{},rows=[["Temperatura recomendada",s.temperatura],["Tipo de copa",s.copa],["Servicio solo",s.solo],["Posibles combinaciones",s.combinaciones]].filter(function(r){return r[1]||draft()}).map(function(r){return '<div class="vrow"><span>'+r[0]+'</span><b>'+(r[1]?esc(r[1]):pend(r[0].toLowerCase()))+'</b></div>'}).join("");
 var cks=(s.cocteles||[]).map(function(c){return '<div class="card"><b class="serif">'+esc(c.nombre||"")+'</b><p>'+esc(c.receta||"")+'</p></div>'}).join("");
 if(!rows&&!cks)return "";
 return sec("vs-serve","Capítulo 5","Serving Suggestions",'<div class="card">'+rows+'</div>'+(cks||(draft()?pend("cócteles sugeridos (cuando estén desarrollados)"):"")))
}
function more(){
 return sec("vs-more","Capítulo 6","Discover More",gal("mas")+(draft()?pend("contenido complementario y relación entre Vera y la experiencia"):""))
}
function view(){
 var sv=serve();
 return portada(!!sv)+guarda()+story()+guarda()+vera()+spirit()+taste()+sv+more()
 +'<p class="vsign serif" style="text-align:center;margin:26px 0 6px">'+esc(EE().tagline||"")+'</p>'+host("buyCard")+(draft()?"":host("edBlock"))
}
function nav(){return '<div class="prog"><b>Warhola Vodka</b><span>'+esc((D().personaje||"")+(draft()?" · borrador":""))+'</span></div>'}
function go(id){var e=document.getElementById(id);if(e&&e.scrollIntoView)e.scrollIntoView({behavior:"smooth",block:"start"})}
function rr(k){window.render(k)}
function act(a,d){
 if(a=="vodgo"){go(d.id);return}
 if(a=="vodpick"){var A=V.pick[d.k],j=+d.v,x=A.indexOf(j);if(x>=0)A.splice(x,1);else A.push(j);if(window.vib)window.vib();rr(1);return}
 if(a=="vodnext"){V.st=Math.min(PASOS.length-1,V.st+1);rr(1);go("vs-taste");return}
 if(a=="vodprev"){V.st=Math.max(0,V.st-1);rr(1);go("vs-taste");return}
 if(a=="vodst"){V.st=+d.id;rr(1);return}
}
var st=document.createElement("style");
st.textContent=".vdraft{border:1px dashed var(--gold);color:var(--mute);padding:10px 14px;margin:0 0 14px;font-size:calc(13px*var(--fs,1))}.vdraft b{color:var(--gold);letter-spacing:.12em;text-transform:uppercase}"
+".vhero{width:100%;object-fit:cover;object-position:50% 20%}.vidx{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin:0 0 18px}.vidx .chip{background:none;cursor:pointer}"
+".vsec{margin:0 0 28px;scroll-margin-top:70px}.vsec h2{margin:2px 0 12px}.vsec p{margin:0 0 12px}.vlead{font-size:calc(19px*var(--fs,1));line-height:1.45}"
+".vsign{color:var(--gold);font-size:calc(21px*var(--fs,1));line-height:1.3}.vguarda{margin:6px 0 22px}.vguarda img{display:block;width:100%;max-height:130px;object-fit:cover;border-top:1px solid var(--gold);border-bottom:1px solid var(--gold)}"
+".vgal img{flex:0 0 62%;width:62%;object-fit:cover;max-height:420px}.vchips{display:flex;flex-wrap:wrap;gap:2px;margin:0 0 12px}"
+".vpend{display:inline-block;border:1px dashed var(--mute);color:var(--mute);font-size:calc(11.5px*var(--fs,1));letter-spacing:.06em;padding:3px 9px;margin:2px 0 10px;text-transform:uppercase}"
+".vbot{display:flex;gap:10px;align-items:flex-start;margin:0 0 14px}.vbot img{margin:0;border:1px solid var(--gold);min-width:0}.vbottle{flex:0 0 36%;width:36%;object-fit:cover}.vlabel{flex:1;width:60%;object-fit:contain;background:#fff}"
+".vrow{display:flex;justify-content:space-between;gap:14px;align-items:baseline;padding:9px 0;border-bottom:1px solid var(--line)}.vrow:last-child{border-bottom:0}.vrow span{color:var(--mute);font-size:calc(13px*var(--fs,1))}.vrow b{font-weight:500;text-align:right}"
+".vc{border:1px solid var(--gold);color:var(--gold);background:none;border-radius:99px;padding:6px 14px;margin:3px 4px 3px 0;font-size:calc(13.5px*var(--fs,1))}.vc.on{background:var(--gold);color:var(--bg)}"
+".vseg{margin:0 0 12px}.vnav{display:flex;gap:10px}.vnav .btn{margin-top:4px}";
document.head.appendChild(st);
window.WARHOLA_VODKA={view:view,nav:nav,act:act};
})();
