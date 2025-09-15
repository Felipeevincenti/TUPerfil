const params = new URLSearchParams(window.location.search);
const idPerfil = parseInt(params.get("id"));

const perfilContainer = document.getElementById("perfil");

let usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];

let perfil = usuariosLocal.find(p => p.id === idPerfil);

if (perfil) {
    mostrarPerfil(perfil);
} else {
    fetch("../perfiles.json")
        .then(res => res.json())
        .then(res => {
            let perfil = res.find(p => p.id === idPerfil);
            if (perfil) {
                mostrarPerfil(perfil);
            } else {
                perfilContainer.innerHTML = `<p>Perfil no encontrado</p>`;
            }
        });
}

function mostrarPerfil(perfil) {
    perfilContainer.innerHTML = `
        <div class="perfil__img-contenedor">
            <img class="img__contenedor-img" src="${perfil.portada}" alt="">
        </div>

        <div class="perfil__nombres-contenedor">
            <p>${perfil.nombre}</p>
            <p>${perfil.apellido}</p>
        </div>

        <p class="perfil__nacimiento">${perfil.fechaNacimiento}</p>

        <div class="perfil__tecnologias-contenedor">
            <img class="perfil__tecnologias-icono" src="../assets/icons/html-icono.svg" alt="">
            <img class="perfil__tecnologias-icono" src="../assets/icons/css-icono.svg" alt="">
            <img class="perfil__tecnologias-icono" src="../assets/icons/js-icono.svg" alt="">
            <img class="perfil__tecnologias-icono" src="../assets/icons/c-icono.svg" alt="">
            <img class="perfil__tecnologias-icono" src="../assets/icons/mp.icono.svg" alt="">
        </div>

        <div class="perfil__sobremi-contenedor">
            <h1 class="perfil__sobremi-titulo">Sobre Mi</h1>
            <p class="perfil__sobremi-descripcion">${perfil.estado} ${perfil.estudio}</p>
            <p class="perfil__sobremi-descripcion">${perfil.descripcion}</p>
        </div>
    `;
}