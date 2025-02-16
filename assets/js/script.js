"use strict";

// Helper function for toggling the 'active' class
const toggleActiveClass = (element) => {
  element.classList.toggle("active");
  console.log(`Toggled 'active' class on ${element}`);
};

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    toggleActiveClass(sidebar);
  });
} else {
  console.log("Sidebar or Sidebar button not found");
}

// Modal variables for testimonials
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Toggle modal visibility
const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  console.log("Modal toggled");
};

// Open modal on testimonial item click
testimonialsItems.forEach((item) => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    toggleModal();
  });
});

// Close modal on overlay or close button click
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", toggleModal);
} else {
  console.log("Modal close button not found");
}

if (overlay) {
  overlay.addEventListener("click", toggleModal);
} else {
  console.log("Overlay not found");
}

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

// Toggle select visibility
if (select) {
  select.addEventListener("click", () => toggleActiveClass(select));
} else {
  console.log("Select dropdown not found");
}

// Update selected value and filter projects
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    toggleActiveClass(select);
    applyFilter(selectedValue);
  });
});

// Apply filter based on selected category
const filterItems = document.querySelectorAll("[data-filter-item]");
const applyFilter = (selectedValue) => {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Handle filter button clicks for large screen
let lastClickedBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    applyFilter(selectedValue);
    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });
  });
} else {
  console.log("Form or inputs not found");
}

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    pages.forEach((page, pageIndex) => {
      page.classList.toggle("active", index === pageIndex);
      navigationLinks[pageIndex].classList.toggle("active", index === pageIndex);
    });
    window.scrollTo(0, 0);
  });
});

// Category and subcategory filtering
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category-select");
  const categoryList = document.getElementById("category-list");
  const subcategoryBox = document.getElementById("subcategory-box");
  const subcategoryList = document.getElementById("subcategory-list");
  const projectList = document.getElementById("project-list").children;

  const subcategories = {
    "remote-sensing": ["tidyverse", "classification"],
    "spatial-data-analysis": [] // Add subcategories if available
  };

  categoryList.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-item")) {
      const category = e.target.getAttribute("data-category");
      categorySelect.querySelector(".select-value").textContent = e.target.textContent;
      filterProjects(category, null);
      updateSubcategories(category);
    }
  });

  const updateSubcategories = (category) => {
    subcategoryList.innerHTML = "";
    if (subcategories[category] && subcategories[category].length > 0) {
      subcategories[category].forEach((sub) => {
        const li = document.createElement("li");
        li.classList.add("select-item");
        li.textContent = sub.replace("-", " ");
        li.setAttribute("data-subcategory", sub);
        subcategoryList.appendChild(li);
      });
      subcategoryBox.style.display = "block";
    } else {
      subcategoryBox.style.display = "none";
    }
  };

  const filterProjects = (category, subcategory) => {
    Array.from(projectList).forEach((project) => {
      const projectCategory = project.getAttribute("data-category");
      const projectSubcategory = project.getAttribute("data-subcategory");
      project.style.display =
        (category === "all" || projectCategory === category) &&
        (!subcategory || projectSubcategory === subcategory)
          ? "block"
          : "none";
    });
  };
});

// Load QMD content
const loadQMDContent = (url) => {
  document.getElementById('qmd-iframe').src = url;
  document.getElementById('qmd-container').style.display = 'block';
  document.getElementById('qmd-container').scrollIntoView({ behavior: "smooth" });
};
