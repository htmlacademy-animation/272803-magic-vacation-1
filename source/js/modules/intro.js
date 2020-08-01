import Typography from './typography.js';

const intro = document.querySelector(`.intro`);
const title = intro.querySelector(`.intro__title`);
const date = intro.querySelector(`.intro__date`);

const [titleTypo, dateTypo] = [title, date].map((element) => {
  return new Typography(element, {
    duration: 200,
    delayIter: 20,
    startDelay: 0,
    property: `transform`
  });
});

export {titleTypo, dateTypo};
