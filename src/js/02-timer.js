// імпорт
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// доступ
const inputDatePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// початковий блок кнопки
startButton.disabled = true;

// опції календаря та первірка дати
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// активація flatpickr на інпуті
const flatpickrInstance = flatpickr(inputDatePicker, options);

// обробка кліку та визначення часу для зворотнього відліку 
// та виклик функціїї зворотного відліку
startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();

  const timeDifference = selectedDate - currentDate;
  const countdown = convertMs(timeDifference);

  startCountdown(countdown);
});

// функція для запуску зворотного відліку
function startCountdown(countdown) {
  updateDisplay(countdown);

  const intervalId = setInterval(() => {
    countdown.seconds--;
    inputDatePicker.disabled = true;
    startButton.disabled = true;
    if (countdown.seconds < 0) {
      countdown.seconds = 59;
      countdown.minutes--;

      if (countdown.minutes < 0) {
        countdown.minutes = 59;
        countdown.hours--;

        if (countdown.hours < 0) {
          countdown.hours = 23;
          countdown.days--;

          if (countdown.days < 0) {
            clearInterval(intervalId);
              updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            inputDatePicker.disabled = false;
      return;
          }
        }
      }
    }
    updateDisplay(countdown);
  }, 1000);
}

// функція додавання на перед нуля
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// функція оновлення дісплею
function updateDisplay(countdown) {
  daysValue.textContent = addLeadingZero(countdown.days);
  hoursValue.textContent = addLeadingZero(countdown.hours);
  minutesValue.textContent = addLeadingZero(countdown.minutes);
  secondsValue.textContent = addLeadingZero(countdown.seconds);
}

// функція переводу мілісекунд в потрібний формат
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
};
