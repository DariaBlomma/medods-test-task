const renderSound = number => {
    const div = document.querySelector('.audio-files');
    div.innerHTML = `
    <audio autoplay>
        <source src="sounds/sound${number}.mp3">
    </audio>`;
};

const showRoundNumber = number => {
    const rounds = document.querySelectorAll('.round');
    rounds.forEach(item => {
        item.textContent = number;
    });
};

let time = 1500;

const changeLevel = () => {
    document.addEventListener('change', event => {
        const target = event.target;
        time = Number(target.value);
    });
};
changeLevel();

const gamerAction = (arr, round) => {
    //console.log('arr: ', arr);
    let click = 0;
    const circle = document.querySelector('.circle'),
        lostMessage = document.querySelector('.lost-message');
    let parts = [...circle.querySelectorAll('div')];
    circle.addEventListener('click', event => {
        click++;
        renderSound(click);
        const target = event.target;
        target.classList.add('lighter');
        setTimeout(() => {
            target.classList.remove('lighter');
        }, time);
        console.log('arr: ', arr);
        console.log('click: ', click);
        // каждый элемент массива
        if (arr[click - 1] != target.dataset.index) {
            console.log('arr: ', arr);
            console.log('click: ', click);
            console.log('round: ', round);
            console.log('target.dataset.index: ', target.dataset.index);
            console.log('arr[click - 1: ', arr[click - 1]);
            click = 0;
            document.querySelector('.start').removeAttribute('disabled');
            lostMessage.classList.remove('d-none');
            showRoundNumber(round);
            round = 0;
        } else if (arr.length - 1 === click - 1) {
            setTimeout(() => {
                const check = parts.some(item => item.classList.contains('lighter'));
                if (!check) {
                    console.log('next level');
                    click = 0;
                    round++;
                    showRoundNumber(round);
                    arr = showPart(round);
                }
            }, time);
        }



        // } else if (arr.length - 1 === click - 1) {
        //     console.log('click: ', click);
        //     console.log('arr.length: ', arr.length);
        //     click = 0;
        //     console.log('last element');
        //     //console.log('click: ', click);
        //     round++;
        //     setTimeout(() => {
        //         show++;
        //         console.log('show: ', show);
        //         showRoundNumber(round);
        //         arr = showPart(round);
        //         //console.log('arr: ', arr);
        //     }, 1500);
        // }

    });
};

const renderRandom = () => Math.floor(Math.random() * 4);

// const getRandomArr = number => {
//     const arr = [];
//     for (let i = 0; i < number; i++) {
//         arr.push(renderRandom());
//     }
//     return arr;
// };
let show = 0;
const showPart = row => {
    // row is number of rounds
    //show++;
    // if (show === 3) {
    //     console.log('in show part');
    //     debugger;
    // }
   
    // let time = 1500;
    const parts = document.querySelectorAll('.circle div'),
        startBtn = document.querySelector('.start');
    startBtn.setAttribute('disabled', 'true');
    if (row >= 2) {
       
        // debugger;
    }
    const arr = [];
    for (let i = 0; i < row; i++) {
        arr.push(renderRandom());
    }
    // const arr = getRandomArr(row);
    //console.log('arr: ', arr);

    arr.forEach((item, index) => {
        if (index === 0) {
            parts[item].classList.add('lighter');
            renderSound(index + 1);
            setTimeout(() => {
                parts[item].classList.remove('lighter');
                if (index === arr.length - 1) {
                    gamerAction(arr, row);
                    // return arr;
                }
            }, time); //1500
        } else {
            parts.forEach(elem => {
                if (!elem.classList.contains('lighter')) {
                    setTimeout(() => {
                        parts[item].classList.add('lighter');
                        renderSound(index + 1);
                    }, time * index);
                    //1500, index 1
                    // 3000, index 2
                    setTimeout(() => {
                        parts[item].classList.remove('lighter');
                        // if (index === arr.length - 1) {
                        //     console.log('row: ', row);
                        //     gamerAction(arr, row);
                        // }
                    }, time * (index + 1));
                    //3000, index 1
                    // 4500, index 2
                }
            });
            // setTimeout(() => {
            //     if (index === arr.length - 1) {
            //         console.log('row: ', row);
            //         gamerAction(arr, row);
            //         //return arr;
            //     }
            // }, time * (index + 1));

            if (index === arr.length - 1) {
                setTimeout(() => {
                    //console.log('row: ', row);
                    gamerAction(arr, row);
                    
                    //return arr;
                }, time * (index + 1));
            }
        }

    });
    return arr;
};

const startGame = () => {
    let round = 0;
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.start')) {
            round++;
            showPart(round);
            showRoundNumber(round);
        }
    });
};
startGame();
