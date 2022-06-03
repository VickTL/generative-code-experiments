function sketch1(id) {
    let canvas = sketches[id].canvas;
    let context = sketches[id].context;
    let width = canvas.width;
    let height = canvas.height;

    let smallSize;

    if(width < height) { smallSize = width; bigSize = height; }
    else { smallSize = height; bigSize = width; }

    let count;
    let chance;
    let time;

    // Preset
    if(sketches[id].firstTime == true) {
        sketches[id].slider1.value = 10;
        sketches[id].slider2.value = 50;
        sketches[id].slider3.value = 60;
        

        sketches[id].firstTime = false;
    }

    count = Math.floor(mapRange(sketches[id].slider1.value, 0, 100, 6, 60));
    chance = mapRange(sketches[id].slider2.value, 0, 100, 0, 1);
    time = mapRange(sketches[id].slider3.value, 0, 100, 300, 1);

    // Sliders
    sketches[id].slider1.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        count = Math.floor(mapRange(this.value, 0, 100, 6, 60));
        console.log(count);
    }

    sketches[id].slider2.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        chance = mapRange(this.value, 0, 100, 0, 1);
        console.log(chance);
    }

    sketches[id].slider3.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        time = mapRange(this.value, 0, 100, 300, 1);
        clearInterval(sketches[id].animation);
        sketches[id].animation = setInterval(animate, time);

        console.log(time);
    }

    function animate() {
        context.fillStyle = palette.color3;
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                let off = bigSize / 30;
                let total = (smallSize-(2*off));
                let size = total/(count+1);
                let gap = size/count;

                context.beginPath();
                context.rect(off + (size + gap) * i, off + (size + gap) * j, size, size);
                context.stroke();
                context.closePath();

                if (Math.random() > chance) {
                    context.fillStyle = palette.color2;
                    context.fill();
                } else {
                    context.fillStyle = palette.color1;
                    context.fill();
                }
            }
        }

    }

    if (sketches[id].isActive) {
        sketches[id].animation = setInterval(animate, time);
        console.log("start!");
    } else {
        clearInterval(sketches[id].animation);
        console.log("stop!");
        if(sketches[id].stopped) return;
    }

    animate();
}