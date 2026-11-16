const EVENT_DATE = new Date("2027-03-05T20:30:00-03:00").getTime();
const PIX_KEY = "16752191760";
const WHATSAPP_NUMBER = "5521965956171";

function tick(){
  const d = EVENT_DATE - Date.now();
  if(d <= 0){
    document.getElementById("timer").textContent = "É HOJE!";
    return;
  }
  const days = Math.floor(d/86400000);
  const h = Math.floor((d%86400000)/3600000);
  const m = Math.floor((d%3600000)/60000);
  const s = Math.floor((d%60000)/1000);
  document.getElementById("timer").textContent =
    `${String(days).padStart(2,"0")} : ${String(h).padStart(2,"0")} : ${String(m).padStart(2,"0")} : ${String(s).padStart(2,"0")}`;
}
setInterval(tick,1000);
tick();

function show(html){
  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("modal").classList.add("show");
}
function closeModal(){
  document.getElementById("modal").classList.remove("show");
}

function openPix(){
  show(`
    <h3>CHAVE PIX</h3>
    <p>Toque no botão abaixo para copiar a chave.</p>
    <input id="pix" class="field" value="${PIX_KEY}" readonly>
    <button class="primary" onclick="copyPix()">COPIAR CHAVE PIX</button>
  `);
}

async function copyPix(){
  try{
    await navigator.clipboard.writeText(PIX_KEY);
    alert("Chave Pix copiada!");
  }catch(e){
    const x = document.getElementById("pix");
    x.select();
    document.execCommand("copy");
    alert("Chave Pix copiada!");
  }
}

function openRsvp(){
  show(`
    <h3>CONFIRMAR PRESENÇA</h3>
    <input id="name" class="field" placeholder="Seu nome completo">
    <input id="adults" class="field" type="number" min="0" placeholder="Acompanhantes adultos">
    <input id="kids" class="field" type="number" min="0" placeholder="Crianças até 6 anos">
    <button class="primary" onclick="sendRsvp()">ENVIAR NO WHATSAPP</button>
  `);
}

function sendRsvp(){
  const n = document.getElementById("name").value.trim();
  const a = document.getElementById("adults").value || "0";
  const k = document.getElementById("kids").value || "0";

  if(!n){
    alert("Digite seu nome.");
    return;
  }

  const text =
    `Olá! Quero confirmar minha presença no XV da Júlia.%0A%0A` +
    `Nome: ${encodeURIComponent(n)}%0A` +
    `Acompanhantes adultos: ${encodeURIComponent(a)}%0A` +
    `Crianças até 6 anos: ${encodeURIComponent(k)}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}
