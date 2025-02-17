'use strict';

// Function to toggle the active class of an element
const toggleElement = (elem) => {
  if (elem) elem.classList.toggle("active");
};

// Run script after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // Sidebar toggle for mobile
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => toggleElement(sidebar));
  }

  // Dropdown functionality for categories
  const selectCategory = document.querySelector("[data-select-category]");
  const categoryItems = document.querySelectorAll("#category-list [data-select-item]");
  const selectedCategoryValue = document.querySelector("[data-select-value-category]");

  // Dropdown functionality for projects
  const selectProject = document.querySelector("[data-select-project]");
  const projectList = document.getElementById("project-list");
  const selectedProjectValue = document.querySelector("[data-select-value-project]");

  // Project data
  const projects = {
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
  const loadProject = (url) => {
    const iframe = document.getElementById("qmd-iframe");
    iframe.src = url;
    document.getElementById("qmd-container").style.display = "block";
    iframe.scrollIntoView({ behavior: "smooth" });
  };

  // Populate project dropdown
  const populateProjectDropdown = (category) => {
    projectList.innerHTML = "";
    selectedProjectValue.textContent = "Select project";

    if (projects[category]) {
      projects[category].forEach(({ name, url }) => {
        const listItem = document.createElement("li");
        listItem.classList.add("select-item");

        const button = document.createElement("button");
        button.textContent = name;
        button.addEventListener("click", () => loadProject(url));

        listItem.appendChild(button);
        projectList.appendChild(listItem);
      });
    }

    toggleElement(selectProject);
  };

  // Handle category selection
  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      selectedCategoryValue.textContent = item.textContent;
      toggleElement(selectCategory);
      populateProjectDropdown(item.dataset.category);
    });
  });

  // Click event to toggle project dropdown
  if (selectProject) {
    selectProject.addEventListener("click", () => toggleElement(selectProject));
  }

  // Initialize with all projects on page load
  populateProjectDropdown("all");
});
