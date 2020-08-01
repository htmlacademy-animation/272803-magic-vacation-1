const animationLogicSettings = {
  startIndex: -2,
  itemIterationStep: 2,
  groupItems: 3
};

export default class Typography {
  constructor(element, options) {
    const {duration, delayIter, startDelay, property} = options;

    this._element = element;
    this._duration = duration;
    this._delayIter = delayIter;
    this._delay = startDelay;
    this._property = property;

    this._animateLetter = this._animateLetter.bind(this);

    this._prepareText();
    this._addDTransitions();
  }

  _addDTransitions() {
    const letters = this._element.querySelectorAll(`.text__letter`);
    const {startIndex, groupItems, itemIterationStep} = animationLogicSettings;

    for (let i = startIndex; i < letters.length; i += groupItems) {
      for (let j = i; j <= i + groupItems * itemIterationStep && j <= letters.length; j += itemIterationStep) {
        const letter = letters[j];

        if (letter) {
          this._delay += this._delayIter;

          letter.style.transition = `${this._property} ${this._duration}ms ease-out ${this._delay}ms`;
        }
      }
    }
  }

  _createSpan(letter) {
    const span = document.createElement(`span`);
    span.classList.add(`text__letter`);
    span.textContent = letter;

    return span;
  }

  _prepareText() {
    const text = this._element.textContent;
    const words = text
      .trim()
      .split(` `)
      .filter((item) => item.length);

    const content = words.reduce((fragment, word) => {
      const span = document.createElement(`span`);
      span.classList.add(`text__word`);

      const wordFragment = word.split(``).reduce((fragm, letter) => {
        const item = this._createSpan(letter);
        fragm.appendChild(item);

        return fragm;
      }, document.createDocumentFragment());

      span.appendChild(wordFragment);
      fragment.appendChild(span);

      return fragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  _animateLetter(letter) {
    return new Promise((resolve) => {
      const transitionendHandler = () => {
        letter.removeEventListener(`transitionend`, transitionendHandler);
        resolve();
      };

      letter.addEventListener(`transitionend`, transitionendHandler);
    });
  }

  animate() {
    const promises = [...this._element.querySelectorAll(`.text__letter`)].map(
        this._animateLetter
    );
    this._element.classList.add(`animate`);

    return Promise.all(promises);
  }

  reset() {
    this._element.classList.remove(`animate`);
  }
}
