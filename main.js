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

  // validateForm();
  let formValid = validateForm();
  if (form.title.value.trim() === "") {
    console.log("not valid");
    form.title.validity.valid = false;
    form.title.focus();
  }

  if (formValid) {
    console.log(form.title.value);
    console.log(form.author.value);
    console.log(form.read.checked);
    console.log(form.pages.value);
    addBookToLibrary(
      form.title.value,
      form.author.value,
      form.pages.value,
      form.read.checked
    );
    favDialog.close();
  } else {
    displayInvalidMessages();
  }
});

function validateForm() {
  const title = form.title.value;
  const author = form.author.value;
  const pageNo = form.pages.value;
  // const readStatus = form.read.checked;

  if (title.trim() === "") {
    return false;
  }

  if (author.trim() === "") {
    console.log("invalid");
    return false;
  }

  if (Number(pageNo) <= 0 || Number(pageNo).isNaN) {
    console.log("invalid");
    return false;
  }

  return true;
}

function displayInvalidMessages() {
  console.log('displaying error messages')
}

// Library Storage ?
const library = [];

// Book constructor

function Book(title, author, pageNo, read) {
  const toggleRead = function () {
    this.read = !this.read;
  };

  return {
    title,
    author,
    pageNo,
    read,
    toggleRead,
  };
}

function addBookToLibrary(bookTitle, bookAuthor, pageNo, read) {
  const newBook = new Book(bookTitle, bookAuthor, pageNo, read);

  library.push(newBook);
  console.log(library);
}

function createBookEntryCard() {}

function displayBookEntries() {}
