// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Dropdown functionality for categories
const selectCategory = document.querySelector("[data-select-category]");
const selectCategoryList = document.getElementById("category-list");
const selectCategoryValue = document.querySelector("[data-selecct-value-category]");

// Dropdown functionality for projects
const selectProject = document.querySelector("[data-select-project]");
const selectProjectList = document.getElementById("project-list");
const selectProjectValue = document.querySelector("[data-selecct-value-project]");

// Project data
const projectData = {
  "all": [
    { name: "Introduction to Tidyverse", url: "Remote%20Sensing/Tidyverse/GEM520_Lab4-assign.html" },
    { name: "Image Classification", url: "Remote%20Sensing/Supervised%20Image%20Classification/Lab5_classification-assign.html" },
    { name: "Spatial Analysis Techniques", url: "#" }
  ],
  "remote-sensing": [
    { name: "Introduction to Tidyverse", url: "Remote%20Sensing/Tidyverse/GEM520_Lab4-assign.html" },
    { name: "Image Classification", url: "Remote%20Sensing/Supervised%20Image%20Classification/Lab5_classification-assign.html" }
  ],
  "spatial-data-analysis": [
    { name: "Spatial Analysis Techniques", url: "#" }
  ]
};

// Function to load project in iframe
function loadQMDContent(url) {
  const iframe = document.getElementById("qmd-iframe");
  iframe.src = url;
  document.getElementById("qmd-container").style.display = "block";
  iframe.scrollIntoView({ behavior: "smooth" });
}

// Populate category dropdown
function populateCategoryDropdown() {
  Object.keys(projectData).forEach(category => {
    const listItem = document.createElement("li");
    listItem.classList.add("select-item");
    const button = document.createElement("button");
    button.setAttribute("data-select-item", "");
    button.textContent = category;
    button.addEventListener("click", function () {
      selectCategoryValue.textContent = category;
      elementToggleFunc(selectCategory);
      populateProjectDropdown(category);
    });
    listItem.appendChild(button);
    selectCategoryList.appendChild(listItem);
  });
}

// Populate projects dropdown based on selected category
function populateProjectDropdown(category) {
  selectProjectList.innerHTML = "";
  selectProjectValue.textContent = "Select project";

  if (projectData[category]) {
    projectData[category].forEach(project => {
      const listItem = document.createElement("li");
      listItem.classList.add("select-item");

      const button = document.createElement("button");
      button.setAttribute("data-select-item", "");
      button.textContent = project.name;
      button.addEventListener("click", function () {
        selectProjectValue.textContent = project.name;
        elementToggleFunc(selectProject); // Close the dropdown
        loadQMDContent(project.url);
      });

      listItem.appendChild(button);
      selectProjectList.appendChild(listItem);
    });
  }
}

// Toggle dropdowns on click
selectCategory.addEventListener("click", function () {
  elementToggleFunc(selectCategory);
});

selectProject.addEventListener("click", function () {
  elementToggleFunc(selectProject);
});

// Close dropdowns when clicking outside
document.addEventListener("click", function(event) {
  if (!selectCategory.contains(event.target)) selectCategory.classList.remove("active");
  if (!selectProject.contains(event.target)) selectProject.classList.remove("active");
});

// Initialize dropdowns on page load
document.addEventListener("DOMContentLoaded", function () {
  populateCategoryDropdown();
  populateProjectDropdown("all");
});
