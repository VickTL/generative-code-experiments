let sketches = [];

// Definición de la clase Sketch
class Sketch {
    constructor(id) {
        this.id = id;
        this.isActive;
        this.animation;
        this.stopped = false;

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
}

// Generación de Array de Sketches
for (let i = 0; i < sketchCount; i++) {
    sketches.push(new Sketch(i));

    sketches[i].play(); // crea la preview del sketch
}