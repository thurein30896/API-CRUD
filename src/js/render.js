import { coursesRender } from "./record";

export const render = async() => {
    const res = await fetch("http://localhost:5173/api/courses");
    const json = await res.json();
    coursesRender(json);
}