const contenedorPerfiles = document.getElementById("contenedorPerfiles");
const inputBusqueda = document.querySelector(".contenedor__input-profecion");
const mediaQuery = window.matchMedia("(min-width: 800px)");

let perfiles = JSON.parse(localStorage.getItem("usuarios") || "[]");
perfiles = perfiles.reverse();

function imprimirPerfiles(perfil) {
    const nombreHTML = mediaQuery.matches
        ? `<p class="explorar__folio-nombres__nombre">${perfil.nombre}</p>`
        : "";

    contenedorPerfiles.innerHTML += `
        <a class="explorar__folio" href="../templates/perfil.html?id=${perfil.id}">
            <div class="explorar__folio-img-container">
                <img class="explorar__folio-img" src="${perfil.portada}" alt="">
            </div>    
            <div class="explorar__folio-info">
                <div class="explorar__folio-nombres">
                    ${nombreHTML}
                    <p class="explorar__folio-nombres__apellido">${perfil.apellido}</p>
                </div>
                <small class="explorar__folio-estudio">${perfil.estudio}</small>
                <small class="explorar__folio-estado">${perfil.estado}</small>
            </div>
        </a>`;
}

fetch("../perfiles.json")
    .then(res => res.json())
    .then(res => {
        perfiles.push(...res);

        function renderizarPerfiles(input) {
            contenedorPerfiles.innerHTML = "";

            for (let i = 0; i < perfiles.length; i++) {
                const nombreCompleto = (perfiles[i].nombre + perfiles[i].apellido)
                    .replace(/\s+/g, "")
                    .toLowerCase();

                if (nombreCompleto.startsWith(input)) {
                    imprimirPerfiles(perfiles[i]);
                }
            }
        }

        inputBusqueda.addEventListener("input", () => {
            const inputBusquedaFormateado = inputBusqueda.value
                .replace(/\s+/g, "")
                .toLowerCase();
            renderizarPerfiles(inputBusquedaFormateado);
        });

        mediaQuery.addEventListener("change", () => renderizarPerfiles(""));

        renderizarPerfiles("");
    });