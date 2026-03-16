import ValidaCPF from './validaCPF.js'
let reservas = []

/*
   {
        id: 1,
        nome: 'João Silva',
        quarto: 'Quarto Duplo',
        checkIn: '2026-03-11',
        checkOut: '2026-03-13',
        status: 'confirmada'
    },
    {
        id: 2,
        nome: 'Daniel Alves',
        quarto: 'Quarto Triplo',
        checkIn: '2026-03-25',
        checkOut: '2026-03-26',
        status: 'cancelada'
    },
    {
        id: 3,
        nome: 'Gabriel Souza',
        quarto: 'Quarto Single',
        checkIn: '2026-03-01',
        checkOut: '2026-03-06',
        status: 'pendente'
    }*/

const inputBusca = document.querySelector('#buscar-reserva')
let reservaEmEdicao = null

inputBusca.addEventListener('input', function(e){
    const termoBusca = inputBusca.value.toLowerCase().trim()
    filtrarReservas(termoBusca)

})


document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('btn-nova-reserva')){
        e.preventDefault()
        criarModal()
    }

    if(el.classList.contains('button-cancelar')){
        fecharModal()
    }

    if(el.classList.contains('button-excluir')){
        const reserva = el.closest('.card-reserva')
        const idClicado = Number(reserva.dataset.id)
        reservas = reservas.filter(reserva => reserva.id !== idClicado)
        salvarReservas()
        renderizarReservas(reservas)
    }

    if(el.classList.contains('button-editar')){
        const reservaClicada = el.closest('.card-reserva')
        const idClicado = Number(reservaClicada.dataset.id)
        const reservaSelecionada = reservas.find(reserva => reserva.id === idClicado)
        criarModal()
        const nome = document.querySelector('.input-nome')
        nome.value = reservaSelecionada.nome
        const cpf = document.querySelector('.input-cpf')
        cpf.value = reservaSelecionada.cpf
        const checkIn = document.querySelector('.input-checkIn')
        checkIn.value = reservaSelecionada.checkIn
        const checkOut = document.querySelector('.input-checkOut')
        checkOut.value = reservaSelecionada.checkOut
        const quarto = document.querySelector('.select-quarto')
        quarto.value = reservaSelecionada.quarto
        const status = document.querySelector('.select-status')
        status.value = reservaSelecionada.status
        reservaEmEdicao = reservaSelecionada
    }
})

function salvarReservas(){
    const json = JSON.stringify(reservas)
    localStorage.setItem('reservas', json)
}

function exibirReservas(){
    const reservasSalvas = localStorage.getItem('reservas')
    const json = JSON.parse(reservasSalvas)
    reservas = json
    salvarReservas()
    renderizarReservas(reservas)
}

function filtrarReservas(termoBusca){
    const reservasFiltradas = reservas.filter(reserva => 
        reserva.nome.toLowerCase().includes(termoBusca) ||
        String(reserva.cpf).toLowerCase().includes(termoBusca) ||
        reserva.quarto.toLowerCase().includes(termoBusca) ||
        reserva.status.toLowerCase().includes(termoBusca) ||
        reserva.checkIn.toLowerCase().includes(termoBusca) ||
        reserva.checkOut.toLowerCase().includes(termoBusca) ||
        String(reserva.id).includes(termoBusca)
    )

    renderizarReservas(reservasFiltradas)
}

function capitalizar(texto){
    return texto[0].toUpperCase() + texto.slice(1)
}

function fecharModal(){
    const overlay = document.querySelector('.overlay')
    overlay.remove()
}

function criarModal(){
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')

    const modal = document.createElement('div')
    modal.classList.add('modal')
    overlay.appendChild(modal)
    const h1 = document.createElement('h1')
    h1.textContent = 'Cadastro de Reserva'
    modal.appendChild(h1)
    const form = document.createElement('form')
    form.classList.add('form-reserva')
    modal.appendChild(form)

    const divNome = document.createElement('div')
    divNome.classList.add('div-campo')
    form.appendChild(divNome)
    const labelNome = document.createElement('label')
    labelNome.htmlFor = 'nome-hospede'
    labelNome.textContent = 'Nome'
    divNome.appendChild(labelNome)
    const inputNome = document.createElement('input')
    inputNome.classList.add('input-nome')
    inputNome.type = 'text'
    inputNome.id = 'nome-hospede'
    divNome.appendChild(inputNome)
    inputNome.placeholder = 'Nome do hóspede'
    const divCpf = document.createElement('div')
    divCpf.classList.add('div-campo')
    form.appendChild(divCpf)
    const labelCpf = document.createElement('label')
    labelCpf.htmlFor = 'cpf-hospede'
    labelCpf.textContent = 'CPF'
    divCpf.appendChild(labelCpf)
    const inputCpf = document.createElement('input')
    inputCpf.classList.add('input-cpf')
    inputCpf.type = 'number'
    inputCpf.id = 'cpf-hospede'
    divCpf.appendChild(inputCpf)
    const divCheckIn = document.createElement('div')
    divCheckIn.classList.add('div-campo')
    form.appendChild(divCheckIn)
    const labelCheckIn = document.createElement('label')
    labelCheckIn.htmlFor = 'data-checkin'
    labelCheckIn.textContent = 'Check-In'
    divCheckIn.appendChild(labelCheckIn)
    const inputCheckIn = document.createElement('input')
    inputCheckIn.classList.add('input-checkIn')
    inputCheckIn.type = 'date'
    inputCheckIn.id = 'data-checkin'
    divCheckIn.appendChild(inputCheckIn)
    const divCheckOut = document.createElement('div')
    divCheckOut.classList.add('div-campo')
    form.appendChild(divCheckOut)
    const labelCheckOut = document.createElement('label')
    labelCheckOut.htmlFor = 'data-checkout'
    labelCheckOut.textContent = 'Check-Out'
    divCheckOut.appendChild(labelCheckOut)
    const inputCheckOut = document.createElement('input')
    inputCheckOut.classList.add('input-checkOut')
    inputCheckOut.type = 'date'
    inputCheckOut.id = 'data-checkout'
    divCheckOut.appendChild(inputCheckOut)

    const divQuarto = document.createElement('div')
    divQuarto.classList.add('.div-campo')
    form.appendChild(divQuarto)
    const labelQuarto = document.createElement('label')
    labelQuarto.htmlFor = 'quarto-hospede'
    labelQuarto.textContent = 'Quarto'
    divQuarto.appendChild(labelQuarto)
    const selectQuarto = document.createElement('select')
    selectQuarto.classList.add('select-quarto')
    selectQuarto.id = 'quarto-hospede'
    divQuarto.appendChild(selectQuarto)
    const optionSingle = document.createElement('option')
    optionSingle.textContent = 'Quarto Single'
    optionSingle.value = 'single'
    const optionDuplo = document.createElement('option')
    optionDuplo.textContent = 'Quarto Duplo'
    optionDuplo.value = 'duplo'
    const optionTriplo = document.createElement('option')
    optionTriplo.textContent = 'Quarto Triplo'
    optionTriplo.value = 'triplo'

    selectQuarto.appendChild(optionSingle)
    selectQuarto.appendChild(optionDuplo)
    selectQuarto.appendChild(optionTriplo)

    const divStatus = document.createElement('div')
    divStatus.classList.add('div-campo')
    form.appendChild(divStatus)
    const labelStatus = document.createElement('label')
    labelStatus.htmlFor = 'status-reserva'
    labelStatus.textContent = 'Status'
    divStatus.appendChild(labelStatus)
    const selectStatus = document.createElement('select')
    selectStatus.id = 'status-reserva'
    selectStatus.classList.add('select-status')
    divStatus.appendChild(selectStatus)
    const optionConfirmada = document.createElement('option')
    optionConfirmada.textContent = 'Confirmada'
    optionConfirmada.value = 'confirmada'
    const optionCancelada = document.createElement('option')
    optionCancelada.textContent = 'Cancelada'
    optionCancelada.value = 'cancelada'
    const optionPendente = document.createElement('option')
    optionPendente.textContent = 'Pendente'
    optionPendente.value = 'pendente'

    selectStatus.appendChild(optionPendente)
    selectStatus.appendChild(optionCancelada)
    selectStatus.appendChild(optionConfirmada)

    const divBotoes = document.createElement('div')
    divBotoes.classList.add('div-campo')
    form.appendChild(divBotoes)
    const botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('button-salvar')
    botaoSalvar.type = 'submit'
    botaoSalvar.textContent = 'Salvar'
    const botaoCancelar = document.createElement('button')
    botaoCancelar.classList.add('button-cancelar')
    botaoCancelar.type = 'button'
    botaoCancelar.textContent = 'Cancelar'
    divBotoes.appendChild(botaoSalvar)
    divBotoes.appendChild(botaoCancelar)

    const body = document.body

    body.appendChild(overlay)

    form.addEventListener('submit', function(e){
        e.preventDefault()
        let temErro = false
        const nome = inputNome.value
        const cpf = inputCpf.value
        const checkIn = inputCheckIn.value
        const checkOut = inputCheckOut.value
        const quarto = selectQuarto.value
        const status = selectStatus.value
        const cpfValido =  new ValidaCPF(cpf)
        const cpfInputado = cpfValido.valida()
        if(!nome) {
            mensagemErro(inputNome, 'O Nome deve ser preenchido.')
            temErro = true
        }
        if(!cpf){
            mensagemErro(inputCpf, 'O CPF precisa ser preenchido.')
            temErro = true
        }else if(cpfInputado === false){
            mensagemErro(inputCpf, 'Por favor, digite um CPF válido.')
            temErro = true
        }
        if(!checkIn){
            mensagemErro(inputCheckIn, 'Selecione uma data para o Check-In.')
            temErro = true
        }
        if(!checkOut){
            mensagemErro(inputCheckOut, 'Selecione uma data para o Check-Out.')
            temErro = true
        }
        if(temErro === true){
            return
        }
        const cpfExiste = reservas.some(reserva => reserva.cpf === cpf)
        const cpfEditado = reservas.some(reserva => reserva.id !== reservaEmEdicao.id)
        if(reservaEmEdicao === null){
            if(cpfExiste === true){
                mensagemErro(inputCpf, 'CPF cadastrado em outra Reserva')
                return
            }
        }else if(reservaEmEdicao !== true){
            if(cpfEditado === true){
                mensagemErro(inputCpf, 'CPF cadastrado em outra Reserva')
            }
        }
        if(reservaEmEdicao === null){
            const novaReserva = {
            id: reservas.length + 1,
            nome: nome,
            cpf: cpf,
            quarto: quarto, 
            checkIn: checkIn,
            checkOut: checkOut,
            status: status
            }
            reservas.push(novaReserva)
            renderizarReservas()
            fecharModal()
            salvarReservas()
        }else{
            reservaEmEdicao.nome = nome
            reservaEmEdicao.cpf = cpf
            reservaEmEdicao.quarto = quarto
            reservaEmEdicao.checkIn = checkIn
            reservaEmEdicao.checkOut = checkOut
            reservaEmEdicao.status = status
            salvarReservas()
            renderizarReservas()
            fecharModal()
            reservaEmEdicao = null
        }
    })

    inputNome.addEventListener('input', function(e){
        const el = e.target
        limparErro(el)
    })
    inputCpf.addEventListener('input', function(e){
        const el = e.target
        limparErro(el)
    })
    inputCheckIn.addEventListener('input', function(e){
        const el = e.target
        limparErro(el)
    })
    inputCheckOut.addEventListener('input', function(e){
        const el = e.target
        limparErro(el)
    })
}

function mensagemErro(campo, mensagem){
    const div = campo.closest('.div-campo')
    const pErro = div.querySelector('.error-message')
    const label = div.querySelector('label')
    if(pErro === null){
        const p = document.createElement('p')
        p.classList.add('error-message')
        p.textContent = mensagem
        div.appendChild(p)
    }else{
        pErro.textContent = mensagem
    }
}

function limparErro(campo){
    const div = campo.closest('.div-campo')
    const p = div.querySelector('.error-message')
    if(p !== null){
        p.remove()
    }
}

function atualizarResumo(){
    const numeroHoje = document.querySelector('.numero-hoje')
    const numeroPendentes = document.querySelector('.numero-pendentes')
    const numeroCanceladas = document.querySelector('.numero-canceladas')
    const numeroConfirmadas = document.querySelector('.numero-confirmadas')
    const confirmadas = reservas.filter(reserva => reserva.status === 'confirmada')
    const pendentes = reservas.filter(reserva => reserva.status === 'pendente')
    const canceladas = reservas.filter(reserva => reserva.status === 'cancelada')
    numeroPendentes.textContent = pendentes.length
    numeroCanceladas.textContent = canceladas.length
    numeroConfirmadas.textContent = confirmadas.length
    const hoje = new Date().toISOString().split('T')[0]
    const reservasHoje = reservas.filter(reserva => reserva.checkIn === hoje)
    numeroHoje.textContent = reservasHoje.length
}

export default function renderizarReservas(listaReservas = reservas){
    const reservasContainer = document.querySelector('.reservas-container')
    reservasContainer.innerHTML = ''
    for(let reserva of listaReservas){
        const cardReserva = document.createElement('div')
        cardReserva.classList.add('card-reserva')
        reservasContainer.appendChild(cardReserva)
        const fotoHospede = document.createElement('div')
        fotoHospede.classList.add('foto-hospede')
        cardReserva.appendChild(fotoHospede)
        const imgPerfil = document.createElement('img')
        fotoHospede.appendChild(imgPerfil)
        imgPerfil.src = 'assets/img/foto-perfil.jpeg'
        imgPerfil.alt = `Foto de ${reserva.nome}`
        const infoReserva = document.createElement('div')
        infoReserva.classList.add('info-reserva')
        cardReserva.appendChild(infoReserva)
        const numeroReserva = document.createElement('small')
        cardReserva.dataset.id = reserva.id
        numeroReserva.classList.add('numero-reserva')
        numeroReserva.textContent = `Reserva #00${reserva.id}` 
        infoReserva.appendChild(numeroReserva)
        const nomeHospede = document.createElement('h3')
        infoReserva.appendChild(nomeHospede)
        nomeHospede.textContent = reserva.nome
        const infoQuarto = document.createElement('p')
        infoReserva.appendChild(infoQuarto)
        infoQuarto.textContent = `Quarto ${capitalizar(reserva.quarto)} ${reserva.checkIn} - ${reserva.checkOut}`
        const status = document.createElement('span')
        status.classList.add('status', reserva.status)
        status.textContent = capitalizar(reserva.status)
        cardReserva.appendChild(status)
        const acoes = document.createElement('div')
        acoes.classList.add('acoes-reserva')
        cardReserva.appendChild(acoes)
        const botaoExcluir = document.createElement('button')
        botaoExcluir.classList.add('button-excluir')
        botaoExcluir.textContent = 'Excluir'
        acoes.appendChild(botaoExcluir)
        const botaoEditar = document.createElement('button')
        botaoEditar.classList.add('button-editar')
        botaoEditar.textContent = 'Editar'
        acoes.appendChild(botaoEditar)
    }
    atualizarResumo()
    salvarReservas()
}

exibirReservas()




