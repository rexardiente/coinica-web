import $ from "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

let BodyCollapseDefault = () => {
  $("#body-row .collapse").collapse("hide");
};

let SideCollapseDefault = () => {
  // $("#collapse-icon-left").addClass("bi bi-chevron-double-left");
  $("#collapse-icon-right").hide();
  recentUpdates(true);
};

// Collapse click
let SidebarCollapse = () => {
  $(".menu-collapsed").toggleClass("d-none");
  $(".sidebar-submenu").toggleClass("d-none");
  $(".submenu-icon").toggleClass("d-none");
  $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

  // Treating d-flex/d-none on separators with title
  let SeparatorTitle = $(".sidebar-separator-title");
  if (SeparatorTitle.hasClass("d-flex")) {
    SeparatorTitle.removeClass("d-flex");
  } else {
    SeparatorTitle.addClass("d-flex");
  }

  // Collapse/Expand icon
  $("#collapse-icon").toggleClass("bi bi-chevron-double-right");

  let leftArrow = $("#collapse-icon-left");
  let rightArrow = $("#collapse-icon-right");
  let sidebarContainer = $("#sidebar-container");

  //  Show/Hide description
  if (leftArrow.is(":visible") === true) {
    leftArrow.hide();
    rightArrow.show();
  } else {
    leftArrow.show();
    rightArrow.hide();
  }

  if (sidebarContainer.hasClass("col-2")) {
    sidebarContainer.removeClass("col-2");
    recentUpdates(false);
  } else {
    sidebarContainer.addClass("col-2");
    recentUpdates(true);
  }
};

function recentUpdates(bool) {
  if (bool) $("#recent-update").css("margin-left", "17%");
  else $("#recent-update").css("margin-left", "5%");
}

export { SideCollapseDefault, BodyCollapseDefault, SidebarCollapse };
