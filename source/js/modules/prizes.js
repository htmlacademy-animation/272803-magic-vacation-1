import SvgAnimation from './svg-animation.js';
import Animator from './animator';

const animationsData = [
  {
    picture: {path: `img/module-3/img/primary-award-from.svg`, duration: 6250},
    counter: {data: [3], fps: 12}
  },
  {
    picture: {path: `img/module-3/img/secondary-award-from.svg`, duration: 2017},
    counter: {data: [1, 2, 3, 4, 5, 6, 7], fps: 12}
  },
  {
    picture: {path: `img/module-3/img/additional-award-from.svg`, duration: 2400},
    counter: {data: [11, 185, 371, 514, 821, 849, 900], fps: 12}
  }
];

class PrizesAnimationsManager {
  constructor() {
    this.screen = document.querySelector(`#prizes`);
    this.wasVisitedPage = false;

    this._initAnimators();
    this._initAnimations();
  }

  _initAnimators() {
    const prizes = [...this.screen.querySelectorAll(`.prizes__item`)];
    const counters = prizes.map((prize) => prize.querySelector(`.prizes__desc b`));

    this.animators = animationsData.map((options, index) => {
      const {data, fps} = options.counter;

      const counter = counters[index];
      let i = 0;

      const animator = new Animator({
        fps,
        duration: Infinity,
        onTick: () => {
          if (!data[i]) {
            animator.stop();
          } else {
            counter.textContent = data[i++];
          }
        }
      });

      counter.textContent = data[i++];

      return animator;
    });
  }

  _initAnimations() {
    const prizes = [...this.screen.querySelectorAll(`.prizes__item`)];
    const pictures = prizes.map((prize) => prize.querySelector(`img`));

    this.animations = animationsData.map((options, index) => {
      const {path, duration} = options.picture;

      const animation = new SvgAnimation({
        element: pictures[index],
        path,
        duration
      });

      return animation;
    });
  }

  async _startAnimator(animator, delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    animator.start();
  }

  async animate() {
    if (this.wasVisitedPage) {
      return;
    }

    this.wasVisitedPage = true;

    for (let i = 0; i < this.animations.length; i++) {
      this._startAnimator(this.animators[i], 1500);
      await this.animations[i].animate();
    }
  }
}

export {PrizesAnimationsManager};
