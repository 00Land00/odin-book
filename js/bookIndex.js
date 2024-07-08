const bookIndex = (function () {
  "use strict";

  const module = {};

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
