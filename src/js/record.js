import { recordGroup, recordTemplate, skeletonLoader } from "./selector"

export const createRecord = ({id,title,short_name,fee}) => {
    const recordUi = recordTemplate.content.cloneNode(true);
    recordUi.querySelector(".record-row").setAttribute("record-id",id);
    recordUi.querySelector(".record-id").innerText = id;
    recordUi.querySelector(".record-title").innerText = title;
    recordUi.querySelector(".record-short").innerText = short_name;
    recordUi.querySelector(".record-fee").innerText = fee;
    return recordUi;
}

export const coursesRender = (courses) => {
    recordGroup.innerHTML = "";
    courses.forEach((course) => recordGroup.append(createRecord(course)));
    skeletonLoader.classList.add("hidden");
}