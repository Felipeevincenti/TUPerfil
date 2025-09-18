const contenedorPerfiles = document.getElementById("contenedorPerfiles");
const activador = document.getElementById("tema");

let perfiles = JSON.parse(localStorage.getItem("usuarios") || "[]");
perfiles = perfiles.reverse();
fetch("../perfiles.json")
    .then(res => res.json())
    .then(res => {
        perfiles.push(...res);
        for (let i = 0; i < perfiles.length; i++) {
            contenedorPerfiles.innerHTML += `
            <a class="explorar__folio" href="../templates/perfil.html?id=${perfiles[i].id}">

                <div class="explorar__folio-img-container">
                    <img class="explorar__folio-img" src="${perfiles[i].portada}" alt="">
                </div>    
                
                <div class="explorar__folio-info">
                    
                    <div class="explorar__folio-nombres">
                        <p class="explorar__folio-nombres__apellido">${perfiles[i].apellido}</p>
                    </div>
                    <small class="explorar__folio-estudio">${perfiles[i].estudio}</small>
                    <small class="explorar__folio-estado">${perfiles[i].estado}</small>
                        
                </div>
                        
            </a>`;
        }
    });

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