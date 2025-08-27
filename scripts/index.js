const headerMobile = document.getElementById("headerMobile");
const headerBtnMenu = document.querySelector(".headerMobile__icono-menu");
const headerNavMobile = document.querySelector(".headerMobile__nav");
const headerUlMobile = document.querySelector(".headerMobile__ul");

// headerBtnMenu.addEventListener("click", () => {
//     headerUlMobile.classList.toggle("active");
//     headerNavMobile.classList.toggle("active");
// });

window.addEventListener("scroll", () => {
    let scrollActual = window.scrollY;

    if (scrollActual > 0) {
        headerMobile.classList.add("scroll");
    } else {
        headerMobile.classList.remove("scroll");
    }
});
