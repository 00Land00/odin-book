const index = (function () {
  "use strict";

  const module = {};

  const formSection = document.querySelector(".form-section");
  const bookSection = document.querySelector(".book-section");

  module.toggleForm = (showForm) => {
    if (showForm) {
      if (formSection.classList.contains("hidden")) {
        formSection.classList.remove("hidden");
        formSection.style.opacity = "100%";
      }
      if (!bookSection.classList.contains("hidden")) {
        bookSection.classList.add("hidden");
        bookSection.style.opacity = "0%";
      }

      return;
    }

    if (!formSection.classList.contains("hidden")) {
      formSection.classList.add("hidden");
      formSection.style.opacity = "0%";
    }
    if (bookSection.classList.contains("hidden")) {
      bookSection.classList.remove("hidden");
      bookSection.style.opacity = "100%";
    }
  };

  return module;
})();
