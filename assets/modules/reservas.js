import ValidaCPF from './validaCPF.js'
let reservas = []

const inputBusca = document.querySelector('#buscar-reserva')

// Estado
let reservaEmEdicao = null

// Evento do InputBusca
inputBusca.addEventListener('input', function(e){
    const termoBusca = inputBusca.value.toLowerCase().trim()
    filtrarReservas(termoBusca)
})

// Evento Global
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

// Estorage
function salvarReservas(){
    const json = JSON.stringify(reservas)
    localStorage.setItem('reservas', json)
}

// Estorage
function exibirReservas(){
    const reservasSalvas = localStorage.getItem('reservas')
    if(reservasSalvas === null){
        reservas = []
    }else{
        const json = JSON.parse(reservasSalvas)
        reservas = json
    }
    renderizarReservas(reservas)
}

// CRUD
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

// Renderizar
function capitalizar(texto){
    return texto[0].toUpperCase() + texto.slice(1)
}

function exibirData(data){
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}

// Modal
function fecharModal(){
    const overlay = document.querySelector('.overlay')
    overlay.remove()
}

function criaCampoInput(form, labelFor, labelText, classInput, inputType, inputId, inputPlaceHolder){
    const div = document.createElement('div')
    div.classList.add('div-campo')
    const label = document.createElement('label')
    label.htmlFor = labelFor
    label.textContent = labelText
    div.appendChild(label)
    const input = document.createElement('input')
    input.classList.add(`${classInput}`)
    input.type = inputType
    input.id = inputId
    input.placeholder = inputPlaceHolder
    div.appendChild(input)
    form.appendChild(div)
}

function criaCampoSelect(form, labelFor, labelText, classSelect, selectId, optionTextUm, optionTextDois, optionTextTres, optionValueUm, optionValueDois, optionValueTres){
    const div = document.createElement('div')
    div.classList.add('div-campo')
    const label = document.createElement('label')
    label.htmlFor = labelFor
    label.textContent = labelText
    const select = document.createElement('select')
    select.classList.add(`${classSelect}`)
    select.id = selectId
    const optionUm = document.createElement('option')
    optionUm.textContent = optionTextUm
    optionUm.value = optionValueUm
    const optionDois = document.createElement('option')
    optionDois.textContent = optionTextDois
    optionDois.value = optionValueDois
    const optionTres = document.createElement('option')
    optionTres.textContent = optionTextTres
    optionTres.value = optionValueTres
    select.appendChild(optionUm)
    select.appendChild(optionDois)
    select.appendChild(optionTres)
    div.appendChild(label)
    div.appendChild(select)
    form.appendChild(div)
}

// Modal
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

    criaCampoInput(form, 'nome-hospede', 'Nome', 'input-nome', 'text', 'nome-hospede', 'Nome do hóspede')
    criaCampoInput(form, 'cpf-hospede', 'CPF', 'input-cpf', 'number', 'cpf-hospede', 'Digite o CPF')
    criaCampoInput(form, 'data-checkin', 'Check-in', 'input-checkIn', 'date', 'data-checkin')
    criaCampoInput(form, 'data-checkout', 'Check-Out', 'input-checkOut', 'date', 'data-checkout')

    criaCampoSelect(form, 'quarto-hospede', 'Quarto', 'select-quarto', 'quarto-hospede', 'Quarto Single', 'Quarto Duplo', 'Quarto Triplo', 'single', 'duplo', 'triplo')
    criaCampoSelect(form, 'status-reserva', 'Status', 'select-status', 'status-reserva', 'Confirmada', 'Cancelada', 'Pendente', 'confirmada', 'cancelada', 'pendente')
 
    const div = document.createElement('div')
    div.classList.add('div-campo')
    form.appendChild(div)
    const botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('button-salvar')
    botaoSalvar.type = 'submit'
    botaoSalvar.textContent = 'Salvar'
    const botaoCancelar = document.createElement('button')
    botaoCancelar.classList.add('button-cancelar')
    botaoCancelar.type = 'button'
    botaoCancelar.textContent = 'Cancelar'
    div.appendChild(botaoSalvar)
    div.appendChild(botaoCancelar)

    const body = document.body

    body.appendChild(overlay)

    form.addEventListener('submit', function(e){
        e.preventDefault()
        handleSubmit()
        
})

function validarFormulario(nome, cpf, checkIn, checkOut){
    let temErro = false
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
        
    return temErro === true
}

function handleSubmit(){
        const nome = inputNome.value
        const cpf = inputCpf.value
        const checkIn = inputCheckIn.value
        const checkOut = inputCheckOut.value
        const selectQuarto = form.querySelector('.select-quarto')
        const selectStatus = form.querySelector('.select-status')
        const quarto = selectQuarto.value
        const status = selectStatus.value
        const temErro = validarFormulario(nome, cpf, checkIn, checkOut)

        if(temErro) return 
        
        if(reservaEmEdicao === null){
            const cpfExiste = reservas.some(reserva => reserva.cpf === cpf)
            if(cpfExiste){
                mensagemErro(inputCpf, 'CPF cadastrado em outra Reserva')
                return
            }
            }else{
                const cpfExiste = reservas.some(reserva => reserva.cpf === cpf && reserva.id !== reservaEmEdicao.id)
                if(cpfExiste){
                mensagemErro(inputCpf, 'CPF cadastrado em outra Reserva')
                return
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
    }

    const inputNome = form.querySelector('.input-nome')
    const inputCpf = form.querySelector('.input-cpf')
    const inputCheckIn = form.querySelector('.input-checkIn')
    const inputCheckOut = form.querySelector('.input-checkOut')

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

// Validação
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

// Validação
function limparErro(campo){
    const div = campo.closest('.div-campo')
    const p = div.querySelector('.error-message')
    if(p !== null){
        p.remove()
    }
}

// Renderização
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

// Renderização

function criaCardReserva(reserva, reservasContainer){
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
    infoQuarto.textContent = `Quarto ${capitalizar(reserva.quarto)}`
    const infoData = document.createElement('p')
    infoData.textContent = `${exibirData(reserva.checkIn)} ° ${exibirData(reserva.checkOut)}`
    infoReserva.appendChild(infoData)
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


export default function renderizarReservas(listaReservas = reservas){
    const reservasContainer = document.querySelector('.reservas-container')
    reservasContainer.innerHTML = ''
    for(let reserva of listaReservas){
        criaCardReserva(reserva, reservasContainer)
    }
    atualizarResumo()
    salvarReservas()
}

exibirReservas()




