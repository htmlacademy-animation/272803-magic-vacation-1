export default () => {
  const root = document.querySelector(`:root`);
  const showResultEls = document.querySelectorAll(`.js-show-result`);
  const results = document.querySelectorAll(`.screen--result`);

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

        const svg = targetEl[0].querySelector(`svg`);
        const letters = [...svg.querySelectorAll(`g`)];

        animateLetterGroup(letters[0], i, root);
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

const animateLetter = (letter) => {
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
};

const animateLetterGroup = (letterGroup, index, root) => {
  const letters = [...letterGroup.querySelectorAll(`path`)];
  const length = letters[0].getTotalLength();
  root.style.setProperty(`--length-${index}`, `${length}px`);

  const promises = letters.map(animateLetter);

  return Promise.all(promises);
};
