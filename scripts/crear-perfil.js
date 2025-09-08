// -----------------  REFERENCIAS HTML ----------------- //

const fileInput = document.getElementById("fileInput");
const portadaBtn = document.getElementById("portadaBtn");
const nombreArchivo = document.getElementById("nombreArchivo");
const preview = document.getElementById("preview");
const contenedorDia = document.getElementById("contenedorDia");
const contenedorMes = document.getElementById("contenedorMes");
const contenedorAnios = document.getElementById("contenedorAnios");
const form = document.getElementById("crear__form");

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("correoElectronico");
const inputDescripcion = document.getElementById("textAreaDescripcion");
const inputEstado = document.getElementById("contenedorEstado");



// -----------------  SUBIR PORTADA ----------------- //

portadaBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {

        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = "none";
    };
    if (fileInput.files.length > 0) {
        nombreArchivo.textContent = file.name;
    };
});



// -----------------  CARGAR FECHAS DINAMICO ----------------- //

let dataJson = {};

fetch("../fecha.json")
    .then(res => res.json())
    .then(res => {
        dataJson = res;
        const anios = res.anios;
        const meses = res.meses;

        for (let i = 0; i < anios.length; i++) {
            contenedorAnios.innerHTML += `<option value="${anios}">${anios[i]}</option>`;
        };

        for (let i = 0; i < meses.length; i++) {
            contenedorMes.innerHTML += `<option value="${meses[i].mes}">${meses[i].mes}</option>`;
        };
    });

let valorMes = "";

contenedorMes.addEventListener("change", () => {
    if (contenedorMes.value != "") {
        valorMes = contenedorMes.value;
        contenedorDia.disabled = false;
        contenedorDia.innerHTML = "";

        let mesElegido = dataJson.meses.find(m => m.mes === valorMes);

        contenedorDia.innerHTML += `<option value="">Dia</option>`;

        for (let i = 1; i <= mesElegido.dias; i++) {
            contenedorDia.innerHTML += `<option value="${i}">${i}</option>`;
        };

    } else {
        contenedorDia.disabled = true;
        contenedorDia.innerHTML = "";
    };
});



// -----------------  CREACION DE PERFIL ----------------- //

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
        nombre: inputNombre.value,
        apellido: inputApellido.value
    };

    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

    usuariosGuardados.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    console.log("Usuarios en Local Storage:", usuariosGuardados);
});