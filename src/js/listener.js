import { debounce } from "lodash";
import { createCourseFormHandler, editCourseFormHandler, recordGroupHandler, searchInputHandler } from "./handler"
import { createCourseForm, editCourseForm, recordGroup, searchInput } from "./selector"

export const listener = () => {
    createCourseForm.addEventListener("submit",createCourseFormHandler);
    recordGroup.addEventListener("click",recordGroupHandler);
    editCourseForm.addEventListener("submit",editCourseFormHandler);
    searchInput.addEventListener("keyup",debounce(searchInputHandler,500));
}