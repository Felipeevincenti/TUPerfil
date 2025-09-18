const contenedorPerfiles = document.getElementById("contenedorPerfiles");
const activador = document.getElementById("tema");

let perfiles = [];

fetch("../perfiles.json")
    .then(res => res.json())
    .then(res => {

        perfiles.push(...res);

        for (let i = 0; i < perfiles.length; i++) {
            contenedorPerfiles.innerHTML += `
            <a class="perfiles__folio" href="templates/perfil.html?id=${perfiles[i].id}">
                <img class="perfiles__folio-img" src="${perfiles[i].portada}" alt="">
                <div class="perfiles__folio-info">  
                    <p class="perfiles__folio-apellido">${perfiles[i].apellido}</p>
                    <small class="perfiles__folio-estudio">${perfiles[i].estudio}</small>
                    <small class="perfiles__folio-estado">${perfiles[i].estado}</small>
                </div>
            </a>`
        }
    })

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
    localStorage.setItem('tema', temaActual);L
    aplicarIconos();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('dark');
    }
    aplicarIconos();
});