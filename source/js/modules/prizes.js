import SvgAnimation from './svg-animation.js';

const animationsData = [
  {path: `img/module-3/img/primary-award-from.svg`, duration: 6250},
  {path: `img/module-3/img/secondary-award-from.svg`, duration: 2017},
  {path: `img/module-3/img/additional-award-from.svg`, duration: 2400},
];

class PrizesAnimationsManager {
  constructor() {
    this.screen = document.querySelector(`#prizes`);
    this.wasVisitedPage = false;

    this._initAnimations();
  }

  _initAnimations() {
    const prizes = [...this.screen.querySelectorAll(`.prizes__item`)];
    const pictures = prizes.map((prize) => prize.querySelector(`img`));

    this.animations = animationsData.map(({path, duration}, index) => {
      const animation = new SvgAnimation({
        element: pictures[index],
        path,
        duration
      });

      return animation;
    });
  }

  async animate() {
    if (this.wasVisitedPage) {
      return;
    }

    this.wasVisitedPage = true;

    for (let i = 0; i < this.animations.length; i++) {
      await this.animations[i].animate();
    }
  }
}

export {PrizesAnimationsManager};
