const bookIndex = (function () {
  "use strict";

  const module = {};

  /*
  const booksHtml = document.querySelector(".book");
  module.bookHeight = 300;
  const halfBookHeight = module.bookHeight / 2;

  let nextId = 0;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const computeBaseHeight = (pages) => {
    let mult = 2;
    const base = 25; // px

    mult += Math.floor(pages / 100);
    mult = clamp(mult, 2, 11);
    return base * mult;
  };

  module.toggleBook = (book, toggleVal) => {
    const halfVH = window.innerHeight / 2;
    const bookY = book.getBoundingClientRect().y;
    const halfBooksHeight = libraryIndex.booksHeight / 2;
    const excess = window.innerHeight - libraryIndex.booksHeight;

    let offsetVal = `calc((${halfVH}px - (${bookY}px + ${halfBookHeight}px))`;
    if (libraryIndex.beyondWindow) {
      offsetVal += ` - ${halfBooksHeight}px)`;
      offsetVal = toggleVal ? offsetVal : `-50%`;
    } else {
      offsetVal += ` + ${scrollOffset}px)`;
      libraryIndex.scrollOffset = clamp(halfVH - (bookY + halfBookHeight) + scrollOffset, excess, 0);
    }

    booksHtml.style.setProperty("--offset-val", offsetVal);
  };

  function Book(title, pages) {
    this.id = nextId++;
    this.title = title;
    this.pages = pages;
    this.baseH = computeBaseHeight(pages);
  }

  Book.prototype.bookEH = function() {
    const book = libraryIndex.getHTML(this.id);
    
    if (libraryIndex.curSelected === this.id) {
      libraryIndex.curSelected = null;
      book.classList.remove("expand");
      libraryIndex.booksHeight -= module.bookHeight - this.baseH;
      module.toggleBook(book, false);
      return;
    }

    libraryIndex.unselectCur();
    libraryIndex.curSelected = this.id;
    book.classList.add("expand");
    libraryIndex.booksHeight += module.bookHeight - this.baseH;
    toggleBook(book, true);
  };

  module.createBook = (title, pages) => {
    const book = new Book(title, pages);
    return book;
  }

  return module;
})();
  */
  let nextId = 0;

  const sidebarHTMLConstructor = (dataId, bookTitle, bookProgress) => {
    const container = document.createElement("div");
    container.className = "book";
    container.setAttribute("data-id", `${dataId}`);

    const pTitle = document.createElement("p");
    pTitle.className = "book-title";
    pTitle.textContent = `${bookTitle}`;

    const pProgress = document.createElement("p");
    pProgress.className = "progress";
    pProgress.textContent = `${bookProgress}%`;

    container.appendChild(pTitle);
    container.appendChild(pProgress);

    return container;
  };

  function Book(title, author, desc, totalPages, hasCompleted) {
    this.dataId = nextId++;

    this.title = title;
    this.author = author;
    this.desc = desc;
    this.curPage = 0;
    this.totalPages = totalPages;
    this.hasCompleted = hasCompleted;

    this.sidebarHTML = sidebarHTMLConstructor(this.dataId, this.title, 0);
  }

  Book.prototype.calcProgress = function() {
    const progress = (this.curPage / this.totalPages) * 100;
    return Math.round(progress);
  }

  module.createBook = function (title, author, desc, totalPages, hasCompleted) {
    return new Book(title, author, desc, totalPages, hasCompleted);
  };

  return module;
})();
