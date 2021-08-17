const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let isJumping = false;


function handleKeyUp(event) {     /* função para contabilizar a ação do usuario ao apertar uma tecla */
    if (event.keyCode === 32) {
        if (!isJumping) {    /* site mostrando os key code = https://keycode.info */
            console.log('pressionou espaço!')
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position = position - 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position = position + 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPositon = 1000;
    let ramdomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPositon + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPositon < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPositon > 0 && cactusPositon < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class= "game-over">Fim de Jogo</h1>';
        } else {
            cactusPositon = cactusPositon - 10;
            cactus.style.left = cactusPositon + 'px';
        }
    }, 20);

    setTimeout(createCactus, ramdomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
