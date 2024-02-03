"use strict"
const choice = document.querySelector('.choice'),
      number = document.querySelector('.number'),
      button = document.querySelector('#button'),
      result = document.querySelector('.result'),
      error = document.querySelector('.error');

    function check() {
    try {
        if(choice.value === `select`){
            throw new Error(`Выберите предложенную категорию`);
        }
    else if(number.value > 10 || number.value === ''){
        throw new Error(`Вы ввели ${number.value}. Необходимо ввести число от 1 до 10`);
    }
    result.textContent = '';
    error.textContent = '';
    } catch (error) {
        error.textContent = `${error.message}`;
    }
    }
    async function getChoice() {
        try{
            const response = await fetch(`https://swapi.dev/api/${choice.value}/${number.value}/`);
            const data = await response.json();
            if (data.name === undefined) {
                result.textContent = `Результат поиска: ${data.title}`;
            } else {
                result.textContent = `Результат поиска: ${data.name}`;
            }
        }catch(error){
            check();
        }finally {
        console.log('Готово');
        }
    }
    button.addEventListener('click', getChoice);