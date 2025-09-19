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
            </a>`;
        };
    });