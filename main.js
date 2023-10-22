const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const closeDialogBtn = favDialog.querySelector("#closeBtn");
const form = document.querySelector("form");
const libraryDisplay = document.querySelector(".library-display");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();

  favDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (form.title.value.trim() === "") {
    form.title.focus();
    return;
  }

  if (form.author.value.trim() === "") {
    form.author.focus();
    return;
  }

  if (isNaN(Number(form.pages.value)) || Number(form.pages.value) <= 0) {
    form.pages.focus();
    return;
  }

  addBookToLibrary(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
  );

  form.title.value = "";
  form.pages.value = "";
  form.author.value = "";
  displayBooksInLibrary(library);
  favDialog.close();
});

function displayInvalidMessages() {}

// Library Storage ?
const library = [];

// Book constructor

function Book(title, author, pageNo, read) {
  this.title = title;
  this.author = author;
  this.pageNo = pageNo;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(bookTitle, bookAuthor, pageNo, read) {
  const newBook = new Book(bookTitle, bookAuthor, pageNo, read);

  library.push(newBook);
}

function displayBooksInLibrary(library) {
  if (library.length === 0) {
    libraryDisplay.textContent = "";
    return;
  }

  // else create cards for each entry
  let len = library.length;

  libraryDisplay.textContent = "";

  for (let i = 0; i < len; i++) {
    const bookEntry = document.createElement("div");
    bookEntry.setAttribute("class", "book-entry");
    bookEntry.setAttribute("data-index", `${i}`);

    const bookTitle = document.createElement("h2");
    bookTitle.setAttribute("class", "book-title");
    bookTitle.textContent = `${library[i].title}`;

    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "book-author");
    bookAuthor.textContent = `${library[i].author}`;

    const bookPageNumber = document.createElement("p");
    bookPageNumber.setAttribute("class", "book-page-numbers");
    bookPageNumber.textContent = `${library[i].pageNo} ${
      library[i].pageNo === 1 ? "page" : "pages"
    }`;

    const readBtn = document.createElement("button");
    readBtn.setAttribute("class", "read");
    readBtn.setAttribute("data-state", `${library[i].read}`);
    readBtn.setAttribute("type", "button");
    readBtn.textContent = `${library[i].read ? "READ" : "NOT READ"}`;
    readBtn.addEventListener("click", toggleBookEntryReadStatus);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book-entry");
    removeBtn.setAttribute("data-index", `${i}`);
    removeBtn.textContent = "REMOVE";
    removeBtn.addEventListener("click", removeBookEntry);

    bookEntry.appendChild(bookTitle);
    bookEntry.appendChild(bookAuthor);
    bookEntry.appendChild(bookPageNumber);
    bookEntry.appendChild(readBtn);
    bookEntry.appendChild(removeBtn);
    libraryDisplay.appendChild(bookEntry);
  }
}

function toggleBookEntryReadStatus() {
  let element = this;
  let parentEntryIndex = this.parentElement.getAttribute("data-index");

  library[parentEntryIndex].toggleRead();
  element.textContent = `${
    library[parentEntryIndex].read ? "READ" : "NOT READ"
  }`;
  element.setAttribute("data-state", `${library[parentEntryIndex].read}`);
}

function removeBookEntry() {
  let parentIndex = this.getAttribute("data-index");

  library.splice(parentIndex, 1);
  libraryDisplay.removeChild(this.parentElement);
  displayBooksInLibrary(library);
}

displayBooksInLibrary(library);
