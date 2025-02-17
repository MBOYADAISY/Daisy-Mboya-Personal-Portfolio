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

'use strict';

// Main category and subcategory elements
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const subSelect = document.querySelector("[data-sub-select]");
const subSelectItems = document.querySelectorAll("[data-select-sub-item]");
const subSelectValue = document.querySelector(".sub-select-value");

// Function to toggle elements' visibility
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Show and hide the category dropdown when clicked
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Handle selection of main category items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.trim().toLowerCase();  // Get selected category and trim whitespace
    selectValue.innerText = this.innerText;  // Display selected value in the dropdown
    elementToggleFunc(select);  // Hide the main category dropdown

    // Show or hide subcategory dropdown based on main category selection
    if (selectedValue === "remote sensing" || selectedValue === "spatial data") {
      subSelect.style.display = "block";  // Show subcategory dropdown
    } else {
      subSelect.style.display = "none";   // Hide subcategory dropdown
    }
  });
});

// Show and hide the subcategory dropdown when clicked
subSelect.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Handle selection of subcategory items
subSelectItems.forEach(item => {
  item.addEventListener("click", function () {
    const subSelectedValue = this.innerText.trim(); // Get selected subcategory
    subSelectValue.innerText = subSelectedValue;  // Display subcategory value
    elementToggleFunc(subSelect);  // Hide the subcategory dropdown
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
