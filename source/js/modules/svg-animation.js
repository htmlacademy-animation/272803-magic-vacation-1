const MAX_VALUE = 1000000000;

class SvgAnimation {
  constructor(options) {
    const {element, path, duration} = options;

    this.path = path;
    this.duration = duration;
    this.element = element;
  }

  async animate() {
    this.element.src = SvgAnimation.getRandomPath(this.path);

    await new Promise((resolve) => {
      setTimeout(resolve, this.duration);
    });
  }

  static getRandomPath(path) {
    return `${path}?${Math.floor(Math.random() * MAX_VALUE)}`;
  }
}

export default SvgAnimation;
