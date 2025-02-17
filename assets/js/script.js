'use strict';

// Toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Category Dropdown Variables
const selectCategory = document.querySelector("[data-select-category]");
const categoryItems = document.querySelectorAll("[data-category-item]");
const selectValueCategory = document.querySelector("[data-select-value-category]");

// Project Dropdown Variables
const selectProject = document.querySelector("[data-select-project]");
const selectValueProject = document.querySelector("[data-select-value-project]");
const projectList = document.getElementById("project-list");

// Filter Variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Projects Data (For Dynamic Population)
const projectsData = {
  "spatial data analysis": [
    { name: "Geospatial Data Processing", link: "#" },
    { name: "Statistical Spatial Analysis", link: "#" }
  ],
  "remote sensing": [
    { name: "Introduction to Tidyverse", link: "Remote%20Sensing/Tidyverse/GEM520_Lab4-assign.html" },
    { name: "Image Classification", link: "Remote%20Sensing/Supervised%20Image%20Classification/Lab5_classification-assign.html" }
  ]
};

// Handle Category Selection
categoryItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedCategory = this.getAttribute("data-value");

    selectValueCategory.innerText = this.innerText;
    elementToggleFunc(selectCategory);
    filterFunc(selectedCategory);

    // Populate Project Dropdown
    populateProjectDropdown(selectedCategory);
  });
});

// Populate Project Dropdown
function populateProjectDropdown(category) {
  projectList.innerHTML = ""; // Clear previous items

  if (category === "all") {
    selectValueProject.innerText = "Select project";
    selectProject.setAttribute("disabled", "true");
    return;
  }

  let projects = projectsData[category] || [];
  
  projects.forEach(project => {
    let li = document.createElement("li");
    li.classList.add("select-item");

    let button = document.createElement("button");
    button.setAttribute("data-project-item", "");
    button.innerText = project.name;
    button.setAttribute("data-link", project.link);

    button.addEventListener("click", function () {
      selectValueProject.innerText = this.innerText;
      elementToggleFunc(selectProject);
      loadQMDContent(this.getAttribute("data-link"));
    });

    li.appendChild(button);
    projectList.appendChild(li);
  });

  selectValueProject.innerText = "Select project";
  selectProject.removeAttribute("disabled");
}

// Filter Projects Based on Category
function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Load QMD Content
function loadQMDContent(url) {
  var iframe = document.getElementById('qmd-iframe');
  iframe.src = url;
  document.getElementById('qmd-container').style.display = 'block';
  iframe.scrollIntoView({ behavior: "smooth" });
}
