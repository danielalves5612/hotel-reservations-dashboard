import ValidaCPF from './validaCPF.js';
import { salvarReservas, exibirReservas } from './storage.js';
import { filtrarReservas } from './filtros.js';
import {
    mensagemErro,
    limparErro,
    fecharModal,
    gerarAvatar,
    criaCampoInput,
    criaCampoSelect,
    renderizarReservas
} from './ui.js';

let reservas = [];
let reservaEmEdicao = null;

function validarFormulario(nome, cpf, checkIn, checkOut, campos) {
    const { inputNome, inputCpf, inputCheckIn, inputCheckOut } = campos;
    let temErro = false;

    const cpfValido = new ValidaCPF(cpf);
    const cpfInputado = cpfValido.valida();

    if (!nome) {
        mensagemErro(inputNome, 'O Nome deve ser preenchido.');
        temErro = true;
    }

    if (!cpf) {
        mensagemErro(inputCpf, 'O CPF precisa ser preenchido.');
        temErro = true;
    } else if (cpfInputado === false) {
        mensagemErro(inputCpf, 'Por favor, digite um CPF válido.');
        temErro = true;
    }

    if (!checkIn) {
        mensagemErro(inputCheckIn, 'Selecione uma data para o Check-In.');
        temErro = true;
    }

    if (!checkOut) {
        mensagemErro(inputCheckOut, 'Selecione uma data para o Check-Out.');
        temErro = true;
    }

    return temErro;
}

function handleSubmit(campos) {
    const {
        inputNome,
        inputCpf,
        inputCheckIn,
        inputCheckOut,
        selectQuarto,
        selectStatus
    } = campos;

    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim();
    const checkIn = inputCheckIn.value;
    const checkOut = inputCheckOut.value;
    const quarto = selectQuarto.value;
    const status = selectStatus.value;

    const temErro = validarFormulario(nome, cpf, checkIn, checkOut, campos);

    if (temErro) return;

    const nomeNormalizado = nome.toLowerCase().trim();

    const reservaExistente = reservas.find(reserva =>
        reserva.cpf === cpf &&
        reserva.id !== reservaEmEdicao?.id
    );

    if (
        reservaExistente &&
        reservaExistente.nome.toLowerCase().trim() !== nomeNormalizado
    ) {
        mensagemErro(inputCpf, 'CPF já cadastrado para outro hóspede.');
        return;
    }

    if (reservaEmEdicao === null) {
        const novaReserva = {
            id: reservas.length + 1,
            nome,
            cpf,
            avatar: gerarAvatar(nome),
            quarto,
            checkIn,
            checkOut,
            status
        };

        reservas.push(novaReserva);
    } else {
        reservaEmEdicao.nome = nome;
        reservaEmEdicao.cpf = cpf;
        reservaEmEdicao.avatar = gerarAvatar(nome);
        reservaEmEdicao.quarto = quarto;
        reservaEmEdicao.checkIn = checkIn;
        reservaEmEdicao.checkOut = checkOut;
        reservaEmEdicao.status = status;

        reservaEmEdicao = null;
    }

    salvarReservas(reservas);
    renderizarReservas(reservas, reservas);
    fecharModal();
}

function criarModal() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    overlay.appendChild(modal);

    const titulo = document.createElement('h1');
    titulo.textContent = reservaEmEdicao ? 'Editar Reserva' : 'Cadastro de Reserva';
    modal.appendChild(titulo);

    const form = document.createElement('form');
    form.classList.add('form-reserva');
    modal.appendChild(form);

    const inputNome = criaCampoInput(
        form,
        'nome-hospede',
        'Nome',
        'input-nome',
        'text',
        'nome-hospede',
        'Nome do hóspede'
    );

    const inputCpf = criaCampoInput(
        form,
        'cpf-hospede',
        'CPF',
        'input-cpf',
        'number',
        'cpf-hospede',
        'Digite o CPF'
    );

    const inputCheckIn = criaCampoInput(
        form,
        'data-checkin',
        'Check-In',
        'input-checkIn',
        'date',
        'data-checkin'
    );

    const inputCheckOut = criaCampoInput(
        form,
        'data-checkout',
        'Check-Out',
        'input-checkOut',
        'date',
        'data-checkout'
    );

    const selectQuarto = criaCampoSelect(
        form,
        'quarto-hospede',
        'Quarto',
        'select-quarto',
        'quarto-hospede',
        [
            { texto: 'Quarto Single', valor: 'single' },
            { texto: 'Quarto Duplo', valor: 'duplo' },
            { texto: 'Quarto Triplo', valor: 'triplo' }
        ]
    );

    const selectStatus = criaCampoSelect(
        form,
        'status-reserva',
        'Status',
        'select-status',
        'status-reserva',
        [
            { texto: 'Confirmada', valor: 'confirmada' },
            { texto: 'Cancelada', valor: 'cancelada' },
            { texto: 'Pendente', valor: 'pendente' }
        ]
    );

    const divBotoes = document.createElement('div');
    divBotoes.classList.add('div-campo');
    form.appendChild(divBotoes);

    const botaoSalvar = document.createElement('button');
    botaoSalvar.classList.add('button-salvar');
    botaoSalvar.type = 'submit';
    botaoSalvar.textContent = 'Salvar';
    divBotoes.appendChild(botaoSalvar);

    const botaoCancelar = document.createElement('button');
    botaoCancelar.classList.add('button-cancelar');
    botaoCancelar.type = 'button';
    botaoCancelar.textContent = 'Cancelar';
    divBotoes.appendChild(botaoCancelar);

    document.body.appendChild(overlay);

    if (reservaEmEdicao) {
        inputNome.value = reservaEmEdicao.nome;
        inputCpf.value = reservaEmEdicao.cpf;
        inputCheckIn.value = reservaEmEdicao.checkIn;
        inputCheckOut.value = reservaEmEdicao.checkOut;
        selectQuarto.value = reservaEmEdicao.quarto;
        selectStatus.value = reservaEmEdicao.status;
    }

    const campos = {
        inputNome,
        inputCpf,
        inputCheckIn,
        inputCheckOut,
        selectQuarto,
        selectStatus
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmit(campos);
    });

    inputNome.addEventListener('input', e => limparErro(e.target));
    inputCpf.addEventListener('input', e => limparErro(e.target));
    inputCheckIn.addEventListener('input', e => limparErro(e.target));
    inputCheckOut.addEventListener('input', e => limparErro(e.target));
}

function configurarEventos() {
    const inputBusca = document.querySelector('#buscar-reserva');

    inputBusca.addEventListener('input', function () {
        const termoBusca = inputBusca.value.toLowerCase().trim();
        const reservasFiltradas = filtrarReservas(reservas, termoBusca);
        renderizarReservas(reservasFiltradas, reservas);
    });

    document.addEventListener('click', function (e) {
        const el = e.target;

        if (el.classList.contains('btn-nova-reserva')) {
            e.preventDefault();
            reservaEmEdicao = null;
            criarModal();
        }

        if (el.classList.contains('button-cancelar')) {
            fecharModal();
        }

        if (el.classList.contains('button-excluir')) {
            const cardReserva = el.closest('.card-reserva');
            const idClicado = Number(cardReserva.dataset.id);

            reservas = reservas.filter(reserva => reserva.id !== idClicado);

            salvarReservas(reservas);
            renderizarReservas(reservas, reservas);
        }

        if (el.classList.contains('button-editar')) {
            const cardReserva = el.closest('.card-reserva');
            const idClicado = Number(cardReserva.dataset.id);

            reservaEmEdicao = reservas.find(reserva => reserva.id === idClicado);

            criarModal();
        }
    });
}

export function initReservasApp() {
    reservas = exibirReservas().map(reserva => ({
        ...reserva,
        avatar: reserva.avatar || gerarAvatar(reserva.nome)
    }));

    renderizarReservas(reservas, reservas);
    configurarEventos();
}