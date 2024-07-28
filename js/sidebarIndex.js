const sidebarIndex = (function() {
  "use strict";

  const module = {};

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  
  module.totalHeight = 0;
  module.withinWindow = false;
  module.focusedOn = false;
  
  module.sidebarHTML = document.querySelector(".books");
  
  const withinWindowCheck = () => {
    module.withinWindow = window.innerHeight > module.totalHeight;

    if (module.withinWindow) {
      module.sidebarHTML.style.setProperty("margin-top", "50vh");
      module.sidebarHTML.style.setProperty("--offset-val", "-50%");
      return;
    }
    module.sidebarHTML.style.setProperty("margin-top", 0);
    module.sidebarHTML.style.setProperty("--offset-val", 0);
  };

  const createSidebarHTML = (book) => {
    const sidebar = document.createElement("div");
    sidebar.className = "book";

    const pTitle = document.createElement("p");
    pTitle.className = "book-title";
    pTitle.textContent = `${book.title}`;

    const pProgress = document.createElement("p");
    pProgress.className = "progress";
    pProgress.textContent = `${book.calcProgress()}%`;

    sidebar.appendChild(pTitle);
    sidebar.appendChild(pProgress);

    return sidebar;
  };
  
  const displaySidebar = () => {
    const books = BookService.getBooks();

    module.sidebarHTML.innerHTML = ``;
    books.forEach(book => module.sidebarHTML.append(book.sidebarObj.html));
  };

  module.updateSidebarY = () => {
    const books = BookService.getBooks();
    let offsetAccum = 0;
    books.forEach(book => {
      const sidebar = book.sidebarObj;
      sidebar.y = sidebar.html.getBoundingClientRect().y;
      sidebar.offsetY = offsetAccum;
      offsetAccum += sidebar.baseH;
    });
  };

  module.addSidebar = (book) => {
    const sidebar = book.sidebarObj;
    sidebar.html = createSidebarHTML(book);
    sidebar.html.style.setProperty("--base-height", `${sidebar.baseH}px`);
    sidebar.html.addEventListener("click", sidebar.clickEH.bind(sidebar));
    
    displaySidebar();
    withinWindowCheck();
    module.updateSidebarY();

    module.totalHeight = module.sidebarHTML.getBoundingClientRect().height;
  };

  module.removeSidebar = () => {
    displaySidebar();
    module.totalHeight = module.sidebarHTML.getBoundingClientRect().height;
    withinWindowCheck();
    module.updateSidebarY();
    module.focusedOn = false;
  };

  module.updateProgress = () => {
    const book = BookService.getBook(module.curDataId);
    if (!book) {
      return;
    }
    const sidebar = book.sidebarObj;
    const progressText = sidebar.html.querySelector(".progress");
    progressText.innerHTML = `${book.calcProgress()}%`;
  }
  
  module.scrollOffset = 0;
  
  const scrollBeyond = (e) => {
    const excess = window.innerHeight - module.totalHeight;
    module.scrollOffset = clamp(-e.deltaY / 2 + module.scrollOffset, excess, 0);

    module.sidebarHTML.style.setProperty("--offset-val", module.scrollOffset + "px");
  }

  const scrollWithin = (e) => {
    if (!module.focusedOn) {
      return;
    }

    const sidebar = BookService.getBook(bookIndex.curDataId).sidebarObj;

    const halfTotalHeight = module.totalHeight / 2;
    const excess = sidebar.baseH - sidebar.expandedH;
    const halfExcess = excess / 2;

    const maxOffset = halfExcess - halfTotalHeight;
    const minOffset = -halfExcess - halfTotalHeight;
    module.scrollOffset = clamp(-e.deltaY / 4 + module.scrollOffset, maxOffset, minOffset);

    module.sidebarHTML.style.setProperty("--offset-val", module.scrollOffset + "px");
  };

  const scrollEH = (e) => {
    if (module.withinWindow) {
      scrollWithin(e);
      return;
    }
    scrollBeyond(e);
  }

  window.addEventListener("DOMContentLoaded", () => {
    // module.sidebarHTML.innerHTML = ``;

    module.sidebarHTML.addEventListener("wheel", scrollEH);
  });

  return module;
})();
