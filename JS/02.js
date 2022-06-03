function sketch2(id) {
    // Select the canvas element
    let canvas = sketches[id].canvas;
    let context = sketches[id].context;


    // example sketch
    let width = canvas.width;
    let height = canvas.height;

    let count;
    let vel;
    let stella;

    if(sketches[id].firstTime == true) {
        sketches[id].slider1.value = 50;
        sketches[id].slider2.value = 50;
        sketches[id].slider3.value = 1;

        context.fillStyle = palette.color3;
        context.globalAlpha = 1;
        context.fillRect(0, 0, width, height);

        sketches[id].firstTime = false;
    }

    // preset
    count = mapRange(sketches[id].slider1.value, 0, 100, 1, 160);
    vel = mapRange(sketches[id].slider2.value, 0, 100, 0.1, 2);
    stella = mapRange(sketches[id].slider3.value, 0, 100, 0.5, 0.01);

    sketches[id].slider1.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        count = mapRange(this.value, 0, 100, 1, 160);
        agents.length = 0;

        for (let i = 0; i < count; i++) {
            agents[i] = new Agent(randomRange(0, width), randomRange(0, height));
        }
    }


    sketches[id].slider2.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        vel = mapRange(this.value, 0, 100, 0.1, 2);

        agents.forEach(agent => {
            agent.vel.x = baseV * randomRange(-vel, vel);
            agent.vel.y = baseV * randomRange(-vel, vel);
        });
    }

    sketches[id].slider3.oninput = function () {
        if(!sketches[id].isActive) sketches[id].toggleActive();

        stella = mapRange(this.value, 0, 100, 0.5, 0.001);
    }

    let agents = [];

    let baseV = 0.5;

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        distanceTo(v) {
            //pitagoras entre dos puntos
            const dx = this.x - v.x;
            const dy = this.y - v.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    class Agent {
        constructor(x, y) {
            this.pos = new Vector(x, y);
            this.vel = new Vector(randomRange(-baseV, baseV), randomRange(-baseV, baseV));
            this.radius = randomRange(1, 6);
            this.checkradius = this.radius * 5;

            this.color = Math.random();
        }

        draw(context) {
            if(this.color > 0.5) context.fillStyle = palette.color1;
            else context.fillStyle = palette.color2;
            //blend(palette.color1, palette.color2, this.color);
            context.globalAlpha = this.color;

            context.save();
            context.translate(this.pos.x, this.pos.y);

            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2);

            context.fill();
            context.restore();
        }

        update() {
            this.pos.x += this.vel.x*0.005*width;
            this.pos.y += this.vel.y*0.005*height;
        }

        bounce(width, height) {
            if (this.pos.x >= width || this.pos.x <= 0) {
                this.vel.x *= -1;
            }
            if (this.pos.y >= height || this.pos.y <= 0) {
                this.vel.y *= -1;
            }
        }

        check(agents) {
            let nearestD = 500;

            for (let i = 0; i < agents.length; i++) {
                const dist = this.pos.distanceTo(agents[i].pos);

                if (dist < nearestD && dist > 0) {
                    nearestD = dist;
                }
            }

            this.radius = nearestD / 2;
        }
    }

    for (let i = 0; i < count; i++) {
        agents[i] = new Agent(randomRange(0, width), randomRange(0, height));
    }

    function animate() {
        context.fillStyle = palette.color3;
        context.globalAlpha = stella;
        context.fillRect(0, 0, width, height);

        agents.forEach(agent => {
            agent.update();
            agent.bounce(width, height);
            agent.check(agents);
            agent.draw(context);
        });

        //console.log("frame");
    }


    if (sketches[id].isActive) {
        sketches[id].animation = setInterval(animate, 1000/60);
        console.log("start!");
    } else {
        clearInterval(sketches[id].animation);
        console.log("stop!");
        if(sketches[id].stopped) {
            console.log("ewe");
            return;
        }
    }

    animate();
}