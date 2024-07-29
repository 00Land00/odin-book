const formIndex = (function () {
  "use strict";

  const module = {};

  const form = document.querySelector(".book-form");
  const page = document.querySelector("#pages");

  const onlyNum = /^(?!0)\d+$/;

  const formEH = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    const newBook = BookService.createBook(
      formValues.title,
      formValues.author,
      formValues.desc,
      formValues.pages,
      formValues.completed ? true : false
    );
    sidebarIndex.addSidebar(newBook);

    event.target.reset();
  };

  const pageEH = (event) => {
    if (!onlyNum.test(event.target.value)) {
      event.target.value = event.target.value.substring(
        0,
        event.target.value.length - 1
      );
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", formEH);
    page.addEventListener("input", pageEH);
  });

  return module;
})();
