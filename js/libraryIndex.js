const libraryIndex = (function () {
  "use strict";

  const module = {};

  const books = [];

  const sidebarBooks = document.querySelector(".books");

  const bookTitle = document.querySelector(".book-header .book-title");
  const bookAuthor = document.querySelector(".book-author");
  const bookDesc = document.querySelector(".book-desc");
  const progressValue = document.querySelector(".progress-value");
  const progressBar = document.querySelector(".progress-bar");
  const completeCheckbox = document.querySelector(".complete-checkbox");

  const addBtn = document.querySelector(".add-btn");
  const delBtn = document.querySelector(".book-del");

  let curBook = null;
  let curSidebarProgress = null;

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

  const updateProgressVal = () => {
    progressValue.innerHTML = `${progressBar.value} / ${curBook.totalPages}`;
    curBook.curPage = progressBar.value;
    const progressPercent = curBook.calcProgress();
    curSidebarProgress.innerHTML = `${progressPercent}%`;

    progressValue.style.left = `calc(${progressPercent}% + (${17 - progressPercent * 0.3}px))`;

    completeCheckbox.checked = (curBook.curPage === curBook.totalPages);
  };

  const updateProgressBar = () => {
    progressBar.max = curBook.totalPages;
    progressBar.value = curBook.curPage;
  };

  const populateBookInfo = (book) => {
    bookTitle.innerHTML = `${book.title}`;
    bookAuthor.innerHTML = `${book.author}`;
    bookDesc.innerHTML = `${book.desc}`;
    updateProgressBar();
    updateProgressVal();
    completeCheckbox.checked = book.hasCompleted;
  };

  const sidebarClickEH = (e) => {
    const bookId = parseInt(e.currentTarget.dataset.id);
    const book = findBook(bookId);
    curBook = book;
    curSidebarProgress = curBook.sidebarHTML.querySelector(".progress");

    populateBookInfo(book);
    index.toggleForm(false);
  };

  const deleteEH = () => {
    // TODO: add modal
    books.splice(curBook.dataId, 1)[0];
    curBook.sidebarHTML.remove();
    curBook.sidebarHTML = null;
    curBook = null;
    curSidebarProgress = null;

    index.toggleForm(true);
  };

  const formBtnEH = () => {
    curBook = null;
    curSidebarProgress = null;
    index.toggleForm(true);
  };

  const checkboxEH = () => {
    curBook.hasCompleted = completeCheckbox.checked ? true : false;
    if (curBook.hasCompleted) {
      curBook.curPage = curBook.totalPages;
      progressBar.value = curBook.curPage;
      updateProgressVal();
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    displaySidebar();
    addBtn.addEventListener("click", formBtnEH);
    delBtn.addEventListener("click", deleteEH);
    progressBar.addEventListener("input", updateProgressVal);
    completeCheckbox.addEventListener("change", checkboxEH);
  });

  return module;
})();
