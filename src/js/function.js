import { editDrawer, recordEdit } from "./selector";

export const disableForm = (e) => {
    e.target.querySelectorAll("input").forEach(el => el.setAttribute("disabled",true));
    e.target.querySelector("button").disabled = true;
}

export const enableForm = (e) => {
    e.target.querySelectorAll("input").forEach(el => el.toggleAttribute("disabled",false));
    e.target.querySelector("button").disabled = false;
}

export const deleteRecord = async(e) => {
    const recordRow = e.target.closest(".record-row");
    const recordId = recordRow.getAttribute("record-id");
    e.target.disabled = true;
    const res = await fetch("http://localhost:5173/api/courses/"+ recordId,{method : "DELETE" ,redirect : "follow"});
    if(res.status === 204){
        recordRow.remove();
    }
    e.target.disabled = false;
}

export const editRecord = async(e) => {
    const recordRow = e.target.closest(".record-row");
    const recordId = recordRow.getAttribute("record-id");
    e.target.disabled = true;
    const res = await fetch("http://localhost:5173/api/courses/"+ recordId);
    const json = await res.json();
    e.target.disabled = false;

    recordEdit.querySelector("#editCourseId").value = json.id;
    recordEdit.querySelector("#editCourseTitle").value = json.title;
    recordEdit.querySelector("#editShortName").value = json.short_name;
    recordEdit.querySelector("#editFee").value = json.fee;

    editDrawer.show();
}