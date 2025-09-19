const activador = document.getElementById("tema");

function aplicarIconos() {
    const iconMoon = activador.querySelector('.icon-moon');
    const iconSun = activador.querySelector('.icon-sun');
    const esOscuro = document.body.classList.contains('dark');

    if (esOscuro) {
        iconMoon.style.display = 'inline';
        iconSun.style.display = 'none';
    } else {
        iconMoon.style.display = 'none';
        iconSun.style.display = 'inline';
    }
}

function cambioTema() {
    document.body.classList.toggle('dark');
    const temaActual = document.body.classList.contains('dark') ? 'oscuro' : 'claro';
    localStorage.setItem('tema', temaActual);
    aplicarIconos();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('dark');
    }
    aplicarIconos();
});