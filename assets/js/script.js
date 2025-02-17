'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Main category and subcategory elements
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const subSelect = document.querySelector("[data-sub-select]");
const subSelectItems = document.querySelectorAll("[data-select-sub-item]");
const subSelectValue = document.querySelector(".sub-select-value");

// Show and hide the category dropdown when clicked
select.addEventListener("click", function () {
  elementToggleFunc(select);
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
  elementToggleFunc(subSelect);
});

// Handle selection of subcategory items
subSelectItems.forEach(item => {
  item.addEventListener("click", function () {
    const subSelectedValue = this.innerText.trim(); // Get selected subcategory
    subSelectValue.innerText = subSelectedValue;  // Display subcategory value
    elementToggleFunc(subSelect);  // Hide the subcategory dropdown
  });
});

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
formInputs.forEach(input => {
  input.addEventListener("input", function () {

    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {

    pages.forEach((page, pageIndex) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[pageIndex].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[pageIndex].classList.remove("active");
      }
    });

  });
});
