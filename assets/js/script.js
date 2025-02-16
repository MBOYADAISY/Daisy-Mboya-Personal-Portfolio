'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Portfolio filter variables
const categorySelect = document.getElementById("category-select");
const categoryList = document.getElementById("category-list");
const selectedCategory = document.getElementById("selected-category");
const projectSelect = document.getElementById("project-select");
const projectList = document.getElementById("project-list");
const selectedProject = document.getElementById("selected-project");
const qmdContainer = document.getElementById("qmd-container");
const qmdIframe = document.getElementById("qmd-iframe");

// Project data (update these URLs accordingly)
const projectData = {
  "spatial-data-analysis": [
    { name: "Land Cover Change Analysis", url: "projects/land_cover.html" },
    { name: "Network Accessibility Study", url: "projects/network_access.html" }
  ],
  "remote-sensing": [
    { name: "Landsat Classification", url: "projects/landsat.html" },
    { name: "NDVI Time Series", url: "projects/ndvi.html" }
  ]
};

// Function to toggle dropdown visibility
categorySelect.addEventListener("click", function () {
  elementToggleFunc(categoryList);
});

projectSelect.addEventListener("click", function () {
  elementToggleFunc(projectList);
});

// Function to handle category selection
categoryList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const category = event.target.dataset.category;
    selectedCategory.innerText = event.target.innerText;
    categoryList.classList.remove("active");

    // Clear and update the project dropdown
    projectList.innerHTML = "";
    selectedProject.innerText = "Select project";
    projectSelect.setAttribute("disabled", ""); // Disable initially

    if (category !== "all" && projectData[category]) {
      projectData[category].forEach(project => {
        const li = document.createElement("li");
        li.classList.add("select-item");
        const button = document.createElement("button");
        button.dataset.projectUrl = project.url;
        button.innerText = project.name;
        li.appendChild(button);
        projectList.appendChild(li);
      });

      projectSelect.removeAttribute("disabled"); // Enable project dropdown
    }
  }
});

// Function to handle project selection
projectList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const projectUrl = event.target.dataset.projectUrl;
    selectedProject.innerText = event.target.innerText;
    projectList.classList.remove("active");

    // Display iframe with selected project
    qmdIframe.src = projectUrl;
    qmdContainer.style.display = "block";
  }
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", function () {
    pages.forEach((page, i) => {
      if (navLink.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});
