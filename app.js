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
  new Book("Atomic Habits", "James Clear", 280, true),
  new Book("eat that frog", "James Clear", 280, false),
  new Book(
    "Sapiens: A Brief History of Humankind",
    "Yuval Noah Harari",
    512,
    true
  ),
  new Book(
    "12 Rules for Life: An Antidote to Chaos",
    "Jordan B. Peterson",
    409,
    false
  ),
  new Book(
    "In Defense of Food: An Eater's Manifesto",
    "Michael Pollan",
    205,
    false
  ),
];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary() {
  // get elements
  const nameInput = document.querySelector("#bookName");
  const authorInput = document.querySelector("#bookAuthor");
  const pagesInput = document.querySelector("#pages");
  const statusInput = document.querySelector("#status");

  // use input constraints api to validate inputs
  if (
    !nameInput.checkValidity() ||
    !authorInput.checkValidity() ||
    !pagesInput.checkValidity()
  ) {
    // show error message
    const errorMessage = document.querySelector(".error");
    console.log({
      name: nameInput.validationMessage,
      author: authorInput.validationMessage,
      pages: pagesInput.validationMessage,
    });
    errorMessage.classList.add("show");
    errorMessage.textContent = "Please fill out all fields correctly";
    errorMessage.textContent += nameInput.validationMessage;
    errorMessage.textContent += authorInput.validationMessage;
    errorMessage.textContent += pagesInput.validationMessage;
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 3000);
    return;
  }

  let bookToAdd = new Book(
    nameInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.checked
  );

  library.push(bookToAdd);
  updateUI();

  toggleOverlay();
}

function mountAddBook() {
  document
    .querySelector("#addABookBtn")
    .addEventListener("click", addBookToLibrary);
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
            <p class="status status--${!bookStatus ? "reading" : "read"}">${
      !bookStatus ? "Currently reading" : "read"
    }</p>
            <button class="btn btn--changeStatus btn--${
              !bookStatus ? "green" : "yellow"
            }">✔️ ${!bookStatus ? "finished?" : "reread?"}</button>
            <button class="btn">
                <svg class="btn--delete" width="30" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </button>
                        `;
    bookDiv.dataset.bookName = bookName;
    booksGrid.appendChild(bookDiv);
  }

  mountDeleteBtns();
  mountChangeStatusBtns();
}

function mountDeleteBtns() {
  document.querySelectorAll(".btn--delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteBook(e.target);
    });
  });
}

function mountChangeStatusBtns() {
  document.querySelectorAll(".btn--changeStatus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      changeStatus(e.target);
    });
  });
}

function deleteBook(el) {
  const bookName = el.closest(".book").dataset.bookName;

  const bookIndex = library.findIndex((el) => el.name === bookName);

  library.splice(bookIndex, 1);
  updateUI();
}

function changeStatus(el) {
  const bookName = el.closest(".book").dataset.bookName;

  const bookIndex = library.findIndex((el) => el.name === bookName);

  library[bookIndex].changeStatus();

  updateUI();
}
