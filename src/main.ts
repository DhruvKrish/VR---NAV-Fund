import * as AFRAME from "aframe";
import { Cylindrical } from "three";

console.log(AFRAME.version);

const totalFunds = 2480;
const countryFunds = {
    france: 1200,
    germany: 600,
    luxemborg: 500,
    italy: 140,
    uk: 30,
    ireland: 10,
    india: 1800,
};

AFRAME.registerComponent("show-funds", {
    schema: {default: ''},
    init() {
        console.log(this.data)
        this.el.addEventListener("click", () => {
            // const cyl = document.getElementById("maincyl");
            // cyl.setAttribute("visible", "false");
            const cyl = document.querySelector("#maincyl");
            // const cylinder = document.createElement("a-cylinder");
            const columnRadius = 0.5;

            cyl.setAttribute("height", countryFunds[this.data] / 1000);

            // cylinder.setAttribute("position", {
            //     x: 1,
            //     y: 6,
            //     z: 0,
            // });
            // scene.appendChild(cylinder);
        });
    },
});
