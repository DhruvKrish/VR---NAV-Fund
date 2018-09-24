import * as AFRAME from "aframe";
import * as THREE from "three";
import { Cylindrical } from "three";

console.log(AFRAME.version);

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
            globe.emit("goingforwards")
            // document.querySelector("#ocean").setAttribute("visible", "false");
        } else {
            // document.querySelector("#ocean").setAttribute("visible", "true");
            globe.setAttribute("material", "opacity: 0.5");
            globe.emit('goingbackwards');
        }
        const countryFocusPlane = document.getElementById("countryFocusPlane");
        countryFocusPlane.setAttribute("material", `src: #${this.data}Map; transparent: true`);
        // countryFocusPlane.setAttribute("visible", "true");

        const totalFundsProcessed = document.querySelector("#maincyl");
        const fundsProcessedBeforeCutoff = document.querySelector("#maincyl-2");
        const fundsProcessedAfterCutoff = document.querySelector("#maincyl-3");
        const viewData = data[this.data];
        console.log(this.data)
        totalFundsProcessed.setAttribute("height", viewData["processed"].total / 1000);
        fundsProcessedBeforeCutoff.setAttribute("height", viewData["processed"].withinCutoff / 1000);
        fundsProcessedAfterCutoff.setAttribute("height", viewData["processed"].afterCutoff / 1000);
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

AFRAME.registerComponent("swap-teams", {
    schema: { default: "" },
    init() {
            var p1 = document.querySelector('#first_p');
            var p2 = document.querySelector('#second_p');
            var p3 = document.querySelector('#third_p');
            var p4 = document.querySelector('#fourth_p');
                this.el.addEventListener('click',()=> {
                    var xval = this.el.getAttribute("position").x;
                    console.log(xval);
                    var temp= p1;
                    if(p1.getAttribute('position').x==210.74)
                        temp = p1;
                    if(p2.getAttribute('position').x==210.74)
                        temp = p2;
                    if(p3.getAttribute('position').x==210.74)
                        temp = p3;
                    if(p4.getAttribute('position').x==210.74)
                        temp = p4;

                        console.log(temp);
                    if(xval!=210.74)  
                    {
                    if(xval == 240.74)
                        {temp.emit("four");
                        console.log("moving to four: "+temp);}
                    else if(xval == 230.74)
                        temp.emit("three");
                    else if(xval == 220.74)
                        temp.emit("two");


                    this.el.emit("one");
                    }
        })
    }
})



// var cameraEl = document.querySelector('#camera');
// var worldPos = new THREE.Vector3();
// worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
// console.log(worldPos.x);