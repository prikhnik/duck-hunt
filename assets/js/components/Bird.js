class Bird {
    constructor(options = {}) {
        this.container = document.querySelector('.sky');
        this.el = document.createElement('div');
        this.el.classList.add("target", 'js-target');
        this.container.appendChild(this.el);

        this.hit = false;

        setInterval(() => {
            this.el.classList.add('--alt');
        }, 700);

        setInterval(() => {
            this.el.classList.remove('--alt');
        }, 1400)


        this.x = options.startX ?? 0;
        this.direction = options.direction ?? 1;
        this.t = options.startT ?? 0;
        this.speed = options.speed ?? 2;
        this.amplitude = options.amplitude ?? 100;

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }


    animate() {
        this.t += 0.01;

        const width = this.container.clientWidth - this.el.clientWidth;
        const height = this.container.clientHeight - this.el.clientHeight;

        this.x += this.direction * this.speed;

        if (this.x >= width || this.x <= 0) {
            this.direction *= -1;
        }

        if (this.direction === -1) {
            this.el.classList.add("--left");
        } else {
            this.el.classList.remove("--left");
        }

        const y = Math.sin(this.t * 2) * this.amplitude + height / 2;

        this.el.style.left = this.x + "px";
        this.el.style.bottom = y + "px";

        requestAnimationFrame(this.animate);
    }
}
