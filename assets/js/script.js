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

// custom select variables for category
const selectCategory = document.querySelector("[data-select-category]");
const selectCategoryItems = document.querySelectorAll("#category-list [data-select-item]");
const selectCategoryValue = document.querySelector("[data-selecct-value-category]");

// custom select variables for project
const selectProject = document.querySelector("[data-select-project]");
const selectProjectList = document.getElementById('project-list');
const selectProjectValue = document.querySelector("[data-selecct-value-project]");

selectCategory.addEventListener("click", function () { elementToggleFunc(this); });

// Function to load project content in iframe
function loadQMDContent(url) {
  var iframe = document.getElementById('qmd-iframe');
  iframe.src = url;
  var container = document.getElementById('qmd-container');
  container.style.display = 'block';
  container.scrollIntoView({ behavior: "smooth" });
}

// Handle category dropdown selection
selectCategoryItems.forEach(item => {
  item.addEventListener('click', function (e) {
    const selectedCategory = this.parentNode.getAttribute('data-category');
    selectCategoryValue.textContent = this.textContent;
    elementToggleFunc(selectCategory);

    // Populate project dropdown based on selected category
    populateProjectDropdown(selectedCategory);
  });
});

// Function to populate project dropdown based on selected category
function populateProjectDropdown(category) {
  selectProjectList.innerHTML = ''; // Clear existing options
  selectProjectValue.textContent = 'Select project'; // Reset project selection

  const projects = document.querySelectorAll('.project-item');

  projects.forEach(project => {
    if (category === 'all' || project.classList.contains(category)) {
      const projectType = project.getAttribute('data-project-type');
      const projectName = project.querySelector('.project-title').textContent;

      const listItem = document.createElement('li');
      listItem.classList.add('select-item');

      const button = document.createElement('button');
      button.setAttribute('data-select-item', '');
      button.textContent = projectName;
      button.addEventListener('click', function() {
        // Load the content when the project is clicked
        const onclick = project.querySelector('a').getAttribute('onclick');
        loadQMDContent(onclick.split("'")[1]);
      });

      listItem.appendChild(button);
      selectProjectList.appendChild(listItem);
    }
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

// Initialize the project dropdown with all projects on page load
document.addEventListener('DOMContentLoaded', function() {
  populateProjectDropdown('all');
});
