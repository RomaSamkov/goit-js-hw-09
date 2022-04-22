import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentDate = Date.now();
      selectedTime = selectedDates[0].getTime();
      if (selectedTime < currentDate) {
        Notify.failure('Please choose a date in the future')
      }
      else {
        refs.startBtn.disabled = false;
      }
  },
};

class Timer {
    constructor({ time }) {
        this.time = time;
        this.timerId = null;
    }
    onTimerStartBtn() {
        Notify.success('Timer started');
        refs.input.setAttribute('disabled', '');
        refs.startBtn.setAttribute('disabled', '');
        this.timerId = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = selectedTime - currentTime;
            if (deltaTime >= 0) {
                const timeToStart = this.convertMs(deltaTime);
                this.time(timeToStart);
            } else {
                clearInterval(this.timerId);
                refs.input.removeAttribute('disabled');
                refs.startBtn.removeAttribute('disabled');
                return;
            }
        }, 1000);
    }
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

}

const timer = new Timer({time: updateTimer});

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

refs.startBtn.addEventListener('click', timer.onTimerStartBtn.bind(timer));
const calendar = flatpickr(refs.input, options);


