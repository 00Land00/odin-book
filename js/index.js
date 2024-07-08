const index = (function () {
  "use strict";

  const module = {};

  const formSection = document.querySelector(".form-section");
  const bookSection = document.querySelector(".book-section");

  module.toggleForm = (showForm) => {
    if (showForm) {
      if (formSection.classList.contains("hidden")) {
        formSection.classList.remove("hidden");
      }
      if (!bookSection.classList.contains("hidden")) {
        bookSection.classList.add("hidden");
      }

      return;
    }

    if (!formSection.classList.contains("hidden")) {
      formSection.classList.add("hidden");
    }
    if (bookSection.classList.contains("hidden")) {
      bookSection.classList.remove("hidden");
    }
  };

  return module;
})();
