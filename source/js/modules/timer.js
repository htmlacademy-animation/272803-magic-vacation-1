export const MILLISECONDS_PER_SECONDS = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECONDS;

const DEFAULT_START_TIME = 0;

class Timer {
  constructor(options = {}) {
    const {duration, startTime, onTimeEnd} = options;

    const view = document.querySelector(`.game__counter`);
    const [minutes, seconds] = view.querySelectorAll(`span`);

    this.dom = {minutes, seconds};

    this.duration = duration;
    this.startTime = startTime || DEFAULT_START_TIME;
    this.elapsedTime = 0;
    this.iterationTime = MILLISECONDS_PER_SECONDS;
    this.iterationElapsedTime = 0;

    this.onTimeEnd = onTimeEnd;

    this.startTimestamp = null;
    this.currentTimestamp = null;
    this.requestId = null;

    this._reset();

    return this;
  }

  start() {
    this.startTimeStamp = Date.now();
    this.currentTimestamp = this.startTimeStamp;

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    if (!this.requestId) {
      return;
    }

    cancelAnimationFrame(this.requestId);
    this._reset();
  }

  _reset() {
    this._render(Timer.formatTimestamp(this.startTime));
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));

    const now = Date.now();
    this.iterationElapsedTime = now - this.currentTimestamp;

    if (this.iterationElapsedTime > this.iterationTime) {
      this.currentTimestamp = now - (this.iterationElapsedTime % this.iterationTime);

      const elapsedTime = this.getElapsedTime();
      const time = Timer.formatTimestamp(elapsedTime);

      this._render(time);

      if (elapsedTime >= this.duration) {
        this.stop();
        this.onTimeEnd();
      }
    }
  }

  _render(time) {
    Object.keys(time).forEach((key) => {
      this.dom[key].textContent = Timer.formatNumberToStr(time[key]);
    });
  }

  getElapsedTime() {
    return this.currentTimestamp - this.startTimeStamp;
  }

  static formatTimestamp(milliseconds) {
    const minutes = Math.floor(milliseconds / MILLISECONDS_PER_MINUTE);
    const seconds = Math.floor((milliseconds - (minutes * MILLISECONDS_PER_MINUTE)) / MILLISECONDS_PER_SECONDS);

    return {minutes, seconds};
  }

  static formatNumberToStr(num) {
    return `${num < 10 ? 0 : ``}${num}`;
  }
}

export default Timer;
