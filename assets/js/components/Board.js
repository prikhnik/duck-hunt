class Board {
    constructor() {
        this.bullets = 3;
        this.ducks = 0;
        this.score = 0;
    }

    updateScore(value) {
        this.score += value;
        document.querySelector('.js-board-score span').innerHTML = this.score;
        document.getElementById('score').innerHTML = this.score;
    }
    updateDucks(value) {
        this.ducks += value;
        document.querySelector('.js-board-ducks span').innerHTML = this.ducks;
    }
    updateBullets(value) {
        this.bullets += value;
        document.querySelector('.js-board-bullets span').innerHTML = this.bullets;
    }
    setBullets(value) {
        this.bullets = value;
        document.querySelector('.js-board-bullets span').innerHTML = this.bullets;
    }
    reset() {
        this.bullets = 3;
        this.ducks = 0;
        this.score = 0;

        document.querySelector('.js-board-bullets span').innerHTML = this.bullets;
        document.querySelector('.js-board-ducks span').innerHTML = this.ducks;
        document.querySelector('.js-board-score span').innerHTML = this.score;

        document.getElementById('frame').classList.remove('--active');
        document.getElementById('frame').classList.add('--results');

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                document.getElementById('frame').classList.remove('--results');
            }
        });
    }
}

const board = new Board();