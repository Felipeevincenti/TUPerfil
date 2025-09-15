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
             <div class="perfil__img-contenedor" id="imgContenedor">
            <img class="img__contenedor-img" src="${perfil.portada}" alt="Imagen de ${perfil.nombre}">
        </div>

        <div class="perfil__nombres-contenedor">
            <p>${perfil.nombre}</p>
            <p>${perfil.apellido}</p>
        </div>

        <p class="perfil__nacimiento">${perfil.fechaNacimiento}</p>

        <div class="perfil__tecnologias-contenedor">
            ${perfil.habilidades
            .map(tec => `<img class="perfil__tecnologias-icono" src="../assets/icons/${tec}-icono.svg" alt="${tec}">`)
            .join('')}
        </div>
        
        <div class="perfil__sobremi-contenedor">
            <h1 class="perfil__sobremi-titulo">Sobre Mi</h1>
            <p class="perfil__sobremi-descripcion">${perfil.estado} ${perfil.estudio}</p>
            <p class="perfil__sobremi-descripcion">${perfil.descripcion}</p>
        </div>
    `;

    const imgContenedor = document.getElementById("imgContenedor");
    imgContenedor.addEventListener("click", () => {
        abrirImagen(perfil); // detecta si es Base64 o URL normal
    });

}

function abrirImagen(perfil) {
    const img = perfil.portada;

    if (img.startsWith("data:image")) {
        const [meta, datos] = img.split(',');
        const mime = meta.match(/:(.*?);/)[1];
        const bin = atob(datos);
        const array = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) array[i] = bin.charCodeAt(i);
        const blob = new Blob([array], { type: mime });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    } else {
        window.open(img, "_blank");
    }
}