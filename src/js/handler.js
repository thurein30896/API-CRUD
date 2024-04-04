import { deleteRecord, disableForm, editRecord, enableForm } from "./function";
import { coursesRender, createRecord } from "./record";
import { createCourseForm, editDrawer, recordEdit, recordGroup } from "./selector";
import Swal from "sweetalert2";

export const createCourseFormHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData(createCourseForm);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        title : formData.get("course_title"),
        short_name : formData.get("short_name"),
        fee : formData.get("fee"),
    });

    const options = {
        method : "POST",
        headers,
        body,
        redirect: 'follow',
    };
    disableForm(e);
    const res = await fetch("http://localhost:5173/api/courses",options);
    const json = await res.json();

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Course add successfully"
      });
    recordGroup.append(createRecord(json));
    enableForm(e);
    createCourseForm.reset();
}

export const recordGroupHandler = (e) => {
    if(e.target.classList.contains("record-del")){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                deleteRecord(e);
            }
          });
    }else if(e.target.classList.contains("record-edit")){
        editRecord(e);
    }
}

export const editCourseFormHandler = async(e) => {
    e.preventDefault();

    const formData = new FormData(editCourseForm);
    const currentId = formData.get("id");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        title : formData.get("course_title"),
        short_name : formData.get("short_name"),
        fee : formData.get("fee"),
    });

    const options = {
        method : "PUT",
        headers,
        body,
        redirect: 'follow',
    };

    disableForm(e);
    const res = await fetch("http://localhost:5173/api/courses/"+ currentId,options);
    const json = await res.json();

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Edit Successfully"
      });

    const currentRow = document.querySelector(`[record-id='${currentId}']`)
    currentRow.querySelector(".record-title").innerText = json.title;
    currentRow.querySelector(".record-short").innerText = json.short_name;
    currentRow.querySelector(".record-fee").innerText = json.fee;
    enableForm(e);
    editDrawer.hide();
};

export const searchInputHandler = async(e) => {
    e.target.previousElementSibling.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
    `;

    const res = await fetch("http://localhost:5173/api/courses?title[like]=" + e.target.value);
    const json = await res.json();
    if(json.length) {
        coursesRender(json);
    }else{
        recordGroup.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center px-6 py-4">Not Found <a class="underline" href="http://${location.host}">See all</a> </td>
                    </tr>
                `
    }
    e.target.previousElementSibling.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        `;
}