function capitalizar(texto) {
    if (!texto) return '';
    return texto[0].toUpperCase() + texto.slice(1);
}

function exibirData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

export function mensagemErro(campo, mensagem) {
    const div = campo.closest('.div-campo');
    const pErro = div.querySelector('.error-message');

    if (!pErro) {
        const p = document.createElement('p');
        p.classList.add('error-message');
        p.textContent = mensagem;
        div.appendChild(p);
        return;
    }

    pErro.textContent = mensagem;
}

export function limparErro(campo) {
    const div = campo.closest('.div-campo');
    const pErro = div.querySelector('.error-message');

    if (pErro) {
        pErro.remove();
    }
}

function atualizarResumo(reservas) {
    const numeroHoje = document.querySelector('.numero-hoje');
    const numeroPendentes = document.querySelector('.numero-pendentes');
    const numeroCanceladas = document.querySelector('.numero-canceladas');
    const numeroConfirmadas = document.querySelector('.numero-confirmadas');

    const confirmadas = reservas.filter(reserva => reserva.status === 'confirmada');
    const pendentes = reservas.filter(reserva => reserva.status === 'pendente');
    const canceladas = reservas.filter(reserva => reserva.status === 'cancelada');

    numeroPendentes.textContent = pendentes.length;
    numeroCanceladas.textContent = canceladas.length;
    numeroConfirmadas.textContent = confirmadas.length;

    const hoje = new Date().toISOString().split('T')[0];
    const reservasHoje = reservas.filter(reserva => reserva.checkIn === hoje);
    numeroHoje.textContent = reservasHoje.length;
}

export function gerarAvatar(nome) {
    const nomeAvatar = nome.trim().replace(/\s+/g, '+');
    return `https://ui-avatars.com/api/?name=${nomeAvatar}`;
}

function criaCardReserva(reserva, reservasContainer) {
    const cardReserva = document.createElement('div');
    cardReserva.classList.add('card-reserva');
    cardReserva.dataset.id = reserva.id;
    reservasContainer.appendChild(cardReserva);

    const fotoHospede = document.createElement('div');
    fotoHospede.classList.add('foto-hospede');
    cardReserva.appendChild(fotoHospede);

    const imgPerfil = document.createElement('img');
    imgPerfil.src = reserva.avatar || gerarAvatar(reserva.nome);
    imgPerfil.alt = `Foto de ${reserva.nome}`;
    fotoHospede.appendChild(imgPerfil);

    const infoReserva = document.createElement('div');
    infoReserva.classList.add('info-reserva');
    cardReserva.appendChild(infoReserva);

    const numeroReserva = document.createElement('small');
    numeroReserva.classList.add('numero-reserva');
    numeroReserva.textContent = `Reserva #00${reserva.id}`;
    infoReserva.appendChild(numeroReserva);

    const nomeHospede = document.createElement('h3');
    nomeHospede.textContent = reserva.nome;
    infoReserva.appendChild(nomeHospede);

    const infoQuarto = document.createElement('p');
    infoQuarto.textContent = `Categoria: ${capitalizar(reserva.quarto)}`;
    infoReserva.appendChild(infoQuarto);

    const infoCheckIn = document.createElement('p');
    infoCheckIn.textContent = `Check-In: ${exibirData(reserva.checkIn)}`;
    infoReserva.appendChild(infoCheckIn);

    const infoCheckOut = document.createElement('p');
    infoCheckOut.textContent = `Check-Out: ${exibirData(reserva.checkOut)}`;
    infoReserva.appendChild(infoCheckOut);

    const status = document.createElement('span');
    status.classList.add('status', reserva.status);
    status.textContent = capitalizar(reserva.status);
    cardReserva.appendChild(status);

    const acoes = document.createElement('div');
    acoes.classList.add('acoes-reserva');
    cardReserva.appendChild(acoes);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('button-excluir');
    botaoExcluir.textContent = 'Excluir';
    acoes.appendChild(botaoExcluir);

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('button-editar');
    botaoEditar.textContent = 'Editar';
    acoes.appendChild(botaoEditar);
}

export function renderizarReservas(listaReservas, reservasTotais = listaReservas) {
    const reservasContainer = document.querySelector('.reservas-container');
    reservasContainer.innerHTML = '';

    for (const reserva of listaReservas) {
        criaCardReserva(reserva, reservasContainer);
    }

    atualizarResumo(reservasTotais);
}

export function fecharModal() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
}

export function criaCampoInput(form, labelFor, labelText, classInput, inputType, inputId, inputPlaceholder = '') {
    const div = document.createElement('div');
    div.classList.add('div-campo');

    const label = document.createElement('label');
    label.htmlFor = labelFor;
    label.textContent = labelText;
    div.appendChild(label);

    const input = document.createElement('input');
    input.classList.add(classInput);
    input.type = inputType;
    input.id = inputId;
    input.placeholder = inputPlaceholder;
    div.appendChild(input);

    form.appendChild(div);

    return input;
}

export function criaCampoSelect(
    form,
    labelFor,
    labelText,
    classSelect,
    selectId,
    opcoes
) {
    const div = document.createElement('div');
    div.classList.add('div-campo');

    const label = document.createElement('label');
    label.htmlFor = labelFor;
    label.textContent = labelText;
    div.appendChild(label);

    const select = document.createElement('select');
    select.classList.add(classSelect);
    select.id = selectId;

    for (const opcao of opcoes) {
        const option = document.createElement('option');
        option.textContent = opcao.texto;
        option.value = opcao.valor;
        select.appendChild(option);
    }

    div.appendChild(select);
    form.appendChild(div);

    return select;
}