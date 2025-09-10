const contenedorPerfiles = document.getElementById("contenedorPerfiles");

let perfiles = JSON.parse(localStorage.getItem("usuarios") || "[]");

fetch("../perfiles.json")
    .then(res => res.json())
    .then(res => {
        perfiles.push(...res);
        for (let i = 0; i < perfiles.length; i++) {
            contenedorPerfiles.innerHTML += `
                <div class="explorar__folio">

                        <img class="explorar__folio-img" src="https://www.w3schools.com/howto/img_avatar.png" alt="">
                        
                        <div class="explorar__folio-info">
                            
                            <div class="explorar__folio-nombres">
                                <p class="explorar__folio-nombres__apellido">${perfiles[i].apellido}</p>
                                <p class="explorar__folio-nombres__nombre">${perfiles[i].nombre}</p>
                            </div>
                            <small class="explorar__folio-estudio">${perfiles[i].estudio}</small>
                            <small class="explorar__folio-estado">${perfiles[i].estado}</small>

                        </div>

                    </div>`;
        }
    });