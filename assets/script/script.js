"use strict"
const choice = document.querySelector('.choice'),
    number = document.querySelector('.number'),
    button = document.querySelector('#button'),
    result = document.querySelector('.result'),
    error = document.querySelector('.error');

    function check() {
    try {
        if(choice.value == `select`){
            throw new Error(`Выберите предложенную категорию`);
        }
        else if(number.value > 10 || number.value === '' || (choice.value === 'films' && number.value >= 7)){
            console.log("сложное условие");
            throw new Error(`Вы ввели "${number.value}". Для категории люди и планеты необходимо ввести число от 1 до 10 и для категории фильмы от 1 до 6.`);
        }
        result.textContent = '';
        error.textContent = '';
    } catch (e) {
        error.textContent = `${e.message}`;
    }
    }


    async function getChoice() {
        const response = await fetch(`https://swapi.dev/api/${choice.value}/${number.value}/`);
        const data = await response.json();
        console.log(data);
        console.log(data.name);
        try{
            check();
            if (data.results) {
                console.log(data.results);
                return;
            } else if (data.name === undefined) {
                result.textContent = `Фильм: ${data.title}`;
            } else {
                result.textContent = `Имя: ${data.name}`;
            }
            error.textContent = '';
        }catch(e){
            console.log("Ошибка", e);
            check();
        }
    }
    button.addEventListener('click', getChoice); 