/* ============================================================
   WARHOLA · MÓDULO "LICOR" (v1)  — para Warhola Swan (E.tipo=="licor")
   Mismo patrón que vodka.js: expone view(), nav() y act().
   Dibuja la ficha con los datos de ediciones/<id>.js → objeto "licor".
   Reutiliza los estilos que inyecta vodka.js (vodka.js debe estar cargado antes).
   ============================================================ */
(function(){
var V={st:0,pick:{vista:[],nariz:[],boca:[],final:[]}};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
function EE(){return window.E||{}}
function D(){return EE().licor||{}}
function im(f,c,a){return f?'<img src="'+esc((EE().imgBase||"")+f)+'" alt="'+esc(a||"")+'" class="'+(c||"")+'" loading="lazy" onerror="this.style.display=\'none\'">':""}
function imp(f,c,a){return f?'<img src="'+esc(f)+'" alt="'+esc(a||"")+'" class="'+(c||"")+'" loading="lazy" onerror="this.style.display=\'none\'">':""}
function host(n){try{return typeof window[n]==="function"?window[n]():""}catch(e){return ""}}
function gal(k){var g=(D().galerias||{})[k]||[],a=(D().alts||{})[k]||"";return g.length?'<div class="gal vgal">'+g.map(function(f){return im(f,"",a)}).join("")+'</div>':""}
function sec(id,eyebrow,title,body){return '<section id="'+id+'" class="vsec"><span class="eyebrow">'+eyebrow+'</span><h2 class="serif">'+title+'</h2>'+body+'</section>'}
function paras(a){return a?[].concat(a).map(function(t){return '<p>'+esc(t)+'</p>'}).join(""):""}

var OPC={
 vista:["Ámbar","Cobrizo","Dorado","Brillante","Límpido","Con lágrimas en la copa"],
 nariz:["Almendra","Naranja","Cacao","Cáscara de naranja","Tostado","Dulce","Alcohol presente"],
 boca:["Dulce","Untuoso","Suave","Cálido","Amargor leve","Almendra","Naranja","Cacao"],
 final:["Corto","Medio","Largo","Almendra","Naranja","Cacao","Seco","Dulce"]
};
var NOM={vista:"Vista",nariz:"Nariz",boca:"Boca",final:"Final"};
var PASOS=[
 {k:"pres",t:"Presentación",d:"Vas a recorrer una degustación guiada de Warhola Swan: un licor para tomarse con tiempo. No hay respuestas correctas, solo notas que aparecen o no. Buscá un momento tranquilo."},
 {k:"copa",t:"El servicio",d:"Servite una copita. Podés tomarlo solo o con hielo: probalo de las dos maneras y notá qué cambia."},
 {k:"vista",t:"Observación visual",d:"Mirá el color a la luz: el tono, el brillo y la limpidez. Girá la copa despacio y fijate cómo se desliza el líquido por el vidrio: es una pista de su cuerpo."},
 {k:"nariz",t:"Exploración aromática",d:"Acercá la copa sin hundir la nariz. Hay tres notas en juego: almendra, naranja y cacao. ¿Cuál aparece primero? ¿Cuál tarda? Marcá lo que reconozcas."},
 {k:"boca",t:"En boca",d:"Un sorbo pequeño. Dejalo recorrer toda la boca. Fijate en el dulzor, la textura y cuál de las tres notas lidera. ¿Cambia mientras está ahí?"},
 {k:"final",t:"El final",d:"Tragá y quedate quieto un momento. ¿Qué nota se queda? ¿Cuánto dura? Si lo tomaste con hielo, ¿cambió el final?"},
 {k:"cierre",t:"Cierre",d:""}
];

function portada(){
 var E=EE();
 return imp(E.imagenes&&E.imagenes.hero,"hero-img vhero lhero","Warhola Swan")
 +'<div class="hero"><span class="badge s">Warhola Swan</span><h1 class="serif">'+esc(E.tagline||"")+'</h1><p class="mute" style="max-width:340px;margin:0 auto">'+esc(E.lema||"")+'</p></div>'
 +'<div class="vidx">'+[["ls-story","The Story"],["ls-dos","Dos cisnes"],["ls-notas","Tres notas"],["ls-taste","Degustación"],["ls-serve","Servicio"],["ls-more","Descubrí más"]].map(function(x){return '<button class="chip" data-a="licgo" data-id="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>'
}
function story(){
 var h=D().historia||{};
 return sec("ls-story","Capítulo 1","The Story",
  (h.intro?'<p class="vlead">'+esc(h.intro)+'</p>':"")+paras(h.ampliada)+(h.firma?'<p class="vsign serif">'+esc(h.firma)+'</p>':""))
}
function dos(){
 var d=D().dos||{};
 return sec("ls-dos","Capítulo 2",esc(d.titulo||"Dos cisnes"),(d.texto?'<p>'+esc(d.texto)+'</p>':"")+gal("dos"))
}
function notas(){
 var d=D(),E=EE(),p=d.perfil||{};
 var rows=(d.datos||[]).filter(function(r){return r[1]}).map(function(r){return '<div class="vrow"><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join("");
 var cards=(d.notas||[]).map(function(n,i){return '<div class="vstep"><i>'+(i+1)+'</i><div><b class="serif" style="font-size:calc(19px*var(--fs,1));color:var(--gold)">'+esc(n[0])+'</b><p class="mute" style="margin:0">'+esc(n[1])+'</p></div></div>'}).join("");
 return sec("ls-notas","Capítulo 3","Three Notes",
  (d.ingredientes?'<div class="vbot">'+im(d.ingredientes,"vlabel","Almendras, naranja y nibs de cacao junto a Warhola Swan")+imp(E.imagenes&&E.imagenes.bottle,"vbottle","Botella de Warhola Swan")+'</div>':"")
  +'<div class="card">'+cards+'</div>'
  +'<div class="card g">'+rows+'</div>'
  +(p.direccion?'<div class="card"><span class="eyebrow">Perfil sensorial</span><p style="margin-top:8px">'+esc(p.direccion)+'</p></div>':""))
}
function stepBody(i){
 var p=PASOS[i],d=D(),s=d.servicio||{},pf=d.perfil||{};
 var h='<div class="card g"><span class="eyebrow">Paso '+(i+1)+' de '+PASOS.length+'</span><h3 class="serif">'+p.t+'</h3>';
 if(p.k=="cierre"){
  var any=false,sum=["vista","nariz","boca","final"].map(function(k){var a=V.pick[k];if(a.length)any=true;return a.length?'<div class="vrow"><span>'+NOM[k]+'</span><b>'+a.map(function(j){return esc(OPC[k][j])}).join(" · ")+'</b></div>':""}).join("");
  h+='<p>'+(any?"Esto es lo que encontraste en tu copa:":"Cada copa es una lectura distinta. Podés volver a cualquier paso y marcar lo que percibas.")+'</p>'+sum+'<p class="vsign serif" style="margin-top:14px">'+esc(EE().tagline||"")+'</p>';
 }else{
  h+='<p>'+esc(p.d)+'</p>';
  if(p.k=="copa"){h+=(s.copa?'<div class="vrow"><span>Copa</span><b>'+esc(s.copa)+'</b></div>':"")+(s.hielo?'<div class="vrow"><span>Hielo</span><b>'+esc(s.hielo)+'</b></div>':"")}
  if(OPC[p.k]){
   h+='<div class="vchips" style="margin-top:12px">'+OPC[p.k].map(function(o,j){var on=V.pick[p.k].indexOf(j)>=0;return '<button class="vc'+(on?" on":"")+'" data-a="licpick" data-k="'+p.k+'" data-v="'+j+'">'+esc(o)+'</button>'}).join("")+'</div>';
   if(pf[p.k])h+='<p class="mute" style="margin-top:12px"><b>Lo que busca Warhola:</b> '+esc(pf[p.k])+'</p>';
  }
 }
 return h+'</div>';
}
function taste(){
 var i=V.st,dots=PASOS.map(function(p,j){return '<button class="'+(j<=i?"on":"")+'" data-a="licst" data-id="'+j+'" aria-label="'+esc(p.t)+'"></button>'}).join("");
 return sec("ls-taste","Capítulo 4","Tasting Experience",
  '<div class="seg vseg">'+dots+'</div>'+stepBody(i)
  +'<div class="vnav">'+(i>0?'<button class="btn sec" data-a="licprev"><span>← Anterior</span></button>':"")+(i<PASOS.length-1?'<button class="btn" data-a="licnext"><span>Siguiente</span><span>→</span></button>':'<button class="btn" data-a="licgo" data-id="ls-more"><span>Descubrí más</span><span>↓</span></button>')+'</div>')
}
function serve(){
 var s=D().servicio||{},rows=[["Cuándo",s.momento],["Copa",s.copa],["Hielo",s.hielo]].filter(function(r){return r[1]}).map(function(r){return '<div class="vrow"><span>'+r[0]+'</span><b>'+esc(r[1])+'</b></div>'}).join("");
 var ck=(s.cocteles||[]).map(function(c){return '<div class="card"><b class="serif">'+esc(c.nombre||"")+'</b>'+(c.prueba?' <span class="vpend">Sugerencia a probar</span>':"")+'<p>'+esc(c.receta||"")+'</p></div>'}).join("");
 if(!rows&&!ck)return "";
 return sec("ls-serve","Capítulo 5","Serving Suggestions",(rows?'<div class="card">'+rows+'</div>':"")+ck)
}
function more(){return sec("ls-more","Capítulo 6","Discover More",gal("mas"))}
function view(){
 return portada()+story()+dos()+notas()+taste()+serve()+more()
 +'<p class="vsign serif" style="text-align:center;margin:26px 0 6px">'+esc(EE().tagline||"")+'</p>'+host("buyCard")+host("edBlock")
}
function nav(){return '<div class="prog"><b>Warhola Swan</b><span>Licor</span></div>'}
function go(id){var e=document.getElementById(id);if(e&&e.scrollIntoView)e.scrollIntoView({behavior:"smooth",block:"start"})}
function rr(k){window.render(k)}
function act(a,d){
 if(a=="licgo"){go(d.id);return}
 if(a=="licpick"){var A=V.pick[d.k],j=+d.v,x=A.indexOf(j);if(x>=0)A.splice(x,1);else A.push(j);if(window.vib)window.vib();rr(1);return}
 if(a=="licnext"){V.st=Math.min(PASOS.length-1,V.st+1);rr(1);go("ls-taste");return}
 if(a=="licprev"){V.st=Math.max(0,V.st-1);rr(1);go("ls-taste");return}
 if(a=="licst"){V.st=+d.id;rr(1);return}
}
var st=document.createElement("style");
st.textContent=".lhero{object-position:50% 30%;max-height:520px}";
document.head.appendChild(st);
window.WARHOLA_LICOR={view:view,nav:nav,act:act};
})();
