const fileInput = document.getElementById("fileInput");
const portadaBtn = document.getElementById("portadaBtn");
const nombreArchivo = document.getElementById("nombreArchivo");
const preview = document.getElementById("preview");

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
    }
    if (fileInput.files.length > 0) {
        nombreArchivo.textContent = file.name;
    }
});