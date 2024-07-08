const libraryIndex = (function () {
  "use strict";

  const module = {};

  const books = [];

  const sidebarBooks = document.querySelector(".books");

  const bookTitle = document.querySelector(".book-title");
  const bookAuthor = document.querySelector(".book-author");
  const bookDesc = document.querySelector(".book-desc");
  const progressText = document.querySelector(".progress-text");
  const progressBar = document.querySelector(".progress-bar");
  const completeCheckbox = document.querySelector(".complete-checkbox");

  const addBtn = document.querySelector(".add-btn");
  const delBtn = document.querySelector(".book-del");

  let curId = -1;

  module.addBook = (bookObj) => {
    // for now we will just append it at the end. will want to sort it in alphabetical order though
    books.push(bookObj);
    bookObj.sidebarHTML.addEventListener("click", sidebarClickEH);
    displaySidebar();
  };

  const displaySidebar = () => {
    sidebarBooks.innerHTML = ``;
    books.forEach((book) => {
      sidebarBooks.append(book.sidebarHTML);
    });
  };

  const findBook = (id) => {
    return books.find((book) => book.dataId === id);
  };

  const populateBookInfo = (book) => {
    bookTitle.innerHTML = `${book.title}`;
    bookAuthor.innerHTML = `${book.author}`;
    bookDesc.innerHTML = `${book.desc}`;
    progressText.innerHTML = `${book.curPage} / ${book.totalPages}`;
    // progressBar
    completeCheckbox.checked = book.hasCompleted;
  };

  const sidebarClickEH = (e) => {
    const bookId = parseInt(e.currentTarget.dataset.id);
    const book = findBook(bookId);
    curId = bookId;

    populateBookInfo(book);
    index.toggleForm(false);
  };

  const deleteEH = () => {
    // TODO: add modal
    const booksId = books.findIndex((book) => book.dataId === curId);
    const book = books.splice(booksId, 1)[0];
    book.sidebarHTML.remove();
    book.sidebarHTML = null;

    index.toggleForm(true);
  };

  const formBtnEH = () => {
    curId = null;
    index.toggleForm(true);
  };

  window.addEventListener("DOMContentLoaded", () => {
    displaySidebar();
    addBtn.addEventListener("click", formBtnEH);
    delBtn.addEventListener("click", deleteEH);
  });

  return module;
})();
