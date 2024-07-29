const index = (function () {
  "use strict";

  const module = {};

  const formSection = document.querySelector(".form-section");
  const bookSection = document.querySelector(".book-section");

  module.toggleForm = (showForm) => {
    if (showForm) {
      if (formSection.classList.contains("hidden")) {
        formSection.style.opacity = "100%";
      }
      if (!bookSection.classList.contains("hidden")) {
        bookSection.style.opacity = "0%";
      }

      return;
    }

    if (!formSection.classList.contains("hidden")) {
      formSection.style.opacity = "0%";
    }
    if (bookSection.classList.contains("hidden")) {
      bookSection.style.opacity = "100%";
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    formSection.addEventListener("transitionend", () => {
      formSection.classList.toggle("hidden");
      bookSection.classList.toggle("hidden");
    });

    bookSection.addEventListener("transitionend", () => {
      bookSection.classList.toggle("hidden");
      formSection.classList.toggle("hidden");
      bookIndex.resetBookSection();
    });
  });

  return module;
})();
