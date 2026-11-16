const PIX_KEY = "16752191760";
const WHATSAPP = "5521965956171";

// 05/03/2027 às 20:30 no horário de Brasília
const EVENT_DATE = new Date("2027-03-05T20:30:00-03:00");


/* =========================
   CONFIRMAÇÃO DE PRESENÇA
========================= */

function abrirModal(tipo) {
  const modal = document.getElementById("modal-confirmacao");

  if (!modal) return;

  modal.classList.add("show");

  if (tipo === "confirmacao") {
    const campo = document.getElementById("nomePrincipal");

    if (campo) {
      setTimeout(() => campo.focus(), 100);
    }
  }
}


function fecharModal() {
  const modal = document.getElementById("modal-confirmacao");

  if (modal) {
    modal.classList.remove("show");
  }
}


/* =========================
   ADICIONAR ADULTO
========================= */

function adicionarAdulto() {
  adicionarConvidado("adulto");
}


/* =========================
   ADICIONAR CRIANÇA
========================= */

function adicionarCrianca() {
  adicionarConvidado("crianca");
}


/* =========================
   CRIAR CAMPO DE CONVIDADO
========================= */

function adicionarConvidado(tipo) {

  const lista = tipo === "adulto"
    ? document.getElementById("lista-adultos")
    : document.getElementById("lista-criancas");

  if (!lista) return;

  const numero = lista.children.length + 1;

  const linha = document.createElement("div");

  linha.className = "convidado-item";

  linha.innerHTML = `
    <input
      type="text"
      class="campo-convidado"
      data-tipo="${tipo}"
      placeholder="${
        tipo === "adulto"
          ? "Nome completo do adulto"
          : "Nome completo da criança"
      }"
      autocomplete="name"
    >

    <button
      type="button"
      class="btn-remover"
      aria-label="Remover convidado">
      ×
    </button>
  `;

  linha.querySelector(".btn-remover").addEventListener("click", function () {
    linha.remove();
    atualizarNumeracao();
  });

  lista.appendChild(linha);

  const campo = linha.querySelector(".campo-convidado");

  if (campo) {
    campo.focus();
  }

  atualizarNumeracao();
}


/* =========================
   ATUALIZAR NUMERAÇÃO
========================= */

function atualizarNumeracao() {

  const adultos = document.querySelectorAll(
    '#lista-adultos .campo-convidado'
  );

  adultos.forEach((campo, index) => {
    campo.placeholder =
      `Nome completo do adulto ${index + 1}`;
  });


  const criancas = document.querySelectorAll(
    '#lista-criancas .campo-convidado'
  );

  criancas.forEach((campo, index) => {
    campo.placeholder =
      `Nome completo da criança ${index + 1}`;
  });
}


/* =========================
   PEGAR NOMES
========================= */

function pegarNomes(tipo) {

  const campos = document.querySelectorAll(
    `.campo-convidado[data-tipo="${tipo}"]`
  );

  return Array.from(campos)
    .map(campo => campo.value.trim())
    .filter(nome => nome !== "");
}


/* =========================
   ENVIAR CONFIRMAÇÃO
========================= */

function enviarConfirmacao() {

  const nomePrincipal =
    document.getElementById("nomePrincipal")?.value.trim();

  if (!nomePrincipal) {

    alert("Digite o nome completo do convidado principal.");

    document.getElementById("nomePrincipal")?.focus();

    return;
  }


  const adultos = pegarNomes("adulto");

  const criancas = pegarNomes("crianca");


  let mensagem =
    "Olá! Confirmo minha presença no XV da Júlia.%0A%0A";

  mensagem +=
    `CONVIDADO PRINCIPAL:%0A${encodeURIComponent(nomePrincipal)}%0A%0A`;


  mensagem +=
    `ADULTOS ACOMPANHANTES (${adultos.length}):%0A`;

  if (adultos.length > 0) {

    adultos.forEach((nome, index) => {

      mensagem +=
        `${index + 1}. ${encodeURIComponent(nome)}%0A`;

    });

  } else {

    mensagem += "Nenhum%0A";

  }


  mensagem +=
    `%0ACRIANÇAS ATÉ 7 ANOS (${criancas.length}):%0A`;

  if (criancas.length > 0) {

    criancas.forEach((nome, index) => {

      mensagem +=
        `${index + 1}. ${encodeURIComponent(nome)}%0A`;

    });

  } else {

    mensagem += "Nenhuma%0A";

  }


  const url =
    `https://wa.me/${WHATSAPP}?text=${mensagem}`;


  window.open(url, "_blank");

}


/* =========================
   COPIAR PIX
========================= */

async function copiarPix() {

  try {

    await navigator.clipboard.writeText(PIX_KEY);

    mostrarMensagem(
      "Chave PIX copiada!",
      "A chave PIX foi copiada para sua área de transferência."
    );

  } catch (erro) {

    const textarea =
      document.createElement("textarea");

    textarea.value = PIX_KEY;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    mostrarMensagem(
      "Chave PIX copiada!",
      "A chave PIX foi copiada para sua área de transferência."
    );
  }
}


/* =========================
   MENSAGEM
========================= */

function mostrarMensagem(titulo, texto) {

  const modal =
    document.getElementById("modal-confirmacao");

  if (!modal) return;

  const conteudo =
    modal.querySelector(".modal-conteudo");

  if (!conteudo) return;

  conteudo.innerHTML = `

    <button
      class="fechar"
      aria-label="Fechar"
      onclick="fecharModal()">
      ×
    </button>

    <h2>${titulo}</h2>

    <p class="subtitulo">
      ${texto}
    </p>

    <button
      class="btn-enviar"
      onclick="fecharModal()">
      FECHAR
    </button>

  `;

  modal.classList.add("show");
}


/* =========================
   CONTAGEM REGRESSIVA
========================= */

function atualizarCountdown() {

  const agora = new Date();

  const diferenca =
    EVENT_DATE.getTime() - agora.getTime();


  if (diferenca <= 0) {

    const contador =
      document.querySelector(".contador");

    if (contador) {

      contador.innerHTML = `
        <div class="contador-titulo">
          CHEGOU O GRANDE DIA!
        </div>
      `;

    }

    return;
  }


  const dias =
    Math.floor(diferenca / 86400000);

  const horas =
    Math.floor(
      (diferenca % 86400000) / 3600000
    );

  const minutos =
    Math.floor(
      (diferenca % 3600000) / 60000
    );

  const segundos =
    Math.floor(
      (diferenca % 60000) / 1000
    );


  const elementoDias =
    document.getElementById("dias");

  const elementoHoras =
    document.getElementById("horas");

  const elementoMinutos =
    document.getElementById("minutos");

  const elementoSegundos =
    document.getElementById("segundos");


  if (elementoDias) {
    elementoDias.textContent =
      String(dias).padStart(2, "0");
  }

  if (elementoHoras) {
    elementoHoras.textContent =
      String(horas).padStart(2, "0");
  }

  if (elementoMinutos) {
    elementoMinutos.textContent =
      String(minutos).padStart(2, "0");
  }

  if (elementoSegundos) {
    elementoSegundos.textContent =
      String(segundos).padStart(2, "0");
  }
}


/* =========================
   INICIAR CONTAGEM
========================= */

atualizarCountdown();

setInterval(atualizarCountdown, 1000);


/* =========================
   FECHAR MODAL AO CLICAR FORA
========================= */

window.addEventListener("click", function (event) {

  const modal =
    document.getElementById("modal-confirmacao");

  if (
    modal &&
    event.target === modal
  ) {

    fecharModal();

  }

});


/* =========================
   ESC FECHA O MODAL
========================= */

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    fecharModal();

  }

});
