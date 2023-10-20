const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const closeDialogBtn = favDialog.querySelector("#closeBtn");
const form = document.querySelector("form");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("closed without saving");
  favDialog.close();
});

// "Confirm" button triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener("close", (e) => {
  console.log("closed");
});
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  validateForm();

  if (form.title.value && form.author.value && Number(form.pages.value) > 0) {
    console.log(form.title.value);
    console.log(form.author.value);
    console.log(form.read.checked);
    console.log(form.pages.value);
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked)
    favDialog.close();
  }
});

function validateForm() {
  if (form.title.value.trim() === "") {
    console.log("not valid");
    form.title.validity.valid = false;
    form.title.focus();
  }
}

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
  console.log(library);
}

function createBookEntryCard() {

}