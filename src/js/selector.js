import { Drawer } from "flowbite";

export const recordTemplate = document.querySelector("#recordTemplate");
export const recordGroup = document.querySelector("#recordGroup");
export const skeletonLoader = document.querySelector("#skeletonLoader");
export const createCourseForm = document.querySelector("#createCourseForm");
export const recordEdit = document.querySelector("#recordEdit");
export const editCourseForm = document.querySelector("#editCourseForm");
export const searchInput = document.querySelector("#searchInput");



// options with default values
const options = {
    placement: "right",
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: "",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
    onHide: () => {
      // console.log("drawer is hidden");
    },
    onShow: () => {
      // console.log("drawer is shown");
    },
    onToggle: () => {
      // console.log("drawer has been toggled");
    },
  };
  
  // instance options object
  const instanceOptions = {
    id: "recordEdit",
    override: true,
  };
  
  export const editDrawer = new Drawer(recordEdit, options, instanceOptions);