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

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const subSelect = document.querySelector(".sub-filter-select-box");
const subSelectItems = document.querySelectorAll("[data-select-sub-item]");
const subSelectValue = document.querySelector(".sub-select-value");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Event listener for main category select
select.addEventListener("click", function () {
  elementToggleFunc(this);

  // Show subcategory dropdown if category selected is "remote sensing" or "spatial data"
  if (selectValue.innerText.toLowerCase() === "remote sensing" || selectValue.innerText.toLowerCase() === "spatial data") {
    subSelect.style.display = "block";  // Show subcategory select
  } else {
    subSelect.style.display = "none";   // Hide subcategory select if no matching category
  }
});

// Event listener for all main category select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);

    // Show/hide subcategory dropdown based on selected main category
    if (selectedValue === "remote sensing" || selectedValue === "spatial data") {
      subSelect.style.display = "block";
    } else {
      subSelect.style.display = "none";
    }

    filterFunc(selectedValue);
    resetSubFilter(); // Reset sub filter when main category changes
  });
});

// Event listener for subcategory select
subSelect.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Event listener for all subcategory select items
subSelectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedSubValue = this.value.toLowerCase();
    subSelectValue.innerText = this.innerText;
    filterFunc(null, selectedSubValue);
    elementToggleFunc(subSelect);
  });
});

// Filter function
const filterFunc = function (selectedValue, selectedSubValue) {
  filterItems.forEach(item => {
    const categoryMatch = selectedValue === "all" || selectedValue === item.dataset.category;
    const subcategoryMatch = !selectedSubValue || selectedSubValue === item.dataset.subcategory;

    if (categoryMatch && subcategoryMatch) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Function to reset sub filter
const resetSubFilter = function () {
  subSelectValue.innerText = "Select subcategory";
  subSelectItems.forEach(item => {
    item.classList.remove("active");
  });
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

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
