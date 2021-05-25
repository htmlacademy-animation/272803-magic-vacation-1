import Animator, {MILLISECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND} from './animator';

class Timer {
  constructor(options = {}) {
    const {duration, onTimeEnd} = options;

    this.duration = duration;
    this.onTimeEnd = onTimeEnd;

    this._initDomElements();
    this._initAnimator();
    this._reset();

    return this;
  }

  _initDomElements() {
    const view = document.querySelector(`.game__counter`);
    const [minutes, seconds] = view.querySelectorAll(`span`);

    this.dom = {minutes, seconds};
  }

  _initAnimator() {
    this.animator = new Animator({
      duration: this.duration,
      onTick: (elapsedTime) => {
        const time = Timer.formatTimestamp(this.duration - elapsedTime);
        this._render(time);
      },
      onTimeEnd: () => {
        this.onTimeEnd();
        this._reset();
      }
    });
  }

  start() {
    this.animator.start();
  }

  stop() {
    this.animator.stop();
    this._reset();
  }

  _reset() {
    this._render(Timer.formatTimestamp(this.duration));
  }

  _render(time) {
    Object.keys(time).forEach((key) => {
      this.dom[key].textContent = Timer.formatNumberToStr(time[key]);
    });
  }

  static formatTimestamp(milliseconds) {
    const minutes = Math.floor(milliseconds / MILLISECONDS_PER_MINUTE);
    const seconds = Math.floor((milliseconds - (minutes * MILLISECONDS_PER_MINUTE)) / MILLISECONDS_PER_SECOND);

    return {minutes, seconds};
  }

  static formatNumberToStr(num) {
    return `${num < 10 ? 0 : ``}${num}`;
  }
}

export default Timer;
