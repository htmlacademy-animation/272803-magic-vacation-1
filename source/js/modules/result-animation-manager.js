const ResultType = {
  WIN: `win`,
  LOSS: `loss`,
};

const ANIMATION_POINTS_AMOUNT = 3;

class ResultAnimationManager {
  constructor(options) {
    this.resultScreen = options.resultScreen;
    this.result = this.resultScreen.dataset.result;

    this.ANIMATION_POINTS_AMOUNT = ANIMATION_POINTS_AMOUNT;

    this._prepareData();
  }

  _prepareData() {
    this.title = this.resultScreen.querySelector(`.result__title`);
    this.svg = this.title.querySelector(`svg`);
    this.letters = [...this.svg.querySelectorAll(`path`)];

    this.svg.style.setProperty(`--points-amount`, this.ANIMATION_POINTS_AMOUNT);
    this.letters.forEach(this._prepareLetter.bind(this));
  }

  _prepareLetter(letter) {
    const length = letter.getTotalLength();

    // Изначально делал все анимации stroke-dasharray с помощью css, но при анимировании неверного ответа
    // возникли проблемы (анимация stroke-dasharray прерывалась до окончания анимации transform), и пришлось переделать на smil.
    // Для верного ответа оставил css анимацию. Как минимум, в учебных целях попробовал оба кейса.
    if (this.result === ResultType.WIN) {
      letter.style.setProperty(`--length`, `${length}px`);
    } else {
      const [strokeDasharrayAnimation, strokeDashoffsetAnimation] = [...letter.querySelectorAll(`animate`)];

      const value = length / this.ANIMATION_POINTS_AMOUNT;
      letter.dataset.length = length;

      strokeDasharrayAnimation.setAttribute(`from`, `0 ${value}`);
      strokeDashoffsetAnimation.setAttribute(`from`, `0`);

      strokeDasharrayAnimation.setAttribute(`to`, `${value} 0`);
      strokeDashoffsetAnimation.setAttribute(`to`, `${value}`);
    }
  }

  animate() {
    if (this.result === ResultType.LOSS) {
      this._animateWrong();
    } else if (this.result === ResultType.WIN) {
      this._animateSuccess();
    }
  }

  _animateSuccess() {
    this.title.classList.add(`animated`);
  }

  async _animateWrong() {
    const animationElement = this.svg.querySelector(`#negativeAnimation0`);
    animationElement.beginElement();
  }
}

export default ResultAnimationManager;
