const bookIndex = (function () {
  "use strict";

  const module = {};

  module.curDataId = null;

  const bookTitle = document.querySelector(".book-header .book-title");
  const bookAuthor = document.querySelector(".book-author");
  const bookDesc = document.querySelector(".book-desc");
  const progressValue = document.querySelector(".progress-value");
  const progressBar = document.querySelector(".progress-bar");
  const completeCheckbox = document.querySelector(".complete-checkbox");

  module.resetBookSection = () => {
    bookTitle.innerHTML = ``;
    bookAuthor.innerHTML = ``;
    bookDesc.innerHTML = ``;

    progressValue.innerHTML = ``;
    progressBar.value = 0;
    progressBar.max = 1;

    completeCheckbox.checked = false;
  };

  const updateProgress = () => {
    const book = BookService.getBook(module.curDataId);
    book.curPage = progressBar.value;
    book.hasCompleted = progressBar.value === progressBar.max;
    const progressPercent = BookService.getBook(
      module.curDataId
    ).calcProgress();
    progressValue.innerHTML = `${progressBar.value} / ${progressBar.max}`;
    progressValue.style.left = `calc(${progressPercent}% + (${
      17 - progressPercent * 0.3
    }px))`;
    completeCheckbox.checked = book.hasCompleted;

    sidebarIndex.updateProgress();
  };

  const checkboxEH = () => {
    BookService.updateBook(
      module.curDataId,
      progressBar.value,
      completeCheckbox.checked ? true : false
    );
    if (completeCheckbox.checked) {
      BookService.updateBook(module.curDataId, progressBar.max, true);
      progressBar.value = progressBar.max;
      updateProgress();
    }
  };

  module.displayBook = function () {
    const book = BookService.getBook(module.curDataId);
    if (!book) {
      return;
    }

    bookTitle.innerHTML = `${book.title}`;
    bookAuthor.innerHTML = `${book.author}`;
    bookDesc.innerHTML = `${book.desc}`;

    if (book.hasCompleted) {
      book.curPage = book.totalPages;
    }

    progressValue.innerHTML = `${book.curPage} / ${book.totalPages}`;
    progressBar.max = book.totalPages;
    progressBar.value = book.curPage;
    updateProgress();

    completeCheckbox.checked = book.curPage === book.totalPages;
  };

  const deleteBtn = document.querySelector(".book-del");
  const deleteModal = document.querySelector(".delete-modal");
  const confirmDelete = document.querySelector("#confirm");
  const cancelDelete = document.querySelector("#cancel");

  const showDeleteModal = () => {
    deleteModal.showModal();
  };

  const hideDeleteModal = () => {
    deleteModal.close();
  };

  const removeBookEH = () => {
    BookService.removeBook(module.curDataId);
    sidebarIndex.removeSidebar();
    module.curDataId = null;

    hideDeleteModal();
    index.toggleForm(true);
  };

  const newBookBtn = document.querySelector(".add-btn");

  const newBookBtnEH = () => {
    const sidebar = BookService.getBook(bookIndex.curDataId).sidebarObj;
    sidebar.clickEH();
  };

  window.addEventListener("DOMContentLoaded", () => {
    deleteBtn.addEventListener("click", showDeleteModal);
    confirmDelete.addEventListener("click", removeBookEH);
    cancelDelete.addEventListener("click", hideDeleteModal);

    progressBar.addEventListener("input", updateProgress);

    completeCheckbox.addEventListener("change", checkboxEH);

    newBookBtn.addEventListener("click", newBookBtnEH);
  });

  return module;
})();
