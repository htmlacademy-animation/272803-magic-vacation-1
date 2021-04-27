const ResultType = {
  WIN: `win`,
  LOSS: `loss`,
};

const LettersOffsetsData = {
  [ResultType.WIN]: [-50, -60, 15, -50, -50, -50],
  [ResultType.LOSS]: [-50, -50, -50, -50, -50]
};

class ResultAnimationManager {
  constructor(options) {
    this.resultScreen = options.resultScreen;
    this.result = this.resultScreen.dataset.result;

    this._prepareData();
  }

  _prepareData() {
    this.svg = this.resultScreen.querySelector(`svg`);
    this.letters = [...this.svg.querySelectorAll(`path`)];

    this.letters.forEach(this._prepareLetter.bind(this));
  }

  _prepareLetter(letter, letterIndex) {
    const offsets = LettersOffsetsData[this.result];
    const length = letter.getTotalLength();

    letter.style.setProperty(`--length`, `${length}px`);
    letter.style.setProperty(`--stroke-dashoffset`, `${offsets[letterIndex]}px`);
  }

  animateLetter(letter) {
    return new Promise((resolve) => {
      const transitionendHandler = () => {
        letter.removeEventListener(`transitionend`, transitionendHandler);
        resolve();
      };

      letter.addEventListener(`transitionend`, transitionendHandler);

      setTimeout(() => {
        letter.classList.add(`animated`);
      }, 1000);
    });
  }

  animate() {
    this.letters.slice(0, 3).forEach(this.animateLetter.bind(this));
  }
}

export default ResultAnimationManager;
