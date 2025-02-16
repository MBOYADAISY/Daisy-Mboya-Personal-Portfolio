'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}




document.addEventListener("DOMContentLoaded", function () {
    const categoryButton = document.querySelector("[data-select-category]");
    const categoryValue = document.querySelector("[data-select-value-category]");
    const categoryList = document.getElementById("category-list");

    const typeButton = document.querySelector("[data-select-type]");
    const typeValue = document.querySelector("[data-select-value-type]");
    const typeList = document.getElementById("type-list");

    // Define available types for each category
    const typeOptions = {
      "all": ["All Types"],
      "remote-sensing": ["All", "Tidyverse", "Classification"],
      "spatial-data-analysis": ["All", "Geospatial Modeling", "Data Processing"]
    };

    // Function to update Type dropdown based on Category selection
    function updateTypeDropdown(category) {
      typeList.innerHTML = ""; // Clear existing options

      (typeOptions[category] || ["All"]).forEach(type => {
        const li = document.createElement("li");
        li.classList.add("select-item");
        li.dataset.type = type.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase-hyphen format
        li.innerHTML = `<button data-select-item>${type}</button>`;
        typeList.appendChild(li);
      });

      // Set default type value
      typeValue.textContent = "Select type";

      // Re-attach event listener for type selection
      attachTypeSelection();
    }

    // Function to filter projects based on category and type
    function filterProjects() {
      const selectedCategory = categoryValue.dataset.selected || "all";
      const selectedType = typeValue.dataset.selected || "all";

      document.querySelectorAll(".project-item").forEach(item => {
        const categoryMatch = selectedCategory === "all" || item.classList.contains(selectedCategory);
        const typeMatch = selectedType === "all" || item.classList.contains(selectedType);
        item.style.display = categoryMatch && typeMatch ? "block" : "none";
      });
    }

    // Attach event listener for category selection
    categoryList.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        const selectedCategory = event.target.textContent;
        categoryValue.textContent = selectedCategory;
        categoryValue.dataset.selected = event.target.parentElement.dataset.category;

        updateTypeDropdown(categoryValue.dataset.selected);
        filterProjects();
      }
    });

    // Attach event listener for type selection
    function attachTypeSelection() {
      typeList.addEventListener("click", (event) => {
        if (event.target.closest("button")) {
          const selectedType = event.target.textContent;
          typeValue.textContent = selectedType;
          typeValue.dataset.selected = event.target.parentElement.dataset.type;

          filterProjects();
        }
      });
    }

    attachTypeSelection();

    // Load QMD content into iframe
    window.loadQMDContent = function (url) {
      var iframe = document.getElementById("qmd-iframe");
      iframe.src = url;
      document.getElementById("qmd-container").style.display = "block";
      document.getElementById("qmd-container").scrollIntoView({ behavior: "smooth" });
    };
});

