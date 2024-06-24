const libraryIndex = (() => {
  "use strict";

  const module = {};

  const booksHtml = document.querySelector(".book");

  let books = [];
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

  return module;
})();
