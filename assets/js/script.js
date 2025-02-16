'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Custom select variables for category filter
const selectCategory = document.querySelector("[data-select]");
const selectItemsCategory = document.querySelectorAll("[data-select-item][data-project-category]");
const selectValueCategory = document.querySelector("[data-selecct-value]");

// Add event listener for category selection dropdown
selectCategory.addEventListener("click", function () { elementToggleFunc(this); });

// Handle project category selection
selectItemsCategory.forEach(item => {
  item.addEventListener("click", function () {
    const selectedCategory = this.getAttribute('data-project-category');
    selectValueCategory.innerText = this.innerText;
    elementToggleFunc(selectCategory);
    filterProjects(selectedCategory, selectedType);
  });
});

// Custom select variables for project type filter
const selectType = document.querySelector("[data-select-type]");
const selectItemsType = document.querySelectorAll("[data-select-item][data-project-type]");
const selectValueType = document.querySelector("[data-selecct-value-type]");

// Add event listener for project type selection dropdown
selectType.addEventListener("click", function () { elementToggleFunc(this); });

// Handle project type selection
let selectedType = 'all';  // Default to "all"
selectItemsType.forEach(item => {
  item.addEventListener("click", function () {
    selectedType = this.getAttribute('data-project-type');
    selectValueType.innerText = this.innerText;
    elementToggleFunc(selectType);
    filterProjects(selectedCategory, selectedType);
  });
});

// Filter variables for project items
const projectItems = document.querySelectorAll('.project-item');

// Filter function to show/hide project items based on selected category and type
function filterProjects(selectedCategory, selectedType) {
  projectItems.forEach(project => {
    const isCategoryMatch = selectedCategory === 'all' || project.classList.contains(selectedCategory);
    const isTypeMatch = selectedType === 'all' || project.classList.contains(selectedType);

    if (isCategoryMatch && isTypeMatch) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Page navigation variables (optional, if needed for other parts of your page)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
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

// Function to load project content (optional, if you have iframe content)
function loadQMDContent(url) {
  var iframe = document.getElementById('qmd-iframe');
  iframe.src = url;
  var container = document.getElementById('qmd-container');
  container.style.display = 'block';
  container.scrollIntoView({behavior: "smooth"});
}
