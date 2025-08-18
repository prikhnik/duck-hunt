class Gun {
    constructor() {
        this.gun = document.getElementById('gun');
        this.scene = document.getElementById('scene');

        this.state = {
            mouseX: innerWidth / 2,
            mouseY: innerHeight / 2,
            bullets: [],
            bulletSpeed: 1600
        };

        window.addEventListener('mousemove', (e) => {
            this.state.mouseX = e.clientX;
            this.state.mouseY = e.clientY;
        });


        this.animateGun();
        this.startShooting();
    }

    startShooting() {
        const gun = this.gun;
        const scene = this.scene;
        const state = this.state;

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                shoot();
            }
        });

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

        function shoot() {
            if (board.bullets > 0) {
                const angle = angleToMouse();
                const {x: cx, y: cy} = getGunCenter();
                const vx = Math.cos(angle) * state.bulletSpeed;
                const vy = Math.sin(angle) * state.bulletSpeed;


                const bullet = document.createElement('div');
                bullet.className = 'bullet';
                bullet.style.left = cx + 'px';
                bullet.style.top = cy + 'px';
                scene.appendChild(bullet);

                state.bullets.push({el: bullet, x: cx, y: cy, vx, vy});
                board.updateBullets(-1);
            } else {
                board.reset();
            }
        }

        let lastTime = performance.now();

        function loop(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            const targets = document.querySelectorAll('.js-target');


            for (let i = state.bullets.length - 1; i >= 0; i--) {
                const b = state.bullets[i];
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                b.el.style.left = b.x + 'px';
                b.el.style.top = b.y + 'px';

                if (b.x < 0 || b.y < 0 || b.x > innerWidth || b.y > innerHeight) {
                    b.el.remove();
                    state.bullets.splice(i, 1);
                }

                const bRect = b.el.getBoundingClientRect();
                for (const t of targets) {
                    const tRect = t.getBoundingClientRect();

                    if (
                        bRect.left < tRect.right &&
                        bRect.right > tRect.left &&
                        bRect.top < tRect.bottom &&
                        bRect.bottom > tRect.top
                    ) {
                        console.log('hit');

                        board.updateScore(100);
                        board.updateDucks(1);
                        board.setBullets(3);

                        b.el.remove();
                        state.bullets.splice(i, 1);

                        t.remove();

                        break;
                    }
                }
            }

            requestAnimationFrame(loop);
        }

        loop(lastTime);
    }

    animateGun() {
        const state = this.state;
        const gun = this.gun;

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

        function loop() {
            const angle = angleToMouse();
            const deg = angle * 180 / Math.PI + 90;
            gun.style.transform = `translateX(-50%) rotate(${deg}deg)`;
            requestAnimationFrame(loop);
        }

        loop();
    }

}