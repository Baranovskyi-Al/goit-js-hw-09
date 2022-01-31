function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Добавляем кнопки

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Сделаем кнопку СТОП неактивной по умолчанию для "чайников"

startButton.disabled = false;
stopButton.disabled = true;

// Вешаем слушатели

startButton.addEventListener('click', swinchingColor);
stopButton.addEventListener('click', stopSwinchingColor);

// Функция для кнопки СТАРТ

function swinchingColor() {
  const intervalDelay = 1000;

  switchingInterval = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, intervalDelay);

  // Деактивируем СТАРТ и деактивируем СТОП

  startButton.disabled = true;
  stopButton.disabled = false;
}

// Функция для кнопки СТОП

function stopSwinchingColor() {
  clearInterval(switchingInterval);

  // Активируем СТАРТ и деактивируем СТОП

  startButton.disabled = false;
  stopButton.disabled = true;
}
