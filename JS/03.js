function sketch3(id) {
    let canvas = sketches[id].canvas;
    let context = sketches[id].context;

    let width = canvas.width;
    let height = canvas.height;

    let planets = 5;
    let orbits = [];
    // let stars = 200;

    let sun = 20;
    let galaxyAngle = 30;

    sketches[id].slider1.value = (100/30)*planets;
    sketches[id].slider2.value = 5;
    sketches[id].slider3.value = 50;

    sketches[id].slider1.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        planets = Math.floor(mapRange(this.value, 0, 100, 1, 30));
        console.log(planets);

        //context.clearRect(0, 0, width, height);
        orbits.length = 0;

        for (let i = 0; i < planets; i++) {
            orbits[i] = new Orbit();
        }
    }

    sketches[id].slider2.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        let vel = mapRange(this.value, 0, 100, 0.2, 100);

        for (let i = 0; i < planets; i++) {
            orbits[i].planet.speed = vel;
            console.log(orbits[i].planet.speed);
        }
    }

    sketches[id].slider3.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        galaxyAngle = mapRange(this.value, 0, 100, 0, 360);

    }


    class Orbit {
        constructor() {
            this.radius = randomRange(40, 200);

            this.planet = new Planet(this.radius, randomRange(1,15), randomRange(0, 2*Math.PI));
        }

        draw(context) {
            context.save();
                context.translate(width / 2, height / 2);
                context.beginPath();
                    context.globalAlpha = 0.3;
                    context.ellipse(0, 0, 3 * this.radius /2, 2 * this.radius /2, degToRad(-galaxyAngle), 0, 2 * Math.PI);
                    context.strokeStyle = palette.color2;
                    context.stroke();
                context.closePath();
            context.restore();
        }
    }

    class Planet {
        constructor(radius, size, angle) {
            this.radiusBig = 3*radius/2;
            this.radiusSmall = 2*radius/2;


            this.size = size;

            this.offset = angle;

            this.speed = mapRange(sketches[id].slider2.value, 0, 100, 0.2, 100);

            this.posX = Math.sin(angle)*this.radiusBig;
            this.posY = Math.cos(angle)*this.radiusSmall;
        }

        draw(context) {
            context.save();
                context.translate(width / 2, height / 2);
                context.rotate(degToRad(-galaxyAngle));

                context.beginPath();
                    context.fillStyle = palette.color1;
                    
                    context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
                    context.fill();
                context.closePath();
            context.restore();
        }

        update() {
            this.posX = Math.sin(this.offset)*this.radiusBig;
            this.posY = Math.cos(this.offset)*this.radiusSmall;

            this.offset += this.speed/this.radiusSmall;
        }
            
    }

    for (let i = 0; i < planets; i++) {
        orbits[i] = new Orbit();
    }

    function animate() {
        context.fillStyle = palette.color3;
        context.fillRect(0, 0, width, height);

        context.beginPath();
            context.fillStyle = palette.color2;
            context.arc(width/2, height/2, sun, 0, Math.PI * 2);
            
            context.fill();
        context.closePath();

        for (let i = 0; i < orbits.length; i++) {
            orbits[i].planet.update();
            orbits[i].draw(context);
            orbits[i].planet.draw(context);
        }
    }

    if (sketches[id].isActive) {
        sketches[id].animation = setInterval(animate, 60);
        console.log("start!");
    } else {
        clearInterval(sketches[id].animation);
        console.log("stop!");
        if(sketches[id].stopped) return;
    }

    animate();
}
