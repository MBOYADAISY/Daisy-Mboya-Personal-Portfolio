'use strict';

// Function to toggle visibility of dropdowns
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Category Dropdown
const selectCategory = document.querySelector("[data-select-category]");
const selectCategoryItems = document.querySelectorAll("#category-list [data-select-item]");
const selectCategoryValue = document.querySelector("[data-select-value-category]");

// Project Dropdown
const selectProject = document.querySelector("[data-select-project]");
const selectProjectList = document.getElementById("project-list");
const selectProjectValue = document.querySelector("[data-select-value-project]");

// Project Data (Mapping Categories to Projects)
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

// Function to Load QMD Content
function loadQMDContent(url) {
  const iframe = document.getElementById("qmd-iframe");
  iframe.src = url;
  document.getElementById("qmd-container").style.display = "block";
  iframe.scrollIntoView({ behavior: "smooth" });
}

// 📌 **Handle Category Selection**
selectCategoryItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedCategory = this.dataset.category; // Ensure correct attribute
    selectCategoryValue.textContent = this.textContent; // Update dropdown display
    selectCategory.classList.remove("active"); // Close dropdown after selection

    populateProjectDropdown(selectedCategory); // Load corresponding projects
  });
});

// 📌 **Populate Projects Dropdown Based on Selected Category**
function populateProjectDropdown(category) {
  selectProjectList.innerHTML = ""; // Clear existing options
  selectProjectValue.textContent = "Select project"; // Reset project dropdown

  if (projectData[category]) {
    projectData[category].forEach(project => {
      const listItem = document.createElement("li");
      listItem.classList.add("select-item");

      const button = document.createElement("button");
      button.setAttribute("data-select-item", "");
      button.textContent = project.name;
      button.addEventListener("click", function () {
        selectProjectValue.textContent = project.name; // Update selected value
        loadQMDContent(project.url); // Load project content
        selectProject.classList.remove("active"); // Close dropdown
      });

      listItem.appendChild(button);
      selectProjectList.appendChild(listItem);
    });
  }

  elementToggleFunc(selectProject); // Open project dropdown
}

// 📌 **Handle Project Dropdown Click**
selectProject.addEventListener("click", function () {
  elementToggleFunc(selectProject);
});

// Initialize dropdown with all projects on page load
document.addEventListener("DOMContentLoaded", function () {
  populateProjectDropdown("all");
});
