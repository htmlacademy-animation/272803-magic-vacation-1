const ResultType = {
  WIN: `win`,
  LOSS: `loss`,
};

const LettersOffsetsData = {
  [ResultType.WIN]: [-50, -60, 15, 65, 10, 40, 145],
  [ResultType.LOSS]: [-50, -50, -50, -50, -50]
};

class ResultAnimationManager {
  constructor(options) {
    this.resultScreen = options.resultScreen;
    this.result = this.resultScreen.dataset.result;

    this._prepareData();
  }

  _prepareData() {
    this.title = this.resultScreen.querySelector(`.result__title`);
    this.svg = this.title.querySelector(`svg`);
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
      const transitionendHandler = (evt) => {
        if (evt.target !== letter) {
          return;
        }

        letter.removeEventListener(`transitionend`, transitionendHandler);
        resolve();
      };

      letter.addEventListener(`transitionend`, transitionendHandler);
    });
  }

  animate() {
    this.title.classList.add(`animated`);

    const promises = this.letters.map(this.animateLetter.bind(this));

    return Promise.all(promises);
  }

  reset() {
    this.title.classList.remove(`animated`);
  }
}

export default ResultAnimationManager;
