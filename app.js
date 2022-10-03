
function toggleOverlay() {
    const overlay = document.querySelector(".overlay");

    overlay.classList.toggle("show");
}

const cancelBtn = document.querySelector("#cancelBtn");
const addBookBtn = document.querySelector("#addBookBtn");

cancelBtn.addEventListener("click", toggleOverlay)
addBookBtn.addEventListener("click", toggleOverlay)