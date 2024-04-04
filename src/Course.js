import { listener } from "./js/listener";
import { render } from "./js/render";

class Courses  {
    init () {
        console.log("Courses App");
        render();
        listener();
    }
}

export default Courses;