import Notiflix from 'notiflix';

// Вешаем слушатель на форму

const formElement = document.querySelector('form');
formElement.addEventListener('submit', onSubmitClick);

// Функция для клика

function onSubmitClick(event) {
  event.preventDefault();

  // Пишем значения инпутов в переменные

  const delayValue = Number(event.currentTarget.elements.delay.value);
  const stepValue = Number(event.currentTarget.elements.step.value);
  const amountValue = Number(event.currentTarget.elements.amount.value);

  // Создаём цикл

  for (let i = 0; i < amountValue; i++) {
    const stepDelay = i * stepValue + delayValue;
    createPromise(i + 1, stepDelay);
  }
}

// Создаём промис

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  // Возвращаем сообщение о результате промиса

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}
