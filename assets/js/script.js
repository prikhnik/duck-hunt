const frame = document.getElementById('frame');
const startButton = document.getElementById('new_game');

startButton.addEventListener('click', () => {
    startGame();
});


function startGame() {
    frame.classList.add('--active');

    new Bird({ startX: 50, speed: 2, amplitude: 80 });
    new Bird({ startX: 200, speed: 3, amplitude: 120 });
}