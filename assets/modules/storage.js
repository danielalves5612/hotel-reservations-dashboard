export function salvarReservas(reservas) {
    const json = JSON.stringify(reservas);
    localStorage.setItem('reservas', json);
}

export function exibirReservas() {
    const reservasSalvas = localStorage.getItem('reservas');

    if (!reservasSalvas) {
        return [];
    }

    const reservas = JSON.parse(reservasSalvas);

    return Array.isArray(reservas) ? reservas : [];
}