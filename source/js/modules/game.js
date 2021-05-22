import {MILLISECONDS_PER_MINUTE} from './timer.js';
import Timer from './timer.js';
import ResultAnimationManager, {ResultType} from './result-animation-manager.js';

const GAME_DURATION = 5 * MILLISECONDS_PER_MINUTE;

class Game {
  constructor() {
    this.duration = GAME_DURATION;

    this._initResultAnimations();
    this._initTimer();
  }

  start() {
    this._resetAnimations();
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  _initResultAnimations() {
    this.resultScreens = document.querySelectorAll(`.screen--result`);
    const resultAnimations = {
      [ResultType.WIN]: [],
      [ResultType.LOSS]: null
    };

    const flat = [...this.resultScreens].map((resultScreen) => new ResultAnimationManager({resultScreen}));

    const raw = flat.reduce((acc, animation) => {
      const {result} = animation;

      if (Array.isArray(acc[result])) {
        acc[result].push(animation);
      } else {
        acc[result] = animation;
      }

      return acc;
    }, {...resultAnimations});

    this.resultAnimations = {raw, flat};
  }

  _initTimer() {
    this.timer = new Timer({
      duration: this.duration,
      onTimeEnd: () => {
        this._onLoose();
      }
    });
  }

  _onLoose() {
    const lossResultScreen = [...this.resultScreens].find((screen) => screen.dataset.result === ResultType.LOSS);
    const lossResultAnimation = this.resultAnimations.raw[ResultType.LOSS];

    lossResultScreen.classList.add(`screen--show`);
    lossResultScreen.classList.remove(`screen--hidden`);

    lossResultAnimation.animate();
  }

  onWin() {
    // temp
    const winResultScreen = [...this.resultScreens].find((screen) => screen.dataset.result === ResultType.WIN);
    const winResultAnimation = this.resultAnimations.raw[ResultType.WIN][0];

    winResultScreen.classList.add(`screen--show`);
    winResultScreen.classList.remove(`screen--hidden`);

    winResultScreen.getBoundingClientRect(); // reflow

    winResultAnimation.animate();
  }

  _resetAnimations() {
    this.resultAnimations.flat.forEach((animation) => animation.reset());
  }
}

const game = new Game();

export default game;
