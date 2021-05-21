import {MILLISECONDS_PER_MINUTE} from './timer.js';
import Timer from './timer.js';
import ResultAnimationManager, {ResultType} from './result-animation-manager.js';

const GAME_DURATION = 0.1 * MILLISECONDS_PER_MINUTE;

class Game {
  constructor() {
    this.duration = GAME_DURATION;

    this._initResultAnimations();
    this._initTimer();
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  _initResultAnimations() {
    this.resultScreens = document.querySelectorAll(`.screen--result`);
    this.resultAnimations = [...this.resultScreens].map((resultScreen) => new ResultAnimationManager({resultScreen}));
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
    const lossResultAnimation = this.resultAnimations.find((resultAnimation) => resultAnimation.result === ResultType.LOSS);

    lossResultScreen.classList.add(`screen--show`);
    lossResultScreen.classList.remove(`screen--hidden`);

    lossResultAnimation.animate();
  }
}

const game = new Game();

export default game;
