import ResultAnimationManager from './result-animation-manager.js';

export default () => {
  const showResultEls = document.querySelectorAll(`.js-show-result`);
  const results = document.querySelectorAll(`.screen--result`);
  const resultAnimationManagers = [...results].slice(0, 1).map((resultScreen) => {
    const manager = new ResultAnimationManager({resultScreen});

    return manager;
  });

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        const target = showResultEls[i].getAttribute(`data-target`);

        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });

        const targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });

        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        resultAnimationManagers[0].animate();
      });
    }

    let playBtn = document.querySelector(`.js-play`);

    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};

