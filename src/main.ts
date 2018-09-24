import * as AFRAME from "aframe";
import * as THREE from "three";
import { Cylindrical } from "three";

console.log(AFRAME.version);

let totalFundsProcessed;
let fundsProcessedBeforeCutoff;
let fundsProcessedAfterCutoff;
let totalWIP;
let wipWellWithinCutoff;
let wipAboutToMissCutoff;
let totalMissed;

let totalFundsProcessedValue;
let fundsProcessedBeforeCutoffValue;
let fundsProcessedAfterCutoffValue;
let totalWIPValue;
let wipWellWithinCutoffValue;
let wipAboutToMissCutoffValue;
let totalMissedValue;

const totalFunds = 2480;
const countryFunds = {
    france: 1200,
    germany: 600,
    luxembourg: 500,
    italy: 140,
    uk: 30,
    ireland: 10,
    india: 1800,
};

const countryNames = {
    france: "France",
    germany: "Germany",
    italy: "Italy",
    luxembourg: "Luxembourg",
    india: "India",
    ireland: "Ireland",
    global: "Global",
    uk: "United Kingdom"
}

const data = {
    france: {
        totalFunds: 1200,
        processed: {
            total: 750,
            withinCutoff: 600,
            afterCutoff: 150
        },
        wip: {
            total: 250,
            aboutToMissCutoff: 100,
            wellWithinTime: 150
        },
        missedCutoff: {
            total: 200
        }
    },
    italy: {
        totalFunds: 140,
        processed: {
            total: 95,
            withinCutoff: 80,
            afterCutoff: 15
        },
        wip: {
            total: 30,
            aboutToMissCutoff: 5,
            wellWithinTime: 25
        },
        missedCutoff: {
            total: 15
        },
    },
    germany: {
        totalFunds: 600,
        processed: {
            total: 350,
            withinCutoff: 300,
            afterCutoff: 50
        },
        wip: {
            total: 200,
            aboutToMissCutoff: 50,
            wellWithinTime: 150
        },
        missedCutoff: {
            total: 50
        },
    },
    uk: {
        totalFunds: 30,
        processed: {
            total: 15,
            withinCutoff: 10,
            afterCutoff: 5
        },
        wip: {
            total: 10,
            aboutToMissCutoff: 2,
            wellWithinTime: 8
        },
        missedCutoff: {
            total: 5
        },
    },
    ireland: {
        totalFunds: 10,
        processed: {
            total: 7,
            withinCutoff: 5,
            afterCutoff: 2
        },
        wip: {
            total: 2,
            aboutToMissCutoff: 1,
            wellWithinTime: 1
        },
        missedCutoff: {
            total: 1
        },
    },
    global: {
        totalFunds: 2480,
        processed: {
            total: 1467,
            withinCutoff: 1195,
            afterCutoff: 272
        },
        wip: {
            total: 717,
            aboutToMissCutoff: 183,
            wellWithinTime: 534
        },
        missedCutoff: {
            total: 296
        }
    },
    luxembourg: {
        totalFunds: 500,
        processed: {
            total: 250,
            withinCutoff: 200,
            afterCutoff: 50
        },
        wip: {
            total: 225,
            aboutToMissCutoff: 25,
            wellWithinTime: 200
        },
        missedCutoff: {
            total: 25
        },
    },
    india: {
        totalFunds: 1800,
        processed: {
            total: 1000,
            withinCutoff: 800,
            afterCutoff: 200
        },
        wip: {
            total: 600,
            aboutToMissCutoff: 100,
            wellWithinTime: 500
        },
        missedCutoff: {
            total: 200
        },
    },
}

AFRAME.registerComponent("show-funds", {
    schema: { default: '' },
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

AFRAME.registerComponent("zooming", {
    schema: { default: "" },
    init() {
        console.log(this.data);
        this.el.addEventListener("click", () => {
            const globe = document.querySelector("#globe");
            const pos = globe.getAttribute("position");
            // globe.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z - 5});
            globe.setAttribute("material", "opacity: 0.9");
            const mapPlane = document.getElementById("mapPlane");

            mapPlane.setAttribute("material", `src: #$franceMap;`);
            mapPlane.setAttribute("visible", "true");
        })
    },
});

AFRAME.registerComponent("select-view", {
    schema: { default: "" },
    init() {

        this.el.addEventListener("click", () => {
            console.log("working")
            const globe = document.querySelector("#globe");
            const pos = globe.getAttribute("position");
            // globe.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z - 5});
            // globe.setAttribute("material", "opacity: 0.5");
            if (this.data == "global") {
                globe.setAttribute("material", "opacity: 1");
                document.getElementById("heading").setAttribute("value", countryNames[this.data] + " View");
                // globe.emit("goingforwards")
                // document.querySelector("#ocean").setAttribute("visible", "false");
                document.querySelector("#countryFocusPlane").setAttribute("visible", "false");
            } else {
                // document.querySelector("#ocean").setAttribute("visible", "true");
                // globe.setAttribute("material", "opacity: 0.5");
                globe.emit("country-map-appearing");
                const countryFocusPlane = document.querySelector("#countryFocusPlane");
                countryFocusPlane.setAttribute("material", `src: #${this.data}Map; transparent: true`);
                countryFocusPlane.emit("country-map-appearing");
                countryFocusPlane.setAttribute("visible", "true");
                document.getElementById("heading").setAttribute("value", countryNames[this.data] + " View");
                // globe.emit('goingbackwards');
            }
            const totalFundsProcessed = document.querySelector("#total-processed");
            const fundsProcessedBeforeCutoff = document.querySelector("#processed-before-cutoff");
            const fundsProcessedAfterCutoff = document.querySelector("#processed-after-cutoff");

            const totalWIP = document.querySelector("#total-wip");
            const wipWellWithinCutoff = document.querySelector("#wip-well-within-cutoff");
            const wipAboutToMissCutoff = document.querySelector("#wip-about-to-miss-cutoff");

            const totalMissed = document.querySelector("#total-missed");

            


            const viewData = data[this.data];
            console.log(viewData)

            const deno1 = 500;
            const deno2 = 100;
            const deno3 = 200;

            totalFundsProcessed.setAttribute("height", viewData["processed"].total / deno1);
            fundsProcessedBeforeCutoff.setAttribute("height", viewData["processed"].withinCutoff / deno1);
            fundsProcessedAfterCutoff.setAttribute("height", viewData["processed"].afterCutoff / deno1);

            totalWIP.setAttribute("height", viewData["wip"].total / deno3);
            wipWellWithinCutoff.setAttribute("height", viewData["wip"].wellWithinTime / deno3);
            wipAboutToMissCutoff.setAttribute("height", viewData["wip"].aboutToMissCutoff / deno3);

            totalMissed.setAttribute("height", viewData["missedCutoff"].total / deno2);
        })
    }
})

AFRAME.registerComponent("swap-plane", {
    schema: { default: "" },
    init() {
        this.el.addEventListener("click", () => {
            console.log(this.data);
            const first = document.querySelector("#first");
            first.emit("swap");
        })
    }
})

AFRAME.registerComponent("global-view", {
    schema: { default: "" },
    init() {
        document.querySelector('a-scene').addEventListener('loaded', () => {
            console.log('loaded')
            this.totalFundsProcessed = document.querySelector("#total-processed");
            this.fundsProcessedBeforeCutoff = document.querySelector("#processed-before-cutoff");
            this.fundsProcessedAfterCutoff = document.querySelector("#processed-after-cutoff");
        
            this.totalWIP = document.querySelector("#total-wip");
            this.wipWellWithinCutoff = document.querySelector("#wip-well-within-cutoff");
            this.wipAboutToMissCutoff = document.querySelector("#wip-about-to-miss-cutoff");
        
            this.totalMissed = document.querySelector("#total-missed");
        
            const viewData = data["global"];
            console.log(viewData)
        
            const deno1 = 500;
            const deno2 = 100;
            const deno3 = 200;
        
            this.totalFundsProcessed.setAttribute("height", viewData["processed"].total / deno1);
            this.fundsProcessedBeforeCutoff.setAttribute("height", viewData["processed"].withinCutoff / deno1);
            this.fundsProcessedAfterCutoff.setAttribute("height", viewData["processed"].afterCutoff / deno1);
        
            this.totalWIP.setAttribute("height", viewData["wip"].total / deno3);
            this.wipWellWithinCutoff.setAttribute("height", viewData["wip"].wellWithinTime / deno3);
            this.wipAboutToMissCutoff.setAttribute("height", viewData["wip"].aboutToMissCutoff / deno3);
        
            this.totalMissed.setAttribute("height", viewData["missedCutoff"].total / deno2);


            this.totalFundsProcessedValue = document.querySelector("#total-processed-value");
            this.fundsProcessedBeforeCutoffValue = document.querySelector("#processed-before-cutoff-value");
            this.fundsProcessedAfterCutoffValue = document.querySelector("#processed-after-cutoff-value");

            this.totalWIPValue = document.querySelector("#total-wip-value");
            this.wipWellWithinCutoffValue = document.querySelector("#wip-well-within-cutoff-value");
            this.wipAboutToMissCutoffValue = document.querySelector("#wip-about-to-miss-cutoff-value");

            this.totalMissedValue = document.querySelector("#total-missed-value");

            this.totalFundsProcessedValue.setAttribute("value", viewData["processed"].total);
            this.fundsProcessedBeforeCutoffValue.setAttribute("value", viewData["processed"].withinCutoff);
            this.fundsProcessedAfterCutoffValue.setAttribute("value", viewData["processed"].afterCutoff);

            this.totalWIPValue.setAttribute("value", viewData["wip"].total);
            this.wipWellWithinCutoffValue.setAttribute("value", viewData["wip"].wellWithinTime);
            this.wipAboutToMissCutoffValue.setAttribute("value", viewData["wip"].aboutToMissCutoff);

            this.totalMissedValue.setAttribute("value", viewData["missedCutoff"].total);
        });
    }
})
// var cameraEl = document.querySelector('#camera');
// var worldPos = new THREE.Vector3();
// worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
// console.log(worldPos.x);