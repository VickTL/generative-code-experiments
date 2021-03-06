// HTML Gen
const sketchCount = 3;

function loadCarrousel() {
    for (let i = 0; i < sketchCount; i++) {
        document.querySelector("#carrousel").innerHTML += `
            <div class="canvasContainer" id="sketch-${i}">
                <div class="canvasTitle">
                    <h3>Sketch ${i + 1}</h3>
                    <div class="canvasControls">
                        <a class="canvasButton" id="reloadButton" onClick="sketches[${i}].reload()"><div></div></a>
                        <a class="canvasButton" id="presetButton" onClick="sketches[${i}].preset()"><div></div></a>
                        <a class="canvasButton" id="fullScreenButton" onClick="sketches[${i}].fullScreen()"><div></div></a>
                    </div>
                </div>
                <canvas width="500" height="500" onClick="sketches[${i}].toggleActive()"></canvas>
                <div class="sliderPack">
                    <input type="range" min="1" max="100" value="50" class="slider" id="slider1">
                    <input type="range" min="1" max="100" value="50" class="slider" id="slider2">
                    <input type="range" min="1" max="100" value="50" class="slider" id="slider3">
                </div>
            </div>
        `;
    }
}


// Carrusel
loadCarrousel();


// Paletas
class Palette {
    constructor(color1, color2, color3) {
        this.color3 = color3;
        this.color1 = color1;
        this.color2 = color2;

        document.getElementById("color1").value = this.color1;
        document.getElementById("color2").value = this.color2;
        document.getElementById("color3").value = this.color3;

        document.documentElement.style.setProperty('--color-1', this.color1);
        document.documentElement.style.setProperty('--color-2', this.color2);
        document.documentElement.style.setProperty('--color-3', this.color3);
    }
}

let palette = new (Palette)("#556600", "#ffffff", "#111111");


document.querySelector("#palette").addEventListener("change", function () {
    palette.color1 = document.getElementById("color1").value;
    palette.color2 = document.getElementById("color2").value;
    palette.color3 = document.getElementById("color3").value;

    document.documentElement.style.setProperty('--color-1', palette.color1);
    document.documentElement.style.setProperty('--color-2', palette.color2);
    document.documentElement.style.setProperty('--color-3', palette.color3);

    for (let i = 0; i < sketchCount; i++) {
        clearInterval(sketches[i].animation);
        sketches[i].stopped = false;
        sketches[i].play();
    }
});

// cuando la pagina se deja de estar usando, todos paran
window.addEventListener("blur", function () {
    for (let i = 0; i < sketchCount; i++) {
        if(sketches[i].isActive) {
            sketches[i].toggleActive();
        }
    }
});