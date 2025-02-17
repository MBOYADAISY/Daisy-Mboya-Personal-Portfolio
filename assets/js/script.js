'use strict';

// Function to toggle an element
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Sidebar toggle functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// --- CATEGORY & PROJECT DROPDOWN LOGIC ---

const selectCategory = document.querySelector("[data-select]"); // Category dropdown
const selectCategoryValue = document.querySelector("[data-selecct-value]"); // Selected category text
const categoryItems = document.querySelectorAll("[data-select-item]"); // All category options
const projectDropdown = document.getElementById("projectButton"); // Project dropdown
const projectList = document.getElementById("projectList"); // List of project buttons
const projectItems = projectList.querySelectorAll("[data-category]"); // All projects with category data

// Function to filter projects based on selected category
const filterProjects = function (selectedCategory) {
  projectItems.forEach(project => {
    if (selectedCategory === "all" || project.dataset.category === selectedCategory) {
      project.style.display = "block"; // Show matching projects
    } else {
      project.style.display = "none"; // Hide non-matching projects
    }
  });
};

// Event listener for category selection
categoryItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase(); // Get selected category
    selectCategoryValue.innerText = this.innerText; // Update button text

    filterProjects(selectedValue); // Filter projects

    projectDropdown.style.display = "block"; // Show project dropdown after category selection
  });
});

// Event listener for project dropdown toggle
projectDropdown.addEventListener("click", function () {
  projectList.style.display = (projectList.style.display === "none" || projectList.style.display === "") ? "block" : "none";
});

// Function to load project in iframe
function loadQMDContent(url) {
  var iframe = document.getElementById('qmd-iframe');
  iframe.src = url;
  var container = document.getElementById('qmd-container');
  container.style.display = 'block';
  container.scrollIntoView({ behavior: "smooth" });

  projectList.style.display = 'none'; // Hide project list after selection
}
