import Typography from './typography.js';

export default () => {
  const intro = document.querySelector(`.intro`);
  const title = intro.querySelector(`.intro__title`);

  const typo = new Typography(title, {
    duration: 200,
    delayIter: 20,
    startDelay: 0
  });

  return {typo};
};
