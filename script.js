const PIX_KEY = "16752191760";
const WHATSAPP = "5521965956171";

function openConfirm(){
  document.getElementById("modalContent").innerHTML = `
    <h2>Confirmar presença</h2>
    <p>Confirme sua presença no XV da Júlia.</p>
    <input id="name" class="field" placeholder="Seu nome completo">
    <input id="adults" class="field" type="number" min="0" placeholder="Acompanhantes adultos">
    <input id="kids" class="field" type="number" min="0" placeholder="Crianças até 6 anos">
    <button class="gold-btn" onclick="sendConfirm()">ENVIAR CONFIRMAÇÃO</button>
    <p class="small">Você será direcionado para o WhatsApp.</p>
  `;
  document.getElementById("modal").classList.add("show");
}

function sendConfirm(){
  const name = document.getElementById("name").value.trim();
  if(!name){ alert("Digite seu nome."); return; }
  const adults = document.getElementById("adults").value || "0";
  const kids = document.getElementById("kids").value || "0";
  const msg = `Olá! Quero confirmar minha presença no XV da Júlia.\n\nNome: ${name}\nAcompanhantes adultos: ${adults}\nCrianças até 6 anos: ${kids}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
}

async function copyPix(){
  try{
    await navigator.clipboard.writeText(PIX_KEY);
    showMessage("Chave Pix copiada!", PIX_KEY);
  }catch(e){
    const ta=document.createElement("textarea");
    ta.value=PIX_KEY; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); ta.remove();
    showMessage("Chave Pix copiada!", PIX_KEY);
  }
}

function showMessage(title,text){
  document.getElementById("modalContent").innerHTML = `
    <h2>${title}</h2>
    <p><strong>${text}</strong></p>
    <button class="gold-btn" onclick="closeModal()">FECHAR</button>
  `;
  document.getElementById("modal").classList.add("show");
}

function closeModal(){
  document.getElementById("modal").classList.remove("show");
}
