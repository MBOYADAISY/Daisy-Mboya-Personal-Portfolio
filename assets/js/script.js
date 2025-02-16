'use strict';

// Toggle dropdown function
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active");
};

// Close dropdown function
const closeDropdown = (dropdown) => {
  dropdown.classList.remove("active");
};

// Function to load project in iframe
const loadQMDContent = (url) => {
  const qmdContainer = document.getElementById("qmd-container");
  const qmdIframe = document.getElementById("qmd-iframe");

  qmdIframe.src = url;
  qmdContainer.style.display = "block";
};

// Category filter dropdown
const selectCategory = document.querySelector("[data-select]");
const selectItemsCategory = document.querySelectorAll("[data-select-item][data-project-category]");
const selectValueCategory = document.querySelector("[data-selecct-value]");

// Project type filter dropdown
const selectType = document.querySelector("[data-select-type]");
const selectItemsType = document.querySelectorAll("[data-select-item][data-project-type]");
const selectValueType = document.querySelector("[data-selecct-value-type]");

// Project items list
const projectItems = document.querySelectorAll('.project-item');

let selectedCategory = 'all';
let selectedType = 'all';

// Function to filter and load project
const filterAndLoadProject = () => {
  let firstVisibleProject = null;

  projectItems.forEach((project) => {
    const isCategoryMatch = selectedCategory === 'all' || project.classList.contains(selectedCategory);
    const isTypeMatch = selectedType === 'all' || project.classList.contains(selectedType);

    if (isCategoryMatch && isTypeMatch) {
      project.style.display = "block";
      if (!firstVisibleProject) {
        firstVisibleProject = project;
      }
    } else {
      project.style.display = "none";
    }
  });

  // Load first matching project in iframe
  if (firstVisibleProject) {
    const projectLink = firstVisibleProject.querySelector("a");
    if (projectLink) {
      const projectUrl = projectLink.getAttribute("onclick").match(/'([^']+)'/)[1];
      loadQMDContent(projectUrl);
    }
  } else {
    document.getElementById("qmd-container").style.display = "none";
  }
};

// Dropdown click event for category
selectCategory.addEventListener("click", (event) => {
  event.stopPropagation();
  elementToggleFunc(selectCategory);
});

// Handle category selection
selectItemsCategory.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedCategory = item.getAttribute("data-project-category");
    selectValueCategory.innerText = item.innerText;
    closeDropdown(selectCategory);
    filterAndLoadProject();
  });
});

// Dropdown click event for type
selectType.addEventListener("click", (event) => {
  event.stopPropagation();
  elementToggleFunc(selectType);
});

// Handle type selection
selectItemsType.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedType = item.getAttribute("data-project-type");
    selectValueType.innerText = item.innerText;
    closeDropdown(selectType);
    filterAndLoadProject();
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  closeDropdown(selectCategory);
  closeDropdown(selectType);
});

// Initially load all projects
filterAndLoadProject();
