const formIndex = (function () {
  "use strict";

  const module = {};

  const form = document.querySelector(".book-form");
  const page = document.querySelector("#pages");

  const onlyNum = /^[0-9]+$/;

  const formEH = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    const newBook = bookIndex.createBook(
      formValues.title,
      formValues.author,
      formValues.desc,
      formValues.pages,
      formValues.completed ? true : false
    );
    libraryIndex.addBook(newBook);

    event.target.reset();
  };

  const pageEH = (event) => {
    if (!onlyNum.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", formEH);
    page.addEventListener("input", pageEH);
  });

  return module;
})();
