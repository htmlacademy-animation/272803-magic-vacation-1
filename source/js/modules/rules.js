export default () => {
  const rulesBlock = document.querySelector(`.rules`);
  const rulesItems = rulesBlock.querySelectorAll(`.rules__item`);
  const lastRulesItem = rulesItems[rulesItems.length - 1];
  const rulesButton = rulesBlock.querySelector(`.rules__link`);

  const transitionendHandler = () => {
    rulesButton.classList.remove(`hidden`);
  };

  lastRulesItem.addEventListener(`transitionend`, transitionendHandler);
};
