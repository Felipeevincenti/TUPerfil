const contenedorPerfiles = document.getElementById("contenedorPerfiles");

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


function cambioTema() {
    const temaActual = document.documentElementl.getAttribute('data-theme');

    const temaNuevo = temaActual === 'dark' ? 'light' : 'dark';
}

function aplicarTema(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const activador = document.getElementById('tema');

    if (activador) {
        const iconMoon = activador.querySelector('.icon-moon');
        const iconSun = activador.querySelector('.icon-sun');
        if (theme === 'dark') {
            iconMoon.style.display = 'inline';
            iconSun.style.display = 'none';
        }else{
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline';
        }
        
    }
}

