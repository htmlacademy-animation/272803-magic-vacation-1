export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

const DEFAULT_START_TIME = 0;
const DEFAULT_FPS = 1;

class Animator {
  constructor(options = {}) {
    const {duration, startTime, fps, onTick, onTimeEnd} = options;

    this.duration = duration;
    this.startTime = startTime || DEFAULT_START_TIME;
    this.elapsedTime = 0;
    this.fps = fps || DEFAULT_FPS;
    this.iterationTime = MILLISECONDS_PER_SECOND / this.fps;
    this.iterationElapsedTime = 0;

    this.onTick = onTick;
    this.onTimeEnd = onTimeEnd;

    this.startTimestamp = null;
    this.currentTimestamp = null;
    this.requestId = null;

    return this;
  }

  start() {
    this.startTimeStamp = Date.now();
    this.currentTimestamp = this.startTimeStamp;

    this.requestId = requestAnimationFrame(this._tick.bind(this));
  }

  stop() {
    if (!this.requestId) {
      return;
    }

    cancelAnimationFrame(this.requestId);
  }

  _tick() {
    this.requestId = requestAnimationFrame(this._tick.bind(this));

    const now = Date.now();
    this.iterationElapsedTime = now - this.currentTimestamp;

    if (this.iterationElapsedTime > this.iterationTime) {
      this.currentTimestamp = now - (this.iterationElapsedTime % this.iterationTime);

      const elapsedTime = this.getElapsedTime();

      this.onTick(elapsedTime);

      if (elapsedTime >= this.duration) {
        this.stop();
        this.onTimeEnd();
      }
    }
  }

  getElapsedTime() {
    return this.currentTimestamp - this.startTimeStamp;
  }

  onTick() {
    return this;
  }

  onTimeEnd() {
    return this;
  }
}

export default Animator;
