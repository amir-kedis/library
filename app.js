// start app
document.addEventListener("DOMContentLoaded", () => {
    mountForm();
    mountAddBook();
});

// show and hide form 
function mountForm(params) {
    // toggle overlay
    function toggleOverlay() {
        const overlay = document.querySelector(".overlay");

        overlay.classList.toggle("show");
    }

    // toggle btns
    const cancelBtn = document.querySelector("#cancelBtn");
    const addBookBtn = document.querySelector("#addBookBtn");

    // attach event listeners
    cancelBtn.addEventListener("click", toggleOverlay);
    addBookBtn.addEventListener("click", toggleOverlay);
}

let library = [
    {
        name: "Atomic Habits",
        author: "James Clear",
        pages: 280,
        isRead: true
    },
     {
        name: "eat that frog",
        author: "James Clear",
        pages: 280,
        isRead: true
    }
]

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    // get elements
    const nameInput = document.querySelector("#bookName");
    const authorInput = document.querySelector("#bookAuthor");
    const pagesInput = document.querySelector("#pages");
    const statusInput = document.querySelector("#status");

    let bookToAdd = new Book(nameInput.value, authorInput.value, pagesInput.value, statusInput.checked)

    library.push(bookToAdd)
}

function mountAddBook() {
    document.querySelector("#addABookBtn").addEventListener("click", addBookToLibrary)
}


