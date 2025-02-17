'use strict';

// Function to toggle element visibility
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Portfolio category and project selection
const categorySelect = document.querySelector("[data-select-category]");
const categoryValue = document.querySelector("[data-select-value-category]");
const categoryList = document.getElementById("category-list");
const projectSelect = document.querySelector("[data-select-project]");
const projectValue = document.querySelector("[data-select-value-project]");
const projectList = document.getElementById("project-list");
const qmdContainer = document.getElementById("qmd-container");
const qmdIframe = document.getElementById("qmd-iframe");

// Data structure for categories and projects
const portfolioData = {
  "Remote Sensing": [
    { name: "Land Cover Classification", url: "path/to/classification.qmd" },
    { name: "Vegetation Analysis", url: "path/to/vegetation.qmd" }
  ],
  "GIS Analysis": [
    { name: "Equity Mapping", url: "path/to/equity.qmd" },
    { name: "Road Network Analysis", url: "path/to/road_network.qmd" }
  ]
};

// Populate category list
categoryList.innerHTML = Object.keys(portfolioData)
  .map(category => `<li class="select-item" data-category="${category}">${category}</li>`)
  .join("");

// Handle category selection
categoryList.addEventListener("click", (event) => {
  if (event.target.matches(".select-item")) {
    const selectedCategory = event.target.dataset.category;
    categoryValue.textContent = selectedCategory;
    categoryList.classList.remove("active");
    projectValue.textContent = "Select project";
    projectList.innerHTML = portfolioData[selectedCategory]
      .map(project => `<li class="select-item" data-url="${project.url}">${project.name}</li>`)
      .join("");
  }
});

// Handle project selection
projectList.addEventListener("click", (event) => {
  if (event.target.matches(".select-item")) {
    const projectUrl = event.target.dataset.url;
    projectValue.textContent = event.target.textContent;
    projectList.classList.remove("active");
    qmdIframe.src = projectUrl;
    qmdContainer.style.display = "block";
  }
});

// Toggle category dropdown
categorySelect.addEventListener("click", () => {
  elementToggleFunc(categoryList);
});

// Toggle project dropdown
projectSelect.addEventListener("click", () => {
  elementToggleFunc(projectList);
});
