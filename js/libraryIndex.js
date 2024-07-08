const libraryIndex = (function () {
  "use strict";

  const module = {};

  const booksHtml = document.querySelector(".book");

  module.booksHeight = 0;
  module.curSelected = null;
  module.scrollOffset = 0;

  module.beyondWindow = false;
  const beyondWindowCheck = () => {
    beyondWindow = window.innerHeight - module.booksHeight > 0;

    if (beyondWindow) {
      booksHtml.style.setProperty("margin-top", "50vh");
      return;
    }
    booksHtml.style.setProperty("margin-top", 0);
  };

  module.addBook = (newBook) => {
    const index = books.findIndex(
      (book) => book.title.localeCompare(newBook.title) > 0
    );
    if (index === -1) {
      books.push(newBook);
      return;
    }

    books.splice(index, 0, newBook);
    module.booksHeight += newBook.baseH;

    beyondWindowCheck();
  };

  module.getBook = (id) => {
    return books.find(book => book.id === id);
  }

  module.delBook = (id) => {
    const book = books.find((book) => book.id === id);
    module.booksHeight -= book.baseH;

    books = books.filter((book) => book.id !== id);

    beyondWindowCheck();
  };

  module.getHTML = (id) => {
    return document.querySelector(`#${id}`);
  };

  module.unselectCur = () => {
    if (!curSelected) {
      return;
    }

    const curBookHtml = module.getHTML(curSelected);
    const curBook = module.getBook(curSelected);
    curBookHtml.classList.remove("expand");
    module.booksHeight -= bookIndex.bookHeight - curBook.baseH;
    bookIndex.toggleBook(curBook, false);

    curSelected = null;
  };

  // scroll functionality
  /*
  const scrollWithin = (e) => {
    if (!toggle) {
      return;
    }
    const booksHeight = books.getBoundingClientRect().height;
    const halfBooksHeight = booksHeight / 2;

    const excess = baseHeight - books.getBoundingClientRect().height;
    const halfExcess = excess / 2;
    const maxOffset = halfExcess - halfBooksHeight;
    const minOffset = -halfExcess - halfBooksHeight;
    scrollOffset = clamp(-e.deltaY / 4 + scrollOffset, maxOffset, minOffset);

    books.style.setProperty("--offset-val", scrollOffset + "px");
  };

  const scrollEH = (e) => {
    const excess = window.innerHeight - books.getBoundingClientRect().height;
    if (excess > 0) {
      books.style.setProperty("margin-top", "50vh");
      scrollWithin(e);
      return;
    }

    books.style.setProperty("margin-top", 0);
    scrollBeyond(e);
  }

  window.addEventListener("DOMContentLoaded", () => {
    Array.from(bookElements).forEach((book) => {
      book.addEventListener("click", bookEH);
    });

    sidebar.addEventListener("wheel", scrollEH);
  });
  */
  const books = [];

  const sidebarBooks = document.querySelector(".books");

  const bookTitle = document.querySelector(".book-header .book-title");
  const bookAuthor = document.querySelector(".book-author");
  const bookDesc = document.querySelector(".book-desc");
  const progressValue = document.querySelector(".progress-value");
  const progressBar = document.querySelector(".progress-bar");
  const completeCheckbox = document.querySelector(".complete-checkbox");

  const deleteModal = document.querySelector(".delete-modal");
  const confirmDelete = document.querySelector("#confirm");
  const cancelDelete = document.querySelector("#cancel");

  const addBtn = document.querySelector(".add-btn");
  const delBtn = document.querySelector(".book-del");

  let curBook = null;
  let curSidebarProgress = null;

  module.addBook = (bookObj) => {
    const index = books.findIndex(book => book.title.localeCompare(bookObj.title) > 0);
    if (index === -1) {
      books.push(bookObj);
    } else {
      books.splice(index, 0, bookObj);
    }

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

  const showModal = () => {
    deleteModal.showModal();
  }

  const deleteEH = () => {
    books.splice(curBook.dataId, 1)[0];
    curBook.sidebarHTML.remove();
    curBook.sidebarHTML = null;
    curBook = null;
    curSidebarProgress = null;

    deleteModal.close();
    index.toggleForm(true);
  };

  const cancelDeleteEH = () => {
    deleteModal.close();
  }

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
    delBtn.addEventListener("click", showModal);
    confirmDelete.addEventListener("click", deleteEH);
    cancelDelete.addEventListener("click", cancelDeleteEH);
    progressBar.addEventListener("input", updateProgressVal);
    completeCheckbox.addEventListener("change", checkboxEH);
  });

  return module;
})();
