let sketches = [];

// Definición de la clase Sketch
class Sketch {
    constructor(id) {
        this.id = id;
        this.isActive;
        this.animation;
        this.stopped = false;
        this.firstTime = true;

        this.canvasContainer = document.getElementById("sketch-"+this.id);
        this.canvas = document.querySelector("#sketch-"+this.id+" canvas");

        console.log("sketch-"+this.id+" created!");
        //console.log(this.canvas);

        this.slider1 = document.querySelector("#sketch-"+this.id+" #slider1");
        this.slider2 = document.querySelector("#sketch-"+this.id+" #slider2");
        this.slider3 = document.querySelector("#sketch-"+this.id+" #slider3");

        this.context = this.canvas.getContext("2d");
    }

    toggleActive() {
        this.isActive = !this.isActive;

        if(this.isActive) { console.log("Sketch-"+this.id+" started!"); this.stopped = false; }
        else { console.log("Sketch-"+this.id+" stopped!"); this.stopped = true; }

        this.play();
    }

    play() {
        switch(this.id) {
            case 0:
                sketch1(this.id);
                break;
            case 1:
                sketch2(this.id);
                break;
            case 2:
                sketch3(this.id);
                break;
            case 3:
                sketch4(this.id);
                break;
            case 4:
                sketch5(this.id);
                break;
            default:
                console.log("Sketch-"+this.id+" not found!");
        }
    }

    fullScreen() {
        if(this.isActive) this.toggleActive();

        document.querySelector("#fullScreen").innerHTML = `
            <a id="quitFullScreen" onClick="sketches[${this.id}].quitFullScreen()"></a>
            <div class="canvasContainer" id="sketch-${this.id}">
                <canvas width="2000" height="2000"></canvas>
            </div>
        `

        document.querySelector("#fullScreen").style.display = "block";
        if(window.innerHeight > window.innerWidth) {
            document.querySelector("#fullScreen canvas").style.height = "90vw";
            document.querySelector("#fullScreen canvas").style.width = "90vw";
        }
        else {
            document.querySelector("#fullScreen canvas").style.height = "90vh";
            document.querySelector("#fullScreen canvas").style.width = "90vh";
        }

        this.canvas = document.querySelector("#fullScreen canvas");
        this.context = this.canvas.getContext("2d");

        if(!this.isActive) this.toggleActive();
    }

    quitFullScreen() {
        document.querySelector("#fullScreen").style.display = "none";

        this.canvas = document.querySelector("#sketch-"+this.id+" canvas");
        this.context = this.canvas.getContext("2d");


        this.play();
    }
}

// Generación de Array de Sketches
for (let i = 0; i < sketchCount; i++) {
    sketches.push(new Sketch(i));

    sketches[i].play(); // crea la preview del sketch
}