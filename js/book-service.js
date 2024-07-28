const BookService = (function () {
  "use strict";

  const module = {};

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  // temp
  const sample = [
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "123",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "234",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "345",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "123",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "234",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "345",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "123",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "234",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "345",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "123",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "234",
      hasCompleted: false,
    },
    {
      title: "T",
      author: "T",
      desc: "T",
      totalPages: "345",
      hasCompleted: false,
    },
  ];

  const books = {
    nextId: 0,
    arr: [],
  };

  function Book(title, author, desc, totalPages, hasCompleted) {
    this.dataId = books.nextId++;

    this.title = title;
    this.author = author;
    this.desc = desc;
    this.curPage = 0;
    this.totalPages = totalPages;
    this.hasCompleted = hasCompleted;
  }

  Book.prototype.calcProgress = function () {
    const progress = (this.curPage / this.totalPages) * 100;
    return Math.round(progress);
  };

  const computeBaseHeight = (pages) => {
    let mult = 2;
    const base = 25;

    mult += Math.floor(pages / 100);
    mult = clamp(mult, 2, 11);
    return base * mult;
  };

  function Sidebar(dataId, totalPages) {
    this.dataId = dataId;
    this.baseH = computeBaseHeight(totalPages);
  }

  Sidebar.prototype.expandedH = 300;
  Sidebar.prototype.books = document.querySelector(".books");

  Sidebar.prototype.diffH = function () {
    return this.expandedH - this.baseH;
  };

  Sidebar.prototype.toggleBookWithin = function (toggleVal) {
    let offsetVal = `-50%`;

    if (toggleVal) {
      const halfVH = window.innerHeight / 2;
      const halfTotalHeight = sidebarIndex.totalHeight / 2;
      const halfExpandedH = this.expandedH / 2;
      const sidebarY = this.y;

      offsetVal = `calc(${halfVH}px - (${sidebarY}px + ${halfExpandedH}px) - ${halfTotalHeight}px)`;
    }

    sidebarIndex.sidebarHTML.style.setProperty("--offset-val", offsetVal);
  };

  Sidebar.prototype.toggleBookBeyond = function () {
    const halfVH = window.innerHeight / 2;
    const halfExpandedH = this.expandedH / 2;
    const excess = this.baseH - this.expandedH;
    const sidebarY = this.offsetY - sidebarIndex.scrollOffset;

    const offsetVal = `calc(${halfVH}px - ${sidebarY}px - ${sidebarIndex.scrollOffset}px - ${halfExpandedH}px)`;
    sidebarIndex.scrollOffset = clamp(
      halfVH - (sidebarY + halfExpandedH) + sidebarIndex.scrollOffset,
      excess,
      0
    );
    sidebarIndex.sidebarHTML.style.setProperty("--offset-val", offsetVal);
  };

  Sidebar.prototype.clickEH = function () {
    if (sidebarIndex.withinWindow && !sidebarIndex.focusedOn) {
      sidebarIndex.updateSidebarY();
    }

    if (sidebarIndex.focusedOn) {
      if (bookIndex.curDataId != this.dataId) {
        const sidebar = BookService.getBook(bookIndex.curDataId).sidebarObj;
        sidebarIndex.withinWindow ? sidebar.toggleBookWithin(false) : ``;
        sidebar.html.classList.remove("expand");
        sidebarIndex.totalHeight -= sidebar.diffH();

        sidebarIndex.withinWindow
          ? this.toggleBookWithin(true)
          : this.toggleBookBeyond();
        this.html.classList.add("expand");
        sidebarIndex.totalHeight += this.diffH();
      } else {
        sidebarIndex.focusedOn = false;
        sidebarIndex.withinWindow
          ? this.toggleBookWithin(false)
          : this.toggleBookBeyond();
        this.html.classList.remove("expand");
        sidebarIndex.totalHeight -= this.diffH();

        bookIndex.resetBookSection();
        bookIndex.curDataId = null;
        index.toggleForm(true);
        return;
      }
    } else {
      sidebarIndex.focusedOn = true;
      sidebarIndex.withinWindow
        ? this.toggleBookWithin(true)
        : this.toggleBookBeyond();
      this.html.classList.add("expand");
      sidebarIndex.totalHeight += this.diffH();
    }

    bookIndex.curDataId = this.dataId;
    bookIndex.displayBook();
    index.toggleForm(false);
  };

  module.createBook = function (title, author, desc, totalPages, hasCompleted) {
    const bookObj = new Book(title, author, desc, totalPages, hasCompleted);
    bookObj.sidebarObj = new Sidebar(bookObj.dataId, bookObj.totalPages);

    // add in alphabetical order on book title
    const index = books.arr.findIndex(
      (book) => book.title.localeCompare(bookObj.title) > 0
    );
    if (index === -1) {
      books.arr.push(bookObj);
    } else {
      books.arr.splice(index, 0, bookObj);
    }

    return bookObj;
  };

  module.removeBook = function (dataId) {
    books.arr = books.arr.filter((book) => book.dataId !== dataId);
  };

  module.getBook = function (dataId) {
    return books.arr.find((book) => book.dataId === dataId);
  };

  module.getBooks = function () {
    return books.arr;
  };

  module.updateBook = function (dataId, curPage, hasCompleted) {
    const book = module.getBook(dataId);
    book.curPage = curPage;
    book.hasCompleted = hasCompleted;
  };

  // temp
  window.addEventListener("DOMContentLoaded", () => {
    sample.forEach((obj) => {
      const book = module.createBook(
        obj.title,
        obj.author,
        obj.desc,
        obj.totalPages,
        obj.hasCompleted
      );
      sidebarIndex.addSidebar(book);
    });
  });

  return module;
})();
