class Gun {
    constructor() {
        const gun = document.getElementById('gun');

        const state = {
            mouseX: innerWidth / 2,
            mouseY: innerHeight / 2,
        };

        function getGunCenter() {
            const r = gun.getBoundingClientRect();
            return {x: r.left + r.width / 2, y: r.top + r.height / 2};
        }

        function angleToMouse() {
            const {x: cx, y: cy} = getGunCenter();
            const dx = state.mouseX - cx;
            const dy = state.mouseY - cy;
            return Math.atan2(dy, dx);
        }

        window.addEventListener('mousemove', (e) => {
            state.mouseX = e.clientX;
            state.mouseY = e.clientY;
        });

        function loop() {
            const angle = angleToMouse();
            const deg = angle * 180 / Math.PI + 90;
            gun.style.transform = `translateX(-50%) rotate(${deg}deg)`;
            requestAnimationFrame(loop);
        }

        loop();
    }

}

new Gun();