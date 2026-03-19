export function filtrarReservas(reservas, termoBusca) {
    const termo = termoBusca.toLowerCase().trim();

    return reservas.filter(reserva =>
        reserva.nome.toLowerCase().includes(termo) ||
        String(reserva.cpf).toLowerCase().includes(termo) ||
        reserva.quarto.toLowerCase().includes(termo) ||
        reserva.status.toLowerCase().includes(termo) ||
        reserva.checkIn.toLowerCase().includes(termo) ||
        reserva.checkOut.toLowerCase().includes(termo) ||
        String(reserva.id).includes(termo)
    );
}