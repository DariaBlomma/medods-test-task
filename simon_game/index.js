const renderSound = number => {
    const div = document.querySelector('.audio-files');
    div.innerHTML = `
    <audio autoplay>
        <source src="sounds/sound${number}.mp3">
    </audio>`;
};



const renderRandom = () => Math.floor(Math.random() * 4);

const showPart = () => {
    
    let time = 1500;
    let row = 2;
    const parts = document.querySelectorAll('.circle div');
    const arr = [];
    for (let i = 0; i < row; i++) {
        arr.push(renderRandom());
    }
    arr.forEach((item, index) => {
        if (index === 0) {
            parts[item].classList.add('lighter');
            renderSound(index + 1);
            setTimeout(() => {
                parts[item].classList.remove('lighter');
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
                    }, time * (index + 1));
                    //3000, index 1
                    // 4500, index 2
                };
            });
        }



    });
};

const startGame = () => {
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.start')) {
            showPart();
        }
    });
};
startGame();