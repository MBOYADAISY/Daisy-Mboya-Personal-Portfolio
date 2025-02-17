'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  if (elem) {
    elem.classList.toggle("active");
    console.log("Toggled:", elem);
  }
};

// Run script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // Sidebar toggle for mobile
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }

  // Testimonials modal functionality
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // Modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    elementToggleFunc(modalContainer);
    elementToggleFunc(overlay);
  };

  // Open modal on testimonial click
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      console.log("Testimonial clicked");
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  // Close modal on button or overlay click
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // Dropdown functionality for categories
  const selectCategory = document.querySelector("[data-select-category]");
  const selectCategoryItems = document.querySelectorAll("#category-list [data-select-item]");
  const selectCategoryValue = document.querySelector("[data-select-value-category]");

  // Dropdown functionality for projects
  const selectProject = document.querySelector("[data-select-project]");
  const selectProjectList = document.getElementById("project-list");
  const selectProjectValue = document.querySelector("[data-select-value-project]");

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

  // Handle category selection
  selectCategoryItems.forEach(item => {
    item.addEventListener("click", function () {
      console.log("Category Selected:", this.dataset.category);
      const selectedCategory = this.dataset.category;
      selectCategoryValue.textContent = this.textContent;
      elementToggleFunc(selectCategory);
      populateProjectDropdown(selectedCategory);
    });
  });

  // Populate projects dropdown based on selected category
  function populateProjectDropdown(category) {
    console.log("Populating projects for:", category);
    selectProjectList.innerHTML = "";
    selectProjectValue.textContent = "Select project";

    if (projectData[category]) {
      projectData[category].forEach(project => {
        console.log("Adding project:", project.name);
        const listItem = document.createElement("li");
        listItem.classList.add("select-item");

        const button = document.createElement("button");
        button.setAttribute("data-select-item", "");
        button.textContent = project.name;
        button.addEventListener("click", function () {
          console.log("Loading project:", project.url);
          loadQMDContent(project.url);
        });

        listItem.appendChild(button);
        selectProjectList.appendChild(listItem);
      });
    }

    elementToggleFunc(selectProject);
  }

  // Click event to toggle project dropdown
  if (selectProject) {
    selectProject.addEventListener("click", function () {
      elementToggleFunc(selectProject);
    });
  }

  // Fix missing filter button variable
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const selectValue = document.querySelector("[data-select-value]");

  // Filtering function
  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
    });
  };

  // Handle filter button clicks
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // Contact form validation
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form) {
    formInputs.forEach(input => {
      input.addEventListener("input", function () {
        formBtn.toggleAttribute("disabled", !form.checkValidity());
      });
    });
  }

  // Page navigation
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      pages.forEach(page => {
        const isActive = this.innerHTML.toLowerCase() === page.dataset.page;
        page.classList.toggle("active", isActive);
        link.classList.toggle("active", isActive);
      });
      window.scrollTo(0, 0);
    });
  });

  // Initialize dropdown with all projects on page load
  populateProjectDropdown("all");
});
