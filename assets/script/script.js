"use strict"
const choice = document.querySelector('.choice'),
      number = document.querySelector('.number'),
      button = document.querySelector('#button'),
      result = document.querySelector('.result'),
      error = document.querySelector('.error');

      console.log(typeof Number(number.value));
    function check() {
    try {
        if(choice.value == `select`){
            throw new Error(`Выберите предложенную категорию`);
        }
        else if(Number(number.value) > 10 || Number(number.value) === ' '){
            throw new Error(`Вы ввели ${number.value}.Для категории люди и планеты еобходимо ввести число от 1 до 10 и для категории фильмы от 1 до 6.`);
        }
        result.textContent = '';
        error.textContent = '';
    } catch (e) {
        error.textContent = `${e.message}`;
    }
    }

    function checkFilm(){
        try {
            if(number.value >= 7 ){
                throw new Error(`Вы ввели ${number.value}. Для категории фильмы необходимо ввести число от 1 до 6.`);
            }
            result.textContent = '';
            error.textContent = '';
        } catch (e) {
            error.textContent = `${e.message}`;
        }
    }

    async function getChoice() {
        try{
            const response = await fetch(`https://swapi.dev/api/${choice.value}/${number.value}/`);
            const data = await response.json();
            if (data.name === undefined) {
                result.textContent = `Результат: ${data.title}`;
            } else {
                result.textContent = `Результат: ${data.name}`;
            }
            error.textContent = '';
        }catch(e){
            check();
            checkFilm();
        }finally {
            console.log('Готово');
        }
    }
    button.addEventListener('click', getChoice);