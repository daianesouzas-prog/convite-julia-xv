const PIX_KEY = "16752191760";
const WHATSAPP = "5521965956171";
const EVENT_DATE = new Date("2027-03-05T20:30:00-03:00");

function openConfirm(){
  document.getElementById("modalContent").innerHTML = `
    <h2>Confirmar Presença</h2>
    <p>Confirme sua presença no XV da Júlia.</p>

    <input id="name" class="field" placeholder="Seu nome completo">

    <div class="guest-section">
      <div class="guest-heading">
        <span>Adultos acompanhantes</span>
        <button type="button" class="add-btn" onclick="addGuest('adult')">+ Adicionar adulto</button>
      </div>
      <div id="adult-list"></div>
    </div>

    <div class="guest-section">
      <div class="guest-heading">
        <span>Crianças até 7 anos</span>
        <button type="button" class="add-btn" onclick="addGuest('child')">+ Adicionar criança</button>
      </div>
      <div id="child-list"></div>
    </div>

    <button class="gold-btn" onclick="sendConfirm()">ENVIAR CONFIRMAÇÃO</button>
    <p class="small">Você será direcionado para o WhatsApp.</p>
  `;
  document.getElementById("modal").classList.add("show");
}

function addGuest(type){
  const list = document.getElementById(type === "adult" ? "adult-list" : "child-list");
  const label = type === "adult" ? "Nome completo do adulto" : "Nome completo da criança";
  const row = document.createElement("div");
  row.className = "guest-row";
  row.innerHTML = `
    <input class="field guest-name" data-type="${type}" placeholder="${label}">
    <button type="button" class="remove-btn" aria-label="Remover convidado">×</button>
  `;
  row.querySelector(".remove-btn").onclick = () => row.remove();
  list.appendChild(row);
  row.querySelector("input").focus();
}

function getGuests(type){
  return [...document.querySelectorAll(`.guest-name[data-type="${type}"]`)]
    .map(input => input.value.trim())
    .filter(Boolean);
}

function sendConfirm(){
  const name = document.getElementById("name").value.trim();
  if(!name){
    alert("Digite o nome completo do convidado principal.");
    return;
  }

  const adults = getGuests("adult");
  const children = getGuests("child");

  let msg = `Olá! Quero confirmar minha presença no XV da Júlia.\n\nCONVIDADO PRINCIPAL:\n${name}`;

  if(adults.length){
    msg += `\n\nADULTOS ACOMPANHANTES (${adults.length}):`;
    adults.forEach((guest, i) => msg += `\n${i + 1}. ${guest}`);
  } else {
    msg += `\n\nADULTOS ACOMPANHANTES: Nenhum`;
  }

  if(children.length){
    msg += `\n\nCRIANÇAS ATÉ 7 ANOS (${children.length}):`;
    children.forEach((guest, i) => msg += `\n${i + 1}. ${guest}`);
  } else {
    msg += `\n\nCRIANÇAS ATÉ 7 ANOS: Nenhuma`;
  }

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

async function copyPix(){
  try{
    await navigator.clipboard.writeText(PIX_KEY);
    showMessage("Chave Pix copiada!", PIX_KEY);
  }catch(e){
    const ta=document.createElement("textarea");
    ta.value=PIX_KEY;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
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

function updateCountdown(){
  const now = new Date();
  let diff = EVENT_DATE - now;

  const countdown = document.getElementById("countdown");
  if(!countdown) return;

  if(diff <= 0){
    countdown.innerHTML = `<div class="countdown-title">CHEGOU O GRANDE DIA!</div>`;
    return;
  }

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("cd-days").textContent = String(days).padStart(2,"0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("cd-minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("cd-seconds").textContent = String(seconds).padStart(2,"0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
