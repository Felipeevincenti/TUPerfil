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
const inputTelefono = document.getElementById("telefono");
const inputEstudio = document.getElementById("estudio");
const inputEstado = document.getElementById("contenedorEstado");
const inputDescripcion = document.getElementById("textareaDescripcion");
const activador = document.getElementById("tema");

let id = 120;
let portadaBase64 = "";

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
      portadaBase64 = e.target.result;
      preview.src = portadaBase64;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
    portadaBase64 = "";
  }

  if (fileInput.files.length > 0) {
    nombreArchivo.textContent = file.name;
  }
});

// -----------------  CARGAR FECHAS DINAMICO ----------------- //

let dataJson = {};

fetch("../fecha.json")
  .then((res) => res.json())
  .then((res) => {
    dataJson = res;
    const anios = res.anios;
    const meses = res.meses;

    for (let i = 0; i < anios.length; i++) {
      contenedorAnios.innerHTML += `<option value="${anios[i]}">${anios[i]}</option>`;
    }

    for (let i = 0; i < meses.length; i++) {
      contenedorMes.innerHTML += `<option value="${meses[i].id}">${meses[i].mes}</option>`;
    }
  });

let valorMes = "";

contenedorAnios.addEventListener("change", () => {
  contenedorMes.value = "";
  contenedorDia.value = "";
})

contenedorMes.addEventListener("change", () => {
  if (contenedorMes.value != "") {
    valorMes = contenedorMes.value;
    contenedorDia.disabled = false;
    contenedorDia.innerHTML = "";

    let mesElegido = dataJson.meses.find((m) => m.id === Number(valorMes));
    contenedorDia.innerHTML += `<option value="">Dia</option>`;

    if (Number(mesElegido.id) == 2) {
      const anio = Number(contenedorAnios.value);
      if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
        for (let i = 1; i <= mesElegido.dias[1]; i++) {
          contenedorDia.innerHTML += `<option value="${i}">${i}</option>`;
        }
      }
      else {
        for (let i = 1; i <= mesElegido.dias[0]; i++) {
          contenedorDia.innerHTML += `<option value="${i}">${i}</option>`;
        }
      }
    }
    else {
      for (let i = 1; i <= mesElegido.dias; i++) {
        contenedorDia.innerHTML += `<option value="${i}">${i}</option>`;
      }
    }

  } else {
    contenedorDia.disabled = true;
    contenedorDia.innerHTML = "";
  }
});

// -----------------  CREACION DE PERFIL ----------------- //

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkboxesSeleccionados = document.querySelectorAll(
    ".crear__form-checkbox:checked"
  );

  const habilidades = Array.from(checkboxesSeleccionados).map(
    (chk) => chk.value
  );

  let formatoFecha = "";
  let formatoDia = contenedorDia.value;
  let formatoMes = contenedorMes.value;

  if (contenedorMes.value.length == 1) {
    formatoDia = `0${contenedorMes.value}`
  }
  if (contenedorMes.value.length == 1) {
    formatoMes = `0${contenedorMes.value}`
  }

  if (contenedorMes.value.length == 1) {
    formatoFecha = `${formatoDia}-0${formatoMes}-${contenedorAnios.value}`;
  } else {
    formatoFecha = `${contenedorDia.value}-${contenedorMes.value}-${contenedorAnios.value}`;
  }
  const idsExistentes = [1, 2, 3, 120];

  let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const todosLosIDs = [
    ...idsExistentes,
    ...usuariosGuardados.map(u => u.id)
  ];

  let nuevoId = todosLosIDs.length > 0 ? Math.max(...todosLosIDs) + 1 : 1;


  const usuario = {
    id: nuevoId,
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    email: inputEmail.value,
    telefono: inputTelefono.value,
    fechaNacimiento: formatoFecha,
    estado: inputEstado.value,
    estudio: inputEstudio.value,
    habilidades,
    descripcion: inputDescripcion.value,
    portada: portadaBase64
  };

  usuariosGuardados.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

  inputApellido.value = "";
  inputNombre.value = "";
  inputEmail.value = "";
  inputTelefono.value = "";
  inputEstado.value = "";
  inputEstudio.value = "";
  inputDescripcion.value = "";
  nombreArchivo.text = "No hay archivos seleccionados";
  preview.src = "";
  preview.style.display = "none";
  contenedorAnios.value = "";
  contenedorMes.value = "";
  contenedorDia.value = "";
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


// -----------------  VALIDACION DEL FORMULARIO ----------------- //
