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

const changeLabel = (input, label, text) => {
    if (input.type === 'text') {
        label.innerHTML = label.innerHTML.replace(text, '');
    }
};

const showValidity = (reg, input, messageText, classAdd, clear = false) => {
    const test = reg.test(input.value);
    if (test) {
        input.classList.add('valid');
    } else {
        const message = input.parentNode.nextElementSibling;
        if (message === null || !message.classList.contains(classAdd) && input.value !== '') {
            renderErrorMessage(input, messageText, classAdd);
            if (clear) {
                input.value = '';
            }
        }
    }
};

const validation = () => {
    const reg = /[\d\D]{2,50}/ig;
    const birthReg = /(\d{2,4}[\s.\/-]?){3}/g,
        phoneReg = /\+7([\s()-]*\d){10}/g,
        length6reg = /\d{6}/g,
        length4Reg = /\d{4}/g,
        ruReg = /[А-я\s.]/ig;
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

    changeLabel(dateInput, dateLabel, 'Дата рождения');
    changeLabel(passInput, passLabel, 'Дата выдачи');

    const textFields = document.querySelectorAll('[type="text"]');

    document.addEventListener('input', event => {
        const target = event.target;
        textFields.forEach(item => {
            if (target === item) {
                if (item.placeholder !== 'Дата рождения' && item.placeholder !== 'Дата выдачи') {
                    showValidity(ruReg, target, 'Используйте только русские буквы', 'ru', true);
                }

                target.value = target.value.replace(/[\s+]{2,}/ig, '');
                target.value = target.value.replace(/^\s/ig, '');
                target.value = target.value.replace(/\s$/ig, '');
            }
        })
    });
    document.addEventListener('blur', event => {
        textFields.forEach(item => {
            if (item.placeholder !== 'Дата рождения' && item.placeholder !== 'Дата выдачи') {
                showValidity(reg, item, 'Введите от 2 до 50 символов', 'length');
            }
        });

        if (dateInput.type !== 'date' && passInput.type !== 'date') {
            showValidity(birthReg, dateInput, 'Некорректная дата', 'birth');
            showValidity(birthReg, passInput, 'Некорректная дата', 'pass-date-check');
        }

        showValidity(phoneReg, phoneInput, 'Начните с +7', 'phone');

        length6Inputs.forEach(item => {
            showValidity(length6reg, item, 'Используйте 6 цифр', 'length-def6');
        });

        showValidity(length4Reg, passSerie, 'Используйте 4 цифры', 'length-def4');

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
    }, true);

    submitBtn.addEventListener('click', event => {
        event.preventDefault();
        successSent.classList.remove('d-none');
        allInputs.forEach(item => {
            item.value = '';
        });
        setTimeout(() => {
            successSent.classList.add('d-none');
        }, 5000);
    });
};
validation();

