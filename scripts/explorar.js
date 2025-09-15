const contenedorPerfiles = document.getElementById("contenedorPerfiles");

let perfiles = JSON.parse(localStorage.getItem("usuarios") || "[]");

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