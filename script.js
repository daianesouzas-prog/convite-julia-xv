const EVENT_DATE = new Date("2027-01-15T19:00:00-03:00").getTime();
const PIX_KEY = "COLOQUE_SUA_CHAVE_PIX_AQUI";
const MAPS_URL = "COLOQUE_AQUI_O_LINK_DO_GOOGLE_MAPS";
function tick(){const d=EVENT_DATE-Date.now();if(d<=0){document.getElementById("timer").textContent="É HOJE!";return}const days=Math.floor(d/86400000),h=Math.floor(d%86400000/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);document.getElementById("timer").textContent=`${String(days).padStart(2,"0")} : ${String(h).padStart(2,"0")} : ${String(m).padStart(2,"0")} : ${String(s).padStart(2,"0")}`}setInterval(tick,1000);tick();
function show(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function openPix(){show(`<h3>CHAVE PIX</h3><p>Toque no botão abaixo para copiar a chave.</p><input id="pix" class="field" value="${PIX_KEY}" readonly><button class="primary" onclick="copyPix()">COPIAR CHAVE PIX</button>`)}
async function copyPix(){try{await navigator.clipboard.writeText(PIX_KEY);alert("Chave Pix copiada!")}catch(e){const x=document.getElementById("pix");x.select();document.execCommand("copy");alert("Chave Pix copiada!")}}
function openGift(){show(`<h3>SUGESTÃO DE PRESENTE</h3><p>Se desejar presentear a Júlia, você pode utilizar a chave Pix ou escolher algo que tenha a ver com ela.</p><button class="primary" onclick="openPix()">VER PIX</button>`)}
function openRsvp(){show(`<h3>CONFIRMAR PRESENÇA</h3><input id="name" class="field" placeholder="Seu nome completo"><input id="adults" class="field" type="number" min="0" placeholder="Acompanhantes adultos"><input id="kids" class="field" type="number" min="0" placeholder="Crianças até 6 anos"><button class="primary" onclick="sendRsvp()">ENVIAR NO WHATSAPP</button>`)}
function sendRsvp(){const n=document.getElementById("name").value.trim();const a=document.getElementById("adults").value||"0";const k=document.getElementById("kids").value||"0";if(!n){alert("Digite seu nome.");return}const msg=`Olá! Quero confirmar minha presença no XV da Júlia.%0A%0ANome: ${encodeURIComponent(n)}%0AAcompanhantes adultos: ${a}%0ACrianças até 6 anos: ${k}`;window.open("https://wa.me/55SEUNUMERO?text="+msg,"_blank")}
document.querySelectorAll('a[href="https://www.google.com/maps"]').forEach(a=>a.href=MAPS_URL);
