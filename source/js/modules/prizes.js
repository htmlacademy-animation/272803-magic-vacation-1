const animationsData = [
  {path: `img/module-3/img/primary-award-from.svg`, duration: 6250},
  {path: `img/module-3/img/secondary-award-from.svg`, duration: 2017},
  {path: `img/module-3/img/additional-award-from.svg`, duration: 2400},
];

class PrizesAnimationsManager {
  constructor() {
    this.screen = document.querySelector(`#prizes`);
    this.wasVisitedPage = false;
  }

  async animate() {
    if (this.wasVisitedPage) {
      return;
    }

    this.wasVisitedPage = true;

    const prizes = [...this.screen.querySelectorAll(`.prizes__item`)];
    const pictures = prizes.map((prize) => prize.querySelector(`img`));

    for (let i = 0; i < pictures.length; i++) {
      pictures[i].src = this.getRandomPath(animationsData[i].path);

      await new Promise((resolve) => {
        setTimeout(resolve, animationsData[i].duration);
      });
    }
  }

  getRandomPath(path) {
    return `${path}?${Math.floor(Math.random() * 1000000000)}`;
  }
}

export {PrizesAnimationsManager};
