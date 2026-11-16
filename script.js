/* =====================================================
   DADOS
===================================================== */

const PIX_KEY = "16752191760";
const WHATSAPP = "5521965956171";

const EVENT_DATE = new Date("2027-03-05T20:30:00-03:00");


/* =====================================================
   MODAL
===================================================== */

function openConfirm() {

  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `

    <h2>Confirmar presença</h2>

    <p class="intro">
      Confirme sua presença no XV da Júlia.
    </p>

    <div class="form-group">

      <label for="name">
        Convidado principal
      </label>

      <input
        id="name"
        class="field"
        type="text"
        placeholder="Digite seu nome completo"
        autocomplete="name"
      >

    </div>


    <div class="guest-section">

      <div class="guest-heading">

        <span>Adultos acompanhantes</span>

        <button
          type="button"
          class="add-btn"
          onclick="addGuest('adult')">
          + Adicionar
        </button>

      </div>

      <div
        id="adult-list"
        class="guest-list">
      </div>

    </div>


    <div class="guest-section">

      <div class="guest-heading">

        <span>Crianças até 7 anos</span>

        <button
          type="button"
          class="add-btn"
          onclick="addGuest('child')">
          + Adicionar
        </button>

      </div>

      <div
        id="child-list"
        class="guest-list">
      </div>

    </div>


    <button
      type="button"
      class="send-btn"
      onclick="sendConfirm()">

      ENVIAR CONFIRMAÇÃO

    </button>


    <p class="small">
      Você será direcionado para o WhatsApp.
    </p>

  `;

  document
    .getElementById("modal")
    .classList.add("show");

  document
    .getElementById("name")
    .focus();
}


/* =====================================================
   ADICIONAR ACOMPANHANTE
===================================================== */

function addGuest(type) {

  const list = document.getElementById(
    type === "adult"
      ? "adult-list"
      : "child-list"
  );

  const row = document.createElement("div");

  row.className = "guest-row";

  row.innerHTML = `

    <input
      type="text"
      class="field guest-name"
      data-type="${type}"
      placeholder="${
        type === "adult"
          ? "Nome completo do adulto"
          : "Nome completo da criança"
      }"
      autocomplete="off"
    >

    <button
      type="button"
      class="remove-btn"
      aria-label="Remover convidado">
      ×
    </button>

  `;

  row
    .querySelector(".remove-btn")
    .addEventListener("click", function () {
      row.remove();
    });

  list.appendChild(row);

  row
    .querySelector(".guest-name")
    .focus();
}


/* =====================================================
   PEGAR NOMES
===================================================== */

function getGuestNames(type) {

  const fields = document.querySelectorAll(
    `.guest-name[data-type="${type}"]`
  );

  return Array.from(fields)
    .map(field => field.value.trim())
    .filter(name => name !== "");
}


/* =====================================================
   ENVIAR CONFIRMAÇÃO
===================================================== */

function sendConfirm() {

  const mainName =
    document
      .getElementById("name")
      .value
      .trim();

  if (!mainName) {

    alert(
      "Digite o nome completo do convidado principal."
    );

    document
      .getElementById("name")
      .focus();

    return;
  }


  const adults = getGuestNames("adult");

  const children = getGuestNames("child");


  let message = "";

  message +=
    "Olá! Quero confirmar minha presença no XV da Júlia.";

  message +=
    `\n\nCONVIDADO PRINCIPAL:\n${mainName}`;


  message +=
    `\n\nADULTOS ACOMPANHANTES (${adults.length}):`;

  if (adults.length) {

    adults.forEach((name, index) => {

      message +=
        `\n${index + 1}. ${name}`;

    });

  } else {

    message += "\nNenhum";

  }


  message +=
    `\n\nCRIANÇAS ATÉ 7 ANOS (${children.length}):`;

  if (children.length) {

    children.forEach((name, index) => {

      message +=
        `\n${index + 1}. ${name}`;

    });

  } else {

    message += "\nNenhuma";

  }


  const url =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}


/* =====================================================
   COPIAR PIX
===================================================== */

async function copyPix() {

  try {

    await navigator.clipboard.writeText(PIX_KEY);

    showMessage(
      "Chave Pix copiada!",
      PIX_KEY
    );

  } catch (error) {

    const textarea =
      document.createElement("textarea");

    textarea.value = PIX_KEY;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showMessage(
      "Chave Pix copiada!",
      PIX_KEY
    );

  }

}


/* =====================================================
   MENSAGEM
===================================================== */

function showMessage(title, text) {

  document.getElementById("modalContent").innerHTML = `

    <div class="message-box">

      <div class="success-icon">
        ✓
      </div>

      <h2>${title}</h2>

      <p class="pix-value">
        ${text}
      </p>

      <button
        type="button"
        class="send-btn"
        onclick="closeModal()">

        FECHAR

      </button>

    </div>

  `;

  document
    .getElementById("modal")
    .classList.add("show");
}


/* =====================================================
   FECHAR MODAL
===================================================== */

function closeModal() {

  document
    .getElementById("modal")
    .classList.remove("show");

}


/* =====================================================
   CONTAGEM REGRESSIVA
===================================================== */

function updateCountdown() {

  const now = new Date();

  const difference =
    EVENT_DATE.getTime() - now.getTime();


  if (difference <= 0) {

    document
      .querySelector(".countdown-title")
      .textContent =
      "CHEGOU O GRANDE DIA!";

    document
      .querySelector(".countdown-grid")
      .style.display = "none";

    return;

  }


  const days =
    Math.floor(
      difference / 86400000
    );


  const hours =
    Math.floor(
      (difference % 86400000) / 3600000
    );


  const minutes =
    Math.floor(
      (difference % 3600000) / 60000
    );


  const seconds =
    Math.floor(
      (difference % 60000) / 1000
    );


  document.getElementById("days")
    .textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours")
    .textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes")
    .textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds")
    .textContent =
    String(seconds).padStart(2, "0");

}


/* =====================================================
   INICIAR CONTAGEM
===================================================== */

updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =====================================================
   ESC
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);
