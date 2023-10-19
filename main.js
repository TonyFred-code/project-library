const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const outputBox = document.querySelector('output');
const selectEl = favDialog.querySelector('select');
const confirmBtn = favDialog.querySelector('#confirmBtn');
const form = document.querySelector("form");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    favDialog.showModal();
});

// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener('change', (e) => {
  confirmBtn.value = selectEl.value;
});

// "Confirm" button triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', (e) => {
  outputBox.value = favDialog.returnValue === 'default' ? "No return value." : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});
confirmBtn.addEventListener('click', (event) => {
  event.preventDefault(); // We don't want to submit this fake form
//   console.log(form.favAnimal.value)
  console.log(form.title.value);
  console.log(form.author.value);
  console.log(form.read.checked);
    console.log(form.pages.value);
  favDialog.close(selectEl.value); // Have to send the select box value here.
});


// Library Storage ?
const library = [];


// Book constructor

function Book(title, author, pageNo, read) {
    this.title = title;
    this.author = author;
    this.pageNo = pageNo;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(bookTitle, bookAuthor, pageNo, read) {
    const newBook = new Book(bookTitle, bookAuthor, pageNo, read);

    library.push(newBook);
    console.log(library);
}