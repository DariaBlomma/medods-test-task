const renderErrorMessage = (elem, text, type) => {
    elem.classList.add('invalid');
    elem.classList.remove('valid');
    const p = document.createElement('p');
    p.className = `error-message ${type}`;
    p.textContent = text;
    elem.parentNode.insertAdjacentElement('afterend', p);
    setTimeout(() => {
        p.remove();
        elem.classList.remove('invalid');
    }, 5000);
};

const changeLabel = (input, label, text, classToRemove) => {
    if (input.type === 'text') {
        label.innerHTML = label.innerHTML.replace(text, '');
        label.classList.remove(classToRemove);
    }
};

const showValidity = (reg, input, messageText, classAdd, clear = false) => {

    const test = reg.test(input.value);
    if (test) {
        input.classList.add('valid');
    } else {
        const message = input.parentNode.nextElementSibling;
        if (input.value !== '') {
            if (clear) {
                input.value = '';
            }
            if (message === null || !message.classList.contains(classAdd)) {
                // if (messageText === 'Введите от 2 до 50 символов') {
                //     console.log(input.value.length);
                //     debugger;
                // }
                renderErrorMessage(input, messageText, classAdd);
            }
        }
    }
};

const validation = () => {
    const reg = /^.{2,50}$/ig;
    const birthReg = /(\d{2,4}[\s.\/-]?){3}/g,
        phoneReg = /\+7([\s()-]*\d){10}/g,
        length6reg = /\d{6}/g,
        length4Reg = /\d{4}/g,
        ruReg = /[А-я\s.]/ig,
        lettersReg = /[A-zА-я]/ig;
    const dateInput = document.querySelector('[placeholder="Дата рождения"]'),
        dateLabel = document.querySelector('.birthdate'),
        passInput = document.querySelector('[placeholder="Дата выдачи"]'),
        passLabel = document.querySelector('.pass-date-label'),
        phoneInput = document.querySelector('.phone'),
        length6Inputs = document.querySelectorAll('.length6'),
        allInputs = document.querySelectorAll('input'),
        passSerie = document.querySelector('.pass-serie'),
        submitBtn = document.querySelector('.submit'),
        successSent = document.querySelector('.success-sent');

    submitBtn.setAttribute('disabled', 'true');

    changeLabel(dateInput, dateLabel, 'Дата рождения', 'birthdate');
    changeLabel(passInput, passLabel, 'Дата выдачи', 'pass-date-label');

    const textFields = document.querySelectorAll('[type="text"]');

    document.addEventListener('input', event => {
        const target = event.target;
        textFields.forEach(item => {
            if (target === item) {
                if (item.placeholder !== 'Дата рождения' && item.placeholder !== 'Дата выдачи') {
                    showValidity(ruReg, target, 'Используйте только русские буквы', 'ru', true);
                } else {
                    target.value = target.value.replace(lettersReg, '');
                }

                target.value = target.value.replace(/[\s+]{2,}/ig, '');
                target.value = target.value.replace(/^\s/ig, '');
                target.value = target.value.replace(/\s$/ig, '');
            }
        });

        if (target.matches('.phone')) {
            target.value = target.value.replace(lettersReg, '');
        }
    });
    document.addEventListener('blur', event => {
        textFields.forEach(item => {
            if (item.placeholder !== 'Дата рождения' && item.placeholder !== 'Дата выдачи') {
                showValidity(reg, item, 'Введите от 2 до 50 символов', 'length');
            }
        });

        if (dateInput.type !== 'date' && passInput.type !== 'date') {
            const dateInput = document.querySelector('[placeholder="Дата рождения"]'),
                passInput = document.querySelector('[placeholder="Дата выдачи"]');
            showValidity(birthReg, dateInput, 'Некорректная дата', 'birth');
            showValidity(birthReg, passInput, 'Некорректная дата', 'pass-date-check');
        }

        showValidity(phoneReg, phoneInput, 'Начните с +7', 'phone');

        length6Inputs.forEach(item => {
            showValidity(length6reg, item, 'Используйте 6 цифр', 'length-def6');
        });

        showValidity(length4Reg, passSerie, 'Используйте 4 цифры', 'length-def4');
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(item => {
            if (item.value === '') {
                item.classList.remove('valid');
                item.classList.remove('invalid');
                const message = item.parentNode.nextElementSibling;
                if (!message === null && message.classList.contains('error-message')) {
                    message.remove();
                }
            }
        });

        let required = document.querySelectorAll('.required');
        required = [...required];
        event.preventDefault();
        const check = required.every(item => item.classList.contains('valid'));
        if (check) {
            submitBtn.removeAttribute('disabled');
            successSent.classList.remove('d-none');
            allInputs.forEach(item => {
                item.value = '';
            });
            setTimeout(() => {
                successSent.classList.add('d-none');
            }, 5000);
        }
    }, true);

    submitBtn.addEventListener('click', event => {
        let required = document.querySelectorAll('.required');
        required = [...required];
        event.preventDefault();
        const check = required.every(item => item.classList.contains('valid'));
        if (check) {
            submitBtn.removeAttribute('disabled');
            successSent.classList.remove('d-none');
            errorSent.classList.add('d-none');
            allInputs.forEach(item => {
                item.value = '';
            });
            setTimeout(() => {
                successSent.classList.add('d-none');
            }, 5000);
        } else {
            submitBtn.setAttribute('disabled', 'true');
            errorSent.classList.remove('d-none');
            successSent.classList.add('d-none');
        }

    });
};
validation();

