// start app
document.addEventListener("DOMContentLoaded", () => {
    mountForm();
    mountAddBook();
    updateUI();
});

// show and hide form 
function mountForm(params) {

    // toggle btns
    const cancelBtn = document.querySelector("#cancelBtn");
    const addBookBtn = document.querySelector("#addBookBtn");

    // attach event listeners
    cancelBtn.addEventListener("click", toggleOverlay);
    addBookBtn.addEventListener("click", toggleOverlay);
}

// toggle overlay
function toggleOverlay() {
    const overlay = document.querySelector(".overlay");

    overlay.classList.toggle("show");
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
    },
    {
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        pages: 512,
        isRead: false
    },
    {
        name: "12 Rules for Life: An Antidote to Chaos",
        author: "Jordan B. Peterson",
        pages: 409,
        isRead: true
    }, 
    {
        name: "In Defense of Food: An Eater's Manifesto",
        author: "Michael Pollan",
        pages: 205,
        isRead: false
    },
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

    library.push(bookToAdd);
    updateUI();

    toggleOverlay();
}

function mountAddBook() {
    document.querySelector("#addABookBtn").addEventListener("click", addBookToLibrary)
}

function updateUI() {
    const booksGrid = document.querySelector(".books-grid");
    booksGrid.innerHTML = "";
    for (let book of library) {
        let bookName = book.name;
        let bookAuthor = book.author;
        let bookPages = book.pages;
        let bookStatus = book.isRead;

        // make structure
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <h3>${bookName}</h3>
            <p class="author">By ${bookAuthor}</p>
            <p class="page">${bookPages} pages</p>
            <p class="status status--${!bookStatus ? "reading" : "read"}">${!bookStatus ? "Currently reading" : "read"}</p>
            <button class="btn btn--${!bookStatus ? "green" : "yellow"}">✔️ ${!bookStatus ? "finished?" : "reread?"}</button>
            <button class="btn">
                <svg class="btn--delete" width="30" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </button>
                        `;
        booksGrid.appendChild(bookDiv)        
    }
}
