'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Close dropdown function
const closeDropdown = function (dropdown) {
  dropdown.classList.remove("active");
};

// Custom select variables for category filter
const selectCategory = document.querySelector("[data-select]");
const selectItemsCategory = document.querySelectorAll("[data-select-item][data-project-category]");
const selectValueCategory = document.querySelector("[data-selecct-value]");

// Add event listener for category selection dropdown
selectCategory.addEventListener("click", function (event) { 
  event.stopPropagation(); // Prevent closing immediately
  elementToggleFunc(this); 
});

// Handle project category selection
selectItemsCategory.forEach(item => {
  item.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent dropdown from closing before update
    const selectedCategory = this.getAttribute('data-project-category');
    selectValueCategory.innerText = this.innerText;
    closeDropdown(selectCategory); // Close dropdown after selection
    filterProjects(selectedCategory, selectedType);
  });
});

// Custom select variables for project type filter
const selectType = document.querySelector("[data-select-type]");
const selectItemsType = document.querySelectorAll("[data-select-item][data-project-type]");
const selectValueType = document.querySelector("[data-selecct-value-type]");

// Add event listener for project type selection dropdown
selectType.addEventListener("click", function (event) { 
  event.stopPropagation(); // Prevent immediate closing
  elementToggleFunc(this); 
});

// Handle project type selection
let selectedType = 'all';  // Default to "all"
selectItemsType.forEach(item => {
  item.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent dropdown from closing before update
    selectedType = this.getAttribute('data-project-type');
    selectValueType.innerText = this.innerText;
    closeDropdown(selectType); // Close dropdown after selection
    filterProjects(selectedCategory, selectedType);
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function () {
  closeDropdown(selectCategory);
  closeDropdown(selectType);
});

// Filter function for project items
const projectItems = document.querySelectorAll('.project-item');

function filterProjects(selectedCategory, selectedType) {
  projectItems.forEach(project => {
    const isCategoryMatch = selectedCategory === 'all' || project.classList.contains(selectedCategory);
    const isTypeMatch = selectedType === 'all' || project.classList.contains(selectedType);

    project.style.display = isCategoryMatch && isTypeMatch ? 'block' : 'none';
  });
}
