import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Обьявляем переменные

const callendar = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Делаем кнопку СТАРТ неактивной по умолчанию

startButton.disabled = true;

// Настраиваем опции для flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0];
    const currentTime = Date.now();

    // Если выбранная дата меньше или равняется текущей - выводим алерт, если больше - активируем кнопку

    if (currentTime >= selectedTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }

    console.log(selectedDates[0]);
  },
};

// Инициализируем flatpickr

flatpickr('#datetime-picker', options);

// Сохраняем flatpickr в переменную

const callendars = callendar._flatpickr;

// Создаём таймер

const timer = {
  start() {
    const selectedTime = callendars.selectedDates[0].getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const convertedTime = convertMs(deltaTime);

      // Выводим значение оставшегося на страницу
      updateClock(convertedTime);
    }, 1000);
  },
};

// Вешаем слушатель на кнопку СТАРТ

startButton.addEventListener('click', onClickTimerStart);

// Функция для кнопки СТАРТ

function onClickTimerStart() {
  timer.start();
}

// Функция для отрисовки отсавшегося времени на странице

function updateClock(value) {
  daysValue.innerHTML = value.days;
  hoursValue.innerHTML = value.hours;
  minutesValue.innerHTML = value.minutes;
  secondsValue.innerHTML = value.seconds;
}

// // Функция для подсчета значений

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Функция для добавления 0 перед значением

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
