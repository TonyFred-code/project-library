const showButton = document.getElementById('showDialog');
const bookEntryDialog = document.getElementById('book-entry-dialog');
const confirmBtn = bookEntryDialog.querySelector('#confirmBtn');
const closeDialogBtn = bookEntryDialog.querySelector('#closeBtn');
const form = document.querySelector('form');
const libraryDisplay = document.querySelector('.library-display');
const titleErrContainer = document.querySelector('.book-title.error-msg');
const authorErrContainer = document.querySelector('.book-author.error-msg');
const pagesNoErrContainer = document.querySelector('.book-pages.error-msg');
const addDummyBookEntriesBtn = document.querySelector(
  '.add-dummy-book-entries'
);

// Library Storage ?
let displayedLibrary = [];
let notDisplayedLibrary = [];

addDummyBookEntriesBtn.addEventListener('click', displayDummyBooks);

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener('click', () => {
  bookEntryDialog.showModal();
});

closeDialogBtn.addEventListener('click', (e) => {
  e.preventDefault();

  bookEntryDialog.close();
});

bookEntryDialog.addEventListener('close', (e) => {
  form.title.value = '';
  form.pages.value = '';
  form.author.value = '';
});

const bookTitleInput = form.elements['title'];
const authorInput = form.elements['author'];
const pageNoInput = form.elements['pages'];

bookTitleInput.addEventListener('input', (e) => {
  let value = bookTitleInput.value;

  if (value.trim() === '') {
    bookTitleInput.setCustomValidity('Please input a book title');
  } else {
    bookTitleInput.setCustomValidity('');
  }

  bookTitleInput.reportValidity();
});

authorInput.addEventListener('input', () => {
  let value = authorInput.value;

  if (value.trim() === '') {
    authorInput.setCustomValidity('Please input a book author');
  } else {
    authorInput.setCustomValidity('');
  }

  authorInput.reportValidity();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  titleErrContainer.classList.add('hidden');
  authorErrContainer.classList.add('hidden');
  pagesNoErrContainer.classList.add('hidden');

  if (form.title.value.trim() === '') {
    form.title.setCustomValidity('Please input a book title');
    form.title.reportValidity();
    return;
  }

  if (form.author.value.trim() === '') {
    authorInput.setCustomValidity('Please input a book author');
    authorInput.reportValidity();
    return;
  }

  if (isNaN(Number(form.pages.value)) || Number(form.pages.value) <= 0) {
    pageNoInput.setCustomValidity(
      'Please input a valid number greater than zero '
    );
    pageNoInput.reportValidity();
    return;
  }

  addBookToLibrary(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
  );

  displayBooksInLibrary(notDisplayedLibrary);
  displayedLibrary.push(...notDisplayedLibrary);
  notDisplayedLibrary = [];
  bookEntryDialog.close();
});

confirmBtn.addEventListener('click', (event) => {});

function displayInvalidMessages(errMsg, errDisplayElm) {
  if (typeof errMsg !== 'string' || errMsg.trim() === '') {
    return;
  }

  if (errDisplayElm === null || !errDisplayElm) {
    return;
  }

  errDisplayElm.textContent = errMsg;
  errDisplayElm.classList.remove('hidden');
}

// Book constructor

class Book {
  constructor(title, author, pageNo, read) {
    this.title = title;
    this.author = author;
    this.pageNo = pageNo;
    this.read = read;
    this.displayed = false;
  }
  toggleRead() {
    this.read = !this.read;
  }
  markDisplayed() {
    this.displayed = true;
  }
}

function addBookToLibrary(bookTitle, bookAuthor, pageNo, read) {
  const newBook = new Book(bookTitle, bookAuthor, pageNo, read);

  notDisplayedLibrary.push(newBook);
}

function displayBooksInLibrary(library) {
  if (library.length === 0) {
    libraryDisplay.textContent = '';
    return;
  }

  // else create cards for each entry
  let len = library.length;

  for (let i = 0; i < len; i++) {
    if (library[i].displayed) {
      continue;
    }

    const bookEntry = document.createElement('div');
    bookEntry.setAttribute('class', 'book-entry');
    bookEntry.setAttribute('data-index', `${i}`);

    const bookTitle = document.createElement('h2');
    bookTitle.setAttribute('class', 'book-title');
    bookTitle.textContent = `${library[i].title}`;

    const bookAuthor = document.createElement('p');
    bookAuthor.setAttribute('class', 'book-author');
    bookAuthor.textContent = `${library[i].author}`;

    const bookPageNumber = document.createElement('p');
    bookPageNumber.setAttribute('class', 'book-page-numbers');
    bookPageNumber.textContent = `${library[i].pageNo} ${
      library[i].pageNo === 1 ? 'page' : 'pages'
    }`;

    const readBtn = document.createElement('button');
    readBtn.setAttribute('class', 'read');
    readBtn.setAttribute('data-state', `${library[i].read}`);
    readBtn.setAttribute('type', 'button');
    readBtn.textContent = `${library[i].read ? 'READ' : 'NOT READ'}`;
    readBtn.addEventListener('click', toggleBookEntryReadStatus);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-book-entry');
    removeBtn.setAttribute('data-index', `${i}`);
    removeBtn.textContent = 'REMOVE';
    removeBtn.addEventListener('click', removeBookEntry);

    bookEntry.appendChild(bookTitle);
    bookEntry.appendChild(bookAuthor);
    bookEntry.appendChild(bookPageNumber);
    bookEntry.appendChild(readBtn);
    bookEntry.appendChild(removeBtn);
    libraryDisplay.appendChild(bookEntry);
    library[i].displayed = true;
  }
}

function toggleBookEntryReadStatus() {
  let element = this;
  let parentEntryIndex = this.parentElement.getAttribute('data-index');

  displayedLibrary[parentEntryIndex].toggleRead();
  element.textContent = `${
    displayedLibrary[parentEntryIndex].read ? 'READ' : 'NOT READ'
  }`;
  element.setAttribute(
    'data-state',
    `${displayedLibrary[parentEntryIndex].read}`
  );
}

function removeBookEntry() {
  let parentIndex = this.getAttribute('data-index');

  displayedLibrary.splice(parentIndex, 1);
  libraryDisplay.removeChild(this.parentElement);
}

displayBooksInLibrary(notDisplayedLibrary);

function displayDummyBooks() {
  let libraryLen = displayedLibrary.length;
  let entriesNo = 0;

  if (libraryLen === 0) {
    entriesNo = getRndInt(7, 12);
  } else {
    entriesNo = libraryLen + 1;
  }

  for (let i = libraryLen; i < entriesNo; i++) {
    let title = `Book Title ${i + 1}`;
    let author = `Author of Book ${i + 1}`;
    let pagesNo = getRndInt(200, 1000);
    let checked = pagesNo % 2 === 0;
    let book = new Book(title, author, pagesNo, checked);
    notDisplayedLibrary.push(book);
  }

  displayBooksInLibrary(notDisplayedLibrary);
  displayedLibrary.push(...notDisplayedLibrary);
  notDisplayedLibrary = [];
}

function getRndInt(min, max) {
  // The maximum is inclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
