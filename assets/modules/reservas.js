const reservas = [
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
    }
]

const inputBusca = document.querySelector('#buscar-reserva')

inputBusca.addEventListener('input', function(e){
    const termoBusca = inputBusca.value.toLowerCase().trim()
    filtrarReservas(termoBusca)

})
document.addEventListener('click', function(e){
    const el = e.target
    e.preventDefault()
    if(el.classList.contains('btn-nova-reserva')){
        criarModal()
    }
})

function filtrarReservas(termoBusca){
    const reservasFiltradas = reservas.filter(reserva => 
        reserva.nome.toLowerCase().includes(termoBusca) ||
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

function abrirModal(){
   
}

function fecharModal(){

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

    const inputNome = document.createElement('input')
    inputNome.classList.add('input-nome')
    inputNome.type = 'text'
    form.appendChild(inputNome)
    inputNome.placeholder = 'Nome do hóspede'
    const inputCheckIn = document.createElement('input')
    inputCheckIn.classList.add('input-checkIn')
    inputCheckIn.type = 'date'
    form.appendChild(inputCheckIn)
    const inputCheckOut = document.createElement('input')
    inputCheckOut.classList.add('input-checkOut')
    inputCheckOut.type = 'date'
    form.appendChild(inputCheckOut)

    const selectQuarto = document.createElement('select')
    selectQuarto.classList.add('select-quarto')
    form.appendChild(selectQuarto)
    const optionSingle = document.createElement('option')
    optionSingle.textContent = 'Single'
    optionSingle.value = 'single'
    const optionDuplo = document.createElement('option')
    optionDuplo.textContent = 'Duplo'
    optionDuplo.value = 'duplo'
    const optionTriplo = document.createElement('option')
    optionTriplo.textContent = 'Triplo'
    optionTriplo.value = 'triplo'

    selectQuarto.appendChild(optionSingle)
    selectQuarto.appendChild(optionDuplo)
    selectQuarto.appendChild(optionTriplo)

    const selectStatus = document.createElement('select')
    selectStatus.classList.add('select-status')
    form.appendChild(selectStatus)
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

    const botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('button-salvar')
    botaoSalvar.type = 'submit'
    botaoSalvar.textContent = 'Salvar'
    const botaoCancelar = document.createElement('button')
    botaoCancelar.classList.add('button-cancelar')
    botaoCancelar.type = 'button'
    botaoCancelar.textContent = 'Cancelar'
    form.appendChild(botaoSalvar)
    form.appendChild(botaoCancelar)

    const body = document.body

    body.appendChild(overlay)

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
        numeroReserva.classList.add('numero-reserva')
        numeroReserva.textContent = `Reserva #00${reserva.id}` 
        infoReserva.appendChild(numeroReserva)
        const nomeHospede = document.createElement('h3')
        infoReserva.appendChild(nomeHospede)
        nomeHospede.textContent = reserva.nome
        const infoQuarto = document.createElement('p')
        infoReserva.appendChild(infoQuarto)
        infoQuarto.textContent = `${reserva.quarto} • ${reserva.checkIn} - ${reserva.checkOut}`
        const status = document.createElement('span')
        status.classList.add('status', reserva.status)
        status.textContent = capitalizar(reserva.status)
        cardReserva.appendChild(status)
    }
    atualizarResumo()
}




