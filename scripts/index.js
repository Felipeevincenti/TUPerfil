const contenedorPerfiles = document.getElementById("contenedorPerfiles");

let perfiles = [];

fetch("../perfiles.json")
    .then(res => res.json())
    .then(res => {

        perfiles.push(...res);

        for (let i = 0; i < perfiles.length; i++) {
            contenedorPerfiles.innerHTML += `
        <div class="perfiles__folio">
            <img class="perfiles__folio-img" src="https://www.w3schools.com/howto/img_avatar.png" alt="">
            <div class="perfiles__folio-info">  
                <p class="perfiles__folio-estudio">${perfiles[i].estudio}</p>
                <small class="perfiles__folio-estado">${perfiles[i].estado}</small>
            </div>
        </div>`
        }
    })