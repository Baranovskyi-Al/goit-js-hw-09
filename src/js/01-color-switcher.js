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

// Функция для кнопки старт

function swinchingColor() {
  const intervalDelay = 1000;

  switchingInterval = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, intervalDelay);

  startButton.disabled = true;
  stopButton.disabled = false;
}

// Функция для кнопки стоп

function stopSwinchingColor() {
  clearInterval(switchingInterval);
  startButton.disabled = false;
}
