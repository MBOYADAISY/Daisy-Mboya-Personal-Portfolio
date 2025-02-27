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

// Custom select variables (fix for multiple dropdowns)
const selectElements = document.querySelectorAll("[data-select]");
const selectValues = document.querySelectorAll("[data-selecct-value]");
const selectLists = document.querySelectorAll(".select-list");
const selectItems = document.querySelectorAll("[data-select-item]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Added function to filter projects based on category
const projectList = document.getElementById('projectList');

// Function to toggle dropdowns
selectElements.forEach((select, index) => {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
    selectLists[index].classList.toggle("active");
  });
});

// Function to handle item selection for all dropdowns
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let parentDropdown = this.closest(".filter-select-box").querySelector("[data-selecct-value]");
    parentDropdown.innerText = this.innerText;
    let dropdown = this.closest(".filter-select-box").querySelector("[data-select]");

    elementToggleFunc(dropdown);
    
    // Apply filtering only if it's the category dropdown
    if (dropdown === document.querySelector('[data-select]')) {
      let selectedValue = this.innerText.toLowerCase();
      filterFunc(selectedValue);
      filterProjectsByCategory(selectedValue);
    }
  });
});

// Function to filter portfolio items by category
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
};

// Function to filter projects in the second dropdown based on selected category
const filterProjectsByCategory = function (category) {
  const projectItems = projectList.querySelectorAll('.select-item');
  projectItems.forEach(item => {
    if (item.dataset.category === category || category === 'all') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValues[0].innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
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

        
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  let formData = new FormData(this);

  fetch(this.action, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  }).then(() => {
    document.getElementById("successMessage").style.display = "block";
    this.reset(); // Reset the form
  }).catch(error => console.error("Error:", error));
});

function closePopup() {
  document.getElementById("successMessage").style.display = "none";
}
