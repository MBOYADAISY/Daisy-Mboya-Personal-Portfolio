'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const select2 = document.querySelector("[data-select2]");
const selectItems2 = document.querySelectorAll("[data-select2-item]");
const selectValue2 = document.querySelector("[data-select-value2]");

let selectedFirstFilterValue = "all"; // Initialize with default value "all"

// add event to the main select box (category)
select.addEventListener("click", function () { elementToggleFunc(this); });

// add event to all select items for the first filter (category)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    selectedFirstFilterValue = selectedValue;  // Update selected first filter value
    filterFunc(selectedValue);  // Apply filter to the project list
    resetSecondFilter();  // Reset second filter
  });
}

// filter function for the first filter (category)
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
  updateSecondFilterOptions(selectedValue);  // Update second filter based on category selection
};

// Handle the second filter (subcategory)
const updateSecondFilterOptions = function (category) {
  const filterItems2 = document.querySelectorAll("[data-select2-item]");
  for (let i = 0; i < filterItems2.length; i++) {
    const itemCategory = filterItems2[i].dataset.category;
    if (category === "all" || category === itemCategory) {
      filterItems2[i].classList.remove("hidden");
    } else {
      filterItems2[i].classList.add("hidden");
    }
  }
};

// Event listener for the second filter items (subcategory)
for (let i = 0; i < selectItems2.length; i++) {
  selectItems2[i].addEventListener("click", function () {
    let selectedSecondValue = this.innerText.toLowerCase();
    selectValue2.innerText = this.innerText;
    filterFunc2(selectedSecondValue);  // Apply subcategory filter
  });
}

// filter function for the second filter (subcategory)
const filterFunc2 = function (selectedValue) {
  const filterItems2 = document.querySelectorAll("[data-filter-item]");
  for (let i = 0; i < filterItems2.length; i++) {
    if (selectedValue === "all") {
      filterItems2[i].classList.add("active");
    } else if (selectedValue === filterItems2[i].dataset.subcategory && selectedFirstFilterValue === filterItems2[i].dataset.category) {
      filterItems2[i].classList.add("active");
    } else {
      filterItems2[i].classList.remove("active");
    }
  }
};

// Reset second filter options
const resetSecondFilter = function () {
  selectValue2.innerText = "Select subcategory";  // Reset the second select box
  const filterItems2 = document.querySelectorAll("[data-select2-item]");
  for (let i = 0; i < filterItems2.length; i++) {
    filterItems2[i].classList.remove("hidden");
  }
};

// Handle project selection
const projects = document.querySelectorAll(".project-item");

for (let i = 0; i < projects.length; i++) {
  projects[i].addEventListener("click", function () {
    let category = this.dataset.category.toLowerCase();
    let subcategory = this.dataset.subcategory.toLowerCase();
    filterFunc(category);
    filterFunc2(subcategory);
  });
}

// toggle active class for navigation links
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
</script>
